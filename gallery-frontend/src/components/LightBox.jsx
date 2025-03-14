import { useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"


export default function LightBox({ images, currentIndex, onClose, onNavigate }) {
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    onNavigate(newIndex)
  }, [currentIndex, images.length, onNavigate])

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    onNavigate(newIndex)
  }, [currentIndex, images.length, onNavigate])

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [onClose, goToPrevious, goToNext])

  const currentImage = images[currentIndex]

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
        onClick={goToPrevious}
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="relative w-full h-full max-w-4xl max-h-[80vh] flex items-center justify-center p-4">
        <div className="relative w-full h-full">
          <img
            src={currentImage.src.original} 
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
        <div className="absolute bottom-4 left-0 right-0 text-center text-white bg-black/50 py-2 px-4 mx-auto max-w-max rounded-full">
          {currentImage.title} • {currentIndex + 1} / {images.length}
        </div>
      </div>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-10"
        onClick={goToNext}
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

