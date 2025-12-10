"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


// Typescript interface
interface Events {
    id: number;
    title: string;
    description: string;
    date: string;
    asset: { url: string };
    location: string;
}

interface Props {
    events: Events[];
}

export default function EventsCaroussel({ events }: Props) {
    const [index, setIndex] = useState(0);

    const itemsPerSlide = 2;

    const slides = [];
    for (let i = 0; i < events.length; i += itemsPerSlide) {
        slides.push(events.slice(i, i + itemsPerSlide));
    }

    return (
        <section className="w-full ">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4 justify-items-center"
                >
                    {slides[index].map((event) => (
                        <img
                            key={event.id}
                            src={event.asset.url}
                            alt={event.title}
                            className="w-full h-auto object-cover"
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-2 mt-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`w-3 h-3 ${i === index ? "bg-(--pink)" : "bg-white"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}