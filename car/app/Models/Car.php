<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    protected $fillable = ['name', 'price', 'description', 'category_id', 'brand_id'];
    public function likers()
    {
        // Định nghĩa quan hệ nhiều-nhiều với bảng users thông qua bảng trung gian likes
        return $this->belongsToMany(User::class, 'likes')->withTimestamps();
    }
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
