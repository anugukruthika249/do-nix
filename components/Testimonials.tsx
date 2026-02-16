
import React, { useState, useEffect, useCallback, useRef } from 'react';

const STORIES = [
  {
    id: 1,
    name: "Ananya Iyer",
    role: "Emergency Patient",
    location: "Mumbai, Maharashtra",
    quote: "During my emergency surgery at Apollo, there was an unexpected shortage of O-negative blood. Donix connected us to a donor in Matunga within 15 minutes. Truly a lifesaver.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 2,
    name: "Rohan Malhotra",
    role: "Frequent Donor",
    location: "Bengaluru, Karnataka",
    quote: "I always wanted to help but didn't know where the urgent need was. Now, Donix alerts me whenever someone in Indiranagar needs help. It's the most fulfilling app on my phone.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150"
  },
  {
    id: 3,
    name: "Dr. Sameer Deshmukh",
    role: "Trauma Surgeon",
    location: "Pune, Maharashtra",
    quote: "In trauma care, the first hour is golden. Donix has drastically reduced our blood procurement time by activating local micro-communities of verified donors instantly.",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&h=150"
  }
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animating, setAnimating] = useState(false);
  const autoPlayRef = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % STORIES.length);
      setAnimating(false);
    }, 300);
  }, []);

  const prevSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    } else {
      autoPlayRef.current = window.setInterval(nextSlide, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-animate {
          animation: fadeInSlide 0.5s ease-out forwards;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Stories of Impact</h2>
          <p className="text-slate-600">Real stories from the Donix community across India.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-4 rounded-full bg-white border border-slate-100 shadow-xl text-slate-400 hover:text-red-600 transition-all hover:scale-110 active:scale-95"
            aria-label="Previous story"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-4 rounded-full bg-white border border-slate-100 shadow-xl text-slate-400 hover:text-red-600 transition-all hover:scale-110 active:scale-95"
            aria-label="Next story"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Content */}
          <div 
            className="bg-slate-50 rounded-[2.5rem] p-8 md:p-16 relative shadow-inner border border-slate-100 overflow-hidden cursor-default"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Quote Icon Background */}
            <div className="absolute top-10 left-10 text-red-100/50 scale-[5]">
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H12.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H7.0166C6.46432 8 6.0166 8.44772 6.0166 9V12C6.0166 12.5523 5.56889 13 5.0166 13H3.0166V21H5.0166Z" />
              </svg>
            </div>

            <div className={`relative z-10 flex flex-col items-center text-center transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100 slide-animate'}`}>
              <p className="text-xl md:text-3xl font-medium text-slate-800 italic leading-relaxed mb-12 max-w-2xl">
                "{STORIES[currentIndex].quote}"
              </p>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full blur-md opacity-20 animate-pulse"></div>
                  <img 
                    src={STORIES[currentIndex].image} 
                    alt={STORIES[currentIndex].name}
                    className="relative w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <div className="font-black text-xl text-slate-900">{STORIES[currentIndex].name}</div>
                  <div className="text-sm text-red-600 font-bold uppercase tracking-widest">{STORIES[currentIndex].role}</div>
                  <div className="text-xs text-slate-400 font-medium flex items-center justify-center md:justify-start gap-1 mt-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {STORIES[currentIndex].location}
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-play Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1.5 bg-slate-200 w-full">
              <div 
                className={`h-full bg-red-600 transition-all duration-[5000ms] linear ${isPaused ? 'w-0 opacity-0' : 'w-full'}`}
                key={currentIndex}
              ></div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-10">
            {STORIES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrentIndex(idx); setIsPaused(true); }}
                className={`h-2.5 transition-all rounded-full ${
                  currentIndex === idx 
                    ? 'w-10 bg-red-600 shadow-md shadow-red-200' 
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};