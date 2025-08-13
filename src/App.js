import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SahilPortfolio() {
  const publicUrl = process.env.PUBLIC_URL || "";
  const assetPath = (p) => `${publicUrl}${encodeURI(p)}`;
  const resumePdf = assetPath("/Sahil_Pambhar_Resume25NAZ.pdf");
  const photo = assetPath("/IMG_7143 2.jpg");
  const canvasRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({
    surroundshield: 0,
    spendwise: 0,
    imageAuth: 0
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showRolesDropdown, setShowRolesDropdown] = useState(false);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });
  const [showSplash, setShowSplash] = useState(true);
  const roleTitles = ["Fullstack Engineer", "Software Developer Engineer", "AI/ML Engineer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  // removed legacy description typer

  useEffect(() => {
    if (showSplash) return;
    const titles = roleTitles;
    const full = titles[currentRoleIndex];
    let timeout;
    const typeSpeed = 90;
    const deleteSpeed = 50;
    const pauseMs = 1200;

    if (!isDeletingRole && roleText.length < full.length) {
      timeout = setTimeout(() => {
        setRoleText(full.slice(0, roleText.length + 1));
      }, typeSpeed);
    } else if (!isDeletingRole && roleText.length === full.length) {
      timeout = setTimeout(() => {
        setIsDeletingRole(true);
      }, pauseMs);
    } else if (isDeletingRole && roleText.length > 0) {
      timeout = setTimeout(() => {
        setRoleText(full.slice(0, roleText.length - 1));
      }, deleteSpeed);
    } else if (isDeletingRole && roleText.length === 0) {
      setIsDeletingRole(false);
      setCurrentRoleIndex((currentRoleIndex + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [showSplash, roleText, isDeletingRole, currentRoleIndex, roleTitles]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showRolesDropdown && !event.target.closest('.roles-dropdown')) {
        setShowRolesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showRolesDropdown]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    }
    
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      setFormSubmitted(true);
      setTimeout(() => {
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormSubmitted(false);
      }, 3000);
    } else {
      setFormErrors(errors);
    }
  };

  const experiences = [
    {
      company: "Curantis Solutions",
      role: "Software Development Intern",
      location: "Addison, TX",
      dates: "06/2025 – Present",
      logo: assetPath("/curantis_solutions_logo.jpeg"),
      bullets: [
        "Engineered a Go backend service to auto-select report logic based on benefit types (Medicare/Medicaid), improving eligibility accuracy.",
        "Built Angular feature so patients can access/edit insurance policy numbers, reducing ops overhead.",
        "Delivered patient eligibility via serverless AWS (Lambda + DynamoDB + S3), enabling secure, scalable billing workflows.",
      ],
    },
    {
      company: "Bluesap Solutions",
      role: "Software Developer Intern",
      location: "New York, NY",
      dates: "05/2024 – 08/2024",
      logo: assetPath("/bluesap_logo.jpg"),
      bullets: [
        "Revamped React dashboard UX; improved perceived load by ~35%.",
        "Optimized Flask microservice with in-memory caching; cut API latency ~25% under concurrency.",
        "Improved SDLC with caching/automation to speed up testing & deployments.",
      ],
    },
    {
      company: "Vrutti Technologies",
      role: "Full-stack Developer",
      location: "Surat, Gujarat, India",
      dates: "12/2022 – 07/2023",
      logo: assetPath("/vrutti1_logo.jpeg"),
      bullets: [
        "Built computer-vision DFM validation for PCBs; 91% defect-detection accuracy, ~20% fewer manufacturing defects.",
        "Set up Jenkins CI/CD; boosted delivery cadence ~80%, cut deploy time from hours to minutes.",
        "Co-built DOCGPT (local Nous-Hermes LLM): 10+ doc formats → private knowledge base with cited Q&A.",
      ],
    },
    {
      company: "Dot com IoT LLP",
      role: "Summer Intern",
      location: "Surat, Gujarat, India",
      dates: "06/2022 – 07/2022",
      logo: assetPath("/dotcom_iot_llp_logo.jpeg"),
      bullets: [
        "Contributed to defect detection in metal pipe welding; +15% accuracy using supervised learning on real data.",
        "Built foundations in NumPy, Pandas, Matplotlib, scikit-learn for practical ML workflows.",
      ],
    },
  ];

  const education = [
    {
      school: "Stevens Institute of Technology",
      degree: "M.S. in Computer Science",
      location: "Hoboken, NJ",
      dates: "09/2023 – 05/2025",
      logo: assetPath("/logos/stevens.png"),
      bullets: [],
    },
    {
      school: "Gujarat Technological University",
      degree: "B.E. in Computer Science",
      location: "Gujarat, India",
      dates: "07/2019 – 06/2023",
      logo: assetPath("/logos/gtu.png"),
      bullets: [],
    },
  ];

  const skills = {
    "Programming Languages": ["Go", "Python", "JavaScript", "Java", "C/C++", "SQL"],
    "Frameworks & Libraries": [
      "React",
      "Flask",
      "Django",
      "Angular",
      "LangChain",
      "PyTorch",
      "OpenCV",
      "scikit-learn",
      "OpenAI API",
    ],
    "Databases & Cloud": ["MySQL", "PostgreSQL", "MongoDB", "DynamoDB", "AWS", "Databricks"],
    "DevOps & Tools": ["Docker", "Jenkins", "Git/GitHub", "Selenium", "REST APIs", "CI/CD"],
  };

  useEffect(() => {
    if (showSplash) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setShowSplash(false), 3200);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prev;
      };
    }
  }, [showSplash]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === "undefined") return;
  
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
  
    const handleMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleLeave = () => { mouse.active = false; };
  
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
  
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
    }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(56,189,248,0.16)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        p.speedX += (Math.random() - 0.5) * 0.1;
        p.speedY += (Math.random() - 0.5) * 0.1;
        
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const radius = 130;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const force = (radius - d) / radius;
            p.speedX += (dx / d) * force * 0.3;
            p.speedY += (dy / d) * force * 0.3;
          }
        }

        p.speedX *= 0.99;
        p.speedY *= 0.99;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const card =
    "p-4 rounded-md ring-1 transition-transform duration-300 " +
    "bg-slate-900/20 ring-slate-700/30 " +
    "hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-fuchsia-500/10 " +
    "hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 hover:text-white";

  const projectImages = {
    surroundshield: [
      assetPath("/ss/Untitled design.png"),
      assetPath("/ss/Screenshot 2025-04-02 at 9.34.25 PM.png")
    ],
    spendwise: [
      assetPath("/spendwise/a logo.png"),
      assetPath("/spendwise/dashboard (1).png"),
      assetPath("/spendwise/Goal Tracker.png"),
      assetPath("/spendwise/Goal Tracker(Add_edit).png")
    ],
    imageAuth: [
      assetPath("/image auth/st.png"),
      assetPath("/image auth/Screenshot 2025-08-10 at 4.58.31 PM.png")
    ]
  };



  const nextImage = (projectKey) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectKey]: (prev[projectKey] + 1) % projectImages[projectKey].length
    }));
  };

  const prevImage = (projectKey) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [projectKey]: prev[projectKey] === 0 ? projectImages[projectKey].length - 1 : prev[projectKey] - 1
    }));
  };

  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchMove = (e) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleTouchEnd = (projectKey) => {
    if (!touchStart.x || !touchEnd.x) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe && Math.abs(distanceX) > 50) {
      if (distanceX > 0) {
        nextImage(projectKey);
      } else {
        prevImage(projectKey);
      }
    }
    
    setTouchStart({ x: 0, y: 0 });
    setTouchEnd({ x: 0, y: 0 });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-slate-100 antialiased overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:25px_25px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:100%_25px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30"></div>
      </div>
      
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showSplash ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed inset-0 z-[60] flex items-center justify-center ${showSplash ? "" : "pointer-events-none"}`}
        aria-hidden={showSplash ? "false" : "true"}
      >
        <div className="gradient-animate absolute inset-0" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl md:text-5xl font-light tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
            
          >
            Welcome to <span className="opacity-90 font-medium">Sahil's Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 md:mt-4 text-white/90 font-light"
          >
            Building reliable, scalable, and user-focused software solutions.
          </motion.p>
        </div>
      </motion.div>

      
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-black/20 via-black/10 to-black/20 backdrop-blur-xl border-b border-white/5">
          
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <button onClick={() => scrollToSection('about')} className="text-white/70 hover:text-white transition-colors duration-300 relative group">
              About
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button onClick={() => scrollToSection('experience')} className="text-white/70 hover:text-white transition-colors duration-300 relative group">
              Experience
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button onClick={() => scrollToSection('education')} className="text-white/70 hover:text-white transition-colors duration-300 relative group">
              Education & Skills
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-white/70 hover:text-white transition-colors duration-300 relative group">
              Projects
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white/70 hover:text-white transition-colors duration-300 relative group">
              Contact
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400 transition-all duration-300 group-hover:w-full"></div>
            </button>
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 hover:from-cyan-500/30 hover:to-fuchsia-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-white/90 hover:text-white"
            >
              Resume
            </a>
          </nav>

          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 grid place-items-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-300"
            >
              <div className="flex flex-col gap-1">
                <div className={`w-5 h-0.5 bg-white/80 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-white/80 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-5 h-0.5 bg-white/80 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
              </div>
            </button>
          </div>

          
          <div className="flex items-center gap-2">
            <a href="mailto:pambhars99@gmail.com" className="w-9 h-9 grid place-items-center bg-gradient-to-r from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-400/30 hover:border-red-400/50 rounded-lg transition-all duration-300 group">
              <img src={assetPath("/gmail.png")} alt="Email" className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://linkedin.com/in/sp3030" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 border border-blue-400/30 hover:border-blue-400/50 rounded-lg transition-all duration-300 group">
              <img src={assetPath("/linkedin.png")} alt="LinkedIn" className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://github.com/sahil7992" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 border border-gray-400/30 hover:border-gray-400/50 rounded-lg transition-all duration-300 group">
              <img src={assetPath("/logo.png")} alt="GitHub" className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://leetcode.com/u/Sahilpambhar6555/" target="_blank" rel="noreferrer" className="w-9 h-9 grid place-items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 border border-yellow-400/30 hover:border-yellow-400/50 rounded-lg transition-all duration-300 group">
              <img src={assetPath("/leetcode.png")} alt="LeetCode" className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl border-t border-white/5 relative z-40">
            <nav className="w-full px-6 py-4 flex flex-col gap-4 text-sm">
              <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} className="text-white/70 hover:text-white py-3 text-left transition-colors duration-300 border-b border-white/5 hover:border-white/10">About</button>
              <button onClick={() => { scrollToSection('experience'); setIsMobileMenuOpen(false); }} className="text-white/70 hover:text-white py-3 text-left transition-colors duration-300 border-b border-white/5 hover:border-white/10">Experience</button>
                          <button onClick={() => { scrollToSection('education'); setIsMobileMenuOpen(false); }} className="text-white/70 hover:text-white py-3 text-left transition-colors duration-300 border-b border-white/5 hover:border-white/10">Education & Skills</button>
              <button onClick={() => { scrollToSection('projects'); setIsMobileMenuOpen(false); }} className="text-white/70 hover:text-white py-3 text-left transition-colors duration-300 border-b border-white/5 hover:border-white/10">Projects</button>
              <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} className="text-white/70 hover:text-white py-3 text-left transition-colors duration-300 border-b border-white/5 hover:border-white/10">Contact</button>
              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 hover:from-cyan-500/30 hover:to-fuchsia-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-white/90 hover:text-white inline-block w-fit"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>
            </nav>
          </div>
        )}
      </div>

      
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 6 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full h-screen overflow-y-auto md:snap-y md:snap-mandatory"
      >
        <div className="w-full max-w-5xl mx-auto p-6 pt-20 md:pt-12">

          <section id="about" className="md:snap-start min-h-screen flex items-center overflow-y-auto">
            <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 p-4 pt-8 md:pt-4">
              <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden ring-1 ring-slate-600/50">
              <img src={photo} alt="Sahil Pambhar" className="w-full h-full object-cover" />
            </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <h1 className="text-white text-2xl md:text-4xl font-bold tracking-tight">
                  Sahil Dineshbhai Pambhar
                </h1>
                <div className="relative mt-2">
                  <div className="text-base md:text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-cyan-300 tracking-tight min-h-[28px] md:min-h-[32px]">
                    {roleText}
                    <span className="ml-0.5 text-cyan-300/80 animate-pulse">|</span>
                  </div>
                </div>
                <div className="relative mt-3 roles-dropdown">
                  <button
                    onClick={() => setShowRolesDropdown(!showRolesDropdown)}
                    className="text-xs px-3 py-1 rounded-full bg-green-500/20 border border-green-400/30 text-green-300 font-medium hover:bg-green-500/30 hover:border-green-400/50 transition-all duration-300 cursor-pointer flex items-center gap-1"
                  >
                    Open to roles
                    <span className={`transition-transform duration-300 ${showRolesDropdown ? 'rotate-180' : ''}`}>▼</span>
                  </button>
                  
                  {showRolesDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl shadow-black/50 z-50 p-4">
                      <div className="text-xs text-slate-400 mb-3 font-medium">Roles I'm actively seeking:</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-200">
                          <span className="text-white text-sm">Full Stack Software Engineer</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-200">
                          <span className="text-white text-sm">AI/ML Engineer</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-200">
                          <span className="text-white text-sm">Prompt Engineer</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-200">
                          <span className="text-white text-sm">Computer Vision Engineer</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors duration-200">
                          <span className="text-white text-sm">Cloud/DevOps Engineer</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <div className="text-xs text-slate-400">
                          <span className="text-green-400">📍</span> Open to remote, hybrid, or on-site opportunities in United States
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-2 text-slate-300 max-w-xl text-sm md:text-base">
                  Full-stack software engineer with an MS in Computer Science from Stevens Institute of Technology, currently interning at Curantis Solutions. Proven experience delivering scalable microservices, AI-powered RAG systems, and computer vision solutions that create measurable impact. Driven by curiosity and a focus on building technology that's practical, efficient, and genuinely useful —currently developing FlyEasy, a smarter way to help travelers find the cheapest flights with AI-driven insights.
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="relative flex items-center gap-4 p-4 bg-white/5 backdrop-blur-3xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/8 transition-all duration-500 rounded-3xl h-16 shadow-2xl shadow-black/20">
                        <div className="w-10 h-10 grid place-items-center bg-gradient-to-br from-cyan-400/20 to-blue-500/20 backdrop-blur-xl border border-white/20 rounded-2xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all duration-500 flex-shrink-0">
                          <span className="text-white text-lg">📍</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Location</p>
                          <p className="text-sm text-white font-semibold truncate">Hoboken, NJ</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-emerald-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="relative flex items-center gap-4 p-4 bg-white/5 backdrop-blur-3xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/8 transition-all duration-500 rounded-3xl h-16 shadow-2xl shadow-black/20">
                        <div className="w-10 h-10 grid place-items-center bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-xl border border-white/20 rounded-2xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-green-400/30 group-hover:to-emerald-500/30 transition-all duration-500 flex-shrink-0">
                          <span className="text-white text-lg">📞</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white/50 uppercase tracking-wider font-medium">Phone</p>
                          <p className="text-sm text-white font-semibold truncate">(929) 302-7922</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="group relative md:col-span-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 via-transparent to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                      <div className="relative flex items-center gap-4 p-4 bg-white/5 backdrop-blur-3xl border border-white/10 group-hover:border-white/20 group-hover:bg-white/8 transition-all duration-500 rounded-3xl h-16 shadow-2xl shadow-black/20">
                        <div className="w-10 h-10 grid place-items-center bg-gradient-to-br from-red-400/20 to-pink-500/20 backdrop-blur-xl border border-white/20 rounded-2xl group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-red-400/30 group-hover:to-pink-500/30 transition-all duration-500 flex-shrink-0">
                          <span className="text-white text-lg">✉️</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider font-medium">Email</p>
                          <a href="mailto:pambhars99@gmail.com" className="text-[10px] md:text-sm text-white font-semibold hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis leading-tight">
                            pambhars99@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section id="experience" className="md:snap-start min-h-screen flex items-center overflow-y-auto mt-12 md:mt-0">
            <div className="w-full bg-slate-800/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm ring-1 ring-slate-700/40 overflow-y-auto max-h-full">
              <h2 className="text-xl font-semibold">Experience</h2>
              <div className="relative mt-4">
                <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-slate-700/40" />
                <ul className="space-y-8">
                  {experiences.map((exp, idx) => (
                    <li key={idx} className="relative pl-10 md:pl-12">
                      <span className="absolute left-2 md:left-3 top-5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/10" />
                      <div className="transition-all duration-300 rounded-md ring-1 ring-slate-700/30 bg-slate-900/30 p-3 md:p-4 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-fuchsia-500/15 hover:ring-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/10 hover:text-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={exp.logo}
                              alt={exp.company}
                              className="w-8 h-8 rounded-md object-contain bg-slate-800/60 ring-1 ring-slate-700/40 flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm md:text-base">{exp.company}</div>
                              <div className="text-xs text-slate-400">
                                {exp.role}
                                {exp.location ? ` • ${exp.location}` : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 whitespace-nowrap md:text-right">{exp.dates}</div>
                        </div>
                        <ul className="mt-3 list-disc space-y-1 text-xs md:text-sm text-slate-300" style={{ listStylePosition: 'inside' }}>
                          {exp.bullets.map((b, i) => (
                            <li key={i} className="break-words" style={{ textIndent: '-1.5em', paddingLeft: '1.5em' }}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>


          <section id="education" className="md:snap-start min-h-screen flex items-center overflow-y-auto mt-12 md:mt-0">
            <div className="w-full bg-slate-800/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm ring-1 ring-slate-700/40 overflow-y-auto max-h-full">
              <h2 className="text-lg font-semibold">Education & Skills</h2>
            <div className="relative mt-4">
                <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-700/40" />
              <ul className="space-y-4">
                  {education.map((ed, idx) => (
                    <li key={idx} className="relative pl-10">
                      <span className="absolute left-2 top-4 w-2.5 h-2.5 rounded-full bg-fuchsia-400 ring-4 ring-fuchsia-400/10" />
                    <div className="transition-all duration-300 rounded-md ring-1 ring-slate-700/30 bg-slate-900/30 p-4 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-fuchsia-500/15 hover:ring-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/10 hover:text-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                              src={ed.logo}
                              alt={ed.school}
                              className="w-8 h-8 rounded object-contain bg-slate-800/60 ring-1 ring-slate-700/40 flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                            <div className="min-w-0 flex-1">
                              <div className="font-medium break-words text-sm md:text-base">{ed.school}</div>
                              <div className="text-xs text-slate-400 break-words">
                                {ed.degree}
                                {ed.location ? ` • ${ed.location}` : ""}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-slate-400 whitespace-nowrap md:text-right">{ed.dates}</div>
                        </div>
                        <ul className="mt-3 space-y-1 text-sm text-slate-300" style={{ listStylePosition: 'inside' }}>
                          {ed.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Skills</h3>
                <div className="space-y-4">
                  {Object.entries(skills).map(([group, items]) => (
                    <div key={group}>
                      <div className="text-xs uppercase tracking-wide text-slate-400 mb-2">{group}</div>
                      <div className="flex flex-wrap gap-2">
                        {items.map((s) => (
                          <span key={s} className="text-xs px-2 py-1 rounded bg-slate-700/40 ring-1 ring-slate-700/40 transition">
                            {s}
                          </span>
                ))}
              </div>
            </div>
                  ))}
                </div>
              </div>
            </div>
          </section>


          <section id="projects" className="md:snap-start min-h-screen flex items-center overflow-y-auto mt-12 md:mt-0">
            <div className="w-full bg-slate-800/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm ring-1 ring-slate-700/40 overflow-y-auto max-h-full">
              <h2 className="text-xl font-semibold">Projects</h2>
              <div className="space-y-8 md:space-y-8 mt-4">
                
                <div className="p-4 rounded-md ring-1 transition-transform duration-300 bg-slate-900/20 ring-slate-700/30 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-fuchsia-500/10 hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 hover:text-white">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <div 
                      className="flex-shrink-0 relative"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={() => handleTouchEnd('surroundshield')}
                    >
                      <img 
                        src={projectImages.surroundshield[currentImageIndex.surroundshield]} 
                        alt="SurroundShield" 
                        className="w-full h-40 md:w-64 md:h-40 rounded-lg object-cover ring-1 ring-slate-600/50"
                      />
                      {projectImages.surroundshield.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {projectImages.surroundshield.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, surroundshield: index }))}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 shadow-lg ${
                                index === currentImageIndex.surroundshield 
                                  ? 'bg-white ring-2 ring-black/20' 
                                  : 'bg-black/70 hover:bg-black/90'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">SurroundShield</h3>
                        <a 
                          href="https://github.com/sahil7992/SurroundShield" 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 hover:from-cyan-500/30 hover:to-fuchsia-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-xs md:text-sm text-white/90 hover:text-white"
                        >
                          <img src={assetPath("/github.png")} alt="GitHub" className="w-3 h-3 md:w-4 md:h-4" />
                          <span>View Code</span>
                        </a>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        AI-powered safety application that delivers personalized risk alerts by analyzing location and health metrics —
                        protecting users from extreme weather, pollution spikes, and natural disasters. Fine-tuned and integrated Llama 3.3
                        via Databricks Playground; 95% precision in recommendations.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">React</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Node.js</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Python</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Flask</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">MongoDB</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Llama 3.3</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Databricks</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">REST API</span>
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="p-4 rounded-md ring-1 transition-transform duration-300 bg-slate-900/20 ring-slate-700/30 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-fuchsia-500/10 hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 hover:text-white">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <div 
                      className="flex-shrink-0 relative"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={() => handleTouchEnd('spendwise')}
                    >
                      <img 
                        src={projectImages.spendwise[currentImageIndex.spendwise]} 
                        alt="SpendWise" 
                        className="w-full h-40 md:w-64 md:h-40 rounded-lg object-cover ring-1 ring-slate-600/50"
                      />
                      {projectImages.spendwise.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {projectImages.spendwise.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, spendwise: index }))}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 shadow-lg ${
                                index === currentImageIndex.spendwise 
                                  ? 'bg-white ring-2 ring-black/20' 
                                  : 'bg-black/70 hover:bg-black/90'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">SpendWise</h3>
                        <a 
                          href="https://github.com/sahil7992/Spendwise" 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 hover:from-cyan-500/30 hover:to-fuchsia-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-xs md:text-sm text-white/90 hover:text-white"
                        >
                          <img src={assetPath("/github.png")} alt="GitHub" className="w-3 h-3 md:w-4 md:h-4" />
                          <span>View Code</span>
                        </a>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        Personal finance budgeting with gamified goal tracking, interactive dashboards, and spending limits. Used by 15
                        beta users with a 40% increase in goal completion. Backend optimized with REST APIs and async DB access.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">React</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Django</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">MySQL</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Python</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Chart.js</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">REST API</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Async IO</span>
                      </div>
                    </div>
                  </div>
            </div>

                
                <div className="p-4 rounded-md ring-1 transition-transform duration-300 bg-slate-900/20 ring-slate-700/30 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-fuchsia-500/10 hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 hover:text-white">
                  <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                    <div 
                      className="flex-shrink-0 relative"
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={() => handleTouchEnd('imageAuth')}
                    >
                      <img 
                        src={projectImages.imageAuth[currentImageIndex.imageAuth]} 
                        alt="Image Authenticity Detector"
                        className="w-full h-40 md:w-64 md:h-40 rounded-lg object-cover ring-1 ring-slate-600/50"
                        onError={(e) => { e.currentTarget.src = projectImages.imageAuth[0]; }}
                      />
                      {projectImages.imageAuth.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {projectImages.imageAuth.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(prev => ({ ...prev, imageAuth: index }))}
                              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 shadow-lg ${
                                index === currentImageIndex.imageAuth 
                                  ? 'bg-white ring-2 ring-black/20' 
                                  : 'bg-black/70 hover:bg-black/90'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">Image Authenticity Detector</h3>
                        <a 
                          href="https://github.com/sahil7992/Real-vs-AI-Image-Detector" 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-1 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 hover:from-cyan-500/30 hover:to-fuchsia-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-xs md:text-sm text-white/90 hover:text-white"
                        >
                          <img src={assetPath("/github.png")} alt="GitHub" className="w-3 h-3 md:w-4 md:h-4" />
                          <span>View Code</span>
                        </a>
                      </div>
                      <p className="text-sm text-slate-300 mb-3">
                        Distinguishes real vs AI-generated images with 89% accuracy, trained on 10,000 images. Managed full pipeline —
                        data prep, model tuning, predictions, and evaluation — reducing preprocessing time by 80%.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Python</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">PyTorch</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">scikit-learn</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">OpenCV</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">NumPy</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Pandas</span>
                        <span className="text-xs px-2 py-1 rounded bg-slate-800/50 ring-1 ring-slate-700/40">Matplotlib</span>
                      </div>
                    </div>
                  </div>
            </div>
            </div>
          </div>
        </section>

        
        <section id="contact" className="md:snap-start min-h-screen flex items-center overflow-y-auto mt-8 md:mt-0">
          <div className="w-full bg-slate-800/30 rounded-2xl p-4 md:p-6 backdrop-blur-sm ring-1 ring-slate-700/40 overflow-y-auto max-h-full">
            <h2 className="text-xl font-semibold mb-6">Contact Me</h2>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Get In Touch</h3>
                <p className="text-slate-300 text-sm md:text-base">
                  I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology and innovation.
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grid place-items-center bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 rounded-lg flex-shrink-0">
                      <img src={assetPath("/gmail.png")} alt="Email" className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-400">Email</p>
                      <a href="mailto:pambhars99@gmail.com" className="text-white hover:text-cyan-400 transition-colors duration-300 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        pambhars99@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grid place-items-center bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 rounded-lg flex-shrink-0">
                      <img src={assetPath("/linkedin.png")} alt="LinkedIn" className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-400">LinkedIn</p>
                      <a href="https://linkedin.com/in/sp3030" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400 transition-colors duration-300 text-sm break-all">
                        linkedin.com/in/sp3030
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grid place-items-center bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-400/30 rounded-lg flex-shrink-0">
                      <img src={assetPath("/logo.png")} alt="GitHub" className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-400">GitHub</p>
                      <a href="https://github.com/sahil7992" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400 transition-colors duration-300 text-sm break-all">
                        github.com/sahil7992
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 grid place-items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg flex-shrink-0">
                      <img src={assetPath("/leetcode.png")} alt="LeetCode" className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-400">LeetCode</p>
                      <a href="https://leetcode.com/u/Sahilpambhar6555/" target="_blank" rel="noreferrer" className="text-white hover:text-cyan-400 transition-colors duration-300 text-sm break-all">
                        leetcode.com/u/Sahilpambhar6555
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Send a Message</h3>
                
                
                {formSubmitted && (
                  <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                    <p className="text-green-400 text-sm font-medium">Message sent successfully!</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-slate-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={contactForm.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm md:text-base ${
                        formErrors.name ? 'border-red-400/50' : 'border-slate-600/50'
                      }`}
                      placeholder="Your name"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm text-slate-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={contactForm.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm md:text-base ${
                        formErrors.email ? 'border-red-400/50' : 'border-slate-600/50'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm text-slate-300 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleInputChange}
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-sm md:text-base ${
                        formErrors.subject ? 'border-red-400/50' : 'border-slate-600/50'
                      }`}
                      placeholder="What's this about?"
                    />
                    {formErrors.subject && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm text-slate-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      name="message"
                      value={contactForm.message}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-slate-900/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 resize-none text-sm md:text-base ${
                        formErrors.message ? 'border-red-400/50' : 'border-slate-600/50'
                      }`}
                      placeholder="Tell me about your project or opportunity..."
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-400 text-xs mt-1">{formErrors.message}</p>
                    )}
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/20 hover:from-cyan-500/30 hover:to-fuchsia-500/30 border border-cyan-400/30 hover:border-cyan-400/50 rounded-lg transition-all duration-300 text-white hover:text-white font-medium text-sm md:text-base"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        
        <section className="md:snap-start min-h-screen flex items-center justify-center">
          <footer className="text-center text-slate-400 text-sm">
            <div>Designed & built by Sahil</div>
        </footer>
        </section>
      </div>
      </motion.div>
    </div>
  );
}