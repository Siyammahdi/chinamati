import { useRef, useState } from "react";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=580&q=80",
    title: "Glass Cup",
    price: "€14,90",
    dialogImg: "/product.png",
  },
  {
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80",
    title: "ICE TEA RASPBERRY",
    price: "€8,99",
    dialogImg: "/single-product.png",
  },
  {
    src: "/subscribe.png",
    title: "PINK DRINK",
    price: "€12,90",
    dialogImg: "/product.png",
  },
  {
    src: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1000&q=80",
    title: "ICE TEA RASPBERRY",
    price: "€8,99",
    dialogImg: "/single-product.png",
  },
];

function useDragScroll(ref) {
  // Simple drag-scroll effect for horizontal slider
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  function onPointerDown(e) {
    if (!ref.current) return;
    setIsDragging(true);
    dragStart.current = e.pageX;
    scrollStart.current = ref.current.scrollLeft;
    ref.current.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e) {
    if (!isDragging || !ref.current) return;
    ref.current.scrollLeft = scrollStart.current - (e.pageX - dragStart.current);
  }
  function onPointerUp(e) {
    setIsDragging(false);
  }

  return { onPointerDown, onPointerMove, onPointerUp, isDragging };
}

export default function ShopGallerySlider() {
  const scrollRef = useRef(null);
  const [dialogIdx, setDialogIdx] = useState(null);
  const dragEvents = useDragScroll(scrollRef);

  function scrollBy(dir) {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    let next = 0;
    if (dir === 1) {
      const children = Array.from(el.children);
      for (let i = 0; i < children.length; i++) {
        if (children[i].offsetLeft > el.scrollLeft + 10) {
          next = children[i].offsetLeft;
          break;
        }
      }
      el.scrollTo({ left: next, behavior: "smooth" });
    } else {
      const children = Array.from(el.children);
      for (let i = children.length - 1; i >= 0; i--) {
        if (children[i].offsetLeft < el.scrollLeft - 10) {
          next = children[i].offsetLeft;
          break;
        }
      }
      el.scrollTo({ left: next, behavior: "smooth" });
    }
  }

  return (
    <section className="py-8 w-full">
      <div className="w-full">
        <div
          className="flex overflow-x-auto gap-5 touch-pan-x select-none no-scrollbar"
          ref={scrollRef}
          style={{ minHeight: 320 }}
          onPointerDown={dragEvents.onPointerDown}
          onPointerMove={dragEvents.onPointerMove}
          onPointerUp={dragEvents.onPointerUp}
        >
          {IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="relative shrink-0 flex items-end group"
              style={{ height: 320, width: 'auto', minWidth: 180 }}
            >
              <img
                src={img.src}
                alt={img.title}
                style={{ height: 320, width: 'auto', borderRadius: 32 }}
                className="object-cover select-none pointer-events-none"
              />
              {/* Center action button */}
              <button
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full border-2 border-neutral-200 shadow-lg h-16 w-16 flex items-center justify-center hover:bg-emerald-500 hover:text-white z-20 transition"
                onClick={() => setDialogIdx(idx)}
              >
                <span className="text-2xl font-bold">+</span>
              </button>
              {/* Dialog overlay */}
              {dialogIdx === idx && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-3 rounded-[28px] shadow-xl border border-neutral-100 bg-white p-5 flex gap-5 z-30 animate-fadein"
                  style={{ minWidth: 340, maxWidth: 390 }}
                >
                  <img
                    src={img.dialogImg}
                    alt=""
                    className="rounded-lg bg-neutral-100 w-24 h-24 object-contain border"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-lg mb-2">{img.title}</div>
                    <div className="mb-4 text-[15px] text-neutral-700">{img.price}</div>
                    <button className="rounded-full px-5 py-2 bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700">ADD TO CART</button>
                  </div>
                  <button
                    className="absolute right-3 top-3 p-1 rounded-full hover:bg-neutral-100 text-neutral-400"
                    onClick={() => setDialogIdx(null)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="max-w-[1600px] mx-auto flex justify-end items-center px-10 gap-4 mt-6">
          <button
            aria-label="Previous"
            className="rounded-full bg-white border border-neutral-200 w-12 h-12 shadow hover:bg-neutral-100 flex items-center justify-center"
            onClick={() => scrollBy(-1)}
          >
            <span className="text-lg">←</span>
          </button>
          <button
            aria-label="Next"
            className="rounded-full bg-white border border-neutral-200 w-12 h-12 shadow hover:bg-neutral-100 flex items-center justify-center"
            onClick={() => scrollBy(1)}
          >
            <span className="text-lg">→</span>
          </button>
        </div>
        <style>{`
.no-scrollbar::-webkit-scrollbar{display:none;}
.no-scrollbar{scrollbar-width:none;}
`}</style>
      </div>
    </section>
  );
}
