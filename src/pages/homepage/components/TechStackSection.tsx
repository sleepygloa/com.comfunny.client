import React, { useState } from 'react';

// --- 아이콘 (로컬 정의) ---
const IconGlobe: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>);
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const IconLayers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>);
const IconCpu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>);
const IconServer: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>);
const IconCloudCog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20 16.2A8.97 8.97 0 0 0 12 6a8.97 8.97 0 0 0-8 10.2" /><circle cx="12" cy="17" r="3" /><path d="M12 14v-1" /><path d="M12 21v-1" /><path d="M15 17h1" /><path d="M8 17h1" /><path d="m14.2 14.8-.7.7" /><path d="m8.5 19.5-.7.7" /><path d="m14.2 19.2-.7-.7" /><path d="m8.5 14.5-.7-.7" /></svg>);
const IconGithub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>);

interface TechItem {
    name: string;
    icon: React.ReactNode;
    category: "Frontend" | "Backend" | "DevOps" | "Tools";
}

interface TechStackSectionProps {
    selectedTech: string | null;
    onSelectTech: (tech: string | null) => void;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ selectedTech, onSelectTech }) => {
    const [activeCategory, setActiveCategory] = useState<"All" | "Frontend" | "Backend" | "DevOps">("All");

    // 이력서 기반 기술 스택 업데이트
    const techData: TechItem[] = [
        // Backend (Main)
        { name: "Java", category: "Backend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "Spring Boot", category: "Backend", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "MSA", category: "Backend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "Oracle", category: "Backend", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "PostgreSQL", category: "Backend", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "MySQL", category: "Backend", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" /> },
        
        // Frontend
        { name: "Javascript", category: "Frontend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "React", category: "Frontend", icon: <IconGlobe className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "NexacroN", category: "Frontend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" /> },
        
        // DevOps & Tools
        { name: "Docker", category: "DevOps", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "AWS", category: "DevOps", icon: <IconCloudCog className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "Git", category: "Tools", icon: <IconGithub className="w-5 h-5 md:w-6 md:h-6" /> },
        { name: "Jira", category: "Tools", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" /> },
    ];

    const filteredTechs = activeCategory === "All" ? techData : techData.filter(t => t.category === activeCategory);

    return (
        <section id="tech" className="py-16 md:py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 md:mb-12">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Tech Proficiency</h2>
                    <h3 className="text-2xl md:text-4xl font-bold text-slate-900">Technology Stack</h3>
                    <p className="mt-4 text-sm md:text-base text-slate-500 max-w-2xl mx-auto">
                        안정적인 엔터프라이즈 시스템 구축을 위한 검증된 기술 스택을 보유하고 있습니다.
                    </p>
                </div>

                <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar py-2">
                    <div className="flex gap-2">
                        {["All", "Backend", "Frontend", "DevOps"].map((cat) => (
                            <button key={cat} onClick={() => setActiveCategory(cat as any)}
                                className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                                    activeCategory === cat ? "bg-slate-900 text-white shadow-md scale-105" : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200"
                                }`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
                    {filteredTechs.map((tech) => (
                        <button
                            key={tech.name}
                            onClick={() => onSelectTech(selectedTech === tech.name ? null : tech.name)}
                            className={`
                                relative group flex flex-col items-center justify-center p-3 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-300
                                ${selectedTech === tech.name 
                                    ? "bg-blue-600 border-blue-600 text-white shadow-xl scale-105 ring-2 md:ring-4 ring-blue-100" 
                                    : "bg-white border-slate-100 text-slate-600 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1"
                                }
                            `}
                        >
                            <div className={`mb-2 md:mb-3 p-2 md:p-3 rounded-full ${selectedTech === tech.name ? "bg-white/20 text-white" : "bg-slate-50 text-blue-600 group-hover:bg-blue-50"}`}>
                                {tech.icon}
                            </div>
                            <span className="font-bold text-[10px] md:text-sm tracking-wide">{tech.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TechStackSection;