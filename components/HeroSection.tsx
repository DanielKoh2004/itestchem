"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { Easing } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ease: Easing = [0.33, 1, 0.68, 1];
const viewport = { once: true, margin: "-100px" as const };

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

interface HeroSlide {
    imageUrl: string;
}

const heroSlides: HeroSlide[] = [
    {
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuAqmVRSik3NeYHaZU4MgsCJpxLmn6iwUe7sxDG_Jmzuatd_FW7ANyRmjNPtNUeleIAETxa4Gll9XTBskhtMFguPTwNuGAydIVlPGxn8xNjqusvm_3D4LUf0xAtn05KRF7paZgL2CswDtWHYrSVJdmwSnP-Q6gbJaNQMBJwSELGcNDpOZuRDHRDk7_QKPQihmXoihiC1kPW0Epgi2RlkMIW68f4DTtz0MWEyjWf4cgniwgmVJhke9jvVw7uuoNPtZyMZL47JRcrCd8C0",
    },
    {
        imageUrl:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDNu81afEUf5JB_DddgOmN_8PiMpqyEd4YB_TbAl7QbQQlGesz-e4XcF9JDFoswTfMgOQyf0IyvusKos339dL85S59Dml0f_X9kkvRybHRFCDaBqR0cM91mS6DJfndRoyPXDbWCQuS3gIt-wauPSxlPN5IxvtLm366RAxS_cMM-oNGDNpjmWtief0bZdMDQkgvbCKWfdRc2NL2CP01-LjY3iCfcQ-bjD7MYvG_KQiTpj8AZRQd42GK2rQpN8WiEp8BCgNRt9Zi4otEX",
    },
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const changeSlide = useCallback((newIndex: number) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(newIndex);
            setIsTransitioning(false);
        }, 400);
    }, []);

    const nextSlide = useCallback(() => {
        changeSlide((currentSlide + 1) % heroSlides.length);
    }, [currentSlide, changeSlide]);

    const prevSlide = useCallback(() => {
        changeSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
    }, [currentSlide, changeSlide]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative w-full h-[450px] bg-slate-900 overflow-hidden border-b-8 border-borneo-green-dark">
            {/* Background Image */}
            <div
                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-105" : "opacity-100 scale-100"
                    }`}
                style={{
                    backgroundImage: `url('${heroSlides[currentSlide].imageUrl}')`,
                }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-900/30" />

            {/* Content Card — framer-motion stagger */}
            <div className="relative max-w-7xl mx-auto h-full px-4 md:px-8 flex items-center">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    variants={stagger}
                    className="max-w-2xl text-white p-10 bg-slate-navy/85 backdrop-blur-md border-l-8 border-borneo-green shadow-2xl"
                >
                    <motion.h2
                        variants={fadeUp}
                        className="text-5xl font-bold mb-5 leading-[1.1]"
                    >
                        Your Professional &amp; Reliable Analytical Testing Solution
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        className="text-lg text-slate-300 mb-8 font-light leading-relaxed border-l border-slate-500 pl-6"
                    >
                        Providing accredited agricultural, environmental, and chemical
                        analysis since 2013.
                    </motion.p>

                </motion.div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 right-8 flex gap-1">
                <button
                    onClick={prevSlide}
                    className="size-12 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/20 transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={nextSlide}
                    className="size-12 bg-borneo-green text-white flex items-center justify-center border border-borneo-green-dark transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
}
