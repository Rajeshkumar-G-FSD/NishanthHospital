import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom lightweight cn implementation for styling merges
const cn = (...classes: (string | undefined | null | boolean)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export interface TeamCarouselProps {
  /** Array of team members */
  members: TeamMember[];
  /** Title displayed above the carousel */
  title?: string;
  /** Title font size */
  titleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Title color */
  titleColor?: string;
  /** Background color or gradient. Overrides the default 'bg-background' class. */
  background?: string;
  /** Card width in pixels */
  cardWidth?: number;
  /** Card height in pixels */
  cardHeight?: number;
  /** Card border radius */
  cardRadius?: number;
  /** Enable/disable navigation arrows */
  showArrows?: boolean;
  /** Enable/disable dots indicator */
  showDots?: boolean;
  /** Enable/disable keyboard navigation */
  keyboardNavigation?: boolean;
  /** Enable/disable touch/swipe navigation */
  touchNavigation?: boolean;
  /** Animation duration in milliseconds */
  animationDuration?: number;
  /** Auto-play interval in milliseconds (0 to disable) */
  autoPlay?: number;
  /** Pause auto-play on hover */
  pauseOnHover?: boolean;
  /** Number of visible cards on each side */
  visibleCards?: number;
  /** Scale factor for side cards */
  sideCardScale?: number;
  /** Opacity for side cards */
  sideCardOpacity?: number;
  /** Apply grayscale filter to side cards */
  grayscaleEffect?: boolean;
  /** Custom className for container */
  className?: string;
  /** Custom className for cards */
  cardClassName?: string;
  /** Custom className for title */
  titleClassName?: string;
  /** Member info position */
  infoPosition?: 'bottom' | 'overlay' | 'none';
  /** Info text color */
  infoTextColor?: string;
  /** Info background */
  infoBackground?: string;
  /** Callback when active member changes */
  onMemberChange?: (member: TeamMember, index: number) => void;
  /** Callback when card is clicked */
  onCardClick?: (member: TeamMember, index: number) => void;
  /** Initial active index */
  initialIndex?: number;
}

export const TeamCarousel: React.FC<TeamCarouselProps> = ({
  members,
  title = "OUR TEAM",
  titleSize = "2xl",
  titleColor = "rgba(244, 63, 94, 1)", // Updated text color to match the rose theme beautifully
  background,
  cardWidth = 280,
  cardHeight = 380,
  cardRadius = 20,
  showArrows = true,
  showDots = true,
  keyboardNavigation = true,
  touchNavigation = true,
  animationDuration = 800,
  autoPlay = 0,
  pauseOnHover = true,
  visibleCards = 2,
  sideCardScale = 0.9,
  sideCardOpacity = 0.8,
  grayscaleEffect = true,
  className,
  cardClassName,
  titleClassName,
  infoPosition = "bottom",
  infoTextColor = "rgb(243, 244, 246)", // Better contrast text in dark layout
  infoBackground = "transparent",
  onMemberChange,
  onCardClick,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0); // 0: no movement, 1: next, -1: prev
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalMembers = members.length;

  const paginate = useCallback(
    (newDirection: number) => {
      if (totalMembers === 0) return;
      setDirection(newDirection);
      const nextIndex = (currentIndex + newDirection + totalMembers) % totalMembers;
      setCurrentIndex(nextIndex);
      onMemberChange?.(members[nextIndex], nextIndex);
    },
    [currentIndex, totalMembers, members, onMemberChange]
  );

  const wrapIndex = (index: number) => {
    return (index + totalMembers) % totalMembers;
  };

  const calculatePosition = (index: number) => {
    const activeIndex = currentIndex;
    const diff = wrapIndex(index - activeIndex);

    if (diff === 0) return 'center';
    if (diff <= visibleCards) return `right-${diff}`;
    if (diff >= totalMembers - visibleCards) return `left-${totalMembers - diff}`;
    return 'hidden';
  };

  // Explicitly typing without explicit generic to be fully compatible with compiled framer-motion configs
  const getVariantStyles = (position: string): any => {
    const transition = {
      duration: animationDuration / 1000,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    };

    switch (position) {
      case 'center':
        return {
          zIndex: 10,
          opacity: 1,
          scale: 1.1,
          x: 0,
          filter: 'grayscale(0%)',
          pointerEvents: 'auto' as const,
          transition,
        };
      case 'right-1':
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: cardWidth * 0.7,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto' as const,
          transition,
        };
      case 'right-2':
        return {
          zIndex: 1,
          opacity: sideCardOpacity * 0.7,
          scale: sideCardScale * 0.9,
          x: cardWidth * 1.4,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto' as const,
          transition,
        };
      case 'left-1':
        return {
          zIndex: 5,
          opacity: sideCardOpacity,
          scale: sideCardScale,
          x: -cardWidth * 0.7,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto' as const,
          transition,
        };
      case 'left-2':
        return {
          zIndex: 1,
          opacity: sideCardOpacity * 0.7,
          scale: sideCardScale * 0.9,
          x: -cardWidth * 1.4,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          pointerEvents: 'auto' as const,
          transition,
        };
      default:
        return {
          zIndex: 0,
          opacity: 0,
          scale: 0.8,
          x: direction > 0 ? cardWidth * (visibleCards + 1) : -cardWidth * (visibleCards + 1),
          pointerEvents: 'none' as const,
          filter: grayscaleEffect ? 'grayscale(100%)' : 'grayscale(0%)',
          transition,
        };
    }
  };

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay > 0) {
      interval = setInterval(() => {
        paginate(1);
      }, autoPlay);
    }

    const carouselContainer = document.getElementById('team-carousel-container');

    const handleMouseEnter = () => {
      if (pauseOnHover && autoPlay > 0) clearInterval(interval);
    };

    const handleMouseLeave = () => {
      if (pauseOnHover && autoPlay > 0) {
        interval = setInterval(() => {
          paginate(1);
        }, autoPlay);
      }
    };

    if (carouselContainer && pauseOnHover && autoPlay > 0) {
      carouselContainer.addEventListener('mouseenter', handleMouseEnter);
      carouselContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(interval);
      if (carouselContainer && pauseOnHover && autoPlay > 0) {
        carouselContainer.removeEventListener('mouseenter', handleMouseEnter);
        carouselContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [autoPlay, paginate, pauseOnHover]);

  // Keyboard navigation
  useEffect(() => {
    if (!keyboardNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [keyboardNavigation, paginate]);

  // Touch navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!touchNavigation) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchNavigation) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchNavigation) return;

    const swipeThreshold = 50;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        paginate(1);
      } else {
        paginate(-1);
      }
    }
  };

  const titleSizeClasses = {
    sm: 'text-3xl sm:text-4xl',
    md: 'text-4xl sm:text-5xl',
    lg: 'text-5xl sm:text-6xl',
    xl: 'text-6xl sm:text-7xl',
    '2xl': 'text-7xl sm:text-8xl',
  };

  return (
    <div
      id="team-carousel-container"
      className={cn(`w-full py-24 flex flex-col items-center justify-center overflow-hidden relative bg-slate-950 border-t border-white/5`, className)}
      style={{ background: background }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Title */}
      {title && (
        <div className="w-full text-center px-6 mb-12 relative z-10">
          <h2
            className={cn(
              "font-serif font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-amber-200 inline-block relative",
              "text-3xl sm:text-4xl md:text-5xl",
              titleClassName
            )}
          >
            {title}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded-full" />
          </h2>
        </div>
      )}

      {/* Carousel Container */}
      <div
        className="w-full max-w-6xl relative mt-6"
        style={{
          height: cardHeight + 100,
          perspective: '1000px',
        }}
      >
        {/* Navigation Arrows */}
        {showArrows && (
          <>
            <motion.button
              onClick={() => paginate(-1)}
              className="absolute left-5 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900/90 hover:text-rose-400 border border-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center z-25 transition-all duration-300 hover:scale-110 cursor-pointer"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() => paginate(1)}
              className="absolute right-5 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900/90 hover:text-rose-400 border border-white/10 text-white w-10 h-10 rounded-full flex items-center justify-center z-25 transition-all duration-300 hover:scale-110 cursor-pointer"
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Cards Track */}
        <div
          className="w-full h-full flex justify-center items-center relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence initial={false} custom={direction}>
            {members.map((member, index) => {
              const position = calculatePosition(index);
              const isCurrent = index === currentIndex;

              if (position === 'hidden' && !isCurrent) return null;

              return (
                <motion.div
                  key={member.id}
                  className={cn(
                    "absolute overflow-hidden shadow-2xl cursor-pointer border border-white/10 bg-slate-900",
                    cardClassName
                  )}
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    borderRadius: cardRadius,
                    top: '50%',
                    left: '50%',
                    marginLeft: -cardWidth / 2,
                    marginTop: -cardHeight / 2,
                  }}
                  initial={getVariantStyles('hidden')}
                  animate={getVariantStyles(position)}
                  exit={getVariantStyles('hidden')}
                  onClick={() => {
                    if (!isCurrent) {
                      const newDirection = index > currentIndex ? 1 : -1;
                      setDirection(newDirection);
                      setCurrentIndex(index);
                      onMemberChange?.(members[index], index);
                    }
                    onCardClick?.(member, index);
                  }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Overlay Info */}
                  {infoPosition === 'overlay' && (
                    <div
                      className="absolute bottom-0 left-0 right-0 p-4 text-center"
                      style={{
                        background: infoBackground || "linear-gradient(transparent, rgba(15,23,42,0.95))",
                        color: infoTextColor,
                      }}
                    >
                      <h3 className="text-lg font-bold text-white">{member.name}</h3>
                      <p className="text-sm text-slate-300 font-medium">{member.role}</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Member Info (Bottom) */}
      {infoPosition === 'bottom' && members[currentIndex] && (
        <motion.div
          key={members[currentIndex].id + "-info"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-10 px-6 max-w-xl"
        >
          <h2
            className="text-3xl font-bold mb-3 relative inline-block text-white"
          >
            {members[currentIndex].name}
            <span
              className="absolute top-full left-0 w-full h-[2px] mt-2 bg-rose-500"
            />
          </h2>
          <p
            className="text-lg font-medium uppercase tracking-wider text-amber-400 mt-2"
          >
            {members[currentIndex].role}
          </p>
          {members[currentIndex].bio && (
            <p className="text-sm mt-4 text-slate-300 leading-relaxed font-sans font-medium">
              {members[currentIndex].bio}
            </p>
          )}
        </motion.div>
      )}

      {/* Dots Indicator */}
      {showDots && (
        <div className="flex justify-center gap-3 mt-15">
          {members.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                if (index !== currentIndex) {
                  const newDirection = index > currentIndex ? 1 : -1;
                  setDirection(newDirection);
                  setCurrentIndex(index);
                  onMemberChange?.(members[index], index);
                }
              }}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer",
                index === currentIndex
                  ? "scale-125 bg-rose-500"
                  : "bg-white/20 hover:bg-white/40"
              )}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCarousel;
