<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car_image extends Model
{
    public function car(){
        return $this->belongsTo(Car::class);
    }
}
