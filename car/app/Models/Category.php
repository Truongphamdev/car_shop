<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    
    public function car(){
        return $this->hasMany(Car::class);
    }
}
