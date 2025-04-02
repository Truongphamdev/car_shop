<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $cars = [
            ['name' => 'Toyota Camry', 'category_id' => 1, 'brand_id' => 1, 'price' => 35000, 'quantity' => 5, 'description' => 'Sedan cao cấp, tiết kiệm nhiên liệu'],
            ['name' => 'Toyota Corolla', 'category_id' => 1, 'brand_id' => 1, 'price' => 28000, 'quantity' => 7, 'description' => 'Xe sedan bền bỉ, tiết kiệm nhiên liệu'],
            ['name' => 'Toyota RAV4', 'category_id' => 2, 'brand_id' => 1, 'price' => 40000, 'quantity' => 6, 'description' => 'SUV cỡ nhỏ, phù hợp gia đình'],
            ['name' => 'Toyota Hilux', 'category_id' => 4, 'brand_id' => 1, 'price' => 38000, 'quantity' => 8, 'description' => 'Xe bán tải bền bỉ, mạnh mẽ'],
            ['name' => 'Toyota Highlander', 'category_id' => 2, 'brand_id' => 1, 'price' => 45000, 'quantity' => 4, 'description' => 'SUV 7 chỗ rộng rãi'],
            
            ['name' => 'Honda Civic', 'category_id' => 1, 'brand_id' => 2, 'price' => 30000, 'quantity' => 6, 'description' => 'Xe thể thao, vận hành mạnh mẽ'],
            ['name' => 'Honda Accord', 'category_id' => 1, 'brand_id' => 2, 'price' => 32000, 'quantity' => 5, 'description' => 'Sedan cao cấp, công nghệ tiên tiến'],
            ['name' => 'Honda CR-V', 'category_id' => 2, 'brand_id' => 2, 'price' => 42000, 'quantity' => 6, 'description' => 'SUV tiết kiệm nhiên liệu'],
            ['name' => 'Honda HR-V', 'category_id' => 2, 'brand_id' => 2, 'price' => 35000, 'quantity' => 7, 'description' => 'SUV nhỏ gọn, phù hợp đô thị'],
            ['name' => 'Honda Odyssey', 'category_id' => 2, 'brand_id' => 2, 'price' => 40000, 'quantity' => 5, 'description' => 'Xe minivan rộng rãi'],
            
            ['name' => 'Mercedes C-Class', 'category_id' => 1, 'brand_id' => 3, 'price' => 60000, 'quantity' => 4, 'description' => 'Sedan hạng sang, nội thất cao cấp'],
            ['name' => 'Mercedes E-Class', 'category_id' => 1, 'brand_id' => 3, 'price' => 70000, 'quantity' => 3, 'description' => 'Sedan sang trọng, vận hành êm ái'],
            ['name' => 'Mercedes GLC', 'category_id' => 2, 'brand_id' => 3, 'price' => 75000, 'quantity' => 2, 'description' => 'SUV hạng sang, công nghệ tiên tiến'],
            ['name' => 'Mercedes GLE', 'category_id' => 2, 'brand_id' => 3, 'price' => 85000, 'quantity' => 2, 'description' => 'SUV cỡ lớn, động cơ mạnh mẽ'],
            ['name' => 'Mercedes S-Class', 'category_id' => 1, 'brand_id' => 3, 'price' => 120000, 'quantity' => 1, 'description' => 'Sedan siêu sang, đẳng cấp'],
            
            ['name' => 'BMW 3 Series', 'category_id' => 1, 'brand_id' => 4, 'price' => 55000, 'quantity' => 5, 'description' => 'Sedan thể thao, hiệu suất cao'],
            ['name' => 'BMW 5 Series', 'category_id' => 1, 'brand_id' => 4, 'price' => 65000, 'quantity' => 3, 'description' => 'Sedan hạng sang, công nghệ tiên tiến'],
            ['name' => 'BMW X3', 'category_id' => 2, 'brand_id' => 4, 'price' => 60000, 'quantity' => 4, 'description' => 'SUV cỡ nhỏ, tiện nghi'],
            ['name' => 'BMW X5', 'category_id' => 2, 'brand_id' => 4, 'price' => 80000, 'quantity' => 3, 'description' => 'SUV hạng sang, nội thất cao cấp'],
            ['name' => 'BMW 7 Series', 'category_id' => 1, 'brand_id' => 4, 'price' => 130000, 'quantity' => 1, 'description' => 'Sedan siêu sang, công nghệ tiên tiến'],
            
            ['name' => 'Tesla Model 3', 'category_id' => 3, 'brand_id' => 5, 'price' => 45000, 'quantity' => 5, 'description' => 'Xe điện phổ biến, hiệu suất cao'],
            ['name' => 'Tesla Model S', 'category_id' => 3, 'brand_id' => 5, 'price' => 90000, 'quantity' => 2, 'description' => 'Sedan điện cao cấp, phạm vi xa'],
            ['name' => 'Tesla Model X', 'category_id' => 3, 'brand_id' => 5, 'price' => 100000, 'quantity' => 2, 'description' => 'SUV điện sang trọng, cửa cánh chim'],
            ['name' => 'Tesla Model Y', 'category_id' => 3, 'brand_id' => 5, 'price' => 55000, 'quantity' => 4, 'description' => 'SUV điện nhỏ gọn, giá hợp lý'],
            ['name' => 'Tesla Cybertruck', 'category_id' => 4, 'brand_id' => 5, 'price' => 60000, 'quantity' => 3, 'description' => 'Bán tải điện, thiết kế tương lai'],
        ];

        DB::table('cars')->insert($cars);
    }
}
