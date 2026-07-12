import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Transition from "../components/Transition";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function IdentitySection() {
  const sectionRef = useRef(null);
  const bigTextRef = useRef(null);
  const leftContentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Texts & Button Entrance Animation
      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // Image Reveal Animation
      gsap.from(".reveal-image", {
        y: 60,
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: leftContentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Background Scrolling Text
      gsap.to(bigTextRef.current, {
        x: "-30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Transition>
      <section
        ref={sectionRef}
        data-bg="#f5f5f0"
        className="relative min-h-screen bg-[#f5f5f0] flex items-center py-20 md:py-32 overflow-hidden"
      >
        {/* Background Big Text */}
        <h1
          ref={bigTextRef}
          className="absolute top-1/3 left-0 text-[18vw] font-black text-[#6366f1]/[0.025] whitespace-nowrap uppercase leading-none pointer-events-none select-none will-change-transform"
        >
          Full Stack Developer Digital Solutions Architectural Code
        </h1>

        <div className="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Text Contents */}
            <div ref={leftContentRef} className="lg:col-span-7 order-2 lg:order-1">
              {/* Section Index */}
              <div className="flex items-center gap-4 mb-6 reveal-text">
                <span className="text-[#6366f1] font-mono text-sm font-bold tracking-[0.3em] uppercase">
                  01 // About Me
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#6366f1]/30 to-transparent"></div>
              </div>
              
              {/* Professional Headline */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1a1a2e] tracking-tight leading-[1.15] mb-6 reveal-text">
                Engineering scalable <br />
                <span className="italic font-serif font-light text-[#6366f1]/60">backends</span> with <br />
                seamless digital experiences.
              </h2>
              
              {/* Profile Text */}
              <p className="text-base md:text-lg text-[#1a1a2e]/70 max-w-xl leading-relaxed font-normal mb-10 reveal-text">
                I am a Full-Stack Developer specializing in building robust, production-ready backend 
                architectures using Python and Django, while seamlessly connecting them with high-performance 
                frontend interfaces. Focused on code efficiency, scalable system design, and continuous integration.
              </p>
              
              {/* Stats Row */}
              <div className="flex gap-8 md:gap-12 mb-10 reveal-text">
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-[#6366f1]">3+</span>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a2e]/40 mt-1 font-bold">Years Exp</p>
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-[#6366f1]">20+</span>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a2e]/40 mt-1 font-bold">Projects</p>
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-bold text-[#6366f1]">100%</span>
                  <p className="text-[10px] uppercase tracking-widest text-[#1a1a2e]/40 mt-1 font-bold">Commitment</p>
                </div>
              </div>
              
              {/* Call to Action Button */}
              <div className="reveal-text">
                <button className="group relative px-8 py-4 bg-[#6366f1] overflow-hidden rounded-full transition-all duration-300 hover:bg-[#4f46e5] shadow-lg shadow-[#6366f1]/25 hover:shadow-xl hover:shadow-[#6366f1]/30">
                  <span className="relative z-10 text-white uppercase font-mono tracking-wider text-xs font-bold">
                    Explore Portfolio
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column: Image Wrapper */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="reveal-image relative w-full max-w-[400px] aspect-[4/5] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-neutral-200">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#6366f1]/20 to-transparent z-10" />
                
                <img
                  src="/human-2.jpg"
                  alt="Professional Portrait"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out scale-105"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </Transition>
  );
}