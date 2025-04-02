<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class CarSpecificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $carSpecifications = [
            ['name' => 'Mercedes C-Class', 'power' => 255, 'engine' => '2.0L Turbo', 'seats' => 5],
            ['name' => 'Mercedes E-Class', 'power' => 362, 'engine' => '3.0L Turbo', 'seats' => 5],
            ['name' => 'Mercedes GLC', 'power' => 255, 'engine' => '2.0L Turbo', 'seats' => 5],
            ['name' => 'Mercedes GLE', 'power' => 362, 'engine' => '3.0L Turbo', 'seats' => 5],
            ['name' => 'Mercedes S-Class', 'power' => 496, 'engine' => '4.0L V8', 'seats' => 5],
            
            ['name' => 'BMW 3 Series', 'power' => 255, 'engine' => '2.0L Turbo', 'seats' => 5],
            ['name' => 'BMW 5 Series', 'power' => 335, 'engine' => '3.0L Turbo', 'seats' => 5],
            ['name' => 'BMW X3', 'power' => 248, 'engine' => '2.0L Turbo', 'seats' => 5],
            ['name' => 'BMW X5', 'power' => 335, 'engine' => '3.0L Turbo', 'seats' => 5],
            ['name' => 'BMW 7 Series', 'power' => 523, 'engine' => '4.4L V8', 'seats' => 5],
        ];
        
        foreach ($carSpecifications as $specs) {
            DB::table('cars')->where('name', $specs['name'])->update([
                'power' => $specs['power'],
                'engine' => $specs['engine'],
                'seats' => $specs['seats'],
            ]);
        }
    }
    }

