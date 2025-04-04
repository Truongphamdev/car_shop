<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car_image extends Model
{
    protected $fillable = ['car_id','image_url'];
    public function car(){
        return $this->belongsTo(Car::class);
    }
}
