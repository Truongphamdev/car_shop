<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Xe Sedan', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'SUV', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Xe Thể Thao', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Xe Điện', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
