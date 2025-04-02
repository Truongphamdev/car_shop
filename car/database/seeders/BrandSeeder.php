<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('brands')->insert([
            ['name' => 'Toyota', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Honda', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Mercedes', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'BMW', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Tesla', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
