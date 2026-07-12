import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Transition from '../components/Transition';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const StackSection = () => {
  const containerRef = useRef(null);

  // Expanded skills list with your new backend & learning stack
const skills = [
    { name: "React", level: "Advanced", color: "#61DAFB" },
    // React Native ကို Frontend/Mobile စုပေးထားဖို့ React အောက်မှာ ကပ်ထည့်ထားပါတယ်
    { name: "React Native", level: "Mobile App", color: "#61DAFB" },
    { name: "GSAP", level: "Animation", color: "#88CE02" },
    { name: "Tailwind", level: "Styling", color: "#06B6D4" },
    { name: "Next.js", level: "Framework", color: "#FFFFFF" },
    
    // Backend Ecosystem
    { name: "Python", level: "Backend / Core", color: "#3776AB" },
    { name: "Django", level: "Web Framework", color: "#092E20" },
    { name: "DRF", level: "REST API", color: "#A30000" },
    { name: "FastAPI", level: "Async API", color: "#059669" },
    
    // Cloud, Server & DevOps (အသစ်ထည့်ထားတာတွေပါ)
    { name: "AWS", level: "Cloud Infra", color: "#FF9900" },
    { name: "DigitalOcean", level: "Cloud Hosting", color: "#0080FF" },
    { name: "Docker", level: "DevOps", color: "#2496ED" },
    { name: "Redis", level: "Caching", color: "#DC382D" },
    
    // Language အသစ်
    { name: "Java", level: "Next-Up", color: "#007396" }
  ];
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Skill Cards Animation with Will-Change for performance optimization
      gsap.from(".skill-card", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: {
          amount: 0.6, // Stagger time ကို နည်းနည်းလျှော့ပြီး Smooth ဖြစ်အောင် လုပ်ထားတယ်
          from: "start"
        },
        ease: "power3.out", // Power4 ထက်စာရင် Power3 က low-end devices တွေမှာ ပို smooth ဖြစ်တယ်
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 90%",
          toggleActions: "play none none none",
          // Mobile performance အတွက် fastScrollEnd ကို သုံးလို့ရပါတယ်
          fastScrollEnd: true,
        }
      });

      // Header Text Animation
      gsap.from(".stack-header h1, .stack-header h2", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Transition>
      <section ref={containerRef} data-bg="#0a0a0a" className="bg-[#0a0a0a] min-h-screen py-16 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">

          <div className="stack-header mb-16 md:mb-24">
            <h2 className="text-white/30 uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4">
              Core Stack & Learning
            </h2>
            <h1 className="text-5xl md:text-8xl text-white font-medium tracking-tighter leading-none mb-2">
              Technologies
            </h1>
            <h1 className="text-5xl md:text-8xl italic font-serif text-neutral-500 tracking-tighter leading-none">
              I use & explore.
            </h1>
          </div>

          {/* Grid Layout Fix (Responsive Columns for more cards) */}
          <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card group relative p-6 bg-neutral-900/30 border border-white/[0.05] rounded-[2rem] overflow-hidden flex flex-col justify-between min-h-[170px] will-change-transform"
                style={{ contentVisibility: 'auto' }} // Browser Rendering Performance တက်စေဖို့
              >
                {/* Glow on Hover - Optimized with CSS transitions */}
                <div
                  className="absolute -right-6 -top-6 w-32 h-32 opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-[40px] rounded-full pointer-events-none"
                  style={{ backgroundColor: skill.color }}
                />

                <div className="relative z-10">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.08]"
                    style={{ color: skill.color }}
                  >
                    <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_12px_currentColor]" />
                  </div>
                </div>

                <div className="relative z-10 mt-8">
                  <h3 className="text-white text-xl font-medium tracking-tight mb-1">
                    {skill.name}
                  </h3>
                  <p className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-mono">
                    {skill.level}
                  </p>
                </div>
              </div>
            ))}

            {/* Bento Box Text - Dynamically adapting grid span */}
            <div className="skill-card col-span-1 sm:col-span-2 p-8 bg-gradient-to-br from-neutral-900/40 to-transparent border border-white/[0.05] rounded-[2rem] flex items-center min-h-[170px] will-change-transform">
              <p className="text-white/20 text-lg md:text-xl italic font-serif leading-relaxed">
                Constantly exploring new horizons in backend architectures and digital landscapes.
              </p>
            </div>
          </div>

        </div>

        {/* CSS for Subtle Noise */}
        <style jsx>{`
          section::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
            opacity: 0.012;
            pointer-events: none;
          }
        `}</style>
      </section>
    </Transition>
  );
};

export default StackSection;