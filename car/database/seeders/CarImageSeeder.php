<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $carImages = [
            ['car_id' => 1, 'image_url' => 'image/car/toyota_camry_1.jpg'],
            ['car_id' => 1, 'image_url' => 'image/car/toyota_camry_2.jpg'],
            ['car_id' => 2, 'image_url' => 'image/car/toyota_corolla_1.jpg'],
            ['car_id' => 2, 'image_url' => 'image/car/toyota_corolla_2.jpg'],
            ['car_id' => 3, 'image_url' => 'image/car/toyota_rav4_1.jpg'],
            ['car_id' => 3, 'image_url' => 'image/car/toyota_rav4_2.jpg'],
            ['car_id' => 4, 'image_url' => 'image/car/toyota_hilux_1.jpg'],
            ['car_id' => 4, 'image_url' => 'image/car/toyota_hilux_2.jpg'],
            ['car_id' => 5, 'image_url' => 'image/car/toyota_highlander_1.jpg'],
            ['car_id' => 5, 'image_url' => 'image/car/toyota_highlander_2.jpg'],
            ['car_id' => 6, 'image_url' => 'image/car/honda_civic_1.jpg'],
            ['car_id' => 6, 'image_url' => 'image/car/honda_civic_2.jpg'],
            ['car_id' => 7, 'image_url' => 'image/car/honda_accord_1.jpg'],
            ['car_id' => 7, 'image_url' => 'image/car/honda_accord_2.jpg'],
            ['car_id' => 8, 'image_url' => 'image/car/honda_crv_1.jpg'],
            ['car_id' => 8, 'image_url' => 'image/car/honda_crv_2.jpg'],
            ['car_id' => 9, 'image_url' => 'image/car/honda_hrv_1.jpg'],
            ['car_id' => 9, 'image_url' => 'image/car/honda_hrv_2.jpg'],
            ['car_id' => 10, 'image_url' => 'image/car/honda_odyssey_1.jpg'],
            ['car_id' => 10, 'image_url' => 'image/car/honda_odyssey_2.jpg'],
            ['car_id' => 11, 'image_url' => 'image/car/mercedes_c_class_1.jpg'],
            ['car_id' => 11, 'image_url' => 'image/car/mercedes_c_class_2.jpg'],
            ['car_id' => 12, 'image_url' => 'image/car/mercedes_e_class_1.jpg'],
            ['car_id' => 12, 'image_url' => 'image/car/mercedes_e_class_2.jpg'],
            ['car_id' => 13, 'image_url' => 'image/car/mercedes_glc_1.jpg'],
            ['car_id' => 13, 'image_url' => 'image/car/mercedes_glc_2.jpg'],
            ['car_id' => 14, 'image_url' => 'image/car/mercedes_gle_1.jpg'],
            ['car_id' => 14, 'image_url' => 'image/car/mercedes_gle_2.jpg'],
            ['car_id' => 15, 'image_url' => 'image/car/mercedes_s_class_1.jpg'],
            ['car_id' => 15, 'image_url' => 'image/car/mercedes_s_class_2.jpg'],
            ['car_id' => 16, 'image_url' => 'image/car/bmw_3_series_1.jpg'],
            ['car_id' => 16, 'image_url' => 'image/car/bmw_3_series_2.jpg'],
            ['car_id' => 17, 'image_url' => 'image/car/bmw_5_series_1.jpg'],
            ['car_id' => 17, 'image_url' => 'image/car/bmw_5_series_2.jpg'],
            ['car_id' => 18, 'image_url' => 'image/car/bmw_x3_1.jpg'],
            ['car_id' => 18, 'image_url' => 'image/car/bmw_x3_2.jpg'],
            ['car_id' => 19, 'image_url' => 'image/car/bmw_x5_1.jpg'],
            ['car_id' => 19, 'image_url' => 'image/car/bmw_x5_2.jpg'],
            ['car_id' => 20, 'image_url' => 'image/car/bmw_7_series_1.jpg'],
            ['car_id' => 20, 'image_url' => 'image/car/bmw_7_series_2.jpg'],
            ['car_id' => 21, 'image_url' => 'image/car/tesla_model_3_1.jpg'],
            ['car_id' => 21, 'image_url' => 'image/car/tesla_model_3_2.jpg'],
            ['car_id' => 22, 'image_url' => 'image/car/tesla_model_s_1.jpg'],
            ['car_id' => 22, 'image_url' => 'image/car/tesla_model_s_2.jpg'],
            ['car_id' => 23, 'image_url' => 'image/car/tesla_model_x_1.jpg'],
            ['car_id' => 23, 'image_url' => 'image/car/tesla_model_x_2.jpg'],
            ['car_id' => 24, 'image_url' => 'image/car/tesla_model_y_1.jpg'],
            ['car_id' => 24, 'image_url' => 'image/car/tesla_model_y_2.jpg'],
            ['car_id' => 25, 'image_url' => 'image/car/tesla_cybertruck_1.jpg'],
            ['car_id' => 25, 'image_url' => 'image/car/tesla_cybertruck_2.jpg'],
        ];

        DB::table('car_images')->insert($carImages);
    }
}
