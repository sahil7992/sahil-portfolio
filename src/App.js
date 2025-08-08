
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function SahilPortfolio() {
  const resumePdf = "/Sahil_Pambhar_Resume25NAZ.pdf";
  const photo = "/1000087301 2.JPG"; // keep your filename
  const canvasRef = useRef(null);
  // ---------- Experience data (parsed from your resume) ----------
  const experiences = [
    {
      company: "Curantis Solutions",
      role: "Software Development Intern",
      location: "Addison, TX",
      dates: "06/2025 – Present",
      logo:"/curantis_solutions_logo.jpeg",
      bullets: [
        "Engineered a Go backend service to auto-select report logic based on benefit types (Medicare/Medicaid), improving eligibility accuracy.",
        "Built Angular feature so patients can access/edit insurance policy numbers, reducing ops overhead.",
        "Delivered patient eligibility via serverless AWS (Lambda + DynamoDB + S3), enabling secure, scalable billing workflows."
      ]
    },
    {
      company: "Bluesap Solutions",
      role: "Software Developer Intern",
      location: "New York, NY",
      dates: "05/2024 – 08/2024",
      logo: "/bluesap_logo.jpg",
      bullets: [
        "Revamped React dashboard UX; improved perceived load by ~35%.",
        "Optimized Flask microservice with in-memory caching; cut API latency ~25% under concurrency.",
        "Improved SDLC with caching/automation to speed up testing & deployments."
      ]
    },
    {
      company: "Vrutti Technologies",
      role: "Full‑stack Developer",
      location: "Surat, Gujarat, India",
      dates: "12/2022 – 07/2023",
      logo: "/vrutti1_logo.jpeg",
      bullets: [
        "Built computer-vision DFM validation for PCBs; 91% defect-detection accuracy, ~20% fewer manufacturing defects.",
        "Set up Jenkins CI/CD; boosted delivery cadence ~80%, cut deploy time from hours to minutes.",
        "Co-built DOCGPT (local Nous‑Hermes LLM): 10+ doc formats → private knowledge base with cited Q&A."
      ]
    },
    {
      company: "Dot com IoT LLP",
      role: "Summer Intern",
      location: "Surat, Gujarat, India",
      dates: "06/2022 – 07/2022",
      logo: "/dotcom_iot_llp_logo.jpeg",
      bullets: [
        "Contributed to defect detection in metal pipe welding; +15% accuracy using supervised learning on real data.",
        "Built foundations in NumPy, Pandas, Matplotlib, scikit‑learn for practical ML workflows."
      ]
    }
  ];
  // ---------- Education data ----------
const education = [
  {
    school: "Stevens Institute of Technology",
    degree: "M.S. in Computer Science",
    location: "Hoboken, NJ",
    dates: "09/2023 – 05/2025",
    logo: "/logos/stevens.png", // drop into /public/logos/
    bullets: [

    ]
  },
  {
    school: "Gujarat Technological University",
    degree: "B.E. in Computer Science",
    location: "Gujarat, India",
    dates: "07/2019 – 06/2023",
    logo: "/logos/gtu.png", // drop into /public/logos/
    bullets: [
    ]
  }
];
  // NEW: splash state
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // lock scroll while splash is visible
    if (showSplash) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setShowSplash(false), 3200); // 3.2s
      return () => {
        clearTimeout(t);
        document.body.style.overflow = prev;
      };
    }
  }, [showSplash]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- Mouse tracking for glow + gentle particle repulsion
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true; };
    const onLeave = () => { mouse.active = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    // --- Particles
    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25
    }));

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Soft cyan glow following the cursor
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(56,189,248,0.16)"); // cyan center
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // --- Particles: update (with gentle repulsion) & draw
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      particles.forEach(p => {
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          const radius = 130;
          if (d2 < radius * radius) {
            const d = Math.sqrt(d2) || 1;
            const force = (radius - d) / radius; // 0..1
            p.speedX += (dx / d) * force * 0.3;
            p.speedY += (dy / d) * force * 0.3;
          }
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.speedX *= 0.985;
        p.speedY *= 0.985;

        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Reusable hover style (kept)
  const card =
    "p-4 rounded-md ring-1 transition-transform duration-300 " +
    "bg-slate-900/20 ring-slate-700/30 " +
    "hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-fuchsia-500/10 " +
    "hover:ring-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 hover:text-white";

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-slate-900 to-black text-slate-100 antialiased overflow-x-hidden">
      {/* background canvas stays pinned while scrolling */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none"></canvas>

      {/* --- Splash screen overlay --- */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: showSplash ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className={`fixed inset-0 z-[60] flex items-center justify-center ${showSplash ? '' : 'pointer-events-none'}`}
        aria-hidden={showSplash ? "false" : "true"}
      >
        <div className="gradient-animate absolute inset-0" />
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-3xl md:text-5xl font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
          >
            Welcome to <span className="opacity-90">Sahil’s Portfolio</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-3 md:mt-4 text-white/90"
          >
            Building reliable, scalable, and user-focused software solutions.
          </motion.p>
        </div>
      </motion.div>

      {/* --- Main site content --- */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: showSplash ? 0 : 1, y: showSplash ? 6 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10"
      >
        <div className="max-w-5xl mx-auto p-6">
          {/* Top navigation with social links */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <a href={resumePdf} target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center w-12 h-12 bg-slate-800/30 rounded-md ring-1 ring-slate-700/30 hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-fuchsia-500/15 hover:ring-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/10 transition-all duration-300 ">
              <img src="/res.png" alt="resume" className="w-6 h-6" />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Download Resume
                </span>
              </a>
            </div>
            <div className="flex items-center gap-3">
              <a href="mailto:pambhars99@gmail.com" className="group relative inline-flex items-center justify-center w-12 h-12 bg-slate-800/30 rounded-md ring-1 ring-slate-700/30 hover:scale-105 transition-transform">
                <img src="/gmail.png" alt="Email" className="w-6 h-6" />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  Email Me
                </span>
              </a>
              <a href="https://linkedin.com/in/sp3030" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center w-12 h-12 bg-slate-800/30 rounded-md ring-1 ring-slate-700/30 hover:scale-105 transition-transform">
                <img src="/linkedin.png" alt="LinkedIn" className="w-6 h-6" />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  LinkedIn Profile
                </span>
              </a>
              <a href="https://github.com/sahil7992" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center w-12 h-12 bg-slate-800/30 rounded-md ring-1 ring-slate-700/30 hover:scale-105 transition-transform">
                <img src="/logo.png" alt="GitHub" className="w-6 h-6" />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  GitHub Profile
                </span>
              </a>
              <a href="https://leetcode.com/your-username" target="_blank" rel="noreferrer" className="group relative inline-flex items-center justify-center w-12 h-12 bg-slate-800/30 rounded-md ring-1 ring-slate-700/30 hover:scale-105 transition-transform">
                <img src="/leetcode.png" alt="LeetCode" className="w-6 h-6" />
                <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                  LeetCode Profile
                </span>
              </a>
            </div>
          </div>
          
          <header className="flex flex-col md:flex-row items-center gap-6 md:gap-10 py-8">
            <div className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden ring-1 ring-slate-600/50">
              <img src={photo} alt="Sahil Pambhar" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
            <h1 className="gradient-text text-3xl md:text-4xl font-bold tracking-tight"> Sahil Dineshbhai Pambhar</h1>
              <p className="mt-2 text-slate-300 max-w-xl">
              Full-stack software engineer with an MS in Computer Science from Stevens Institute of Technology, currently interning at Curantis Solutions. Skilled in Go, Python, React, and AWS, with a track record of delivering scalable microservices, AI-powered RAG applications, and computer vision solutions that drive measurable performance gains and real-world impact.
              </p>
              <div className="mt-4 flex flex-wrap gap-3 items-center">
              </div>
              <div className="mt-4 flex gap-2 text-xs text-slate-400">
                <span className="px-2 py-1 bg-slate-800/50 rounded">Go</span>
                <span className="px-2 py-1 bg-slate-800/50 rounded">React</span>
                <span className="px-2 py-1 bg-slate-800/50 rounded">Python</span>
                <span className="px-2 py-1 bg-slate-800/50 rounded">Computer Vision</span>
                <span className="px-2 py-1 bg-slate-800/50 rounded">LLMs</span>
              </div>
            </div>
          </header>
          {/* ---------- Education (timeline style) ---------- */}
          <section className="bg-slate-800/30 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-slate-700/40">
  <h2 className="text-lg font-semibold">Education</h2>

  <div className="relative mt-4">
    {/* Vertical line */}
    <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-700/40" />

    <ul className="space-y-4">
      {education.map((ed, idx) => (
        <li key={idx} className="relative pl-10">
          {/* Node dot */}
          <span className="absolute left-2 top-4 w-2.5 h-2.5 rounded-full bg-fuchsia-400 ring-4 ring-fuchsia-400/10" />

          <div className="transition-all duration-300 rounded-md ring-1 ring-slate-700/30 bg-slate-900/30 p-4 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-fuchsia-500/15 hover:ring-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/10 hover:text-white">
            {/* header row: logo + school/degree || dates */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={ed.logo}
                  alt={ed.school}
                  className="w-8 h-8 rounded object-contain bg-slate-800/60 ring-1 ring-slate-700/40 flex-shrink-0"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="truncate">
                  <div className="font-medium truncate">{ed.school}</div>
                  <div className="text-xs text-slate-400 truncate">{ed.degree}{ed.location ? ` • ${ed.location}` : ""}</div>
                </div>
              </div>
              <div className="text-xs text-slate-400 whitespace-nowrap">{ed.dates}</div>
            </div>

            {/* bullets */}
            <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-300">
              {ed.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  </div>
</section>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {/* ---------- Minimal Timeline for Experience ---------- */}
          <section className="md:col-span-2 bg-slate-800/30 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-slate-700/40">
            <h2 className="text-xl font-semibold">Experience</h2>

            <div className="relative mt-4">
              {/* Vertical line */}
              <div className="absolute left-3 md:left-4 top-0 bottom-0 w-px bg-slate-700/40" />

              <ul className="space-y-4">
                {experiences.map((exp, idx) => (
                  <li key={idx} className="relative pl-10 md:pl-12">
                    {/* Node dot */}
                    <span className="absolute left-2 md:left-3 top-5 w-2.5 h-2.5 rounded-full bg-cyan-400 ring-4 ring-cyan-400/10" />

                    {/* Card */}
                    <div className="transition-all duration-300 rounded-md ring-1 ring-slate-700/30 bg-slate-900/30 p-4 hover:scale-[1.03] hover:bg-gradient-to-r hover:from-cyan-500/15 hover:to-fuchsia-500/15 hover:ring-cyan-400/40 hover:shadow-lg hover:shadow-cyan-400/10 hover:text-white">
                      {/* Header row: logo + company/role || dates */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={exp.logo}
                            alt={exp.company}
                            className="w-8 h-8 rounded-md object-contain bg-slate-800/60 ring-1 ring-slate-700/40 flex-shrink-0"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                          <div className="truncate">
                            <div className="font-medium truncate">{exp.company}</div>
                            <div className="text-xs text-slate-400 truncate">{exp.role}{exp.location ? ` • ${exp.location}` : ""}</div>
                          </div>
                        </div>
                        <div className="text-xs text-slate-400 whitespace-nowrap">{exp.dates}</div>
                      </div>

                      {/* Bullets */}
                      <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-slate-300">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>


          {/* ---------- Projects (kept) ---------- */}
          <aside className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-800/30 ring-1 ring-slate-700/40">
              <h3 className="text-sm font-medium">Top Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {['Go','Python','React','Flask','Django','OpenCV','SQL','MongoDB','Docker','AWS','CI/CD','LLMs','Computer Vision'].map(s => (
                  <span key={s} className="text-xs px-2 py-1 bg-slate-700/40 rounded">{s}</span>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/30 ring-1 ring-slate-700/40">
              <h3 className="text-sm font-medium">Contact</h3>
              <p className="mt-2 text-sm text-slate-300">
                📍 Hoboken, NJ<br />
                📞 +1 (929) 302-7922<br />
                ✉️ <a href="mailto:pambhars99@gmail.com" className="underline">pambhars99@gmail.com</a>
              </p>

            </div>
            <div className="p-4 rounded-2xl bg-slate-800/30 ring-1 ring-slate-700/40">
              <h3 className="text-sm font-medium">Availability</h3>
              <p className="mt-2 text-sm text-slate-300">Actively seeking full-time software engineering roles. Open to internships. Available for relocation and remote work. F1 visa holder (CPT/OPT eligible).</p>
            </div>
          </aside>
        </main>

        <section className="md:col-span-2 mt-10 bg-slate-800/30 rounded-2xl p-6 backdrop-blur-sm ring-1 ring-slate-700/40">
          <h2 className="text-xl font-semibold">Projects</h2>
          <div className="space-y-4 mt-4">
            <div className={card}>
              <strong>SurroundShield</strong>
              <p className="text-sm mt-1">AI safety app — React, Node, Llama 3. Personalized risk alerts with Databricks-finetuned LLM.</p>
            </div>
            <div className={card}>
              <strong>SpendWise</strong>
              <p className="text-sm mt-1">Finance tracker — Django, React, MySQL. Users can set financial goals and monitor spending through gamified dashboards.</p>
            </div>
            <div className={card}>
              <strong>Image Authenticity Detector</strong>
              <p className="text-sm mt-1">Built a tool to detect AI-generated images using PyTorch and OpenCV. Benchmarked on multiple datasets with strong evaluation framework.</p>
            </div>
          </div>
        </section>

        <footer className="mt-12 text-center text-slate-400 text-sm">
          <div>Designed & built by Sahil — minimal, elegant, and modern.</div>
          <div className="mt-2">© {new Date().getFullYear()} Sahil Pambhar</div>
        </footer>
        </div>
      </motion.div>
    </div>
  );
}