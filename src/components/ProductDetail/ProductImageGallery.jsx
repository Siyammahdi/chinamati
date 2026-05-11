import { useState } from 'react'

export default function ProductImageGallery({ images = [], tag }) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-neutral-100 rounded-2xl flex items-center justify-center">
        <span className="text-neutral-400">No image available</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-neutral-50 rounded-2xl overflow-hidden">
        {/* Tag */}
        {tag && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-neutral-700 text-white text-xs font-semibold rounded">
            {tag}
          </div>
        )}
        
        {/* Main Image */}
        <img
          src={images[selectedImage]}
          alt="Product"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? 'border-neutral-900'
                  : 'border-transparent hover:border-neutral-300'
              }`}
            >
              <img
                src={image}
                alt={`Product view ${index + 1}`}
                className="w-full h-full object-contain bg-neutral-50"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


