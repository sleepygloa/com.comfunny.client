import React, { useState } from 'react';

// --- 아이콘 (로컬 정의 - 기존 코드 유지) ---
const IconGlobe: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>);
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const IconLayers: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>);
const IconCpu: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /><line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" /><line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" /></svg>);
const IconServer: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" /><line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" /></svg>);
const IconCloudCog: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16.2A8.97 8.97 0 0 0 12 6a8.97 8.97 0 0 0-8 10.2" /><circle cx="12" cy="17" r="3" /><path d="M12 14v-1" /><path d="M12 21v-1" /><path d="M15 17h1" /><path d="M8 17h1" /><path d="m14.2 14.8-.7.7" /><path d="m8.5 19.5-.7.7" /><path d="m14.2 19.2-.7-.7" /><path d="m8.5 14.5-.7-.7" /></svg>);
const IconGithub: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>);
const IconFileText: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><line x1="10" y1="9" x2="8" y2="9" /></svg>);

interface TechItem {
    name: string;
    icon: React.ReactNode;
    category: "Language" | "Backend" | "Frontend" | "Data & Infra" | "Architecture" | "Tools";
    level: "Expert" | "Advanced" | "Intermediate";
}

interface TechStackSectionProps {
    selectedTech: string | null;
    onSelectTech: (tech: string | null) => void;
}

const TechStackSection: React.FC<TechStackSectionProps> = ({ selectedTech, onSelectTech }) => {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // 이력서 기반 상세 기술 스택 정의
    const techData: TechItem[] = [
        // Architecture (고급 역량)
        { name: "MSA", category: "Architecture", icon: <IconCloudCog className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "DDD", category: "Architecture", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "Event-driven", category: "Architecture", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "TDD", category: "Architecture", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "Clean Arch", category: "Architecture", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },

        // Backend
        { name: "Java", category: "Backend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Kotlin", category: "Backend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "Spring Boot", category: "Backend", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "JPA", category: "Backend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Batch", category: "Backend", icon: <IconCpu className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "QueryDSL", category: "Backend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Kafka", category: "Backend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "EAI", category: "Backend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "전자정부 4.2", category: "Backend", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },

        // Frontend
        { name: "JavaScript", category: "Frontend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "React", category: "Frontend", icon: <IconGlobe className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "TypeScript", category: "Frontend", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "Next.js", category: "Frontend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Intermediate" },
        { name: "Nexacro", category: "Frontend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "WebSquare", category: "Frontend", icon: <IconGlobe className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Exbuilder6", category: "Frontend", icon: <IconLayers className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "WebView", category: "Frontend", icon: <IconGlobe className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },

        // Data & Infra
        { name: "Oracle", category: "Data & Infra", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "PostgreSQL", category: "Data & Infra", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "MySQL", category: "Data & Infra", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "Redis", category: "Data & Infra", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "MongoDB", category: "Data & Infra", icon: <IconServer className="w-5 h-5 md:w-6 md:h-6" />, level: "Intermediate" },
        { name: "Docker", category: "Data & Infra", icon: <IconCloudCog className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "AWS", category: "Data & Infra", icon: <IconCloudCog className="w-5 h-5 md:w-6 md:h-6" />, level: "Intermediate" },
        { name: "Linux", category: "Data & Infra", icon: <IconCpu className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
        { name: "Window", category: "Data & Infra", icon: <IconCpu className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },

        // Tools
        { name: "Git", category: "Tools", icon: <IconGithub className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Jira", category: "Tools", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Jenkins", category: "Tools", icon: <IconCpu className="w-5 h-5 md:w-6 md:h-6" />, level: "Intermediate" },
        { name: "IntelliJ", category: "Tools", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Eclipse", category: "Tools", icon: <IconCode className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Jasper Report", category: "Tools", icon: <IconFileText className="w-5 h-5 md:w-6 md:h-6" />, level: "Expert" },
        { name: "Tmap API", category: "Tools", icon: <IconGlobe className="w-5 h-5 md:w-6 md:h-6" />, level: "Advanced" },
    ];

    const categories = ["Architecture", "Backend", "Frontend", "Data & Infra", "Tools"];

    return (
        <section id="tech" className="py-20 bg-slate-50 border-b border-slate-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Technical Expertise</h2>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900">Technology Landscape</h3>
                    <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
                        10년 이상의 실무 경험을 통해 축적된, 비즈니스 가치를 창출하는 기술 스택입니다.<br/>
                        단순 사용을 넘어 아키텍처 설계와 최적화가 가능합니다.
                    </p>
                </div>

                <div className="space-y-12">
                    {categories.map((cat) => {
                        const categoryTechs = techData.filter(t => t.category === cat);
                        if (categoryTechs.length === 0) return null;

                        return (
                            <div key={cat} className="flex flex-col md:flex-row gap-6 items-start border-b border-slate-200 pb-10 last:border-0 last:pb-0">
                                <div className="w-full md:w-1/4 flex-shrink-0">
                                    <h4 className="text-xl font-bold text-slate-800 flex items-center">
                                        {cat === "Architecture" && <IconCloudCog className="w-6 h-6 mr-3 text-purple-600" />}
                                        {cat === "Backend" && <IconServer className="w-6 h-6 mr-3 text-blue-600" />}
                                        {cat === "Frontend" && <IconGlobe className="w-6 h-6 mr-3 text-green-600" />}
                                        {cat === "Data & Infra" && <IconLayers className="w-6 h-6 mr-3 text-orange-600" />}
                                        {cat === "Tools" && <IconCode className="w-6 h-6 mr-3 text-gray-600" />}
                                        {cat}
                                    </h4>
                                    <span className="text-sm text-slate-400 mt-2 block">{categoryTechs.length} core technologies</span>
                                </div>

                                <div className="w-full md:w-3/4">
                                    <div className="flex flex-wrap gap-3">
                                        {categoryTechs.map((tech) => (
                                            <button
                                                key={tech.name}
                                                onClick={() => onSelectTech(selectedTech === tech.name ? null : tech.name)}
                                                className={`group flex items-center px-4 py-2 rounded-lg border transition-all duration-200 relative overflow-hidden ${selectedTech === tech.name ? "bg-blue-50 border-blue-500 ring-1 ring-blue-500 shadow-md" : "bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm"}`}
                                            >
                                                <span className={`w-2 h-2 rounded-full mr-2 ${tech.level === "Expert" ? "bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.5)]" : tech.level === "Advanced" ? "bg-blue-500" : "bg-green-500"}`}></span>
                                                <span className={`text-sm font-medium ${selectedTech === tech.name ? "text-blue-700" : "text-slate-700"}`}>{tech.name}</span>
                                                <span className="ml-2 text-[10px] text-slate-400 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">{tech.level}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                <div className="flex justify-end gap-6 mt-12 pt-6 border-t border-slate-100 text-xs font-medium text-slate-500">
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.5)] mr-2"></span>Expert (Mastery)</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Advanced (Proficient)</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Intermediate (Capable)</div>
                </div>
            </div>
        </section>
    );
}

export default TechStackSection;