<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\NewCar;

class NewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        NewCar::insert([
            [
                'title' => 'Toyota Ra Mắt Mẫu Xe Mới',
                'image_url' => 'news1.jpg',
                'content' => 'Toyota vừa công bố mẫu xe mới với nhiều nâng cấp vượt trội.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Tesla Sắp Ra Mắt Công Nghệ Mới',
                'image_url' => 'news2.jpg',
                'content' => 'Tesla sẽ giới thiệu công nghệ pin đột phá vào năm tới.',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'BMW Nâng Cấp Dòng Xe 2025',
                'image_url' => 'news3.jpg',
                'content' => 'BMW hứa hẹn mang đến trải nghiệm lái xe ấn tượng hơn với bản nâng cấp mới.',
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
