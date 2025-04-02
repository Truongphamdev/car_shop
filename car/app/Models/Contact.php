<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    protected $fillable = ['user_id', 'email', 'message', 'is_replied'];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
