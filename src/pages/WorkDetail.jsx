import { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Icon } from "@iconify/react";
import { projects } from "../data";

gsap.registerPlugin(ScrollTrigger);

const WorkDetail = () => {
  const { id } = useParams();
  const container = useRef();
  const heroRef = useRef();
  const contentRef = useRef();

  const project = projects.find((p) => p.id === parseInt(id));
  const nextProjectId = project && project.id < projects.length ? project.id + 1 : 1;
  const nextProject = projects.find(p => p.id === nextProjectId);

  useGSAP(() => {
    if (!project) return;

    // Hero parallax
    gsap.to(heroRef.current, {
      yPercent: 15,
      scale: 0.92,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-wrap",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      }
    });

    // Title fade
    gsap.to(".hero-title-inner", {
      y: -80,
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-wrap",
        start: "top top",
        end: "bottom 30%",
        scrub: true,
      }
    });

    // Content reveal with stagger
    gsap.from(".reveal-item", {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top 80%",
      }
    });

    // Gallery horizontal scroll
    const galleryItems = gsap.utils.toArray(".gallery-item");
    if (galleryItems.length > 0) {
      gsap.to(galleryItems, {
        xPercent: -100 * (galleryItems.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".gallery-wrap",
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: () => `+=${document.querySelector(".gallery-inner").offsetWidth}`,
        }
      });
    }
  }, { scope: container, dependencies: [id] });

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <p className="text-lg font-mono text-white/40 mb-4">Project not found</p>
        <Link to="/" className="text-sm underline uppercase tracking-widest text-[#6366f1]">Back to Home</Link>
      </div>
    );
  }

  return (
    <div ref={container} className="bg-[#0a0a0a] text-white overflow-x-hidden antialiased">
      
      {/* --- Hero Section --- */}
      <section className="hero-wrap relative h-screen w-full overflow-hidden">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src={project.image}
            className="w-full h-full object-cover"
            alt={project.name}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="hero-title-inner relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-8 md:px-16">
          <div className="max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#6366f1] font-mono text-xs font-bold tracking-[0.3em] uppercase">Project</span>
              <div className="h-[1px] w-12 bg-[#6366f1]/40" />
              <span className="text-white/30 font-mono text-xs">0{project.id}</span>
            </div>
            <h1 className="text-[15vw] md:text-[10vw] font-black uppercase leading-[0.85] tracking-tighter mb-6">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-8 md:gap-12 font-mono text-[11px] md:text-xs tracking-[0.2em] uppercase">
              <div>
                <span className="text-white/30 block mb-1">Year</span>
                <span className="text-white/70">{project.year || "2024"}</span>
              </div>
              <div>
                <span className="text-white/30 block mb-1">Role</span>
                <span className="text-white/70">{project.role || "Full Stack"}</span>
              </div>
              <div>
                <span className="text-white/30 block mb-1">Type</span>
                <span className="text-white/70">Web Application</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 md:right-16 flex items-center gap-3 z-10">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">Scroll</span>
          <div className="w-8 h-[1px] bg-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-white/60 animate-scroll-line-h" />
          </div>
        </div>
      </section>

      {/* --- Content Section --- */}
      <section ref={contentRef} className="px-8 md:px-16 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <div className="grid md:grid-cols-12 gap-12 md:gap-20 mb-24 md:mb-40">
            <div className="md:col-span-7 reveal-item">
              <h2 className="text-[#6366f1] font-mono text-xs font-bold tracking-[0.3em] uppercase mb-6">
                About This Project
              </h2>
              <p className="text-2xl md:text-4xl font-light leading-relaxed text-white/80">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 md:col-start-9 reveal-item">
              <div className="space-y-10">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 font-bold font-mono">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.frameworks.map(f => (
                      <span key={f.id} className="text-xs font-mono border border-white/10 bg-white/[0.03] px-4 py-2 rounded-full text-white/60 hover:border-[#6366f1]/30 hover:text-[#6366f1] transition-all duration-300">
                        {f.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="gallery-wrap h-screen flex items-center overflow-hidden reveal-item">
            <div className="gallery-inner flex gap-8 md:gap-12">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="gallery-item w-[85vw] md:w-[600px] h-[50vh] md:h-[500px] flex-shrink-0 relative group rounded-2xl overflow-hidden">
                  <img
                    src={i === 1 ? project.image : `https://images.unsplash.com/photo-${1460925895917 + i}?auto=format&fit=crop&w=800&q=80`}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    alt={`${project.name} snapshot ${i}`}
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-6 left-6 text-white text-[10px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    View 0{i}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Project */}
          <div className="mt-24 md:mt-40 reveal-item">
            <div className="border-t border-white/10 pt-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold font-mono">Next Project</span>
                <div className="h-[1px] flex-1 bg-white/5" />
              </div>

              <Link
                to={`/work/${nextProject?.id}`}
                className="group flex items-center justify-between py-8 md:py-12 border-t border-b border-white/[0.03] hover:bg-white/[0.01] transition-all duration-500 px-4 -mx-4 rounded-2xl"
              >
                <div className="flex items-center gap-6 md:gap-12">
                  <span className="text-3xl md:text-5xl font-bold text-white/10 font-mono">0{nextProject?.id}</span>
                  <div>
                    <h3 className="text-3xl md:text-6xl font-bold tracking-tight group-hover:text-[#6366f1] transition-colors duration-500">
                      {nextProject?.name}
                    </h3>
                    <div className="flex gap-3 mt-4">
                      {nextProject?.frameworks.slice(0, 3).map(f => (
                        <span key={f.id} className="text-[9px] uppercase tracking-widest text-white/20 border border-white/10 px-3 py-1 rounded-full">
                          {f.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-4xl md:text-6xl text-white/20 group-hover:text-[#6366f1] group-hover:translate-x-2 transition-all duration-500">
                  <Icon icon="lucide:arrow-up-right" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scroll-line-h {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-scroll-line-h {
          animation: scroll-line-h 1.5s infinite cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </div>
  );
};

export default WorkDetail;