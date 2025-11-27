import React, { useState, useEffect } from 'react';

import { PORTFOLIO_DATA } from '../../../data/portfolioData'; 

// --- 아이콘 (로컬 정의) ---
const IconGrid: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>);
const IconList: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>);
const IconArrowDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /></svg>);
const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);
const IconExternalLink: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>);
const IconGithub: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>);


// [Project Detail Modal] - 내부 컴포넌트
const ProjectDetailModal: React.FC<{ project: any, onClose: () => void }> = ({ project, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300" 
            onClick={handleBackdropClick}
        >
            <div className="bg-white w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-2xl shadow-2xl overflow-hidden flex flex-col relative animate-fade-in-up">
                
                {/* 모달 헤더 (Sticky) */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 truncate pr-4">{project.title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                    >
                        <IconX className="w-5 h-5" />
                    </button>
                </div>

                {/* 스크롤 가능한 콘텐츠 영역 */}
                <div className="overflow-y-auto p-4 md:p-8">
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                {project.category}
                            </span>
                            <span className="text-slate-500 text-xs md:text-sm font-medium flex items-center">
                                <span className="w-1 h-1 bg-slate-300 rounded-full mx-2"></span>
                                {project.date}
                            </span>
                             <span className="text-slate-500 text-xs md:text-sm font-medium flex items-center">
                                <span className="w-1 h-1 bg-slate-300 rounded-full mx-2"></span>
                                {project.role}
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">
                            {project.fullDesc}
                        </p>
                    </div>

                    {/* 메인 이미지 */}
                    <div className="rounded-xl overflow-hidden shadow-lg mb-10 border border-slate-100">
                        <img src={project.image} alt={project.title} className="w-full h-auto object-cover" />
                    </div>

                    {/* 상세 내용 그리드 */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 본문 */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-red-400 pl-3">The Challenge</h3>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    {project.challenge}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-blue-500 pl-3">The Solution</h3>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    {project.solution}
                                </p>
                            </div>
                        </div>

                        {/* 사이드바 */}
                        <div className="space-y-6">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t: string) => (
                                        <span key={t} className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3">Project Links</h4>
                                <div className="space-y-2">
                                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm text-sm font-bold">
                                        Live Demo
                                        <IconExternalLink className="w-4 h-4" />
                                    </a>
                                    <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center justify-between w-full px-4 py-2 bg-white text-slate-700 border border-slate-200 rounded-lg hover:border-slate-400 transition-colors text-sm font-bold">
                                        GitHub Repo
                                        <IconGithub className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// [Portfolio Section]
interface PortfolioSectionProps {
  selectedTech: string | null;
  onSelectProject?: (id: number) => void; 
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ selectedTech, onSelectProject }) => {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    // 모달 활성화 상태를 여기서 직접 관리합니다.
    const [activeProjectId, setActiveProjectId] = useState<number | null>(null);

    const filteredProjects = selectedTech
        ? PORTFOLIO_DATA.filter(p => p.tech.includes(selectedTech))
        : PORTFOLIO_DATA;
    
    // 선택된 프로젝트 찾기 (모달용)
    const selectedProjectData = activeProjectId 
      ? PORTFOLIO_DATA.find(p => p.id === activeProjectId) 
      : null;
      
    const handleProjectClick = (id: number) => {
        setActiveProjectId(id);
        if (onSelectProject) {
            onSelectProject(id);
        }
    };

    return (
        <section id="portfolio" className="py-16 md:py-24 bg-white min-h-[500px] transition-all">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* 헤더 및 컨트롤 */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
                    <div>
                        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Portfolio</span>
                        <h2 className="mt-2 text-2xl md:text-4xl font-bold text-slate-900">Selected Works</h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {selectedTech && (
                             <div className="hidden md:inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100">
                                 <span className="w-2 h-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                                 Filter: {selectedTech}
                                 <button onClick={() => window.location.reload()} className="ml-3 text-slate-400 hover:text-blue-600 font-normal">✕</button>
                             </div>
                        )}
                        
                        {/* 뷰 모드 토글 */}
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                aria-label="Grid View"
                            >
                                <IconGrid className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                aria-label="List View"
                            >
                                <IconList className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {filteredProjects.length > 0 ? (
                    <>
                        {/* 그리드 뷰 */}
                        {viewMode === 'grid' && (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {filteredProjects.map((project) => (
                                    <div 
                                        key={project.id} 
                                        onClick={() => handleProjectClick(project.id)}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-blue-100 hover:-translate-y-2 cursor-pointer"
                                    >
                                        <div className="relative h-48 md:h-60 overflow-hidden">
                                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                <span className="text-white font-bold text-sm flex items-center">
                                                    View Details <IconArrowDown className="ml-2 w-4 h-4 -rotate-90" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 md:p-8">
                                            <span className="inline-block px-2 py-1 bg-slate-50 text-blue-600 text-[10px] md:text-xs font-bold rounded-full uppercase tracking-wide mb-3">
                                                {project.category}
                                            </span>
                                            <h3 className="text-lg md:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 line-clamp-2">
                                                {project.shortDesc}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-50">
                                                {project.tech.map((t) => (
                                                    <span key={t} className={`px-2 py-1 text-[10px] md:text-xs rounded-full font-bold transition-all ${selectedTech === t ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'}`}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* 리스트 뷰 */}
                        {viewMode === 'list' && (
                            <div className="flex flex-col gap-4">
                                {filteredProjects.map((project) => (
                                    <div 
                                        key={project.id} 
                                        onClick={() => handleProjectClick(project.id)}
                                        className="group flex flex-col md:flex-row bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-blue-200 cursor-pointer"
                                    >
                                        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden flex-shrink-0">
                                             <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="p-6 flex flex-col justify-center flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-wide">
                                                    {project.category}
                                                </span>
                                                <span className="text-slate-400 text-xs">{project.date}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 md:line-clamp-1">
                                                {project.shortDesc}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">#{t}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="hidden md:flex items-center justify-center w-16 bg-slate-50 text-slate-300 group-hover:text-blue-600 transition-colors">
                                            <IconArrowDown className="w-6 h-6 -rotate-90" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                        <div className="inline-block p-4 bg-white rounded-full mb-4 shadow-sm">
                            <IconCode className="w-8 h-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Projects Found</h3>
                        <p className="text-slate-500 mb-6">선택하신 기술({selectedTech})을 사용한 프로젝트가 없습니다.</p>
                        <button onClick={() => window.location.reload()} className="text-blue-600 font-bold hover:underline text-sm">전체 보기</button>
                    </div>
                )}
            </div>
            
            {/* 모달을 섹션 내부에서 렌더링 */}
            {activeProjectId && selectedProjectData && (
                <ProjectDetailModal 
                    project={selectedProjectData} 
                    onClose={() => setActiveProjectId(null)} 
                />
            )}
        </section>
    );
}

export default PortfolioSection;