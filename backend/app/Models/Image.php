<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = [
        'title',
        'description',
        'path',
        'user_id',
        'slug'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
