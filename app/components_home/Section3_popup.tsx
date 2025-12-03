"use client";

import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react";
import { forwardRef, useState } from "react";

// TypeScript interface
export interface Picture {
  id: number;
  description: string;
  asset: { url: string };
}

interface Props {
  gallery: Picture[];
}

export default function GalleryWithFramerModal({ gallery }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    setIsOpen(true);
  };

  const changeSlide = (dir: 1 | -1) => {
    const nextIndex = wrap(0, gallery.length, selectedIndex + dir);
    setSelectedIndex(nextIndex);
    setDirection(dir);
  };

  return (
    <div>
      {/* Øverste række */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1fr] ">
        {gallery.slice(0, 4).map((pic, i) => (
          <img key={pic.id} src={pic.asset.url} alt={pic.description} className="w-full h-[250px] object-cover  cursor-pointer" onClick={() => openModal(i)} />
        ))}
      </div>

      {/* Nederste række */}
      <div className="grid grid-cols-3 ">
        {gallery.slice(4, 7).map((pic, i) => (
          <img key={pic.id} src={pic.asset.url} alt={pic.description} className="w-full h-[250px] object-cover cursor-pointer" onClick={() => openModal(i + 4)} />
        ))}
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white text-2xl z-50">
            ✕
          </button>

          <div className="relative">
            <motion.button onClick={() => changeSlide(-1)} className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 text-white text-3xl">
              ‹
            </motion.button>

            <AnimatePresence custom={direction} initial={false} mode="popLayout">
              <Slide key={gallery[selectedIndex].id} picture={gallery[selectedIndex]} custom={direction} />
            </AnimatePresence>

            <motion.button onClick={() => changeSlide(1)} className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 text-white text-3xl">
              ›
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

// Slide-komponent
const Slide = forwardRef(function Slide({ picture, custom }: { picture: Picture; custom: number }, ref: React.Ref<HTMLDivElement>) {
  const direction = usePresenceData();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: direction * 50 }} animate={{ opacity: 1, x: 0, transition: { type: "spring", bounce: 0.3 } }} exit={{ opacity: 0, x: direction * -50 }} custom={custom} className="w-[500px] h-[500px] rounded-lg overflow-hidden">
      <img src={picture.asset.url} alt={picture.description} className="w-full h-full object-cover" />
    </motion.div>
  );
});
