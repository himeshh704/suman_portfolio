"use client";
import { useEffect, useState, useRef } from "react";
import { 
  motion, Variants, AnimatePresence, useScroll, useSpring, 
  useMotionValue, useTransform, useElementScroll 
} from "framer-motion";
import { 
  Mail, Phone, MapPin, Code, Video, Layout, 
  Palette, Users, Target, Clock, ArrowRight,
  Monitor, Camera, Terminal, Shield, Zap, ExternalLink
} from "lucide-react";

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const titleX = useSpring(useTransform(mouseX, [0, 2000], [-30, 30]), { stiffness: 100, damping: 30 });
  const titleY = useSpring(useTransform(mouseY, [0, 1000], [-30, 30]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      const card = target.closest('.card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cinematicFade: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(15px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const skills = [
    { name: "Web Development", level: "90%", icon: <Code size={20} />, details: "HTML, CSS, JavaScript, ReactJS" },
    { name: "Video Editing", level: "95%", icon: <Video size={20} />, details: "Cinematic, Storytelling, Visual Aesthetics" },
    { name: "Canva Designing", level: "85%", icon: <Palette size={20} />, details: "Marketing Assets & Layout Design" },
    { name: "UI/UX Design", level: "70%", icon: <Layout size={20} />, details: "Interactive & User-Centric Flows" },
    { name: "Graphic Design", level: "75%", icon: <Monitor size={20} />, details: "Branding & Visual Identity" },
    { name: "Content Creation", level: "88%", icon: <Camera size={20} />, details: "Multi-platform Digital Strategy" }
  ];

  const experience = [
    {
      role: "Front-End Developer Intern",
      company: "UpFlairs Pvt. Ltd. Jaipur",
      period: "2.5 Months",
      description: "Building responsive web interfaces using ReactJs. Focused on user-friendly design and performance optimization."
    },
    {
      role: "President",
      company: "JIET's Social Media and Content Club",
      period: "2025 - 2026",
      description: "Strategizing digital growth and leading a team of creators to curate high-impact content for the college community."
    },
    {
      role: "Media Lead",
      company: "Resonance 2026",
      period: "Present",
      description: "Managing media production and live coverage for large-scale events, ensuring a cinematic experience for attendees."
    }
  ];

  const education = [
    { degree: "B.Tech in Computer Science Engineering", institution: "JIET", period: "2023 - 2027", status: "Pursuing" },
    { degree: "Class 12 - Senior Secondary", institution: "Board of Secondary Education", period: "2023", result: "64%" },
    { degree: "Class 10 - Secondary", institution: "Board of Secondary Education", period: "2021", result: "96%" }
  ];

  return (
    <main ref={mainRef} className="relative bg-background">
      <div className="noise-overlay" aria-hidden="true" />
      
      {/* Custom Cursor */}
      <motion.div 
        className={`custom-cursor ${isHovering ? 'active' : ''}`}
        style={{ left: cursorPos.x, top: cursorPos.y, x: '-50%', y: '-50%' }}
      />

      {/* Cinematic Scroll Indicator */}
      <motion.div 
        style={{ 
          scaleX, position: 'fixed', top: 0, left: 0, right: 0, height: '2px', 
          background: 'var(--primary)', transformOrigin: '0%', zIndex: 100,
          opacity: scrolled ? 1 : 0
        }} 
      />

      {/* Header */}
      <header className={`fixed w-full top-0 z-100 transition-all duration-700 ${scrolled ? 'glass py-4' : 'py-10'}`}>
        <nav className="container flex justify-between items-center">
          <Magnetic>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              className="font-bold text-primary uppercase"
              style={{ fontSize: '0.8rem', letterSpacing: '0.4em', cursor: 'none' }}
            >
              Suman Santra
            </motion.div>
          </Magnetic>
          <ul className="flex gap-12 list-none m-0 p-0">
            {['Vision', 'Craft', 'Lab', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="uppercase text-text-muted hover-text-main transition-all no-underline"
                  style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center text-center p-0 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero.png")', filter: 'grayscale(100%) contrast(1.2)' }}
        />
        <div className="absolute inset-0 z-0 bg-hero-gradient" />
        
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="container relative z-10">
          <motion.div variants={cinematicFade}>
            <p className="text-text-muted uppercase mb-10" style={{ letterSpacing: '0.6em', fontSize: '0.6rem' }}>
              Est. 2023 // B.Tech (Cybersecurity)
            </p>
          </motion.div>
          <motion.h1 
            variants={cinematicFade}
            className="glow-text mb-12 uppercase"
            style={{ 
              fontSize: 'clamp(4rem, 14vw, 12rem)', 
              lineHeight: 0.85, 
              letterSpacing: '-0.03em', 
              fontWeight: 800,
              x: titleX,
              y: titleY
            }}
          >
            Suman<br/>
            <span 
              className="italic font-light" 
              style={{ 
                opacity: 1, 
                color: 'rgba(255,255,255,0.7)', 
                textShadow: '0 0 40px var(--primary-glow)' 
              }}
            >
              Santra
            </span>
          </motion.h1>
          <motion.div variants={cinematicFade} className="max-w-xl mx-auto">
            <p className="text-text-muted leading-relaxed font-light tracking-wide" style={{ fontSize: '1.2rem' }}>
              Director of digital experiences at the intersection of <br/>
              <span className="text-text-main font-normal">Full-Stack Development</span> and <span className="text-text-main font-normal">Cinematic Storytelling</span>.
            </p>
          </motion.div>
          <motion.div 
            variants={cinematicFade} className="mt-20"
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          >
            <Magnetic>
              <a href="#lab" className="premium-btn">Explore The Lab</a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </section>

      {/* Vision (About) Section */}
      <section id="vision" className="border-t border-border-ghost">
        <div className="container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg-grid-cols-2 gap-32 items-start"
          >
            <motion.div variants={cinematicFade}>
              <h3 className="uppercase text-text-muted mb-16" style={{ fontSize: '0.7rem', letterSpacing: '0.5em' }}>// The Vision</h3>
              <p className="leading-tight text-text-main mb-10 font-serif italic tracking-tight" style={{ fontSize: '2.2rem' }}>
                A motivated developer with a passion for creative digital work, skilled in videography and aesthetic storytelling.
              </p>
              <p className="text-text-muted leading-relaxed font-light" style={{ fontSize: '1.1rem' }}>
                I possess a creative mindset and a deep understanding of UI/UX design principles. Eager to apply technical and creative skills to real-world projects and continuously learn. Featured in Digital leadership roles, I bridge the gap between code and visual impact.
              </p>
            </motion.div>
            
            <motion.div variants={cinematicFade} className="bg-surface p-16 border border-border-ghost">
              <h3 className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-16">// Information</h3>
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-6">
                  <Mail className="text-primary" size={18} />
                  <span className="text-text-muted italic" style={{ fontSize: '0.9rem' }}>sumansantra1118@gmail.com</span>
                </div>
                <div className="flex items-center gap-6">
                  <Phone className="text-primary" size={18} />
                  <span className="text-text-muted tracking-widest" style={{ fontSize: '0.9rem' }}>+91 8209389646</span>
                </div>
                <div className="flex items-center gap-6">
                  <MapPin className="text-primary" size={18} />
                  <span className="text-text-muted" style={{ fontSize: '0.9rem' }}>Jodhpur, Rajasthan</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Craft (Skills) Section */}
      <section id="craft" className="bg-slate-950 border-t border-border-ghost">
        <div className="container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cinematicFade}
            className="mb-32 text-center"
          >
            <h3 className="uppercase text-text-muted mb-6" style={{ fontSize: '0.7rem', letterSpacing: '0.5em' }}>// The Craft</h3>
            <h2 className="text-text-main font-serif italic" style={{ fontSize: '4rem' }}>Artillery & Tools.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-10">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 50, rotateX: 15, scale: 0.9 }} 
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ 
                  delay: i * 0.1, 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                viewport={{ once: true, margin: "-50px" }}
                className="card group hover-border-primary"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                <div className="card-spotlight" />
                <div className="relative z-10">
                  <div className="text-primary mb-8 transition-transform duration-500 hover-scale-110">{skill.icon}</div>
                  <h4 className="mb-4 text-text-main tracking-tight" style={{ fontSize: '1.5rem' }}>{skill.name}</h4>
                  <p className="text-text-muted mb-10 font-light" style={{ fontSize: '0.8rem' }}>{skill.details}</p>
                  <div className="progress-track mt-6">
                    <motion.div 
                      className="progress-fill" initial={{ width: 0 }} 
                      whileInView={{ width: skill.level }} transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab (Experience) Section */}
      <section id="lab" className="border-t border-border-ghost bg-black">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
            <div>
              <motion.h3 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                className="uppercase text-text-muted mb-20"
                style={{ fontSize: '0.7rem', letterSpacing: '0.5em' }}
              >
                // Case Studies & Experience
              </motion.h3>
              <div className="flex flex-col gap-16">
                {experience.map((exp, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }} viewport={{ once: true }}
                    className="border-l-2 border-border-ghost pl-12 hover-border-primary transition-colors"
                  >
                    <div className="text-primary tracking-widest uppercase mb-4" style={{ fontSize: '0.6rem' }}>{exp.period}</div>
                    <h4 className="text-text-main mb-2 tracking-tight" style={{ fontSize: '1.8rem' }}>{exp.role}</h4>
                    <p className="text-text-muted mb-6 tracking-wide font-light" style={{ fontSize: '0.85rem' }}>{exp.company}</p>
                    <p className="text-text-muted leading-relaxed font-light" style={{ fontSize: '1rem' }}>{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <motion.h3 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                className="uppercase text-text-muted mb-20"
                style={{ fontSize: '0.7rem', letterSpacing: '0.5em' }}
              >
                // Educational Ledger
              </motion.h3>
              <div className="flex flex-col gap-10">
                {education.map((edu, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }} viewport={{ once: true }}
                    className="bg-surface-50 p-10 border border-border-ghost hover-bg-surface transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-text-muted tracking-widest uppercase" style={{ fontSize: '0.6rem' }}>{edu.period}</span>
                      {edu.result && <span className="text-primary font-bold" style={{ fontSize: '0.7rem' }}>{edu.result}</span>}
                    </div>
                    <h4 className="text-text-main mb-2" style={{ fontSize: '1.2rem' }}>{edu.degree}</h4>
                    <p className="text-text-muted font-light" style={{ fontSize: '0.8rem' }}>{edu.institution}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-border-ghost bg-slate-950">
        <div className="container max-w-4xl text-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={cinematicFade}
          >
            <h3 className="uppercase text-text-muted mb-16" style={{ fontSize: '0.7rem', letterSpacing: '0.5em' }}>// Establish Connection</h3>
            <h2 className="mb-10 leading-none font-serif" style={{ fontSize: '4.5rem' }}>Open for Collaboration.</h2>
            <p className="text-text-muted mb-20 font-light leading-relaxed" style={{ fontSize: '1.2rem' }}>
              Based in Jodhpur, Rajasthan. Exploring new boundaries in frontend engineering and cinematic digital production.
            </p>
            
            <form className="flex flex-col gap-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" placeholder="IDENTITY / NAME" required 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="w-full p-8 bg-transparent border border-border-ghost text-white focus-border-primary outline-none tracking-wider"
                  style={{ fontSize: '0.8rem' }}
                />
                <input 
                  type="email" placeholder="SECURE_CHANNEL / EMAIL" required 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="w-full p-8 bg-transparent border border-border-ghost text-white focus-border-primary outline-none tracking-wider"
                  style={{ fontSize: '0.8rem' }}
                />
              </div>
              <textarea 
                placeholder="PAYLOAD / MESSAGE" rows={6} required 
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="w-full p-8 bg-transparent border border-border-ghost text-white focus-border-primary outline-none tracking-wider resize-none"
                style={{ fontSize: '0.8rem' }}
              ></textarea>
              <Magnetic>
                <button 
                  type="submit" className="premium-btn w-full mt-4"
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                >
                  Transmit Payload <ArrowRight size={14} className="inline ml-4" />
                </button>
              </Magnetic>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-border-ghost bg-black">
        <div className="container text-center">
          <p className="text-text-muted uppercase opacity-50" style={{ fontSize: '0.65rem', letterSpacing: '0.3em' }}>
            © {new Date().getFullYear()} Suman Santra. Cinematic Web & Digital Storytelling.
          </p>
        </div>
      </footer>
    </main>
  );
}
