import React from 'react';
import { CAREER_DATA } from '../../../data/portfolioData';

// --- 데이터 정의: 기술 스택 그룹핑 ---
interface TechGroup {
    category: string;
    techs: string[];
}

const TECH_GROUPS: TechGroup[] = [
    {
        category: "Backend",
        techs: ["Java", "Kotlin", "Spring Boot", "JPA", "MyBatis", "QueryDSL"]
    },
    {
        category: "Frontend",
        techs: ["JavaScript", "TypeScript", "React", "Nexacro", "WebSquare", "HTML/CSS"]
    },
    {
        category: "Architecture",
        techs: ["MSA", "DDD", "Event-driven", "Batch", "EAI/Interface"]
    },
    {
        category: "Database",
        techs: ["Oracle", "MySQL", "MariaDB", "PostgreSQL", "Redis", "MongoDB"]
    },
    {
        category: "DevOps & Tools",
        techs: ["Docker", "AWS", "Linux", "Git", "Jira", "Jenkins"]
    }
];

// 전체 기술 리스트 (순서대로 펼침)
const ALL_TECHS = TECH_GROUPS.flatMap(group => group.techs);

const SkillMatrixSection: React.FC = () => {
    
    // 기술 매칭 체크 함수 (유사어 처리 포함)
    const hasTech = (projectTechs: string[], techCol: string) => {
        const pTechs = projectTechs.map(t => t.toLowerCase());
        const target = techCol.toLowerCase();

        // 특수 매핑 로직
        if (target.includes("jpa")) return pTechs.some(t => t.includes("jpa") || t.includes("hibernate"));
        if (target.includes("react")) return pTechs.some(t => t.includes("react") || t.includes("next"));
        if (target.includes("nexacro")) return pTechs.some(t => t.includes("nexacro"));
        if (target.includes("interface")) return pTechs.some(t => t.includes("eai") || t.includes("mci") || t.includes("fep"));
        
        return pTechs.some(t => t.includes(target));
    };

    return (
        <section className="py-20 bg-white border-t border-slate-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Experience Matrix</h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Project x Tech Stack Map</h3>
                    <p className="mt-2 text-slate-500 text-sm">프로젝트별 활용 기술 스택 상세 보기</p>
                </div>

                <div className="relative overflow-x-auto shadow-xl rounded-2xl border border-slate-200 custom-scrollbar bg-white">
                    <table className="w-full text-sm text-left text-slate-600 border-collapse">
                        <thead>
                            {/* 1. 카테고리 헤더 (Frontend, Backend...) */}
                            <tr className="bg-slate-100 border-b border-slate-200">
                                <th className="px-4 py-2 font-bold text-slate-800 bg-slate-100 sticky left-0 z-20 border-r border-slate-300 min-w-[200px] text-center">
                                    Category
                                </th>
                                {TECH_GROUPS.map((group) => (
                                    <th 
                                        key={group.category} 
                                        colSpan={group.techs.length} 
                                        className="px-2 py-2 text-center font-bold text-slate-700 border-r border-slate-200 last:border-r-0 bg-slate-50"
                                    >
                                        {group.category}
                                    </th>
                                ))}
                            </tr>

                            {/* 2. 기술명 헤더 (세로 쓰기) */}
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-4 py-4 font-bold text-slate-900 bg-white sticky left-0 z-20 border-r border-slate-300 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.1)] text-center align-bottom">
                                    Project Name
                                </th>
                                {ALL_TECHS.map((tech) => (
                                    <th key={tech} className="px-1 py-4 text-center border-r border-slate-100 last:border-r-0 align-bottom hover:bg-blue-50 transition-colors h-[140px]">
                                        {/* 세로 텍스트 표현을 위한 컨테이너 */}
                                        <div className="flex flex-col items-center justify-end h-full w-6 mx-auto gap-0.5">
                                            {/* 글자 하나씩 쪼개서 렌더링 */}
                                            {tech.split('').map((char, i) => (
                                                <span key={i} className="text-[10px] font-medium leading-tight uppercase transform rotate-0">
                                                    {char}
                                                </span>
                                            ))}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {CAREER_DATA.map((project) => (
                                <tr key={project.id} className="bg-white hover:bg-blue-50/30 transition-colors group">
                                    {/* 프로젝트 이름 (Sticky Column) */}
                                    <td className="px-4 py-3 font-medium text-slate-900 sticky left-0 bg-white group-hover:bg-blue-50/30 border-r border-slate-200 z-10 shadow-[4px_0_10px_-5px_rgba(0,0,0,0.05)]">
                                        <div className="truncate max-w-[220px]" title={project.project}>
                                            {project.project}
                                        </div>
                                        <div className="text-xs text-slate-400 font-normal mt-0.5 truncate max-w-[220px]">
                                            {project.role}
                                        </div>
                                    </td>

                                    {/* 체크박스 그리드 */}
                                    {ALL_TECHS.map((tech) => (
                                        <td key={`${project.id}-${tech}`} className="px-1 py-3 text-center border-r border-slate-50 last:border-r-0">
                                            {hasTech(project.tech, tech) ? (
                                                <div className="flex justify-center items-center h-full">
                                                    <span className="w-3 h-3 bg-blue-600 rounded-sm shadow-sm transform rotate-45 group-hover:scale-125 transition-transform duration-200"></span>
                                                </div>
                                            ) : (
                                                <span className="inline-block w-1 h-1 bg-slate-100 rounded-full"></span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-6 flex justify-end items-center gap-4 text-xs text-slate-400">
                     <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-blue-600 rounded-sm transform rotate-45"></span>
                        <span>Used Tech</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                        <span>Not Used</span>
                     </div>
                </div>
            </div>
        </section>
    );
};

export default SkillMatrixSection;