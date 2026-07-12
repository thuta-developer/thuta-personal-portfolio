import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';

const Hero = () => {
  const sectionRef = useRef();

  useLayoutEffect(() => {

    const titles = sectionRef.current.querySelectorAll('.hero-title');
    const dividers = sectionRef.current.querySelectorAll('.hero-divider');
    const subtexts = sectionRef.current.querySelectorAll('.hero-subtext');
    const bgText = sectionRef.current.querySelector('.hero-bg-text');

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(dividers, {
      scaleX: 1,
      duration: 1.5,
      ease: "expo.inOut",
      stagger: 0.2
    });

    titles.forEach(title => {
      const split = new SplitType(title, { types: 'chars, words' });

      tl.fromTo(split.chars,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.02
        },
        "-=1.2"
      );
    });

    tl.fromTo(subtexts,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 0.6,
        duration: 1,
        ease: "power3.out",
        stagger: 0.1
      },
      "-=0.8"
    );

    tl.fromTo(bgText,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 0.02,
        duration: 2.5,
        ease: "expo.out"
      },
      "0"
    );

  }, []);

  return (
    <section ref={sectionRef} data-bg="#f5f5f0" className="relative w-full h-screen bg-[#f5f5f0] flex flex-col justify-between px-5 md:px-12 pt-24 pb-10 md:pb-16 overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-1/4 left-0 md:top-1/2 md:left-[55%] md:-translate-x-1/2 md:-translate-y-1/2 w-full pointer-events-none z-0">
        <h2 className="hero-bg-text text-[28vw] md:text-[22vw] font-black text-[#6366f1]/[0.03] leading-none uppercase tracking-tighter">
          EXECUTE
        </h2>
      </div>

      {/* Top Meta Info */}
      <div className="relative z-10 flex flex-col gap-2">
        <div className="hero-divider w-full h-[1px] bg-[#6366f1]/20 scale-x-0 origin-left mb-2" />
        <div className="flex justify-between items-center hero-subtext text-[10px] uppercase font-bold tracking-widest font-mono text-[#1a1a2e]/60">
          <span>Yangon, Myanmar &bull; Remote Available</span>
          <span className="text-[#6366f1] animate-pulse">Open to Full-Time Roles</span>
        </div>
      </div>

      {/* Main Hero Typography */}
      <div className="relative z-10 w-full flex flex-col gap-8 md:gap-0">
        {/* Row 1 */}
        <div className="w-full">
          <div className="hero-divider w-full h-[1px] bg-[#6366f1]/20 scale-x-0 origin-left mb-4 md:mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
            <div className="overflow-hidden order-1">
              <h1 className="hero-title text-[15vw] md:text-[9.5vw] leading-[0.8] font-black uppercase tracking-tighter text-[#1a1a2e]">
                FULL-STACK
              </h1>
            </div>
            <span className="hero-subtext text-[10px] md:text-xs uppercase tracking-widest order-2 font-bold font-mono text-[#1a1a2e]/40">
              (01) INTRODUCTION
            </span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full md:mt-10">
          <div className="hero-divider w-full h-[1px] bg-[#6366f1]/20 scale-x-0 origin-left mb-4 md:mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:navigate-row">
            <div className="overflow-hidden">
              <h1 className="hero-title text-[15vw] md:text-[9.5vw] leading-[0.8] font-black uppercase tracking-tighter text-[#1a1a2e]">
                ENGINEER
              </h1>
            </div>

            <p className="hero-subtext max-w-[280px] md:max-w-xs text-[11px] md:text-[12px] uppercase leading-relaxed tracking-wider font-medium text-left md:text-right text-[#1a1a2e]/60">
              Specializing in robust architectures, system optimization, and clean architectural code.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;