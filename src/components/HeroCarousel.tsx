import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, ArrowRight, Package, Wrench, Activity, LineChart } from 'lucide-react';
import { HERO_SLIDES } from '../data/content.ts';
import { getNextSlideIndex, getPrevSlideIndex } from '../utils/logic.ts';

interface HeroCarouselProps {
  onOpenConsultation: (preselectedService?: string) => void;
  onOpenServiceDetail: (serviceId: string) => void;
}

const SLIDE_DURATION_MS = 4000;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({
  onOpenConsultation,
  onOpenServiceDetail,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100

  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  const currentSlideRef = useRef(currentSlide);
  currentSlideRef.current = currentSlide;

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
    startTimeRef.current = performance.now();
  }, []);

  const handleNext = useCallback(() => {
    goToSlide(getNextSlideIndex(currentSlideRef.current, totalSlides));
  }, [totalSlides, goToSlide]);

  const handlePrev = useCallback(() => {
    goToSlide(getPrevSlideIndex(currentSlideRef.current, totalSlides));
  }, [totalSlides, goToSlide]);

  const togglePlayPause = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        const alreadyElapsed = (progress / 100) * SLIDE_DURATION_MS;
        startTimeRef.current = performance.now() - alreadyElapsed;
      }
      return next;
    });
  };

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      // Swiped left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped right -> Prev
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  // High-performance progress loop using requestAnimationFrame
  useEffect(() => {
    startTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (isPlayingRef.current && startTimeRef.current !== null) {
        const elapsed = now - startTimeRef.current;
        const currentProgress = Math.min(100, (elapsed / SLIDE_DURATION_MS) * 100);
        setProgress(currentProgress);

        if (elapsed >= SLIDE_DURATION_MS) {
          startTimeRef.current = now;
          setProgress(0);
          setCurrentSlide((prev) => getNextSlideIndex(prev, totalSlides));
        }
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [totalSlides]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Pause on visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPlaying(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const getSlideIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Package className="w-4 h-4" />;
      case 1:
        return <Wrench className="w-4 h-4" />;
      case 2:
        return <Activity className="w-4 h-4" />;
      case 3:
      default:
        return <LineChart className="w-4 h-4" />;
    }
  };

  const getTargetServiceId = (index: number) => {
    switch (index) {
      case 0:
      case 1:
        return 'maximo-migration';
      case 2:
        return 'cloud-infrastructure';
      case 3:
      default:
        return 'tririga-support';
    }
  };

  return (
    <section
      id="hero-carousel-section"
      className="relative bg-[#F2F2F2] border-b border-black/10 overflow-hidden"
      aria-label="Enterprise Asset Management Carousel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[560px] items-stretch">
        {/* Text Slides & Controls Column */}
        <div className="order-2 lg:order-1 lg:col-span-5 px-4 sm:px-6 lg:pl-14 lg:pr-10 py-8 sm:py-12 flex flex-col justify-between z-10">
          <div className="relative min-h-[290px] sm:min-h-[320px] lg:min-h-[360px] flex items-center">
            {HERO_SLIDES.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.id}
                  className={`w-full transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'opacity-100 translate-x-0 relative pointer-events-auto z-10'
                      : 'opacity-0 translate-x-6 absolute inset-0 pointer-events-none z-0'
                  }`}
                  aria-hidden={!isActive}
                >
                  {/* Tag Pill */}
                  <div
                    onClick={() => onOpenServiceDetail(getTargetServiceId(index))}
                    className="inline-flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4 group cursor-pointer"
                  >
                    <span className="fluent-icon-box !w-8 sm:!w-9 !h-8 sm:!h-9 bg-white shadow-xs group-hover:bg-[#0067B8] group-hover:text-white transition-all duration-300">
                      {getSlideIcon(index)}
                    </span>
                    <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#0067B8] group-hover:underline">
                      {slide.tagNumber} / {slide.category}
                    </span>
                  </div>

                  {/* Heading with responsive fluid typography */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-semibold leading-[1.14] tracking-tight text-[#1B1A19] mb-3 sm:mb-4">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="text-sm sm:text-[15px] lg:text-[16px] text-[#605E5C] leading-relaxed mb-6 sm:mb-8 max-w-xl">
                    {slide.description}
                  </p>

                  {/* Buttons: stacked on very small mobile, row on tablet/desktop */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
                    <button
                      onClick={() => onOpenConsultation(slide.title)}
                      className="ms-btn-primary justify-center px-5 sm:px-6 py-2.5 sm:py-3 rounded-[4px] text-xs sm:text-sm font-semibold cursor-pointer shadow-xs text-center"
                      aria-label={slide.primaryCtaText}
                    >
                      <span>{slide.primaryCtaText}</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>

                    <button
                      onClick={() => onOpenServiceDetail(getTargetServiceId(index))}
                      className="ms-link justify-center sm:justify-start px-2 py-2 sm:py-3 text-xs sm:text-sm font-semibold cursor-pointer group text-center"
                      aria-label={slide.secondaryCtaText}
                    >
                      <span className="group-hover:text-[#0067B8] transition-colors">{slide.secondaryCtaText}</span>
                      <ChevronRight className="icon-chevron w-4 h-4 shrink-0" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Microsoft-Style Carousel Controls */}
          <div className="pt-5 sm:pt-6 border-t border-black/10 flex items-center justify-between gap-3 sm:gap-4 mt-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                id="carousel-play-pause"
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pause Carousel' : 'Play Carousel'}
                className="fluent-icon-box !w-8 sm:!w-9 !h-8 sm:!h-9 bg-white shadow-xs cursor-pointer hover:bg-[#0067B8] hover:text-white transition-all duration-300"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                id="carousel-prev"
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="fluent-icon-box !w-8 sm:!w-9 !h-8 sm:!h-9 bg-white shadow-xs cursor-pointer hover:bg-[#0067B8] hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                id="carousel-next"
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="fluent-icon-box !w-8 sm:!w-9 !h-8 sm:!h-9 bg-white shadow-xs cursor-pointer hover:bg-[#0067B8] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* 4 Interactive Slide Progress Bars */}
            <div
              className="flex items-center gap-2 sm:gap-2.5 flex-1 max-w-[200px] sm:max-w-[260px]"
              role="tablist"
              aria-label="Slide Selection Indicators"
            >
              {HERO_SLIDES.map((slide, idx) => {
                const isActive = idx === currentSlide;
                const isCompleted = idx < currentSlide;
                let fillPercent = 0;
                if (isCompleted) {
                  fillPercent = 100;
                } else if (isActive) {
                  fillPercent = progress;
                }

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Jump to slide ${idx + 1}: ${slide.title}`}
                    className="flex-1 h-1.5 sm:h-2 bg-black/15 hover:bg-black/25 rounded-full overflow-hidden transition-all duration-200 cursor-pointer relative"
                  >
                    <div
                      className="h-full bg-[#0067B8] transition-all duration-75"
                      style={{
                        width: `${fillPercent}%`,
                        willChange: 'width',
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Photography Gallery Column: responsive height on mobile, full height on desktop */}
        <div className="order-1 lg:order-2 lg:col-span-7 h-[250px] sm:h-[340px] lg:h-auto min-h-[250px] lg:min-h-[560px] relative overflow-hidden bg-[#1B1A19]">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-all duration-750 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? 'opacity-100 scale-100 pointer-events-auto z-10'
                    : 'opacity-0 scale-105 pointer-events-none z-0'
                }`}
                aria-hidden={!isActive}
              >
                <img
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />

                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Floating Bottom Telemetry Badge with responsive padding & typography */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 bg-white/95 backdrop-blur-md p-2.5 sm:p-4 rounded-[6px] border border-black/10 flex items-center justify-between shadow-xl">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <span className="fluent-icon-box !w-7 sm:!w-9 !h-7 sm:!h-9 bg-white text-[#0067B8] shadow-xs shrink-0">
                      {getSlideIcon(index)}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs font-bold text-[#0067B8] uppercase tracking-wider truncate">
                        {slide.badgeModule}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#1B1A19] truncate">
                        {slide.badgeDetail}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold text-[#0067B8] bg-[#0067B8]/10 px-2 sm:px-3 py-1 rounded-[4px] shrink-0 ml-2">
                    0{index + 1} / 0{totalSlides}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
