/*
 * Quiet Signal design reminder: warm editorial canvas, ink typography, thin rules,
 * Signal Blue used only for focus/status, generous whitespace, and precise motion.
 */
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AskPrincelyAI } from "@/components/AskPrincelyAI";
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  Github,
  Linkedin,
  Mail,
  MessageCircle,

  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { imagePath } from "@/images";

const assetUrls = {
  signal: imagePath("portrait.webp"),
  logo: imagePath("logo.png"),
  footer: imagePath("footer.png"),
  certificate: "/manus-storage/PrincelyMakhwara_GoogleAIEssentials_ProfessionalCertificate_49876424.pdf",
  budgetIQ: imagePath("budget-iq.png"),
  pfunani: imagePath("pfunani-caring-foundation.png"),
  govguide: imagePath("govguide-ai.png"),
  sentiment: imagePath("sentiment-analyzer.png"),
  axis: imagePath("axis-content-studio.png"),
  personal: imagePath("personal-webpage.png"),
  nova: imagePath("nova-gaming.png"),
  disaster: imagePath("disaster-alleviation.png"),
  capaciti: imagePath("capaciti.jpg"),
  multichoice: imagePath("multichoice.jpg"),
  prodigy: imagePath("prodigy-infotech.jpg"),
};

const formspreeEndpoint = "https://formspree.io/f/mppzzzvy";

const education = [
  { institution: "College of Cape Town", qualification: "MSITA Web Applications Development, Information Technology", dates: "Jan 2020 – Jan 2021", logo: imagePath("college-of-cape-town.jpg"), detail: "Information technology studies focused on web applications development." },
  { institution: "Rosebank International South Africa", qualification: "Diploma in Software Development, Information Technology", dates: "Feb 2023 – Dec 2025", logo: imagePath("rosebank-international.jpg"), detail: "A focused diploma pathway spanning software development, information technology, and applied digital practice." },
  { institution: "Emmanuel Christian Academy", qualification: "NSC, Life Sciences", dates: "2019", logo: imagePath("emmanuel-christian-academy.jpg"), detail: "Secondary education with Life Sciences." },
];

const experienceItems = [
  { company: "Multichoice Support Services (Pty) Ltd", role: "NC: IT End User Computing L3", type: "Internship", dates: "Jun 2021 – May 2022", location: "South Africa · Hybrid", logo: assetUrls.multichoice, detail: "Comprehensive IT training program covering fundamental computing skills and applications.", skills: ["Excel", "Data management", "Access", "Email systems", "End-user computing"], highlights: ["Fundamental mathematics and communication", "GUI applications for Access and email systems", "Excel and data management expertise", "IT end-user computing technologies and workplace skills"] },
  { company: "Prodigy InfoTech", role: "Web Development Intern", type: "Internship", dates: "Oct 2024 – Nov 2024", location: "Remote", logo: assetUrls.prodigy, detail: "A hands-on educational internship focused on web development, collaboration, problem-solving, and shipping meaningful projects.", skills: ["Web development", "Collaboration", "Problem solving", "Project delivery"], highlights: ["Collaborated with a talented team", "Honed practical web development skills", "Contributed to meaningful projects", "Strengthened problem-solving through applied work"] },
  { company: "CAPACITI", role: "Digital Associate: Web Development Trainee", type: "Contract", dates: "Aug 2026 – Present", location: "Cape Town, South Africa", logo: assetUrls.capaciti, detail: "Selected for CAPACITI's Demand Academy programme as a Web Development Trainee, gaining practical experience in modern web development, software engineering, and applied artificial intelligence.", skills: ["Web development", "Software engineering", "Applied AI", "Prompt engineering", "Technical documentation", "Product presentation"], highlights: ["Building web solutions through hands-on development practice", "Completed CAPACITI's AI Skills Accelerator Programme", "Designed and developed Ballast IT, an AI-powered productivity workspace for IT support workflows", "Delivered a functional prototype, technical documentation, and live product walkthrough", "Translating technical concepts into practical solutions and communicating ideas effectively"] },
];

const certificates = [
  { name: "Google AI Essentials", issuer: "Google / Coursera", date: "11 Aug 2026", detail: "Five-course professional certificate covering AI tools, prompting, responsible use, and productivity.", href: "https://coursera.org/share/e8e5b910edbd4b1f8ef629a4201f91d5" },
];

const projects = [
  {
    name: "Disaster Alleviation App",
    description:
      "A platform designed to help coordinate and manage disaster-relief assistance.",
    tags: [".NET 8", "ASP.NET Core MVC", "C#", "Azure SQL"],
    year: "2024",
    art: "disaster",
    className: "project-card--feature",
    href: "https://github.com/Princely24/DisasterAlleviationApplication",
    demoHref: undefined,
  },
  {
    name: "Pfunani Caring Foundation",
    description:
      "A mobile experience for connecting care, communication, and community support.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase"],
    year: "2025",
    art: "caring",
    className: "",
    href: "https://github.com/Princely24/PfunaniFoundation",
    demoHref: undefined,
  },
  {
    name: "BudgetIQ",
    description:
      "A practical budgeting companion that turns personal finance into readable signals.",
    tags: ["Kotlin", "Android", "Data Visualization"],
    year: "2025",
    art: "budget",
    className: "",
    href: "https://github.com/Princely24/BudgetIQ",
    demoHref: undefined,
  },
];

const supportingProjects = [
  {
    name: "GOVGUIDE AI",
    description: "A clearer way to navigate public information with AI.",
    tags: ["React", "AI", "Supabase", "UI/UX"],
    year: "2026",
    visual: "govguide",
    href: "https://github.com/Princely24M/GovGuide_Ai_Chatbot",
    demoHref: "https://govguideai.lovable.app",
  },
  {
    name: "AI Sentiment Analyzer",
    description: "A compact lens for turning language into useful patterns.",
    tags: ["Python", "VADER", "Data Visualization", "AI"],
    year: "2026",
    visual: "sentiment",
    href: "https://github.com/Princely24M/AI-Sentiment-Analyzer",
    demoHref: "https://aisentiment-sp7zjfjg.manus.space",
  },
  {
    name: "AXIS Content Studio",
    description: "An AI-powered content workspace for generating text, images, code, and optimized prompts in one place.",
    tags: ["React", "TypeScript", "Supabase", "AI"],
    year: "2026",
    visual: "axis",
    href: "https://github.com/Princely24M/axis-content-studio",
    demoHref: "https://axis-content-studio.bolt.host",
  },
  {
    name: "Personal Webpage",
    description: "A personal web presence built to share Princely's work and digital profile.",
    tags: ["Web", "Personal site"],
    year: "—",
    visual: "personal",
    href: "https://github.com/Princely24M/Personal-Webpage",
    demoHref: "https://princely24m.github.io/Personal-Webpage/Index.html",
  },
  {
    name: "Nova Gaming",
    description: "A gaming-focused web project with an interactive, entertainment-led experience.",
    tags: ["Gaming", "Web"],
    year: "—",
    visual: "nova",
    href: "https://github.com/Princely24M/Nova-Gaming",
    demoHref: "https://github.com/Princely24M/Nova-Gaming/",
  },
  {
    name: "SkillBridge",
    description: "A web project focused on connecting skills, people, and opportunities.",
    tags: ["Skills", "Web"],
    year: "—",
    visual: "skillbridge",
    href: "https://github.com/Princely24M/SkillBridge",
    demoHref: "https://princely24m.github.io/SkillBridge/",
  },
];

const skillGroups = [
  { label: "Development", items: ["HTML", "CSS", "JavaScript", "C#", ".NET", "Kotlin", "React", "TypeScript"] },
  { label: "Data", items: ["SQL", "Python", "Data Visualization", "Data Analysis", "VADER", "Machine Learning Fundamentals"] },
  { label: "Design", items: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Responsive Design"] },
  { label: "Cloud & Tools", items: ["Azure", "Git", "GitHub", "Supabase", "Firebase"] },
];

function ProjectArt({ type }: { type: string }) {
  return (
    <div className={`project-art project-art--${type}`} aria-hidden="true">
      <div className="art-grid" />
      {type === "disaster" && <img className="project-art-logo" src={assetUrls.disaster} alt="Disaster Alleviation App logo" />}
      {type === "caring" && <img className="project-art-logo" src={assetUrls.pfunani} alt="" />}
      {type === "budget" && <img className="project-art-logo" src={assetUrls.budgetIQ} alt="" />}
    </div>
  );
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="section-label" data-reveal>
      <span className="section-index">{index}</span>
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({ children, href = "#contact" }: { children: ReactNode; href?: string }) {
  return (
    <a className="arrow-link" href={href} data-cursor="link">
      <span>{children}</span>
      <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

function ProjectVisual({ type }: { type: string }) {
  return (
    <div className={`supporting-visual supporting-visual--${type}`} aria-hidden="true">
      {type === "govguide" && <img className="supporting-visual-logo" src={assetUrls.govguide} alt="GOVGUIDE AI logo" />}
      {type === "sentiment" && <img className="supporting-visual-logo" src={assetUrls.sentiment} alt="AI Sentiment Analyzer logo" />}
      {type === "axis" && <img className="supporting-visual-logo" src={assetUrls.axis} alt="AXIS Content Studio logo" />}
      {type === "personal" && <img className="supporting-visual-logo" src={assetUrls.personal} alt="Personal Webpage logo" />}
      {type === "nova" && <img className="supporting-visual-logo" src={assetUrls.nova} alt="Nova Gaming logo" />}
      {type === "skillbridge" && <img className="supporting-visual-logo" src={imagePath("skillbridge.svg")} alt="SkillBridge logo" />}
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState<{ x: number; y: number; label: string } | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [askOpen, setAskOpen] = useState(false);
  const heroRoles = ["Software Developer", "Web Developer", "UI/UX Designer"];
  const [heroRoleIndex, setHeroRoleIndex] = useState(0);
  const [heroRoleVisible, setHeroRoleVisible] = useState(true);
  const [heroRolePaused, setHeroRolePaused] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || heroRolePaused) return;

    let pauseTimer: number | undefined;
    let transitionTimer: number | undefined;
    const scheduleNextRole = (initialPause: boolean) => {
      pauseTimer = window.setTimeout(() => {
        setHeroRoleVisible(false);
        transitionTimer = window.setTimeout(() => {
          setHeroRoleIndex(current => (current + 1) % heroRoles.length);
          setHeroRoleVisible(true);
          scheduleNextRole(false);
        }, 520);
      }, initialPause ? 4600 : 2800);
    };

    scheduleNextRole(heroRoleIndex === 0 && heroRoleVisible);
    return () => {
      if (pauseTimer) window.clearTimeout(pauseTimer);
      if (transitionTimer) window.clearTimeout(transitionTimer);
    };
  }, [heroRoles.length, heroRolePaused]);

  useEffect(() => {
    const previewParams = new URLSearchParams(window.location.search);
    if (previewParams.get("ask") === "1") setAskOpen(true);
    const requestedTheme = previewParams.get("theme");
    if (requestedTheme === "dark" && theme === "light") toggleTheme?.();
    if (requestedTheme === "light" && theme === "dark") toggleTheme?.();
  }, [theme, toggleTheme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    document.body.classList.add("has-custom-cursor");
    const move = (event: PointerEvent) => setCursor((current) => ({ x: event.clientX, y: event.clientY, label: current?.label ?? "" }));
    const over = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const interactive = target.closest<HTMLElement>("[data-cursor]");
      if (interactive) setCursor((current) => ({ x: current?.x ?? event.clientX, y: current?.y ?? event.clientY, label: interactive.dataset.cursor ?? "" }));
    };
    const out = (event: PointerEvent) => {
      const related = event.relatedTarget as HTMLElement | null;
      if (!related?.closest?.("[data-cursor]")) setCursor((current) => current ? { ...current, label: "" } : null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    window.addEventListener("pointerout", out);
    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerout", out);
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reduceMotion) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleContactSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("submitting");
    try {
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email");
      if (typeof email === "string" && email.trim()) {
        formData.set("_replyto", email.trim());
      }
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        const details = await response.json().catch(() => null) as { error?: string; errors?: Array<{ message?: string }> } | null;
        console.error("[Contact form] Formspree rejected the submission", details ?? response.status);
        throw new Error(details?.errors?.[0]?.message || details?.error || "Formspree submission failed");
      }
      event.currentTarget.reset();
      setFormStatus("success");
    } catch {
      setFormStatus("error");
    }
  };

  return (
    <div className="site-shell">
      <div className="ambient-grid" aria-hidden="true" />
      {cursor && <div className={`custom-cursor ${cursor.label ? "custom-cursor--active" : ""}`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true"><img src={assetUrls.logo} alt="" /></div>}
      <div className="ask-princely-shell">
        {askOpen && <AskPrincelyAI onClose={() => setAskOpen(false)} />}
        {!askOpen && <button className="ask-princely-trigger" type="button" onClick={() => setAskOpen(true)} aria-label="Open Ask Princely AI" data-cursor="link"><MessageCircle size={17} /><span>Ask Princely AI</span></button>}
      </div>

      <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
        <a href="#top" className="wordmark wordmark--mark-only" aria-label="Princely home" data-cursor="link">
          <span className="wordmark-mark"><img src={assetUrls.logo} alt="" /></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work" data-cursor="link">Work</a>
          <a href="#about" data-cursor="link">About</a>
          <a href="#experience" data-cursor="link">Experience</a>
          <a href="#education" data-cursor="link">Education</a>
          <a href="#certificates" data-cursor="link">Certificates</a>
          <a href="#contact" data-cursor="link">Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => toggleTheme?.()} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} data-cursor="link">
            {theme === "light" ? <Moon size={17} strokeWidth={1.8} /> : <Sun size={17} strokeWidth={1.8} />}
          </button>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu" aria-expanded={menuOpen}>
            <Menu size={22} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <button className={`mobile-menu-backdrop ${menuOpen ? "mobile-menu-backdrop--open" : ""}`} onClick={closeMenu} aria-label="Close navigation menu" aria-hidden={!menuOpen} tabIndex={menuOpen ? 0 : -1} />
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-head">
          <span className="eyebrow">Navigation / 00</span>
          <button className="menu-toggle" onClick={closeMenu} aria-label="Close navigation menu"><X size={22} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {[['Work', '#work'], ['About', '#about'], ['Experience', '#experience'], ['Education', '#education'], ['Certificates', '#certificates'], ['Contact', '#contact']].map(([label, href], index) => (
            <a href={href} key={label} onClick={closeMenu} data-cursor="link"><span>0{index + 1}</span>{label}<ArrowUpRight size={20} /></a>
          ))}
        </nav>
        <div className="mobile-menu-foot">Princely / Software · Design · Data</div>
      </div>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-layout container">
            <div className="hero-copy">
              <div className="availability" data-reveal><span className="signal-dot" />Available for opportunities</div>
              <p className="hero-kicker" data-reveal>Independent developer / designer</p>
              <h1 className="hero-headline" data-reveal><span className="hero-headline-line hero-headline-line--ink">Hi, I’m Princely.</span><span className="hero-headline-line hero-headline-line--muted hero-role-line" aria-live="polite"><span className={`hero-rotating-title hero-rotating-title--role-${heroRoleIndex} ${heroRoleVisible ? "hero-rotating-title--visible" : "hero-rotating-title--exiting"}`} tabIndex={0} onMouseEnter={() => setHeroRolePaused(true)} onMouseLeave={() => setHeroRolePaused(false)} onFocus={() => setHeroRolePaused(true)} onBlur={() => setHeroRolePaused(false)}>{heroRoles[heroRoleIndex]}</span></span></h1>
              <p className="hero-intro" data-reveal>I build thoughtful digital experiences where technology meets design and data.</p>
              <div className="hero-actions" data-reveal>
                <Button asChild className="pill-button pill-button--dark"><a href="#work" data-cursor="link">View my work <ArrowDown size={15} /></a></Button>
                <Button asChild variant="outline" className="pill-button pill-button--outline"><a href="#contact" data-cursor="link">Let’s talk <ArrowUpRight size={15} /></a></Button>
                <Button asChild variant="ghost" className="pill-button pill-button--ghost"><a href="/manus-storage/princely-cv_d5460980.pdf" download="Princely-CV.pdf" data-cursor="link">Download CV <ArrowDownToLine size={15} /></a></Button>
              </div>
            </div>
            <div className="hero-aside" data-reveal>
              <div className="hero-aside-top"><span>01</span></div>
              <figure className="hero-figure">
                <img src={assetUrls.signal} alt="Portrait of Princely in graduation attire" />
                <figcaption><span>Software development graduate</span><span>Cape Town, South Africa</span></figcaption>
              </figure>
              <div className="hero-aside-bottom"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} /></div>
            </div>
          </div>
        </section>

        <section className="intro-strip section-pad section-pad--tight" data-reveal>
          <div className="container intro-strip-inner">
            <span className="strip-mark">✳</span>
            <p className="intro-strip-statement"><span className="intro-word">Technology,</span>{" "}<span className="intro-word">design</span>{" "}<span className="intro-word">and</span>{" "}<span className="intro-word">data</span>{" "}<span className="intro-word">should</span>{" "}<span className="intro-word">make</span>{" "}<span className="intro-word">the</span>{" "}<span className="intro-word">next</span>{" "}<span className="intro-word">decision</span>{" "}<span className="intro-word">clearer.</span></p>
            <span className="strip-index">01 / 06</span>
          </div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="container about-layout">
            <SectionLabel index="01">About</SectionLabel>
            <div className="about-content">
              <h2 data-reveal>A builder with a soft spot for useful things.</h2>
              <div className="about-columns" data-reveal>
                <p>A software developer who enjoys building useful digital products, designing intuitive interfaces, and working with data to turn information into meaningful insights.</p>
                <p className="muted-copy">I like the part where a messy idea becomes a clear path forward—one screen, system, or signal at a time.</p>
              </div>
              <div className="capability-list" data-reveal>
                {["Software Development", "UI/UX Design", "Data Analytics", "AI & Machine Learning"].map((item, index) => (
                  <div className="capability-item" key={item}><span>0{index + 1}</span><strong>{item}</strong><ArrowUpRight size={16} /></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="work-section section-pad">
          <div className="container">
            <div className="section-heading-row" data-reveal>
              <SectionLabel index="02">Selected work</SectionLabel>
              <span className="heading-note">A small archive of meaningful experiments / 2024—2026</span>
            </div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <article className={`project-card ${project.className}`} key={project.name} data-reveal data-cursor="view">
                  <div className="project-image-wrap">
                    <ProjectArt type={project.art} />
                    <span className="project-arrow"><ArrowUpRight size={20} /></span>
                  </div>
                  <div className="project-meta-row"><span>{String(index + 1).padStart(2, "0")} / 03</span><span>{project.year}</span></div>
                  <div className="project-copy"><h3>{project.name}</h3><p>{project.description}</p></div>
                  <div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
                  <div className="project-actions"><a className="project-action" href={project.href} target="_blank" rel="noreferrer" data-cursor="link"><Github size={14} /><span>GitHub</span></a>{project.demoHref && <a className="project-action project-action--demo" href={project.demoHref} target="_blank" rel="noreferrer" data-cursor="link"><ArrowUpRight size={15} /><span>Live Demo</span></a>}</div>
                </article>
              ))}
            </div>
            <div className="supporting-projects" data-reveal>
              <div className="supporting-header"><span>Supporting projects</span><span>03 / 09</span></div>
              {supportingProjects.map((project, index) => (
                <article className="supporting-project" key={project.name} data-cursor="view">
                  <div className="supporting-index">0{index + 4}</div>
                  <ProjectVisual type={project.visual} />
                  <div className="supporting-copy"><h3>{project.name}</h3><p>{project.description}</p></div>
                  <div className="supporting-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <span className="supporting-year">{project.year}</span>
                  <ArrowUpRight className="supporting-arrow" size={18} />
                  {project.href && <div className="supporting-actions"><a className="project-action" href={project.href} target="_blank" rel="noreferrer" data-cursor="link"><Github size={13} /><span>GitHub</span></a>{project.demoHref && <a className="project-action project-action--demo" href={project.demoHref} target="_blank" rel="noreferrer" data-cursor="link"><ArrowUpRight size={14} /><span>Live Demo</span></a>}</div>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="container experience-layout">
            <SectionLabel index="03">Experience</SectionLabel>
              <div className="experience-content">
                {experienceItems.map((item) => <article className="timeline-item experience-card" key={`${item.company}-${item.role}`} data-reveal tabIndex={0} aria-label={`${item.company}, ${item.role}. Skills used: ${item.skills.join(", ")}`}><div className="timeline-marker"><span /></div><div className="timeline-date">{item.dates}</div><div className="timeline-company"><img src={item.logo} alt={`${item.company} logo`} /><div><h3>{item.company}</h3><p>{item.role} · {item.type}</p><span className="timeline-detail">{item.location} · {item.detail}</span><div className="experience-skills" aria-label="Skills used">{item.skills.map((skill) => <span className="experience-skill" key={skill}>{skill}</span>)}</div>{item.highlights.length > 0 && <ul className="timeline-highlights">{item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}</div></div></article>)}
              </div>
          </div>
        </section>

          <section id="education" className="education-section section-pad section-pad--compact">
            <div className="container education-layout">
              <SectionLabel index="04">Education</SectionLabel>
              <div className="education-content">
                {education.map((item) => <article className="credential-row" key={item.institution} data-reveal><div className="credential-main"><img className="credential-logo" src={item.logo} alt={`${item.institution} logo`} /><div><span className="credential-dates">{item.dates}</span><h3>{item.institution}</h3><p>{item.qualification}</p><span className="credential-detail">{item.detail}</span></div></div><ArrowUpRight size={17} /></article>)}
              </div>
            </div>
          </section>

          <section id="certificates" className="certificates-section section-pad section-pad--compact">
            <div className="container certificates-layout">
              <SectionLabel index="05">Certificates</SectionLabel>
              <div className="certificates-content">
                {certificates.map((certificate) => <article className="certificate-card" key={certificate.name} data-reveal><div className="certificate-topline"><span className="credential-dates">{certificate.date}</span><span className="certificate-status"><Check size={14} /> Verified</span></div><h3>{certificate.name}</h3><p className="certificate-issuer">{certificate.issuer}</p><p>{certificate.detail}</p><div className="certificate-actions"><a className="arrow-link" href={certificate.href} target="_blank" rel="noreferrer" data-cursor="link"><span>Verify certificate</span><ArrowUpRight size={16} /></a><a className="arrow-link" href={assetUrls.certificate} download="Princely-Google-AI-Essentials-Certificate.pdf" data-cursor="link"><span>Download certificate</span><ArrowDownToLine size={16} /></a></div></article>)}
              </div>
            </div>
          </section>

          <section className="skills-section section-pad section-pad--compact">
          <div className="container">
            <div className="section-heading-row" data-reveal><SectionLabel index="06">Skills / toolkit</SectionLabel><span className="heading-note">Tools are a means. Clarity is the measure.</span></div>
            <div className="skills-grid" data-reveal>
              {skillGroups.map((group, groupIndex) => <article className="skill-group" key={group.label}><div className="skill-group-top"><span className="skill-group-index">0{groupIndex + 1}</span><span className="skill-group-count">{String(group.items.length).padStart(2, "0")} tools</span></div><h3>{group.label}</h3><div className="skill-chip-list">{group.items.map((item) => <span className="skill-chip" key={item}><i aria-hidden="true" />{item}</span>)}</div></article>)}
            </div>
          </div>
        </section>

        <section className="philosophy-section section-pad">
          <div className="container philosophy-layout">
            <div className="philosophy-intro" data-reveal><SectionLabel index="07">Design philosophy</SectionLabel><h2>Make it clear.<br /><span>Then make it matter.</span></h2><p>Every project is an opportunity to remove a little friction and leave someone with a clearer next step.</p></div>
            <div className="principle-list">
              {[['01', 'Clarity', 'Interfaces should be understandable before they are impressive.'], ['02', 'Purpose', 'Every interaction should serve a purpose.'], ['03', 'Curiosity', 'Technology, design and data should work together to solve meaningful problems.']].map(([number, title, copy]) => <div className="principle" key={number} data-reveal><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ArrowUpRight size={17} /></div>)}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="container contact-layout">
            <SectionLabel index="08">Contact</SectionLabel>
            <div className="contact-content" data-reveal><h2>Let’s build something <em>meaningful.</em></h2><p>Have a project, opportunity, or question worth exploring? Send a note and it will reach Princely’s inbox.</p>{formStatus === "success" ? <div className="form-success" role="status" aria-live="polite"><div className="form-success-mark"><Check size={20} strokeWidth={2.2} /></div><div><span className="eyebrow">Message delivered</span><h3>Thanks for reaching out.</h3><p>Your note is on its way to Princely’s inbox. I’ll get back to you as soon as possible.</p></div><button type="button" className="arrow-link form-retry" onClick={() => setFormStatus("idle")}>Send another message <ArrowUpRight size={16} /></button></div> : <form className="contact-form" action={formspreeEndpoint} method="POST" onSubmit={handleContactSubmit} aria-busy={formStatus === "submitting"}><input type="hidden" name="_subject" value="New portfolio enquiry for Princely" /><label><span>Name</span><input name="name" type="text" placeholder="Your name" required /></label><label><span>Email</span><input name="email" type="email" placeholder="you@example.com" required /></label><label><span>Message</span><textarea name="message" rows={5} placeholder="Tell me what you’re working on…" required /></label><button className="pill-button pill-button--dark submit-button" type="submit" disabled={formStatus === "submitting"}>{formStatus === "submitting" ? <><span>Sending…</span><span className="submit-button-spinner" aria-hidden="true" /></> : <><span>Send message</span><ArrowUpRight size={15} /></>}</button>{formStatus === "error" ? <p className="form-note form-note--error" role="alert">Something went wrong while sending. Please try again or email princelymakhwara@gmail.com directly.</p> : <p className="form-note">Your message will be sent securely through Formspree to princelymakhwara@gmail.com.</p>}</form>}<div className="contact-actions"><ArrowLink href="https://github.com/">View GitHub</ArrowLink><a className="arrow-link" href="/manus-storage/princely-cv_d5460980.pdf" download="Princely-CV.pdf" data-cursor="link"><span>Download CV</span><ArrowDownToLine size={16} /></a></div></div>
            <div className="contact-links" data-reveal><a href="mailto:princelymakhwara@gmail.com" data-cursor="link"><Mail size={16} />princelymakhwara@gmail.com</a><a href="https://github.com/" data-cursor="link"><Github size={16} />GitHub</a><a href="https://www.linkedin.com/in/princely-makhwara-096285197/" data-cursor="link"><Linkedin size={16} />LinkedIn</a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner"><a href="#top" className="wordmark wordmark--mark-only" aria-label="Princely home" data-cursor="link"><span className="wordmark-mark"><img src={assetUrls.logo} alt="" /></span></a><span>Software Developer · UI/UX Designer · Data Analyst</span><span>© 2026 Princely</span></div>
        <div className="footer-art-bottom" data-reveal><img src={assetUrls.footer} alt="Princely P and wordmark footer artwork" /></div>
      </footer>
    </div>
  );
}
