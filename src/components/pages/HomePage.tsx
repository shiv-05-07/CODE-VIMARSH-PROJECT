// HPI 1.6-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Folder, Map, Terminal, ChevronRight, Code2, Cpu, Globe, Hash, Layers } from 'lucide-react';
import Header from '../Header';
import Footer from '../Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { Events, Projects } from '@/entities';

// --- Utility Components ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via setTimeout if needed, or just let CSS handle transition-delay
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element); 
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`${className || ''} animate-reveal`}>{children}</div>;
};

const SectionDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent my-0" />
);

const VerticalLine = ({ className }: { className?: string }) => (
  <div className={`w-px bg-neon-cyan/20 ${className}`} />
);

// --- Main Component ---

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState<Events[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Projects[]>([]);

  const phrases = [
    'Beyond Syntax.',
    'Deep Deliberation.',
    'Architectural Excellence.',
  ];

  // --- Data Fidelity Protocol: Preserve Logic ---
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { items: events } = await BaseCrudService.getAll<Events>('events');
      const upcoming = events
        .filter((event) => event.isUpcoming)
        .sort((a, b) => {
          const dateA = a.eventDate ? new Date(a.eventDate).getTime() : 0;
          const dateB = b.eventDate ? new Date(b.eventDate).getTime() : 0;
          return dateA - dateB;
        })
        .slice(0, 3);
      setUpcomingEvents(upcoming);

      const { items: projects } = await BaseCrudService.getAll<Projects>('projects');
      setFeaturedProjects(projects.slice(0, 3));
    };

    fetchData();
  }, []);

  // --- Scroll Progress for Global Parallax ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-charcoal text-white selection:bg-neon-cyan selection:text-charcoal overflow-clip font-paragraph">
      {/* Global Styles for Custom Animations */}
      <style>{`
        .animate-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(0, 245, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 245, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.1);
          color: transparent;
        }
        .neon-glow {
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.15);
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neon-cyan origin-left z-50"
        style={{ scaleX }}
      />

      <Header />

      <main className="relative w-full">
        
        {/* --- HERO SECTION --- */}
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-charcoal z-0">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
            <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-neon-cyan/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4" />
          </div>

          <div className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Text Content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <AnimatedElement>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-12 bg-neon-cyan" />
                  <span className="font-mono text-neon-cyan text-sm tracking-widest uppercase">System Online</span>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-8">
                  Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Vimarsh</span>
                </h1>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="h-24 sm:h-32 flex items-center mb-8">
                  <div className="text-2xl sm:text-4xl lg:text-5xl font-mono text-neon-cyan">
                    <span className="mr-4 text-white/30">{'>'}</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentPhraseIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="inline-block"
                      >
                        {phrases[currentPhraseIndex]}
                      </motion.span>
                    </AnimatePresence>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="inline-block w-3 h-8 sm:h-12 bg-neon-cyan ml-2 align-middle"
                    />
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <p className="font-paragraph text-lg sm:text-xl text-white/60 max-w-2xl mb-10 leading-relaxed border-l border-white/10 pl-6">
                  Where intellectual deliberation shapes exceptional software. We architect solutions through deep discourse, collaborative refinement, and uncompromising technical excellence.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <div className="flex flex-wrap gap-6">
                  <Link
                    to="/join"
                    className="group relative px-8 py-4 bg-neon-cyan text-charcoal font-bold font-mono overflow-hidden rounded-sm"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      INITIATE_JOIN_SEQUENCE <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                  </Link>
                  <Link
                    to="/projects"
                    className="group px-8 py-4 border border-white/20 text-white font-mono hover:border-neon-cyan hover:text-neon-cyan transition-colors rounded-sm"
                  >
                    EXPLORE_PROJECTS
                  </Link>
                </div>
              </AnimatedElement>
            </div>

            {/* Right Column: Visual Abstract */}
            <div className="lg:col-span-5 relative hidden lg:block h-[80vh]">
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Abstract Code Visuals */}
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"
                    />
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-neon-cyan/10 rounded-full border-dashed"
                    />
                    
                    {/* Floating Terminal Card */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-charcoal/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden neon-glow"
                    >
                      <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        <span className="ml-auto text-xs font-mono text-white/30">bash --vimarsh</span>
                      </div>
                      <div className="p-6 font-mono text-sm text-white/80 space-y-2">
                        <div className="flex gap-2">
                          <span className="text-neon-cyan">$</span>
                          <span>import {`{ Wisdom }`} from 'vimarsh';</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-neon-cyan">$</span>
                          <span>const solution = new Architecture();</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-neon-cyan">$</span>
                          <span className="text-white/50">Analyzing requirements...</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-neon-cyan">$</span>
                          <span className="text-green-400">Optimization complete.</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/40">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="block text-neon-cyan">MEMORY</span>
                              64GB / 128GB
                            </div>
                            <div>
                              <span className="block text-neon-cyan">CPU</span>
                              12 CORES ACTIVE
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">Scroll to Explore</span>
            <div className="w-px h-12 bg-gradient-to-b from-neon-cyan to-transparent" />
          </motion.div>
        </section>

        <SectionDivider />

        {/* --- PHILOSOPHY SECTION --- */}
        <section className="relative w-full py-32 bg-charcoal overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <span className="absolute -top-20 -left-20 text-[20rem] font-heading font-bold text-stroke opacity-5 select-none">
               VIMARSH
             </span>
          </div>

          <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                <div className="sticky top-32">
                  <AnimatedElement>
                    <h2 className="font-heading text-4xl font-bold text-white mb-6">
                      The Philosophy
                    </h2>
                    <div className="w-20 h-1 bg-neon-cyan mb-8" />
                    <p className="font-paragraph text-white/60 text-lg">
                      We believe that code is merely the final expression of a much deeper process. True innovation happens in the mind before it ever reaches the keyboard.
                    </p>
                  </AnimatedElement>
                </div>
              </div>
              
              <div className="lg:col-span-8 space-y-24">
                <AnimatedElement>
                  <div className="group">
                    <h3 className="text-2xl font-mono text-neon-cyan mb-4 flex items-center gap-3">
                      <span className="text-white/20">01.</span> Deliberation
                    </h3>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight group-hover:text-neon-cyan/90 transition-colors duration-500">
                      "In an era of rapid-fire coding, we choose vimarsh—the art of intellectual deliberation."
                    </p>
                  </div>
                </AnimatedElement>

                <AnimatedElement>
                  <div className="group">
                    <h3 className="text-2xl font-mono text-neon-cyan mb-4 flex items-center gap-3">
                      <span className="text-white/20">02.</span> Discourse
                    </h3>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight group-hover:text-neon-cyan/90 transition-colors duration-500">
                      "We don't just ship code; we architect solutions through discourse, logic, and collaborative refinement."
                    </p>
                  </div>
                </AnimatedElement>

                <AnimatedElement>
                  <div className="group">
                    <h3 className="text-2xl font-mono text-neon-cyan mb-4 flex items-center gap-3">
                      <span className="text-white/20">03.</span> Execution
                    </h3>
                    <p className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight group-hover:text-neon-cyan/90 transition-colors duration-500">
                      "Precision is not an accident. It is the inevitable result of deep thought applied to complex problems."
                    </p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURED PROJECTS (Horizontal Scroll Vibe) --- */}
        <section className="w-full py-32 bg-black relative border-t border-white/5">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8 mb-16 flex justify-between items-end">
            <AnimatedElement>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white">
                Architectural <span className="text-neon-cyan">Works</span>
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <Link to="/projects" className="hidden sm:flex items-center gap-2 text-white/60 hover:text-neon-cyan transition-colors font-mono text-sm">
                VIEW_ALL_PROJECTS <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedElement>
          </div>

          <div className="w-full overflow-x-auto pb-12 px-4 sm:px-6 lg:px-8 scrollbar-hide">
            <div className="flex gap-8 min-w-max">
              {featuredProjects.length > 0 ? (
                featuredProjects.map((project, index) => (
                  <AnimatedElement key={project._id || index} delay={index * 100} className="w-[85vw] sm:w-[600px] group">
                    <Link to={`/projects`} className="block relative aspect-[16/9] overflow-hidden rounded-lg mb-6 border border-white/10 group-hover:border-neon-cyan/50 transition-colors">
                      <div className="absolute inset-0 bg-charcoal z-0">
                         {/* Fallback or Actual Image */}
                         <Image 
                            src={project.projectImage || "https://static.wixstatic.com/media/876570_fcf8054fac044d5892288062de0ceeb4~mv2.png?originWidth=768&originHeight=448"} 
                            alt={project.projectName || "Project Image"}
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                            width={800}
                         />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-90" />
                      
                      <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-xs font-mono rounded border border-neon-cyan/20">
                            {project.status || 'DEVELOPMENT'}
                          </span>
                        </div>
                        <h3 className="text-3xl font-heading font-bold text-white mb-2">{project.projectName}</h3>
                        <p className="text-white/60 line-clamp-2 max-w-md">{project.shortDescription}</p>
                      </div>
                    </Link>
                  </AnimatedElement>
                ))
              ) : (
                // Empty State / Loading State
                [1, 2, 3].map((i) => (
                  <div key={i} className="w-[85vw] sm:w-[600px] aspect-[16/9] bg-white/5 rounded-lg animate-pulse border border-white/5" />
                ))
              )}
            </div>
          </div>
        </section>

        {/* --- EVENTS & ROADMAP GRID --- */}
        <section className="w-full py-32 bg-charcoal relative">
          <div className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              
              {/* Events Column */}
              <div>
                <AnimatedElement>
                  <div className="flex items-center gap-4 mb-12">
                    <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                      <Calendar className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-white">Upcoming Discourse</h2>
                  </div>
                </AnimatedElement>

                <div className="space-y-8">
                  {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, idx) => (
                      <AnimatedElement key={event._id || idx} delay={idx * 100}>
                        <Link to="/events" className="block group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-neon-cyan/30 rounded-xl p-6 transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                            <div className="flex-shrink-0 w-16 h-16 bg-charcoal rounded-lg border border-white/10 flex flex-col items-center justify-center text-center">
                              <span className="text-xs text-white/40 font-mono uppercase">
                                {event.eventDate ? new Date(event.eventDate).toLocaleString('default', { month: 'short' }) : 'TBA'}
                              </span>
                              <span className="text-xl font-bold text-white">
                                {event.eventDate ? new Date(event.eventDate).getDate() : '--'}
                              </span>
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors mb-2">
                                {event.eventName}
                              </h3>
                              <p className="text-white/50 text-sm line-clamp-2 mb-3">
                                {event.eventDescription || "Join us for a session of deep technical deliberation."}
                              </p>
                              <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                                <span className="flex items-center gap-1">
                                  <Map className="w-3 h-3" /> {event.eventLocation || 'Online'}
                                </span>
                                {event.isUpcoming && (
                                  <span className="text-neon-cyan flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" /> UPCOMING
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="flex-shrink-0 self-start sm:self-center">
                              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-neon-cyan group-hover:text-charcoal group-hover:border-neon-cyan transition-all">
                                <ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      </AnimatedElement>
                    ))
                  ) : (
                    <div className="p-8 text-center border border-dashed border-white/10 rounded-xl">
                      <p className="text-white/40 font-mono">No upcoming events scheduled.</p>
                    </div>
                  )}
                </div>
                
                <AnimatedElement delay={300}>
                  <Link to="/events" className="inline-flex items-center gap-2 mt-8 text-neon-cyan font-mono text-sm hover:underline underline-offset-4">
                    FULL_CALENDAR_VIEW <ArrowRight className="w-4 h-4" />
                  </Link>
                </AnimatedElement>
              </div>

              {/* Roadmap Column */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10 hidden sm:block" />
                
                <AnimatedElement>
                  <div className="flex items-center gap-4 mb-12 pl-0 sm:pl-16">
                    <div className="p-3 bg-neon-cyan/10 rounded-lg border border-neon-cyan/20">
                      <Map className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-white">Strategic Roadmap</h2>
                  </div>
                </AnimatedElement>

                <div className="space-y-12 pl-0 sm:pl-16">
                  <AnimatedElement delay={100}>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-charcoal border-2 border-neon-cyan hidden sm:block shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
                      <h3 className="text-xl font-bold text-white mb-2">Phase 1: Foundation</h3>
                      <p className="text-white/60 mb-4">Establishing the core principles of Vimarsh and building the initial community infrastructure.</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-mono rounded border border-green-500/20">COMPLETED</span>
                      </div>
                    </div>
                  </AnimatedElement>

                  <AnimatedElement delay={200}>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-charcoal border-2 border-white/30 hidden sm:block" />
                      <h3 className="text-xl font-bold text-white mb-2">Phase 2: Expansion</h3>
                      <p className="text-white/60 mb-4">Launching the open-source initiative and expanding our collaborative project portfolio.</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-neon-cyan/10 text-neon-cyan text-xs font-mono rounded border border-neon-cyan/20">IN PROGRESS</span>
                      </div>
                    </div>
                  </AnimatedElement>

                  <AnimatedElement delay={300}>
                    <div className="relative">
                      <div className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-charcoal border-2 border-white/10 hidden sm:block" />
                      <h3 className="text-xl font-bold text-white/50 mb-2">Phase 3: Ecosystem</h3>
                      <p className="text-white/40 mb-4">Creating a self-sustaining ecosystem of developers, architects, and thinkers.</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-1 bg-white/5 text-white/30 text-xs font-mono rounded border border-white/10">PLANNED</span>
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
                
                <AnimatedElement delay={400}>
                  <div className="pl-0 sm:pl-16 mt-12">
                    <Link to="/roadmap" className="inline-flex items-center gap-2 text-neon-cyan font-mono text-sm hover:underline underline-offset-4">
                      VIEW_DETAILED_ROADMAP <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </AnimatedElement>
              </div>

            </div>
          </div>
        </section>

        {/* --- JOIN CTA SECTION --- */}
        <section className="w-full py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-neon-cyan/5 rounded-full blur-[150px]" />
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <AnimatedElement>
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan font-mono text-sm">
                :: READY TO CONTRIBUTE? ::
              </div>
            </AnimatedElement>
            
            <AnimatedElement delay={100}>
              <h2 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-white">Discourse</span>
              </h2>
            </AnimatedElement>
            
            <AnimatedElement delay={200}>
              <p className="font-paragraph text-xl text-white/60 mb-12 max-w-2xl mx-auto">
                We are looking for architects, not just coders. If you are ready to deliberate, design, and deploy with purpose, your place is here.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={300}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/join"
                  className="w-full sm:w-auto px-10 py-5 bg-neon-cyan text-charcoal font-bold text-lg rounded hover:bg-white transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Apply for Membership <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-10 py-5 border border-white/20 text-white font-bold text-lg rounded hover:border-white transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  Read Manifesto
                </Link>
              </div>
            </AnimatedElement>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}