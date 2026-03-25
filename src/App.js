import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Animated counter (counts up when scrolled into view) ── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(ease * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ── Shared animation variants ── */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
};

const textReveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

/* ════════════════════════════════════════════════════════════ */
export default function SahilPortfolio() {
  const publicUrl = process.env.PUBLIC_URL || "";
  const assetPath = (p) => `${publicUrl}${encodeURI(p)}`;

  const resumePdf = assetPath("/Sahil_Pambhar_2627.pdf");
  const photo = assetPath("/1000087301 2.JPG");

  /* ── State ── */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState({
    kaalsync: 0,
    surroundshield: 0,
    spendwise: 0,
    imageAuth: 0,
  });
  const glowRef = useRef(null);
  const warpRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* ── Data ── */
  const roleTitles = [
    "Software Engineer",
    "Full Stack Engineer",
    "Backend Engineer",
  ];

  const metrics = [
    { value: 87, suffix: "%", label: "Enterprise-scale report speedup" },
    { value: 15, suffix: "K+", label: "Patient records in P1 recovery" },
    { value: 30, suffix: "+", label: "Dashboards powering billing ops" },
    { value: 91, suffix: "%", label: "ML defect detection accuracy" },
  ];

  const experiences = [
    {
      company: "Curantis Solutions",
      role: "Full Stack Engineer (AI, Data)",
      location: "Addison, TX",
      dates: "06/2025 – Present",
      logo: assetPath("/curantis_solutions_logo.jpeg"),
      current: true,
      bullets: [
        { highlight: "Building Curantis AI", detail: "Building in-house clinical intelligence platform — voice transcription (Whisper + medical NER), document summarization, and agentic RAG support chat powered by Confluence knowledge base. Zero external API inference. Agent guides users with follow-up questions, escalates to live agent, and creates support tickets when stuck. HIPAA-compliant, ~$0.003/interaction" },
        { highlight: "Go microservices for billing", detail: "Designed and shipped Go REST APIs for healthcare billing workflows — Payer Config, Care Levels, CMS-compliant rates — replacing a 3-day manual process, cutting billing errors 30%" },
        { highlight: "Frontend development", detail: "Built and maintained Angular clinical UI — patient dashboards, billing views, and internal admin tools used daily by clinical and operations staff" },
        { highlight: "87% faster reports", detail: "Rebuilt enterprise reporting infrastructure serving 7,000+ monthly downloads across 30+ QuickSight dashboards backed by 40+ Redshift datasets" },
        { highlight: "P1 billing outage resolved", detail: "Traced root cause through ETL pipeline to Postgres dependency failure and Redshift storage overflow; restored revenue-critical invoicing blocked for 2 months" },
        { highlight: "15K+ patient records recovered", detail: "Diagnosed pipeline failure from undocumented DynamoDB schema change; traced data through Kinesis streams and restored full integrity" },
      ],
    },
    {
      company: "Bluesap Solutions",
      role: "Software Developer Intern",
      location: "New York, NY",
      dates: "05/2024 – 08/2024",
      logo: assetPath("/bluesap_logo.jpg"),
      bullets: [
        { highlight: "35% faster page loads", detail: "Rebuilt React frontend with optimized rendering and lazy loading, improving Core Web Vitals" },
        { highlight: "25% lower API latency", detail: "Optimized Flask microservice with in-memory caching under concurrent load" },
      ],
    },
    {
      company: "Vrutti Technologies",
      role: "Software Engineer, AI/ML",
      location: "Surat, Gujarat, India",
      dates: "12/2022 – 07/2023",
      logo: assetPath("/vrutti1_logo.jpeg"),
      bullets: [
        { highlight: "91% defect detection", detail: "Built computer-vision DFM validation for PCBs, reducing manufacturing defects by ~20%" },
        { highlight: "80% faster deployments", detail: "Set up Jenkins CI/CD pipeline, cutting deploy time from hours to minutes" },
        { highlight: "DOCGPT knowledge base", detail: "Co-built local LLM system (Nous-Hermes) processing 10+ doc formats into private knowledge base with cited Q&A; built AngularJS frontend and REST API integration" },
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
      coursework:
        "Distributed Systems, Machine Learning, Cloud Computing, Database Management, Algorithms",
    },
    {
      school: "Gujarat Technological University",
      degree: "B.E. in Computer Science",
      location: "Gujarat, India",
      dates: "07/2019 – 06/2023",
      logo: assetPath("/logos/gtu.png"),
    },
  ];

  const skills = {
    "Programming Languages": [
      "Go / Golang",
      "Python",
      "TypeScript",
      "JavaScript",
      "Java",
      "C/C++",
      "SQL",
    ],
    "Frameworks & Libraries": [
      "Angular",
      "Spring Boot",
      "React",
      "FastAPI",
      "Flask",
      "Django",
      "PyTorch",
      "OpenCV",
    ],
    "AI & Data Engineering": [
      "RAG",
      "LLM Integration",
      "AWS Bedrock",
      "FAISS",
      "Prompt Engineering",
      "NER (scispaCy)",
      "ETL/ELT Pipelines",
      "Data Modeling",
      "Data Warehousing",
      "Event-Driven Architecture",
    ],
    "Databases & Cloud": [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "DynamoDB",
      "Amazon Redshift",
      "AWS Lambda",
      "S3",
      "EC2",
      "API Gateway",
      "Kinesis",
      "SageMaker",
      "DMS",
      "IAM",
      "CloudWatch",
      "CodePipeline",
      "QuickSight",
      "AWS CDK",
    ],
    "Tools & Platforms": [
      "Claude Code",
      "Cursor",
      "Codex",
      "Docker",
      "Jenkins",
      "Databricks",
      "Git/GitHub",
      "CI/CD",
      "RESTful APIs",
      "Microservices",
      "Serverless",
      "Distributed Systems",
    ],
  };

  const projectImages = {
    kaalsync: [],
    surroundshield: [
      assetPath("/ss/Untitled design.png"),
      assetPath("/ss/Screenshot 2025-04-02 at 9.34.25 PM.png"),
    ],
    spendwise: [
      assetPath("/spendwise/a logo.png"),
      assetPath("/spendwise/dashboard (1).png"),
      assetPath("/spendwise/Goal Tracker.png"),
      assetPath("/spendwise/Goal Tracker(Add_edit).png"),
    ],
    imageAuth: [
      assetPath("/image auth/st.png"),
    ],
  };

  const projects = [
    {
      key: "kaalsync",
      title: "KaalSync",
      featured: true,
      badge: "In Development",
      badgeColor: "amber",
      description:
        "Smart scheduling platform built for frictionless service businesses — maximizing revenue by eliminating wasted time. For in-location visits: intelligent slot optimization so no minute goes unused. For doorstep services: route optimizer that cuts fuel costs and gives customers live ETA updates with exact arrival times. Built to help service providers make the most money from every hour.",
      tech: [
        "Next.js 16",
        "React 19",
        "Go",
        "AWS CDK",
        "Cognito",
        "Postgres",
        "DynamoDB",
        "Turborepo",
        "Expo",
        "React Native",
      ],
    },
    {
      key: "surroundshield",
      title: "SurroundShield",
      github: "https://github.com/sahil7992/SurroundShield",
      description:
        "AI-powered safety application that delivers personalized risk alerts by analyzing location and health metrics — protecting users from extreme weather, pollution spikes, and natural disasters. Fine-tuned and integrated Llama 3.3 via Databricks Playground; 95% precision in recommendations.",
      tech: [
        "React",
        "Node.js",
        "Python",
        "Flask",
        "MongoDB",
        "Llama 3.3",
        "Databricks",
        "REST API",
      ],
    },
    {
      key: "spendwise",
      title: "SpendWise",
      github: "https://github.com/sahil7992/Spendwise",
      description:
        "Personal finance platform with gamified goal tracking, real-time spending dashboards, and configurable budget limits. Tracked goal completion rates with a 40% improvement over baseline across the beta cohort. Backend built with Django REST framework and async database access for low-latency reads under concurrent sessions.",
      tech: [
        "React",
        "Django",
        "MySQL",
        "Python",
        "Chart.js",
        "REST API",
        "Async IO",
      ],
    },
    {
      key: "imageAuth",
      title: "Image Authenticity Detector",
      github: "https://github.com/sahil7992/Real-vs-AI-Image-Detector",
      description:
        "Deep learning classifier using ResNet152 to distinguish real vs AI-generated images with 89% accuracy, trained on 10,000 images. Managed full ML pipeline — data prep, model fine-tuning, and accuracy assessments — reducing preprocessing time by 80%.",
      tech: [
        "Python",
        "ResNet152",
        "PyTorch",
        "scikit-learn",
        "NumPy",
        "Pandas",
      ],
    },
  ];

  /* ── Effects ── */

  // Role title rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roleTitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roleTitles.length]);

  // Cursor spotlight (desktop only)
  useEffect(() => {
    const handleMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
      }
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Warp speed — alpha trails + chromatic aberration (RGB split per streak)
  useEffect(() => {
    const canvas = warpRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const NUM = 200;
    const SPEED = 4;
    const DEPTH = 1000;
    let w, h, cx, cy;
    const sx = new Float32Array(NUM);
    const sy = new Float32Array(NUM);
    const sz = new Float32Array(NUM);

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cx = w / 2;
      cy = h / 2;
    }
    resize();

    for (let i = 0; i < NUM; i++) {
      sx[i] = (Math.random() - 0.5) * w * 2;
      sy[i] = (Math.random() - 0.5) * h * 2;
      sz[i] = Math.random() * DEPTH;
    }

    // Temp arrays for projected positions
    const hx = new Float32Array(NUM);
    const hy = new Float32Array(NUM);
    const tx = new Float32Array(NUM);
    const ty = new Float32Array(NUM);

    let animId;
    function frame() {
      // Fade to black — high alpha clears ghost trails fast
      ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
      ctx.fillRect(0, 0, w, h);

      // Update + project
      for (let i = 0; i < NUM; i++) {
        sz[i] -= SPEED;
        if (sz[i] <= 0) {
          sx[i] = (Math.random() - 0.5) * w * 2;
          sy[i] = (Math.random() - 0.5) * h * 2;
          sz[i] = DEPTH;
        }
        hx[i] = (sx[i] / sz[i]) * 300 + cx;
        hy[i] = (sy[i] / sz[i]) * 300 + cy;
        tx[i] = (sx[i] / (sz[i] + 10)) * 300 + cx;
        ty[i] = (sy[i] / (sz[i] + 10)) * 300 + cy;
      }

      // Green tint (offset left, subtle)
      ctx.strokeStyle = "rgba(80, 255, 160, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < NUM; i++) {
        ctx.moveTo(tx[i] - 1, ty[i] - 0.5);
        ctx.lineTo(hx[i] - 1, hy[i] - 0.5);
      }
      ctx.stroke();

      // White core (center, brightest)
      ctx.strokeStyle = "rgba(240, 245, 255, 0.55)";
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      for (let i = 0; i < NUM; i++) {
        ctx.moveTo(tx[i], ty[i]);
        ctx.lineTo(hx[i], hy[i]);
      }
      ctx.stroke();

      // Blue tint (offset right, subtle)
      ctx.strokeStyle = "rgba(80, 150, 255, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < NUM; i++) {
        ctx.moveTo(tx[i] + 1, ty[i] + 0.5);
        ctx.lineTo(hx[i] + 1, hy[i] + 0.5);
      }
      ctx.stroke();

      animId = requestAnimationFrame(frame);
    }

    function onResize() { resize(); }
    frame();

    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Keyboard navigation (1-5 jumps to sections)
  useEffect(() => {
    const sections = ["experience", "projects", "skills", "contact"];
    const handleKey = (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= sections.length) {
        document
          .getElementById(sections[num - 1])
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  /* ── Helpers ── */
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const nextImage = (key) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [key]: (prev[key] + 1) % projectImages[key].length,
    }));
  };

  const prevImage = (key) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [key]:
        prev[key] === 0
          ? projectImages[key].length - 1
          : prev[key] - 1,
    }));
  };

  /* ════════════════════════════════════════════════════════════
     JSX
     ════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* ─── WARP SPEED BACKGROUND (behind everything) ─── */}
      <div className="fixed inset-0 z-0" style={{ background: "#000" }}>
        <canvas ref={warpRef} className="absolute inset-0 w-full h-full" />
      </div>

      <div className="relative z-10 min-h-screen text-white antialiased">
      {/* Skip to content */}
      <a
        href="#experience"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[70] focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-black focus:rounded-lg"
      >
        Skip to content
      </a>

      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-emerald-500 z-[60]"
        style={{ width: `${scrollProgress * 100}%`, transition: "width 0.1s linear" }}
      />

      {/* Cursor glow (desktop) */}
      <div ref={glowRef} className="cursor-glow hidden md:block" />

      {/* ─── NAVIGATION ─── */}
      {/* Desktop floating pill */}
      <nav className="hidden md:block fixed top-6 left-1/2 -translate-x-1/2 z-50" aria-label="Main navigation">
        <div className="flex items-center gap-1 px-2 py-1.5 glass-intense rounded-full shadow-2xl shadow-black/50">
          {["experience", "projects", "skills", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => scrollToSection(s)}
              className="px-4 py-1.5 text-[13px] text-zinc-400 hover:text-white rounded-full hover:bg-white/[0.06] active:scale-95 transition-all capitalize"
            >
              {s}
            </button>
          ))}
          <a
            href={resumePdf}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-1.5 text-[13px] bg-emerald-500/10 text-emerald-400 rounded-full hover:bg-emerald-500/20 active:scale-95 transition-all border border-emerald-500/20 font-medium"
          >
            Resume
          </a>
        </div>
      </nav>

      {/* Mobile hamburger */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="w-10 h-10 grid place-items-center glass-intense rounded-xl"
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {["experience", "projects", "skills", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(s)}
                  className="text-3xl font-light text-zinc-300 hover:text-white capitalize transition-colors"
                >
                  {s}
                </button>
              ))}
              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="mt-4 px-8 py-3 text-lg bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Resume
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row items-center lg:items-center gap-12 pt-20 lg:pt-0">
          <div className="flex-1 min-w-0">
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex items-center gap-2.5 mb-8"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-emerald-400 text-sm font-medium tracking-wide">
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black tracking-tighter leading-[0.85]"
            >
              SAHIL
              <br />
              <span className="text-zinc-600">PAMBHAR</span>
            </motion.h1>

            {/* Role rotation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-5 h-7 md:h-8 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentRoleIndex}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg md:text-xl gradient-text font-medium"
                >
                  {roleTitles[currentRoleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* One-liner */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-5 text-zinc-400 max-w-xl text-base md:text-lg leading-relaxed"
            >
              Software engineer with 2+ years building HIPAA-compliant
              production systems and data pipelines in healthcare. I ship
              Go microservices that process 15,000+ patient records and
              power enterprise billing at scale. Go, Python, AWS.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href={resumePdf}
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3 bg-white text-[#050505] font-semibold rounded-full hover:bg-zinc-200 active:scale-[0.97] transition-all text-sm"
              >
                Download Resume
              </a>
              <a
                href="mailto:pambhars99@gmail.com?subject=Opportunity%20from%20Portfolio"
                className="px-7 py-3 border border-white/20 rounded-full hover:bg-white/[0.05] active:scale-[0.97] transition-all text-sm"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex items-center gap-3 mt-8"
            >
              {[
                {
                  href: "https://linkedin.com/in/sp3030",
                  label: "LinkedIn",
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
                },
                {
                  href: "https://github.com/sahil7992",
                  label: "GitHub",
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
                },
                {
                  href: "mailto:pambhars99@gmail.com",
                  label: "Email",
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="group w-10 h-10 grid place-items-center rounded-full border border-white/[0.08] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-all text-zinc-500 hover:text-emerald-400"
                  aria-label={link.label}
                >
                  {link.svg}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="relative group">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-transparent to-cyan-500/15 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <img
                src={photo}
                alt="Sahil Pambhar"
                className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 object-cover rounded-2xl ring-1 ring-white/[0.1] shadow-2xl shadow-black/50"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-5 h-8 border border-zinc-700 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-0.5 h-2 bg-zinc-600 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── IMPACT METRICS ─── */}
      <section className="section-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="text-4xl md:text-5xl font-black text-emerald-400 tabular-nums metric-glow">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </div>
                <p className="text-zinc-500 text-sm mt-2">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" className="section-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.h2
            {...textReveal}
            className="text-3xl md:text-4xl font-black tracking-tight mb-12"
          >
            Experience
          </motion.h2>
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
                className={`glass glass-shine p-5 md:p-6 rounded-xl transition-all duration-300 ${
                  exp.current
                    ? "!border-emerald-500/20 !bg-emerald-500/[0.04] shadow-lg shadow-emerald-500/[0.05]"
                    : "glass-hover"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      loading="lazy"
                      className="w-10 h-10 rounded-lg object-contain bg-zinc-900 ring-1 ring-white/[0.06] flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-base md:text-lg">
                          {exp.company}
                        </h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm">
                        {exp.role}
                        {exp.location && ` · ${exp.location}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-zinc-500 text-sm whitespace-nowrap">
                    {exp.dates}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="bullet-item text-zinc-400 text-sm leading-relaxed"
                    >
                      <strong className="text-white">{b.highlight}</strong>
                      {" — "}
                      {b.detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section id="projects" className="section-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <motion.h2
            {...textReveal}
            className="text-3xl md:text-4xl font-black tracking-tight mb-12"
          >
            Projects
          </motion.h2>
          <div className="space-y-8">
            {projects.map((proj, idx) => {
              const images = projectImages[proj.key];
              const imgIdx = currentImageIndex[proj.key];
              return (
                <motion.div
                  key={proj.key}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`card-premium glass glass-hover glass-shine p-5 md:p-6 rounded-xl ${
                    proj.featured
                      ? "!border-emerald-500/15 ring-1 ring-emerald-500/10"
                      : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    {/* Image carousel / branded placeholder */}
                    <div className="flex-shrink-0 relative group">
                      {images.length > 0 ? (
                        <img
                          src={images[imgIdx]}
                          alt={proj.title}
                          loading="lazy"
                          className="w-full h-44 md:w-64 md:h-44 rounded-lg object-cover ring-1 ring-white/[0.06] bg-zinc-900"
                          onError={(e) => {
                            if (images[0])
                              e.currentTarget.src = images[0];
                          }}
                        />
                      ) : (
                        <div className="w-full h-44 md:w-64 md:h-44 rounded-lg ring-1 ring-white/[0.1] bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-purple-500/15 flex items-center justify-center">
                          <span className="text-2xl font-black tracking-tight text-white/70 select-none">{proj.title}</span>
                        </div>
                      )}
                      {images.length > 1 && (
                        <>
                          {/* Arrows (desktop hover) */}
                          <button
                            onClick={() => prevImage(proj.key)}
                            aria-label="Previous image"
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white/80 grid place-items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-xs"
                          >
                            ‹
                          </button>
                          <button
                            onClick={() => nextImage(proj.key)}
                            aria-label="Next image"
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white/80 grid place-items-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity text-xs"
                          >
                            ›
                          </button>
                          {/* Dots */}
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {images.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                aria-label={`Go to image ${dotIdx + 1}`}
                                onClick={() =>
                                  setCurrentImageIndex((prev) => ({
                                    ...prev,
                                    [proj.key]: dotIdx,
                                  }))
                                }
                                className="p-1.5"
                              >
                                <span
                                  className={`carousel-dot block w-2 h-2 rounded-full ${
                                    dotIdx === imgIdx
                                      ? "bg-white"
                                      : "bg-white/30"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h3 className="text-lg font-bold">{proj.title}</h3>
                        {proj.github ? (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full border border-white/[0.08] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-all text-zinc-300 hover:text-white"
                          >
                            <img
                              src={assetPath("/github.png")}
                              alt="GitHub"
                              className="w-3.5 h-3.5 opacity-60"
                            />
                            View Code
                          </a>
                        ) : proj.badge ? (
                          <span
                            className={`px-3 py-1.5 text-xs font-medium rounded-full border ${
                              proj.badgeColor === "emerald"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : proj.badgeColor === "amber"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-zinc-800 text-zinc-400 border-zinc-700"
                            }`}
                          >
                            {proj.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                        {proj.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map((t) => (
                          <span
                            key={t}
                            className="skill-tag text-xs px-2.5 py-1 rounded-full bg-zinc-800/60 ring-1 ring-white/[0.06] text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── SKILLS & EDUCATION ─── */}
      <section id="skills" className="section-line py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20">
            {/* Skills */}
            <div>
              <motion.h2
                {...textReveal}
                className="text-3xl md:text-4xl font-black tracking-tight mb-10"
              >
                Skills
              </motion.h2>
              <div className="space-y-6">
                {Object.entries(skills).map(([group, items], gIdx) => (
                  <motion.div
                    key={group}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gIdx * 0.08 }}
                  >
                    <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-3">
                      {group}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="skill-tag text-xs px-3 py-1.5 rounded-full bg-zinc-800/60 ring-1 ring-white/[0.06] text-zinc-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <motion.h2
                {...textReveal}
                className="text-3xl md:text-4xl font-black tracking-tight mb-10"
              >
                Education
              </motion.h2>
              <div className="space-y-6">
                {education.map((ed, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="glass glass-shine p-5 rounded-xl"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={ed.logo}
                        alt={ed.school}
                        loading="lazy"
                        className="w-10 h-10 rounded-lg object-contain bg-zinc-900 ring-1 ring-white/[0.06] flex-shrink-0 mt-0.5"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div>
                        <h3 className="font-semibold">{ed.school}</h3>
                        <p className="text-zinc-400 text-sm">{ed.degree}</p>
                        <p className="text-zinc-500 text-xs mt-1">
                          {ed.location} · {ed.dates}
                        </p>
                        {ed.coursework && (
                          <p className="text-zinc-500 text-xs mt-3 leading-relaxed">
                            <span className="text-zinc-400 font-medium">
                              Coursework:
                            </span>{" "}
                            {ed.coursework}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="relative section-line py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <motion.h2
            {...textReveal}
            className="text-4xl md:text-6xl font-black tracking-tight"
          >
            Let's talk.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg mt-4 max-w-md mx-auto"
          >
            Currently exploring backend, data engineering, and full-stack
            opportunities. Based in Hoboken, NJ — open to remote, hybrid, or
            relocation.
          </motion.p>

          {/* Big email CTA */}
          <motion.a
            href="mailto:pambhars99@gmail.com?subject=Opportunity%20from%20Portfolio"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="email-link inline-block mt-8 text-xl md:text-2xl text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
          >
            pambhars99@gmail.com
          </motion.a>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 text-sm mt-2"
          >
            (929) 302-7922
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            {[
              {
                href: "https://linkedin.com/in/sp3030",
                label: "LinkedIn",
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
              },
              {
                href: "https://github.com/sahil7992",
                label: "GitHub",
                svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>,
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group w-11 h-11 grid place-items-center rounded-full border border-white/[0.08] hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-all text-zinc-500 hover:text-emerald-400"
                aria-label={link.label}
              >
                {link.svg}
              </a>
            ))}
          </motion.div>

          {/* Resume button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <a
              href={resumePdf}
              target="_blank"
              rel="noreferrer"
              className="inline-block px-8 py-3 bg-white text-[#050505] font-semibold rounded-full hover:bg-zinc-200 active:scale-[0.97] transition-all text-sm"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="section-line py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 text-xs">
          <span>Designed & engineered by Sahil</span>
          <span>
            Press 1–4 to navigate sections
          </span>
        </div>
      </footer>
    </div>
    </>
  );
}
