<?php

namespace App\Http\Controllers;

use App\Mail\OrderShipped;
use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Order;
use App\Models\Order_detail;
use App\Models\Payment;
use App\Models\Shipping_fee;
use App\Models\Coupon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
class CheckoutController extends Controller

{
    public function getcoupon() {
        $coupons = Coupon::all();
    return response()->json($coupons);
    }

    public function getShippingFees()
    {
        $shippingFees = Shipping_fee::all();
        return response()->json($shippingFees);
    }

    public function applyCoupon(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        $coupon = Coupon::where('code', $request->code)->first();

        if (!$coupon) {
            return response()->json(['message' => 'Mã giảm giá không hợp lệ'], 404);
        }

        return response()->json(['discount' => $coupon->discount]);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'shipping_fee_id' => 'required|exists:shipping_fees,id',
            'payment_method' => 'required|in:cash,credit_card,momo,vnpay',
            'total_price' => 'required|integer|min:0',
            'coupon_code' => 'nullable|string|exists:coupons,code',
            'items' => 'required|array',
            'items.*.car_id' => 'required|exists:cars,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|integer|min:0',
        ]);
        $user = $request->user();
        $order = [
            'id' => rand(1000, 9999), // Giả lập mã đơn hàng
            'total_price' => $request->total_price,
            'payment_method' => $request->payment_method,
        ];

        

        DB::beginTransaction();
        try {
            // Tạo đơn hàng
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $request->total_price,
                'status' => 'pending',
            ]);

            // Lưu chi tiết đơn hàng
            foreach ($request->items as $item) {
                Order_detail::create([
                    'order_id' => $order->id,
                    'car_id' => $item['car_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            // Lưu thông tin thanh toán
            $shippingFee = Shipping_fee::find($request->shipping_fee_id)->fee;
            Payment::create([
                'order_id' => $order->id,
                'user_id' => $user->id,
                'payment_method' => $request->payment_method,
                'amount' => $request->total_price + $shippingFee,
                'status' => 'pending',
            ]);
            try {
                Mail::to($user->email)->send(
                    new OrderShipped($order)
                );
            } catch (\Exception $e) {
                Log::error("Lỗi gửi email: " . $e->getMessage());
            }
            // Xóa giỏ hàng
            Cart::where('user_id', $user->id)->delete();

            DB::commit();
            return response()->json(['message' => 'Đặt hàng thành công', 'order_id' => $order->id], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Lỗi đặt hàng: ' . $e->getMessage()], 500);
        }
    }
}
