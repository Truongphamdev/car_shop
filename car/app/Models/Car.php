<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function brand(){
        return $this->belongsTo(Brand::class);
    }

    public function car_image(){
        return $this->hasMany(Car_image::class);
    }

    public function orderDetail()
    {
        return $this->hasMany(Order_detail::class);
    }
    public function review(){
        return $this->hasMany(Review::class);
    }

    public function favarite(){
        return $this->hasMany(Favorite::class);
    }
}
