<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = rtrim(fake()->sentence(rand(3, 8)), '.');
        $images = [
            "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
            "https://img.freepik.com/free-photo/woman-beach-with-her-baby-enjoying-sunset_52683-144131.jpg?size=626&ext=jpg",
            "https://thumbs.dreamstime.com/b/kids-portrait-romantic-children-couple-45822890.jpg",
            "https://thumbs.dreamstime.com/b/little-girl-kissing-boy-sea-landscape-sunset-embraces-kisses-36620532.jpg",
            "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg"
        ];
        return [
            'title' => $title,
            'description' => fake()->paragraph(5),
            'user_id' => 1,
            'slug' => \Illuminate\Support\Str::slug($title),
            'path' => fake()->randomElement($images),
        ];
    }
}
