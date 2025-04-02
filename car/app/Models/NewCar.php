<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewCar extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'image_url', 'content'];
}
