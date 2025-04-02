<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order_detail extends Model
{
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function car()
    {
        return $this->belongsTo(Car::class);
    }
}
