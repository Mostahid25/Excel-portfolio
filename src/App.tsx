/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileSpreadsheet,
  Cpu,
  BarChart3,
  Network,
  LineChart,
  GitBranch,
  Terminal,
  Layers,
  GraduationCap,
  Award,
  ChevronRight,
  Menu,
  X,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ClipboardList,
  Camera,
  Upload,
  User,
  Download
} from 'lucide-react';

// Import local data & types
import {
  BIO_DATA,
  STATS_DATA,
  CORE_SKILLS_DATA,
  PROJECTS_DATA,
  EXPERIENCE_DATA,
  TOOLS_DATA,
  CERTIFICATIONS_DATA
} from './data';

// Import custom components
import ContactForm from './components/ContactForm';

export default function App() {
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('user-theme') || 'theme-emerald';
  });

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('user-theme', newTheme);
  };

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Profile picture customizable state
  const [avatarSrc, setAvatarSrc] = useState<string | null>(() => {
    return localStorage.getItem('user-avatar-base64') || null;
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarSrc(base64String);
        localStorage.setItem('user-avatar-base64', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarSrc(base64String);
        localStorage.setItem('user-avatar-base64', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Close mobile menu helper
  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'about-section', label: 'About' },
    { id: 'skills-section', label: 'Skills' },
    { id: 'projects-section', label: 'Featured Projects' },
    { id: 'experience-section', label: 'Experience' },
    { id: 'certifications-section', label: 'Certifications' },
  ];

  return (
    <div className={`min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection-accent ${theme}`}>
      
      {/* 1. Glassmorphism Top Navigation Header */}
      <nav className="sticky top-0 z-40 bg-[#080c14c5] backdrop-blur-md border-b border-slate-900 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center text-slate-950 font-mono font-bold text-sm shadow-accent">
                M
              </span>
              <div className="text-left">
                <span className="font-display font-bold text-slate-100 block text-sm tracking-tight leading-none">{BIO_DATA.name}</span>
                <span className="font-mono text-5xs text-accent tracking-wider">MICROSOFT EXCEL ANALYST</span>
              </div>
            </div>

            {/* Desktop Nav Items */}
            <div 
              className="hidden md:flex items-center gap-1 font-mono text-xs"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="relative px-3.5 py-1.5 rounded-md text-slate-400 hover:text-slate-100 transition-colors duration-250 focus:outline-none"
                >
                  {hoveredIndex === idx && (
                    <motion.span
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 bg-accent-dim border border-accent-dim rounded-md -z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              ))}
              <button onClick={() => handleNavClick('contact-section')} className="text-accent border border-accent-dim bg-accent-dim/40 px-3 py-1.5 rounded-md hover-bg-accent transition-all active:scale-95 ml-2">Inquire</button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-400 hover:text-slate-100 p-2 outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-900 bg-[#080c14] font-mono text-xs text-left shadow-2xl"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="block w-full text-left py-2 px-3 rounded-md text-slate-400 hover-text-accent hover:bg-accent-dim/20 transition-all font-semibold"
                  >
                    {item.label}
                  </button>
                ))}
                
                <button onClick={() => handleNavClick('contact-section')} className="block w-full text-center py-2.5 mt-2 text-accent border border-accent-dim bg-accent-dim/40 rounded-md">Inquire</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Body container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-24 print:p-0">
        
        {/* 2. Hero Header & Contact Coordination Section */}
        <section id="about-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-900 pb-16 scroll-mt-20">
          
          {/* Left Hero block: Text info */}
          <div className="lg:col-span-8 text-left space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase block animate-pulse">
                EXCEL ANALYST · PORTFOLIO
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-slate-100 tracking-tight leading-none uppercase">
                {BIO_DATA.name}
              </h1>
              <p className="text-sm sm:text-base font-mono font-medium text-slate-400">
                Excel Analyst · Data Modeling · Dashboard Design · Automation
              </p>
            </div>

            {/* Quick contact badge bar */}
            <div className="flex flex-wrap gap-2.5 font-mono text-3xs sm:text-2xs">
              <a href="mailto:mostahidgm@gmail.com" className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:border-accent-dim px-3 py-1.5 rounded-full transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent" />
                {BIO_DATA.email}
              </a>
              <a href="https://linkedin.com/in/mostahid" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:border-accent-dim px-3 py-1.5 rounded-full transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-accent" />
                {BIO_DATA.linkedin}
              </a>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-full">
                <Phone className="w-3.5 h-3.5 text-accent" />
                {BIO_DATA.phone}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                {BIO_DATA.location}
              </span>
            </div>

            {/* Explanatory bio */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono font-bold text-slate-450 uppercase tracking-widest">
                // ABOUT
              </h3>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl">
                {BIO_DATA.about}
              </p>
            </div>
          </div>

          {/* Right Hero block: High fidelity customizable portrait circle */}
          <div className="lg:col-span-4 flex justify-center">
            <div 
              className={`relative group cursor-pointer select-none transition-transform duration-300 active:scale-98 ${isDragging ? 'scale-105' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              title="Click or drag and drop to upload your professional picture!"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleAvatarChange} 
                accept="image/*" 
                className="hidden" 
              />

              {/* Outer light glow */}
              <div className="absolute inset-0 bg-gradient-to-tr gradient-accent rounded-full blur-2xl opacity-15 group-hover:opacity-25 transition-all duration-700" />
              
              {/* Main Circular Frame */}
              <div className={`w-48 h-48 md:w-60 md:h-60 rounded-full bg-[#121926] border-2 relative z-10 overflow-hidden flex items-center justify-center shadow-2xl transition-all duration-500 ${isDragging ? 'border-accent scale-102 shadow-accent-dim' : 'border-slate-800 group-hover:border-accent/40'}`}>
                
                {avatarSrc ? (
                  <img 
                    src={avatarSrc} 
                    alt="G.M Mostahid Profile" 
                    className="w-full h-full object-cover object-center relative z-10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  /* Original High Fidelity Vector SVG representation as default */
                  <svg className="w-[85%] h-[85%] text-slate-450 relative z-10" viewBox="0 0 100 100" fill="none">
                    {/* Outer circle rings */}
                    <circle cx="50" cy="50" r="46" stroke="#1f293d" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="50" cy="50" r="42" stroke="var(--color-accent-primary)" strokeWidth="0.5" strokeOpacity="0.4" />
                    
                    {/* Dynamic analyst character silhouette icon */}
                    <path d="M50 20 C42 20 37 25 37 32 C37 39 42 41 45 44 C34 46 22 55 22 66 C22 75 78 75 78 66 C78 55 66 46 55 44 C58 41 63 39 63 32 C63 25 58 20 50 20 Z" fill="#2d3748" opacity="0.85" />
                    
                    {/* Analysts reading glasses in green glow */}
                    <rect x="42" y="29" width="6" height="4" rx="1" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
                    <rect x="52" y="29" width="6" height="4" rx="1" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
                    <line x1="48" y1="31" x2="52" y2="31" stroke="var(--color-accent-primary)" strokeWidth="1.5" />
                    
                    {/* Reflective mathematical cells flying background */}
                    <path d="M22 30 H28" stroke="var(--color-accent-primary)" strokeOpacity="0.5" />
                    <path d="M72 45 H78" stroke="#06b6d4" strokeOpacity="0.5" />
                    <circle cx="28" cy="40" r="1.5" fill="var(--color-accent-primary)" />
                    <circle cx="70" cy="27" r="2" fill="#06b6d4" />
                  </svg>
                )}

                {/* Upload action overlay on hover */}
                <div className="absolute inset-0 bg-[#080c14eb] bg-opacity-70 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <Camera className="w-6 h-6 text-accent mb-1 animate-bounce" />
                  <span className="text-[9px] font-mono font-bold text-slate-100 uppercase tracking-widest block">
                    {avatarSrc ? "Change Photo" : "Upload Photo"}
                  </span>
                  <span className="text-[7px] font-mono text-slate-450 tracking-wider block mt-1">
                    Drag-and-drop or select file
                  </span>
                </div>

                {/* Floating G.M Mostahid tag */}
                <div className="absolute bottom-4 z-30 bg-[#080c14] border border-accent-dim rounded-full px-3 py-1 font-mono text-4xs text-accent shadow-md">
                  G.M Mostahid
                </div>

              </div>

              {/* Reset Photo option if photo exists */}
              {avatarSrc && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setAvatarSrc(null);
                    localStorage.removeItem('user-avatar-base64');
                  }}
                  className="absolute -top-1 -right-1 z-30 w-7 h-7 bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/20 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 no-print"
                  title="Remove photo"
                >
                  <span className="text-sm">×</span>
                </button>
              )}
            </div>
          </div>

        </section>

        {/* 3. At a Glance Statistics Bento Grid */}
        <section id="stats-section" className="scroll-mt-20">
          <div className="text-left mb-6">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wide">
              // AT A GLANCE
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS_DATA.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, borderColor: "var(--color-accent-primary)" }}
                className="bg-[#121926] border border-slate-805 rounded-xl p-5 md:p-6 text-center select-none shadow-lg cursor-default transition-colors duration-300"
              >
                <div className="text-3xl md:text-4xl font-mono font-bold text-accent tracking-tight">
                  {stat.value}
                </div>
                <div className="text-3xs md:text-2xs font-mono text-slate-400 mt-2 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Core Compentencies progress indicators */}
        <section id="skills-section" className="border-b border-slate-900 pb-16 scroll-mt-20">
          <div className="text-left mb-8">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wide">
              // EXPERT SKILLSETS
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-100 mt-1">
              Core Technical Competence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {CORE_SKILLS_DATA.map(sk => (
              <div key={sk.id} className="bg-[#121926] border border-slate-805 rounded-lg p-4 md:p-5">
                <div className="flex justify-between items-center mb-2 text-xs font-mono">
                  <span className="text-slate-200 font-bold">{sk.name}</span>
                  <span className="text-accent font-bold">{sk.level} ({sk.percentage}%)</span>
                </div>
                <div className="w-full bg-[#080c14] h-2 rounded-full overflow-hidden border border-slate-850">
                  <motion.div
                    className="h-full bg-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${sk.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Featured Projects Section */}
        <section id="projects-section" className="scroll-mt-20">
          
          <div className="text-left mb-8">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wide">
              // PROJECT ARCHIVES
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-100 mt-1">
              Featured Data Projects
            </h3>
            <p className="text-slate-400 text-xs mt-1 font-sans">
              A detailed catalog of corporate data projects detailing objectives, core pipeline transformations, and technical achievements.
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {[
              {
                title: "Sales Performance Dashboard",
                category: "Dashboard",
                description: "Interactive Excel dashboard tracking KPIs, regional sales trends, and rep performance using pivot charts, slicers, and conditional formatting.",
                highlights: [
                  "Engineered dynamic KPI cards using consolidated multi-source datasets to monitor regional monthly sales targets.",
                  "Developed interactive PivotTables with configured slicers and timeline controls allowing immediate drill-downs.",
                  "Designed conditional formatting alert systems notifying management of branch inventory underperformance."
                ],
                tools: ["Excel", "PivotTables", "Pivot Charts", "Slicers", "Conditional Formatting"]
              },
              {
                title: "Monthly Report Automation",
                category: "Automation",
                description: "VBA macro that auto-generates monthly reports from raw data, formats output, and emails stakeholders — reducing manual effort by 80%.",
                highlights: [
                  "Programmed custom Outlook SMTP automation scripts sending formatted PDF reports to stakeholders dynamically.",
                  "Built a central control macro that imports, cleans, normalizes, and aggregates raw data sheets automatically.",
                  "Implemented robust error handling to prevent spreadsheet corruption during database query failures."
                ],
                tools: ["VBA Macros", "Outlook SMTP", "FSO", "Excel Events"]
              },
              {
                title: "Multi-source ETL Pipeline",
                category: "Data Pipeline",
                description: "Power Query pipeline that consolidates data from 5 CSV sources, cleans inconsistencies, and feeds a unified data model for analysis.",
                highlights: [
                  "Authored tailored M Language scripts to normalize mixed date formats, trim trailing spaces, and split SKU strings.",
                  "Constructed a reliable data-refresh pipeline that synchronizes spreadsheet structures when newer files arrive.",
                  "Implemented table mergers and custom conditional columns to dynamically map tax codes by region."
                ],
                tools: ["Power Query", "M Language", "ETL", "CSV Merges"]
              },
              {
                title: "Financial Overview Power BI Report",
                category: "BI Report",
                description: "End-to-end Power BI report with DAX measures, custom visuals, and row-level security for a finance team of 12 stakeholders.",
                highlights: [
                  "Engineered responsive cash flow trend-lines and cumulative margin calculations using complex DAX measures.",
                  "Designed a clear semantic schema relating balance sheets, regional offices, and seasonal timeframes.",
                  "Configured customizable interactive drill-through targets on key financial categories for deep audits."
                ],
                tools: ["Power BI", "DAX", "Data Modeling", "Drill-Throughs"]
              },
              {
                title: "Inventory Demand Model",
                category: "Forecasting",
                description: "Excel-based demand forecasting model using moving averages, seasonality factors, and scenario analysis to optimize stock levels.",
                highlights: [
                  "Modeled seasonal indexes to match peak distribution spikes and correct standard inventory holding costs.",
                  "Integrated Scenario Managers and Solver inputs for What-If calculations based on fluctuating transport rates.",
                  "Plotted rolling 3-month moving average boundaries to safeguard warehouse levels against volatile supply grids."
                ],
                tools: ["Moving Averages", "Scenario Manager", "What-If Analysis", "Seasonality Adjustments"]
              },
              {
                title: "Star Schema Data Model",
                category: "Modeling",
                description: "Designed a star schema data model in Excel with fact and dimension tables, enabling efficient cross-table analysis via Power Pivot.",
                highlights: [
                  "Organized decentralized business columns into dedicated Fact_Sales and Dim_Customers/Dim_Products schemas.",
                  "Integrated Power Pivot models to run cross-tabular analytics without using resource-intensive VLOOKUP functions.",
                  "Configured calendar tables to create dynamic custom grouping categories like Quarter, fiscal period, and weekend stats."
                ],
                tools: ["Power Pivot", "Star Schema", "Relationships", "Excel Pivot"]
              }
            ].map((proj, idx) => {
              // Custom category badges formatting
              let catBadge = "bg-slate-800 text-slate-400";
              if (proj.category === 'Dashboard') catBadge = "bg-accent-dim text-accent border border-accent-dim";
              if (proj.category === 'Automation') catBadge = "bg-cyan-500/10 text-cyan-400 border border-cyan-500/25";
              if (proj.category === 'Data Pipeline') catBadge = "bg-purple-500/10 text-purple-400 border border-purple-500/25";
              if (proj.category === 'BI Report') catBadge = "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20";
              if (proj.category === 'Forecasting') catBadge = "bg-pink-500/10 text-pink-400 border border-pink-500/25";
              if (proj.category === 'Modeling') catBadge = "bg-amber-500/10 text-amber-500 border border-amber-500/10";

              return (
                <div key={idx} className="bg-[#121926] border border-slate-805 rounded-xl p-5 md:p-6 text-left flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`text-4xs font-mono font-bold uppercase py-0.5 px-2 rounded-full border ${catBadge}`}>
                        {proj.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-display font-black text-white uppercase tracking-tight">
                        {proj.title}
                      </h4>
                      <p className="text-3xs text-slate-400 font-sans mt-1 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-2 border-t border-slate-900 pt-3">
                      <span className="text-4xs font-mono font-bold text-slate-500 uppercase tracking-widest block">
                        Impact & Highlights
                      </span>
                      <ul className="space-y-1.5 pl-4 list-disc text-3xs text-slate-300 leading-relaxed font-sans">
                        {proj.highlights.map((hl, hIdx) => (
                          <li key={hIdx}>{hl}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-900 flex flex-wrap gap-1.5 font-mono text-4xs">
                    {proj.tools.map((t, tIdx) => (
                      <span key={tIdx} className="bg-slate-950 px-2 py-0.5 rounded text-slate-450">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </section>

        {/* 6. Professional Experience Chronology */}
        <section id="experience-section" className="border-t border-slate-900 pt-16 scroll-mt-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            
            {/* Left Header columns */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wide">
                // TIMELINE RECORD
              </span>
              <h3 className="text-2xl font-display font-bold text-slate-100">
                Experience Chronology
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                A summary of G.M. Mostahid's freelance consultancies and operational internships, translating statistics and tabular architectures for small scale corporate structures.
              </p>
            </div>

            {/* Right details: Timeline cards */}
            <div className="lg:col-span-8 space-y-6">
              {EXPERIENCE_DATA.map(exp => (
                <div key={exp.id} className="bg-[#121926] border border-slate-805 rounded-xl p-5 md:p-6 text-left relative overflow-hidden">
                  {/* Absolute date marker */}
                  <div className="absolute top-0 right-0 bg-[#080c14] border-b border-l border-slate-805 text-4xs font-mono font-bold text-accent py-1.5 px-3 rounded-bl-lg">
                    {exp.period}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-base font-display font-extrabold text-white">
                        {exp.role}
                      </h4>
                      <p className="text-2xs font-mono text-slate-500 mt-1">
                        🏢 {exp.company} &nbsp;·&nbsp; 📍 {exp.location}
                      </p>
                    </div>

                    <ul className="space-y-2 text-2xs text-slate-400 font-sans leading-relaxed list-disc pl-4">
                      {exp.highlights.map((item, key) => (
                        <li key={key}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. Tools & Technologies */}
        <section className="border-t border-slate-900 pt-16 text-left">
          
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wide">
              // SOFTWARE CAPABILITIES
            </span>
            <h4 className="text-xl font-display font-medium text-slate-100">
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2 pt-2">
              {TOOLS_DATA.map(tool => (
                <span
                  key={tool}
                  className="bg-[#121926] border border-slate-805 text-slate-300 font-mono text-2xs px-3.5 py-1.5 rounded-md hover:border-accent-dim transition-all select-none"
                >
                  🛠️ {tool}
                </span>
              ))}
            </div>
          </div>

        </section>

        {/* 7.5. Academics & Certifications */}
        <section id="certifications-section" className="border-t border-slate-900 pt-16 text-left scroll-mt-20">
          
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold text-slate-500 block uppercase tracking-wide">
              // LICENSING CREDENTIALS
            </span>
            <h4 className="text-2xl font-display font-bold text-slate-100">
              Academics & Certifications
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-2xs text-slate-350 mt-4">
              
              <div className="bg-[#121926] border border-slate-805 p-4 rounded-lg flex items-center justify-between hover:border-accent-dim transition-all">
                <div className="flex items-center gap-3">
                  <GraduationCap className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <span className="text-slate-200 font-bold block leading-none">Bsc in Statistics</span>
                    <span className="text-3xs text-slate-500 mt-1.5 block">Khulna Academic College</span>
                  </div>
                </div>
                <span className="text-3xs text-accent bg-accent-dim px-2.5 py-1 rounded font-bold">Graduated</span>
              </div>

              {CERTIFICATIONS_DATA.map(cert => (
                <div key={cert.name} className="bg-[#121926] border border-slate-805 p-4 rounded-lg flex items-center justify-between hover:border-accent-dim transition-all">
                  <div className="flex items-center gap-3">
                    <Award className="w-6 h-6 text-accent shrink-0" />
                    <span className="text-slate-200 font-semibold">{cert.name}</span>
                  </div>
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-3xs font-mono font-bold text-accent bg-accent-dim border border-accent-dim px-2.5 py-1 rounded inline-flex items-center gap-1 hover-bg-accent transition-all active:scale-95 cursor-pointer no-print"
                    >
                      Verify <ChevronRight className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <span className="text-3xs text-slate-400 bg-[#080c14] px-2 py-0.5 rounded border border-slate-850">Credential</span>
                  )}
                </div>
              ))}

            </div>
          </div>

        </section>

        {/* 9. Contact form requested */}
        <section id="contact-section" className="border-t border-slate-900 pt-16 pb-8 scroll-mt-20 scroll-offset no-print">
          <ContactForm />
        </section>

        {/* Resume Download Section */}
        <section className="border-t border-slate-900 pt-16 pb-16 text-center scroll-mt-20 no-print flex flex-col items-center justify-center">
          <p className="text-slate-400 font-mono text-xs mb-6">// FULL PROFESSIONAL RESUME // </p>
          <a
            href="https://drive.google.com/drive/folders/19Yja9AjieCxZrlrln7hiMGxCCnOUv_nD?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-bold font-mono text-sm px-8 py-4 rounded-lg hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </section>

      </main>

      {/* 10. Footer Section */}
      <footer className="border-t border-slate-900 bg-[#060a12] py-8 text-neutral-500 font-mono text-3xs tracking-wider no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <p>© {new Date().getFullYear()} G.M Mostahid. Portfolio compiled successfully.</p>
            <p className="text-neutral-600 mt-0.5">Engine: React 19 + TypeScript + Tailwind 4 (CJS CommonJS production compiled)</p>
          </div>
          <div className="flex gap-4">
            <a href="mailto:mostahidgm@gmail.com" className="hover:text-emerald-400 transition-colors">mostahidgm@gmail.com</a>
            <span>·</span>
            <a href="https://linkedin.com/in/mostahid" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">LinkedIn Profile</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
