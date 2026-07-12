import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Transition from '../components/Transition';

gsap.registerPlugin(ScrollTrigger);

const ProcessSection = () => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  const steps = [
    { step: "01", title: "Understand", desc: "Clarify requirements, goals, and constraints before writing code." },
    { step: "02", title: "Plan", desc: "Break down features, choose the right tools, and define clear milestones." },
    { step: "03", title: "Architect", desc: "Design clean component structures, data flow, and scalable systems." },
    { step: "04", title: "Build", desc: "Implement core features first, refactor as needed, keep code clean." },
    { step: "05", title: "Test", desc: "Manual testing, edge cases, responsive checks, fix bugs early." },
    { step: "06", title: "Deliver", desc: "Deploy, monitor, collect feedback, and continuously improve." }
  ];

  useEffect(() => {
    const sections = sectionRefs.current;

    sections.forEach((section, i) => {
      const line = section.querySelector('.step-line');
      const content = section.querySelector('.step-content');

      gsap.fromTo(content,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          }
        }
      );

      gsap.to(line, {
        scaleY: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <Transition>
      <div ref={containerRef} data-bg="#0a0a0a" className="bg-[#0a0a0a] text-white min-h-screen py-24 md:py-32 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-20 md:mb-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[#6366f1] font-mono text-xs font-bold tracking-[0.3em] uppercase">Process</span>
              <div className="h-[1px] w-16 bg-[#6366f1]/30" />
            </div>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-4">
              How I <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">Work</span>
            </h2>
            <p className="text-white/40 max-w-xl text-sm md:text-base font-light leading-relaxed">
              A clean, focused approach to building reliable software — from idea to launch.
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[18px] md:left-6 top-0 bottom-0 w-[1px] bg-white/[0.06]" />

            {steps.map((item, i) => (
              <div key={i} ref={el => sectionRefs.current[i] = el} className="relative flex gap-6 md:gap-10 pb-16 md:pb-20 last:pb-0">
                {/* Circle + Line */}
                <div className="flex flex-col items-center">
                  <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 flex items-center justify-center flex-shrink-0 z-10">
                    <span className="text-[#6366f1] font-mono text-xs md:text-sm font-bold">{item.step}</span>
                  </div>
                  <div className="step-line w-[1px] flex-1 bg-[#6366f1]/20 origin-top scale-y-0 mt-2" />
                </div>

                {/* Content */}
                <div className="step-content flex-1 pt-2 md:pt-3">
                  <h3 className="text-xl md:text-3xl font-bold mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-white/[0.05] text-center">
            <p className="text-white/30 text-sm mb-6 font-light">Interested in working together?</p>
            <a
              href="mailto:thuta.developer@gmail.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#6366f1] hover:bg-[#4f46e5] rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300"
            >
              Get in Touch →
            </a>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default ProcessSection;