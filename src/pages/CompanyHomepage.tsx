import React, { useState } from 'react';

// --- 아이콘 유틸리티 ---
const iconDefaults: React.SVGProps<SVGSVGElement> = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const iconProps = (props: React.SVGProps<SVGSVGElement>) => ({
  ...iconDefaults,
  ...props,
});

// --- 아이콘 컴포넌트 ---
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);
const IconGithub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const IconMail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
);
const IconFileText: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>
);
const IconMenu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
);
const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
);
const IconCheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
);
const IconArrowDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>
);
const IconLayers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>
);
const IconCloudCog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><path d="M20 16.2A8.97 8.97 0 0 0 12 6a8.97 8.97 0 0 0-8 10.2" /><circle cx="12" cy="17" r="3" /><path d="M12 14v-1" /><path d="M12 21v-1" /><path d="M15 17h1" /><path d="M8 17h1" /><path d="m14.2 14.8-.7.7" /><path d="m8.5 19.5-.7.7" /><path d="m14.2 19.2-.7-.7" /><path d="m8.5 14.5-.7-.7" /></svg>
);
const IconBarChart3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><path d="M3 3v18h18" /><path d="M7 12h4v6H7z" /><path d="M12 7h4v11h-4z" /><path d="M17 3h4v15h-4z" /></svg>
);
const IconCpu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>
);
const IconGlobe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const IconServer: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>
);

// --- 1. 헤더 (Header) ---
const Header: React.FC<{ onMobileMenuToggle: () => void; isMobileMenuOpen: boolean }> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const navItems = [
    { name: '홈', href: '#' },
    { name: '소개', href: '#about' },
    { name: '기술 스택', href: '#tech' },
    { name: '포트폴리오', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 transition-all duration-300 border-b border-slate-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={() => window.scrollTo(0,0)}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg text-white group-hover:shadow-lg transition-all duration-300">
                <IconCode className="h-6 w-6" />
            </div>
            <div className="ml-3 flex flex-col">
                 <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">Comfunny</span>
                 <span className="text-[10px] font-bold text-blue-600 tracking-[0.2em] uppercase mt-0.5">Developers</span>
            </div>
          </div>
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors py-2">
                {item.name}
              </a>
            ))}
          </nav>
          <div className="lg:hidden">
            <button onClick={onMobileMenuToggle} className="p-2 rounded-md text-slate-500 hover:bg-slate-100 focus:outline-none">
              {isMobileMenuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-100 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navItems.map((item) => (
              <a key={item.name} href={item.href} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50" onClick={onMobileMenuToggle}>
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

// --- Hero 배경 패턴 ---
const HeroPattern = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_400px,#dbeafe,transparent)] opacity-40"></div>
        <div className="absolute top-[10%] left-[5%] w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-blob mix-blend-multiply"></div>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"></div>
        <div className="absolute -bottom-32 left-[30%] w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-multiply"></div>
        <svg className="absolute top-20 right-0 lg:right-20 w-64 h-64 opacity-20 text-blue-200" viewBox="0 0 100 100" fill="currentColor">
             <rect x="10" y="10" width="30" height="30" rx="4" />
             <rect x="50" y="40" width="40" height="40" rx="4" />
             <circle cx="25" cy="70" r="10" />
        </svg>
    </div>
);

// --- 2. 히어로 (Hero) 섹션 ---
const HeroSection: React.FC = () => (
  <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
    <HeroPattern />
    <div className="container relative z-10 px-4 text-center">
      <span className="inline-block py-1.5 px-4 mb-8 rounded-full bg-white/50 backdrop-blur-sm text-slate-500 text-xs font-bold tracking-[0.2em] uppercase border border-slate-200 shadow-sm">
        Since 2025 • Web & App Studio
      </span>
      <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-8 drop-shadow-sm">
        COMFUNNY
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient-x">
          DEVELOPERS
        </span>
      </h1>
      <p className="mt-6 text-lg md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
        <span className="font-semibold text-slate-900">즐거운 코드</span>가 완벽한 결과를 만듭니다. <br className="hidden md:block"/>
        비즈니스의 본질을 꿰뚫는 디지털 솔루션.
      </p>
    </div>
    <div className="absolute bottom-12 animate-bounce">
      <a href="#about" className="flex flex-col items-center text-slate-400 hover:text-blue-600 transition-colors cursor-pointer group">
        <span className="text-xs font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity">Scroll Down</span>
        <IconArrowDown className="w-6 h-6" />
      </a>
    </div>
  </section>
);

// --- 3. 소개 (About) ---
const AboutSection: React.FC = () => (
  <section id="about" className="py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1 group">
            <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="absolute inset-0 border-2 border-slate-100 rounded-3xl transform -rotate-2"></div>
            <img
            className="relative rounded-3xl shadow-xl w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-[1.01]"
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Team working together"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Who We Are</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
            일은 <span className="text-blue-600">프로</span>처럼,<br/>과정은 <span className="text-indigo-500">유쾌</span>하게.
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            <b>Comfunny Developers(컴디)</b>는 'Company'와 'Funny'의 합성어입니다. 
            딱딱한 개발 과정에 유머와 위트를 더해, 클라이언트와 개발자 모두가 즐거운 프로젝트를 지향합니다.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["책임감 있는 커뮤니케이션", "최신 기술 트렌드 적용", "유지보수가 쉬운 코드", "사용자 중심 UI/UX"].map((item, idx) => (
                <div key={idx} className="flex items-center">
                    <IconCheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- 4. [REVISED] 기술 스택 (Tech Stack) - Modern Card & Dashboard UI ---
interface TechItem {
    name: string;
    icon: React.ReactNode;
    category: "Frontend" | "Backend" | "DevOps" | "Tools";
}

const TechStackSection: React.FC<{ selectedTech: string | null, onSelectTech: (tech: string | null) => void }> = ({ selectedTech, onSelectTech }) => {
    
    // 카테고리 탭 상태
    const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "DevOps">("All");

    const techData: TechItem[] = [
        { name: "React", category: "Frontend", icon: <IconGlobe className="w-6 h-6" /> },
        { name: "TypeScript", category: "Frontend", icon: <IconCode className="w-6 h-6" /> },
        { name: "Next.js", category: "Frontend", icon: <IconLayers className="w-6 h-6" /> },
        { name: "TailwindCSS", category: "Frontend", icon: <IconCode className="w-6 h-6" /> },
        { name: "Vite", category: "Frontend", icon: <IconCpu className="w-6 h-6" /> },
        { name: "Node.js", category: "Backend", icon: <IconServer className="w-6 h-6" /> },
        { name: "Python", category: "Backend", icon: <IconCode className="w-6 h-6" /> },
        { name: "Docker", category: "DevOps", icon: <IconLayers className="w-6 h-6" /> },
        { name: "AWS", category: "DevOps", icon: <IconCloudCog className="w-6 h-6" /> },
        { name: "Nginx", category: "DevOps", icon: <IconServer className="w-6 h-6" /> },
        { name: "Linux", category: "DevOps", icon: <IconCpu className="w-6 h-6" /> },
        { name: "Git", category: "Tools", icon: <IconGithub className="w-6 h-6" /> },
    ];

    const filteredTechs = activeCategory === "All" 
        ? techData 
        : techData.filter(t => t.category === activeCategory);

    return (
        <section id="tech" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Tech Proficiency</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Our Technology Stack
                    </h3>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                        프로젝트에 최적화된 최신 기술을 사용하여 안정적이고 확장 가능한 결과물을 만듭니다. 
                        아래 기술을 클릭하면 관련 포트폴리오를 확인하실 수 있습니다.
                    </p>
                </div>

                {/* 카테고리 탭 */}
                <div className="flex justify-center mb-10 flex-wrap gap-2">
                    {["All", "Frontend", "Backend", "DevOps"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat as any)}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeCategory === cat
                                    ? "bg-slate-900 text-white shadow-lg transform scale-105"
                                    : "bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Tech Cards Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredTechs.map((tech) => (
                        <button
                            key={tech.name}
                            onClick={() => onSelectTech(selectedTech === tech.name ? null : tech.name)}
                            className={`
                                relative group flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300
                                ${selectedTech === tech.name 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-xl scale-105 ring-4 ring-blue-100" 
                                    : "bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1"
                                }
                            `}
                        >
                            <div className={`mb-3 p-3 rounded-full ${selectedTech === tech.name ? "bg-white/20 text-white" : "bg-slate-50 text-blue-600 group-hover:bg-blue-50"}`}>
                                {tech.icon}
                            </div>
                            <span className="font-bold text-sm tracking-wide">{tech.name}</span>
                            
                            {/* Selected Indicator */}
                            {selectedTech === tech.name && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500"></span>
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- 5. 포트폴리오 (Portfolio) - Filtered View ---
const PortfolioSection: React.FC<{ selectedTech: string | null }> = ({ selectedTech }) => {
    const allProjects = [
        {
            title: "사내 재고 관리 시스템(WMS)",
            category: "Web Application",
            desc: "Docker와 Nginx를 활용한 안정적인 사내 물류 관리 시스템 구축. React 기반의 직관적인 대시보드 제공.",
            tech: ["React", "Node.js", "Docker", "Nginx"],
            image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "이커머스 스타트업 A사 몰",
            category: "E-Commerce",
            desc: "사용자 경험을 최적화한 쇼핑몰 구축. 결제 모듈 연동 및 관리자 페이지 개발.",
            tech: ["Next.js", "TypeScript", "AWS"],
            image: "https://images.unsplash.com/photo-1472851294608-415105022054?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        },
        {
            title: "Comfunny 기업 홈페이지",
            category: "Corporate Site",
            desc: "반응형 웹 디자인과 모던한 UI/UX가 적용된 기업 브랜딩 사이트. Vite와 TailwindCSS 활용.",
            tech: ["React", "TailwindCSS", "Vite", "TypeScript"],
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
    ];

    // 필터링 로직
    const filteredProjects = selectedTech
        ? allProjects.filter(p => p.tech.includes(selectedTech))
        : allProjects;

    return (
        <section id="portfolio" className="py-24 bg-white min-h-[600px] transition-all">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Portfolio</span>
                        <h2 className="mt-2 text-3xl md:text-4xl font-bold text-slate-900">
                            Selected Works
                        </h2>
                    </div>
                    <div className="text-right">
                         {selectedTech ? (
                             <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">
                                 <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                                 Filtering by: {selectedTech}
                                 <button onClick={() => window.location.reload()} className="ml-3 text-slate-400 hover:text-blue-600 font-normal">✕ Clear</button>
                             </div>
                         ) : (
                             <span className="text-slate-500 text-sm">Showing all {allProjects.length} projects</span>
                         )}
                    </div>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, idx) => (
                            <div key={`${project.title}-${idx}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-100 hover:-translate-y-2">
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                        <span className="text-white font-bold flex items-center">
                                            View Project <IconArrowDown className="ml-2 w-4 h-4 -rotate-90" />
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <span className="inline-block px-3 py-1 bg-slate-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wide mb-3">
                                        {project.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                                        {project.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2">
                                        {project.desc}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                                        {project.tech.map((t) => (
                                            <span 
                                                key={t} 
                                                className={`px-3 py-1 text-xs rounded-full font-bold transition-all
                                                    ${selectedTech === t 
                                                        ? 'bg-blue-600 text-white shadow-md' 
                                                        : 'bg-slate-100 text-slate-600'
                                                    }`}
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="inline-block p-4 bg-white rounded-full mb-4 shadow-sm">
                            <IconCode className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Projects Found</h3>
                        <p className="text-slate-500 mb-6">선택하신 기술({selectedTech})을 사용한 공개 프로젝트가 없습니다.</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                        >
                            View All Projects
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

// --- 6. 서비스 (Services) ---
const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <IconLayers />,
      title: 'Web Application',
      description: 'React, Vue 등 최신 프레임워크를 활용하여 고객의 니즈에 딱 맞는 맞춤형 웹 애플리케이션을 제작합니다.',
    },
    {
      icon: <IconCloudCog />,
      title: 'Server & Infra',
      description: 'Docker 컨테이너 환경 구성, AWS 클라우드 배포 및 Nginx 서버 최적화로 안정적인 서비스를 제공합니다.',
    },
    {
      icon: <IconBarChart3 />,
      title: 'Consulting',
      description: '기존 시스템의 문제점을 진단하고 성능을 개선하며, 지속적인 유지보수를 통해 비즈니스 연속성을 보장합니다.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Services</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">What We Do</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {services.map((service) => (
            <div key={service.title} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="inline-block p-4 bg-slate-50 rounded-2xl mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                {React.cloneElement(service.icon as React.ReactElement, { className: "h-8 w-8 text-blue-600 group-hover:text-white transition-colors duration-300" })}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 7. Contact Info ---
const ContactInfoSection: React.FC = () => (
    <section id="contact" className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                <div className="max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Let's Connect</h2>
                    <p className="text-lg text-slate-600">
                        새로운 프로젝트를 구상 중이시거나, 커피 한 잔 하며 개발 이야기를 나누고 싶으신가요?
                        언제든 환영합니다.
                    </p>
                </div>
                <div className="flex flex-wrap gap-4">
                    <a href="mailto:contact@comfunny.com" className="flex items-center px-6 py-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md group">
                        <IconMail className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-600" />
                        <span className="font-medium">Email Me</span>
                    </a>
                     <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center px-6 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-md hover:shadow-lg">
                        <IconGithub className="w-5 h-5 mr-3" />
                        <span className="font-medium">GitHub</span>
                    </a>
                    <a href="#" target="_blank" rel="noreferrer" className="flex items-center px-6 py-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm hover:shadow-md group">
                        <IconFileText className="w-5 h-5 mr-3 text-slate-400 group-hover:text-blue-600" />
                        <span className="font-medium">Resume</span>
                    </a>
                </div>
             </div>
        </div>
    </section>
);

// --- 8. Footer ---
const Footer: React.FC = () => (
  <footer className="bg-white py-8 border-t border-slate-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center">
        <div className="p-1.5 bg-slate-900 rounded mr-2">
            <IconCode className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-bold text-slate-900">Comfunny Developers</span>
      </div>
      <p className="text-sm text-slate-500">
         &copy; {new Date().getFullYear()} Comfunny Developers. All rights reserved.
      </p>
    </div>
  </footer>
);

// --- 9. Main App ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <div className="font-sans antialiased text-slate-900 bg-white scroll-smooth selection:bg-blue-100 selection:text-blue-900">
      <Header isMobileMenuOpen={isMobileMenuOpen} onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
      <main>
        <HeroSection />
        <AboutSection />
        {/* State를 TechStack과 Portfolio에 전달하여 연동 */}
        <TechStackSection selectedTech={selectedTech} onSelectTech={setSelectedTech} />
        <PortfolioSection selectedTech={selectedTech} />
        <ServicesSection />
        <ContactInfoSection />
      </main>
      <Footer />
    </div>
  );
}