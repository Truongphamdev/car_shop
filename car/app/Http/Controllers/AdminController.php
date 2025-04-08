<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Car;
use App\Models\Car_image;
use App\Models\Category;
use App\Models\Order;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class AdminController extends Controller
{
    public function dashboard() {
        try {
            $cars = Car::with('car_image', 'category')->get(); // Dùng get() thay vì all()
            $users = User::all();
            $categories = Category::with('car')->get();
            $brands = Brand::all();
            return response()->json([
                'cars' => $cars,
                'users' => $users,
                'categories'=>$categories,
                'brands'=>$brands
            ]);
        } catch (\Exception $e) {
            Log::error('Lỗi khi lấy dữ liệu admin: ' . $e->getMessage());
            return response()->json(['message' => 'Không thể lấy dữ liệu!'], 500);
        }
    }
    public function addProduct(Request $request) {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id', // Danh mục phải tồn tại
            'brand_id' => 'required|exists:brands,id', // Danh mục phải tồn tại
            'price' => 'required|numeric',
            'description' => 'required|string',
            'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048', // Mảng các URL ảnh
        ]);
        try {
            // Tạo sản phẩm mới
            $car = Car::create([
                'name' => $request->name,
                'category_id' => $request->category_id, // Thêm danh mục
                'brand_id' => $request->brand_id, // Thêm danh mục
                'price' => $request->price,
                'description' => $request->description,
            ]);
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $fileName = $image->getClientOriginalName(); // Lấy tên file gốc (ví dụ: car.jpg)
                    $imagename = uniqid().'.'.$fileName;
                    $image->move(public_path('image/car/'),$imagename);

                    // Lưu đường dẫn vào database (không thêm 'storage/' vào đầu)
                    Car_image::create([
                        'car_id' => $car->id,
                        'image_url' =>'image/car/'.$imagename, // Lưu image/car/car.jpg
                    ]);
                }
            }


            // Trả về phản hồi thành công
            return response()->json([
                'message' => 'Sản phẩm đã được thêm thành công!',
                'car' => $car,
            ], 201);
        } catch (\Exception $e) {
            // Ghi log lỗi
            Log::error('Lỗi khi thêm sản phẩm: ' . $e->getMessage());

            return response()->json([
                'message' => 'Không thể thêm sản phẩm!',
            ], 500);
        }
    
    }
    public function editProduct($id) {
        $car = Car::with('car_image')->findOrFail($id);
        return response()->json([
            'car'=>$car
        ]);
    }
    public function updateProduct(Request $request, $id)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'category_id' => 'required|exists:categories,id',
        'brand_id' => 'required|exists:brands,id',
        'price' => 'required|numeric',
        'description' => 'required|string',
        'images.*' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
    ]);

    try {
        // Tìm sản phẩm theo ID
        $car = Car::findOrFail($id);

        // Cập nhật thông tin sản phẩm
        $car->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'brand_id' => $request->brand_id,
            'price' => $request->price,
            'description' => $request->description,
        ]);

        // Nếu có ảnh mới được tải lên
        if ($request->hasFile('images')) {
            // Xóa ảnh cũ trước khi thêm ảnh mới
            $oldImages = Car_image::where('car_id', $id)->get();
            foreach ($oldImages as $oldImage) {
                $oldImagePath = public_path($oldImage->image_url);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath); // Xóa file ảnh khỏi thư mục
                }
                $oldImage->delete(); // Xóa dữ liệu ảnh khỏi database
            }

            // Thêm ảnh mới
            foreach ($request->file('images') as $image) {
                $fileName = $image->getClientOriginalName();
                $imagename = uniqid() . '.' . $fileName;
                $image->move(public_path('image/car/'), $imagename);

                // Lưu đường dẫn ảnh vào database
                Car_image::create([
                    'car_id' => $car->id,
                    'image_url' => 'image/car/' . $imagename,
                ]);
            }
        }

        return response()->json([
            'message' => 'Sản phẩm đã được cập nhật thành công!',
            'car' => $car,
        ], 200);
    } catch (\Exception $e) {
        Log::error('Lỗi khi cập nhật sản phẩm: ' . $e->getMessage());

        return response()->json([
            'message' => 'Không thể cập nhật sản phẩm!',
        ], 500);
    }
}
public function destroy($id)
{
    try {
        // Lấy sản phẩm theo ID
        $product = Car::findOrFail($id);

        // Lấy tất cả các hình ảnh liên quan đến sản phẩm
        $carImages = Car_image::where('car_id', $id)->get();

        // Xóa các tệp ảnh liên quan đến sản phẩm
        foreach ($carImages as $image) {
            // Kiểm tra xem ảnh có tồn tại trên server không và xóa nếu có
            $imagePath = public_path($image->image_url);
            if (file_exists($imagePath)) {
                unlink($imagePath); // Xóa ảnh khỏi server
            }
        }

        // Xóa các bản ghi ảnh trong cơ sở dữ liệu
        Car_image::where('car_id', $id)->delete();

        // Xóa sản phẩm
        $product->delete();

        return response()->json([
            'message' => 'Sản phẩm và các ảnh liên quan đã được xóa thành công!',
        ], 200);
    } catch (\Exception $e) {
        // Ghi log lỗi nếu có
        Log::error('Lỗi xóa sản phẩm: '.$e->getMessage());
        return response()->json([
            'message' => 'Xóa sản phẩm thất bại!',
        ], 500);
    }
}

public function destroyUser($id) {
    $user = User::findOrFail($id);
    if($user) {
        $user->delete();
        return response()->json(["xóa thành công"]);
    }
}
public function getOrder() {
    $orders = Order::with('orderDetail','payment','user')->orderBy('created_at', 'desc')->take(20)->get();
    return response()->json(['orders'=>$orders]);
}
public function postorder(Request $request, $id) {
    try
    {
    $order = Order::findOrFail($id);
    $order->status = $request->status;
    $order->save();
    return response()->json([
        'message'=>"thành công rồi bạn"
    ]);}
    catch (\Exception $e) {
        // Ghi log lỗi nếu có
        Log::error('Lỗi update completed sản phẩm: '.$e->getMessage());

    }
}
public function destroyOrder($id) {
    try {

        $order = Order::findOrFail($id);
        
        $order->delete();
        return response()->json([
            'message'=>"xóa thành công đơn hàng"
        ]);
    }
    catch(\Exception $e) {
        Log::error('Lỗi delete completed sản phẩm: '.$e->getMessage());

    }
}
    
}
