import LightBox from "./LightBox";
import { useState, useEffect } from "react";

//demo data


export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  //backendcall
  useEffect(() => {
    const loadImages = async () => {
      fetch("http://localhost:3000/api/images")
        .then(res=>res.json())
        .then(data =>{setImages(data)
          setLoading(false);
        })
        .catch(err=>console.error(err));
    };
    loadImages();
  }, []);

  const openLightbox=(index)=>{
    setSelectedImage(index);
  }

  const closeLightbox=()=>{
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="relative aspect-[3/2] overflow-hidden rounded-lg cursor-pointer transition-transform hover:scale-[1.02]"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.src.original || "/placeholder.svg"}
              alt={image.alt}
              
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200"></div>
          </div>
        ))}
      </div>

      {selectedImage !== null && (
        <LightBox images={images} currentIndex={selectedImage} onClose={closeLightbox} onNavigate={setSelectedImage} />
      )}
    </>
  );
}
