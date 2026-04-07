"use client";
import { useEffect, useState, useRef } from "react";
import { motion, Variants, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { 
  Mail, Phone, MapPin, Code, Video, Layout, 
  Palette, Users, Target, Clock, ArrowRight,
  Monitor, Camera, Terminal, Shield, Zap
} from "lucide-react";

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      
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
      <header className={`fixed w-full top-0 z-50 transition-all duration-700 ${scrolled ? 'glass py-4' : 'py-10'}`}>
        <nav className="container flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
            className="font-bold text-[0.8rem] tracking-[0.4em] text-primary uppercase"
          >
            Suman Santra
          </motion.div>
          <ul className="flex gap-12 list-none m-0 p-0">
            {['Vision', 'Craft', 'Lab', 'Contact'].map((item) => (
              <li key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="text-[0.65rem] tracking-[0.3em] uppercase text-text-muted hover:text-text-main transition-all duration-400 no-underline"
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
        <div 
          className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: 'url("/hero.png")', filter: 'grayscale(100%) contrast(1.2)' }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background via-background/80 to-background" />
        
        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="container relative z-10">
          <motion.div variants={cinematicFade}>
            <p className="text-text-muted tracking-[0.6em] uppercase text-[0.6rem] mb-10">
              Est. 2023 // B.Tech (Cybersecurity)
            </p>
          </motion.div>
          <motion.h1 
            variants={cinematicFade}
            className="glow-text text-[clamp(4rem,14vw,12rem)] leading-[0.85] mb-12 tracking-[-0.03em] font-extrabold uppercase"
          >
            Suman<br/><span className="opacity-20 italic font-light">Santra</span>
          </motion.h1>
          <motion.div variants={cinematicFade} className="max-w-xl mx-auto">
            <p className="text-[1.2rem] text-text-muted leading-relaxed font-light tracking-wide">
              Director of digital experiences at the intersection of <br/>
              <span className="text-text-main font-normal">Full-Stack Development</span> and <span className="text-text-main font-normal">Cinematic Storytelling</span>.
            </p>
          </motion.div>
          <motion.div 
            variants={cinematicFade} className="mt-20"
            onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
          >
            <a href="#lab" className="premium-btn">Explore The Lab</a>
          </motion.div>
        </motion.div>
      </section>

      {/* Vision (About) Section */}
      <section id="vision" className="border-t border-border-ghost">
        <div className="container">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-start"
          >
            <motion.div variants={cinematicFade}>
              <h3 className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-16">// The Vision</h3>
              <p className="text-[2.2rem] leading-tight text-text-main mb-10 font-serif italic tracking-tight">
                A motivated developer with a passion for creative digital work, skilled in videography and aesthetic storytelling.
              </p>
              <p className="text-text-muted text-[1.1rem] leading-[2] font-light">
                I possess a creative mindset and a deep understanding of UI/UX design principles. Eager to apply technical and creative skills to real-world projects and continuously learn. Featured in Digital leadership roles, I bridge the gap between code and visual impact.
              </p>
            </motion.div>
            
            <motion.div variants={cinematicFade} className="bg-surface p-16 border border-border-ghost">
              <h3 className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-16">// Information</h3>
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-6">
                  <Mail className="text-primary" size={18} />
                  <span className="text-[0.9rem] text-text-muted italic">sumansantra1118@gmail.com</span>
                </div>
                <div className="flex items-center gap-6">
                  <Phone className="text-primary" size={18} />
                  <span className="text-[0.9rem] text-text-muted tracking-widest">+91 8209389646</span>
                </div>
                <div className="flex items-center gap-6">
                  <MapPin className="text-primary" size={18} />
                  <span className="text-[0.9rem] text-text-muted">Jodhpur, Rajasthan</span>
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
            <h3 className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-6">// The Craft</h3>
            <h2 className="text-[4rem] text-text-main font-serif italic">Artillery & Tools.</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {skills.map((skill, i) => (
              <motion.div 
                key={skill.name}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="card group hover:border-primary"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                <div className="card-spotlight" />
                <div className="relative z-10">
                  <div className="text-primary mb-8 group-hover:scale-110 transition-transform duration-500">{skill.icon}</div>
                  <h4 className="text-[1.5rem] mb-4 text-text-main tracking-tight">{skill.name}</h4>
                  <p className="text-[0.8rem] text-text-muted mb-10 font-light">{skill.details}</p>
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
                className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-20"
              >
                // Case Studies & Experience
              </motion.h3>
              <div className="flex flex-col gap-16">
                {experience.map((exp, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }} viewport={{ once: true }}
                    className="border-l-2 border-border-ghost pl-12 hover:border-primary transition-colors"
                  >
                    <div className="text-[0.6rem] text-primary tracking-widest uppercase mb-4">{exp.period}</div>
                    <h4 className="text-[1.8rem] text-text-main mb-2 tracking-tight">{exp.role}</h4>
                    <p className="text-text-muted text-[0.85rem] mb-6 tracking-wide font-light">{exp.company}</p>
                    <p className="text-text-muted text-[1rem] leading-relaxed font-light">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <motion.h3 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-20"
              >
                // Educational Ledger
              </motion.h3>
              <div className="flex flex-col gap-10">
                {education.map((edu, i) => (
                  <motion.div 
                    key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }} viewport={{ once: true }}
                    className="bg-surface/50 p-10 border border-border-ghost hover:bg-surface transition-all"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-[0.6rem] text-text-muted tracking-widest uppercase">{edu.period}</span>
                      {edu.result && <span className="text-primary text-[0.7rem] font-bold">{edu.result}</span>}
                    </div>
                    <h4 className="text-[1.2rem] text-text-main mb-2">{edu.degree}</h4>
                    <p className="text-[0.8rem] text-text-muted font-light">{edu.institution}</p>
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
            <h3 className="text-[0.7rem] tracking-[0.5em] uppercase text-text-muted mb-16">// Establish Connection</h3>
            <h2 className="text-[4.5rem] mb-10 leading-none font-serif">Open for Collaboration.</h2>
            <p className="text-text-muted text-[1.2rem] mb-20 font-light leading-relaxed">
              Based in Jodhpur, Rajasthan. Exploring new boundaries in frontend engineering and cinematic digital production.
            </p>
            
            <form className="flex flex-col gap-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" placeholder="IDENTITY / NAME" required 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="w-full p-8 bg-transparent border border-border-ghost text-white focus:border-primary outline-none text-[0.8rem] tracking-wider"
                />
                <input 
                  type="email" placeholder="SECURE_CHANNEL / EMAIL" required 
                  onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                  className="w-full p-8 bg-transparent border border-border-ghost text-white focus:border-primary outline-none text-[0.8rem] tracking-wider"
                />
              </div>
              <textarea 
                placeholder="PAYLOAD / MESSAGE" rows={6} required 
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
                className="w-full p-8 bg-transparent border border-border-ghost text-white focus:border-primary outline-none text-[0.8rem] tracking-wider resize-none"
              ></textarea>
              <button 
                type="submit" className="premium-btn w-full mt-4"
                onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}
              >
                Transmit Payload <ArrowRight size={14} className="inline ml-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 border-t border-border-ghost bg-black">
        <div className="container text-center">
          <p className="text-text-muted text-[0.65rem] tracking-[0.3em] uppercase opacity-50">
            © {new Date().getFullYear()} Suman Santra. Cinematic Web & Digital Storytelling.
          </p>
        </div>
      </footer>
    </main>
  );
}
