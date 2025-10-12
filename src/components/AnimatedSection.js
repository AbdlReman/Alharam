import React from 'react';
import { useRef, useEffect, useState } from 'react';

// Animated Section Wrapper
export const AnimatedSection = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay * 1000);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'}`}
      style={{
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Animated Text Component
export const AnimatedText = ({ children, className, delay = 0, type = "h2" }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay * 1000);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const Component = type;

  return (
    <div
      ref={ref}
      className={`${isInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${delay}s`
      }}
    >
      <Component className={className}>{children}</Component>
    </div>
  );
};

// Animated Button Component
export const AnimatedButton = ({ children, className, onClick, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay * 1000);
  }, [delay]);

  return (
    <button
      className={`${className} ${isVisible ? 'animate-fade-in-scale' : 'opacity-0 scale-90'}`}
      onClick={onClick}
      style={{
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
        transitionDelay: `${delay}s`
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.transition = 'transform 0.2s ease-out';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.transition = 'transform 0.2s ease-out';
      }}
      onMouseDown={(e) => {
        e.target.style.transform = 'scale(0.95)';
      }}
      onMouseUp={(e) => {
        e.target.style.transform = 'scale(1.05)';
      }}
    >
      {children}
    </button>
  );
};

// Parallax Background Component
export const ParallaxBackground = ({ children, speed = 0.5 }) => {
  const ref = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const scrollProgress = (window.scrollY - elementTop) / (window.innerHeight + elementHeight);
        const y = scrollProgress * -100 * speed;
        ref.current.style.transform = `translateY(${y}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className="parallax-background"
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

// Floating Animation Component
export const FloatingElement = ({ children, className, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), delay * 1000);
  }, [delay]);

  return (
    <div
      className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
      style={{
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${delay}s`
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-5px)';
        e.target.style.transition = 'transform 0.3s ease-out';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.transition = 'transform 0.3s ease-out';
      }}
    >
      {children}
    </div>
  );
};

// Staggered Grid Animation
export const StaggeredGrid = ({ children, className, staggerDelay = 0.1 }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const totalChildren = React.Children.count(children);
          const newVisibleItems = [];
          
          for (let i = 0; i < totalChildren; i++) {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, i]);
            }, (i * staggerDelay + 0.2) * 1000);
          }
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [children, staggerDelay]);

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`${visibleItems.includes(index) ? 'animate-fade-in-up' : 'opacity-0 translate-y-5 scale-90'}`}
          style={{
            transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// Gradient Text Animation
export const GradientText = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? 'animate-gradient-text' : 'opacity-0'}`}
      style={{
        background: "linear-gradient(90deg, #2c3e50, #495057, #667eea, #2c3e50)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        transition: 'opacity 0.8s ease-out',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Scroll Triggered Animation
export const ScrollTriggeredAnimation = ({ children, className, threshold = 0.1 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold, rootMargin: "0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? 'animate-slide-in-left' : 'opacity-0 -translate-x-12'}`}
      style={{
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
      }}
    >
      {children}
    </div>
  );
};

// Hover Card Animation
export const HoverCard = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className={`${className} ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'}`}
      style={{
        transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
        e.target.style.transition = 'transform 0.3s ease-out';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
        e.target.style.transition = 'transform 0.3s ease-out';
      }}
      onMouseDown={(e) => {
        e.target.style.transform = 'translateY(-10px) scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.target.style.transform = 'translateY(-10px) scale(1.02)';
      }}
    >
      {children}
    </div>
  );
};

// Loading Spinner Animation
export const LoadingSpinner = ({ size = 50, color = "#667eea" }) => {
  return (
    <div
      className="animate-spin"
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%"
      }}
    />
  );
};

// Fade In On Scroll
export const FadeInOnScroll = ({ children, className, direction = "up", delay = 0 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay * 1000);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up": return 'translateY(12px)';
      case "down": return 'translateY(-12px)';
      case "left": return 'translateX(12px)';
      case "right": return 'translateX(-12px)';
      default: return 'translateY(12px)';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{
        transform: isInView ? 'none' : getInitialTransform(),
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

// Scale In Animation
export const ScaleIn = ({ children, className, delay = 0, scale = 0.8 }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsInView(true), delay * 1000);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? 'animate-scale-in' : 'opacity-0'}`}
      style={{
        transform: isInView ? 'scale(1)' : `scale(${scale})`,
        transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
        transitionDelay: `${delay}s`
      }}
    >
      {children}
    </div>
  );
};

export default {
  AnimatedSection,
  AnimatedText,
  AnimatedButton,
  ParallaxBackground,
  FloatingElement,
  StaggeredGrid,
  GradientText,
  ScrollTriggeredAnimation,
  HoverCard,
  LoadingSpinner,
  FadeInOnScroll,
  ScaleIn
};