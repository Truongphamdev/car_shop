<?php
namespace Database\Seeders;

use App\Models\Coupon;
use Illuminate\Database\Seeder;

class CouponSeeder extends Seeder
{
    public function run()
    {
        Coupon::create([
            'code' => 'DISCOUNT10',
            'discount' => 10.00, // Giảm 10 đơn vị tiền tệ
        ]);

        Coupon::create([
            'code' => 'SAVE20',
            'discount' => 20.00, // Giảm 20 đơn vị tiền tệ
        ]);

        Coupon::create([
            'code' => 'FREESHIP',
            'discount' => 15.00, // Giảm 15 đơn vị tiền tệ
        ]);
    }
}