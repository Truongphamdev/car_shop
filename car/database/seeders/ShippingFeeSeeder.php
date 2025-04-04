<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Shipping_fee;

class ShippingFeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Shipping_fee::create([
            'region' => 'Nội thành Hà Nội',
            'fee' => 20.00,
        ]);

        Shipping_fee::create([
            'region' => 'Ngoại thành Hà Nội',
            'fee' => 30.00,
        ]);

        Shipping_fee::create([
            'region' => 'Miền Bắc',
            'fee' => 40.00,
        ]);

        Shipping_fee::create([
            'region' => 'Miền Nam',
            'fee' => 50.00,
        ]);
    }
}
