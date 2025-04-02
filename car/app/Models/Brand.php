<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    public function car(){
        return $this->hasMany(Car::class);
    }
}
