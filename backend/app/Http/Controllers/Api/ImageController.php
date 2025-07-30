<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ImageController extends Controller
{
    public function __construct()
    {
        if (!Auth::user()->is_admin) {
            return abort(403);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ImageResource::collection(
            Image::with('user')->latest()->paginate(5)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImageRequest $request)
    {
        $data = $request->validated();

        $data['user_id'] = Auth::id();
        $data['slug'] = \Illuminate\Support\Str::slug($data['title']);

        // store the image in the storage 
        $image = $data['image'];
        unset($data['image']);
        $imagePath = $image->store('images', 'public');
        $data['path'] = $imagePath;

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
        $currentImagePath = $image->path;
        $image->fill($request->all());

        $changed = $image->getDirty();
        if (empty($changed)) {
            return response("", 200);
        }

        $data = $request->validated();

        if ($image->isDirty('path')) {
            if ($currentImagePath && Storage::disk('public')->exists($currentImagePath)) {
                Storage::disk('public')->delete($currentImagePath);
            }
            $newImage = $data['image'];
            unset($data['image']);
            $imagePath = $newImage->store('images', 'public');
            $data['path'] = $imagePath;
        }

        $image->update($data);

        return response(new ImageResource($image));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        // delete the image from the storage 
        if ($image->path && Storage::disk('public')->exists($image->path)) {
            Storage::disk('public')->delete($image->path);
        }

        $image->delete();

        return response("", 204);
    }
}
