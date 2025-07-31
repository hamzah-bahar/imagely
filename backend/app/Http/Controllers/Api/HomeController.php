<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageResource::collection(
            Image::with('user')
                ->latest()
                ->paginate(9)
        );
    }

    public function imagesByUser()
    {
        return ImageResource::collection(
            Image::where('user_id', Auth::id())
                ->latest()
                ->paginate(9)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImageRequest $request, Image $image)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();
        $data['slug'] = \Illuminate\Support\Str::slug($data['title']);

        // store the image in the storage 
        $image = $data['image'];
        unset($data['image']);
        $imagePath = $image->store('images', 'public');
        $data['path'] = config('app.url') . '/' . $imagePath;

        $image = Image::create($data);

        return response(new ImageResource($image), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Image $image)
    {
        return response(new ImageResource($image));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        //
    }
}
