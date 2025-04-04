<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Slide;
use App\Models\Car;
use App\Models\Review;
use App\Models\NewCar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Mail\ContactReply;
use App\Models\Cart;
use App\Models\Contact;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;


class CarController extends Controller
{
    public function home(Request $request) {    

        $categories = Category::all();
        $reviews = Review::with('user')->orderBy('created_at', 'desc')->take(3)->get();
        $news = NewCar::orderBy('created_at', 'desc')->take(3)->get();
        if($request->has('category_id')) {
            $cars = Car::with('car_image')->where('category_id',$request->category_id)->orderBy('created_at', 'desc')->take(6)->get();
        }
        else {
            $cars = Car::with('car_image')->orderBy('created_at', 'desc')->take(6)->get();
        }
        return response()->json([
            'categories' => $categories,
            'cars' => $cars,
            'reviews' => $reviews,
            'news' => $news,
        ]);
    }
    public function filterByCategory($id) {
        return redirect()->route('home', ['category_id' => $id]);
    }

    // trang chi tiết
    public function carDetail($id) {
        $car = Car::with('category','car_image','brand')->findOrFail($id);
        $reviews = Review::with('user')->where('car_id',$id)->orderBy('created_at', 'desc')->take(4)->get();
        $relatedCars = Car::with('category','car_image')
                  ->where('id', '!=', $id) // Loại bỏ chính xe đang xem
                  ->orderBy('created_at', 'desc')
                  ->take(4) // Giới hạn hiển thị 4 xe liên quan
                  ->get();
        return response()->json([
            'car'=>$car,
            'reviews'=>$reviews,
            'relatedCars'=>$relatedCars
        ]);
    }
    // lưu review

    
    public function storeReview(Request $request, $id)
    {
        $request->validate([
            'comment' => 'required|string|min:5',
        ]);
    
        $review = Review::create([
            'user_id' => Auth::id(),
            'car_id' => $id,
            'rating' => 5,
            'comment' => $request->comment,
        ]);
    
        // Load thông tin user để trả về
        $review->load('user');
    
        return response()->json([
            'success' => true,
            'message' => 'Đánh giá của bạn đã được gửi thành công!',
            'review' => $review,
        ], 201); // 201: Created
    }
    // xóa review
    public function removereview($id) {
        $review = Review::findOrFail($id);
        if($review) {
            $review->delete();
        }
        return response()->json(['message' => 'Review đã được xóa thành công']);
    }
    // tất cả xe
    public function allCar(Request $request) {
        $query = Car::query();
        if ($request->has('category') && $request->category) {
            $query->where('category_id', $request->category);
        }
    
        $cars = $query->with('car_image')->paginate(12);
        $categories = Category::all();
        return response()->json([
            'cars'=>$cars,
            'categories'=>$categories
        ]);
    }
    // lưu contact
    public function storeContact(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'message' => 'required|string|min:5',
            'name' => 'nullable|string|max:255',
        ]);

        $contact = Contact::create([
            'user_id' => auth('sanctum')->id(),
            'email' => $request->email,
            'message' => $request->message,
        ]);

        $emailSent = true;
        try {
            Mail::to($request->email)->send(
                new ContactReply($request->message, $request->email, $request->name)
            );
        } catch (\Exception $e) {
            Log::error("Lỗi gửi email: " . $e->getMessage());
            $emailSent = false;
        }

        return response()->json([
            'success' => true,
            'message' => $emailSent
                ? 'Tin nhắn của bạn đã được gửi và email đã được gửi đến bạn!'
                : 'Tin nhắn của bạn đã được gửi nhưng không thể gửi email!',
        ], 201);
    }
    // mua xe
    public function buycar($id) {
        $car = Car::with('car_image','category')->findOrFail($id);
        return response()->json([
            'car'=>$car
        ]);
    }
    // cart
    public function indexCart() {
        $cart = Cart::where('user_id',Auth::id())->with('car')->get();
        return response()->json([
            'cart'=>$cart
        ]);
    }

    public function storeCart(Request $request) {
        $request->validate([
            'car_id' => 'required|exists:cars,id',
            'quantity' => 'integer|min:1'
        ]);
        try {
            // Tìm kiếm sản phẩm trong giỏ hàng
            $cartItem = Cart::where('user_id', Auth::id())
                            ->where('car_id', $request->car_id)
                            ->first();
    
            if ($cartItem) {
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                $cartItem->quantity += $request->quantity;
                $cartItem->save(); // Lưu thay đổi
                return response()->json(['message' => 'Đã cập nhật số lượng trong giỏ hàng', 'cart' => $cartItem], 200);
            } else {
                // Nếu sản phẩm chưa tồn tại, tạo mới
                $cartItem = Cart::create([
                    'user_id' => Auth::id(),
                    'car_id' => $request->car_id,
                    'quantity' => $request->quantity
                ]);
                return response()->json(['message' => 'Đã thêm vào giỏ hàng', 'cart' => $cartItem], 200);
            }
        } catch (\Exception $e) {
            // Ghi log lỗi
            Log::error('Lỗi khi thêm vào giỏ hàng: ' . $e->getMessage());
            return response()->json(['message' => 'Không thể thêm vào giỏ hàng!'], 500);
        }
    }
    public function removeCart($id) {
        $cart = Cart::where('user_id',Auth::id())->where('id',$id)->first();
        if($cart) {
            $cart->delete();
            return response()->json(['message' => 'Đã xóa khỏi giỏ hàng']);
        }
        return response()->json(['message' => 'Không tìm thấy xe'], 404);
    }
    // tin tức
    public function shownews($id) {
        $new = NewCar::findOrFail($id);
        $relatedNew = NewCar::where('id', '!=', $id)->take(2)->get();
        return response()->json([
            'new'=>$new,
            'relatedNew'=>$relatedNew
        ]) ;
    }
}
