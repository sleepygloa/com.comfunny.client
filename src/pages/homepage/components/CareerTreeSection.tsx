import React from 'react';

// [수정됨] 올바른 상대 경로로 import (데이터 파일에서 가져옴)
import { CAREER_DATA } from '../../../data/portfolioData';

// --- 아이콘 (로컬 정의) ---
const IconBriefcase: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>);
const IconCalendar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>);

const CareerTreeSection: React.FC = () => {
    return (
        <section id="career" className="py-24 bg-slate-50 relative overflow-hidden">
            {/* 배경 장식 (나무 뿌리 느낌) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-blue-100/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Career Path</h2>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
                        Growth & History
                    </h3>
                    <p className="mt-4 text-slate-500">
                        10년 이상의 경험, 견고하게 쌓아올린 기술의 나이테입니다.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* 중앙 줄기 (Tree Trunk) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform md:-translate-x-1/2 rounded-full"></div>

                    <div className="space-y-12">
                        {CAREER_DATA.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}>
                                    
                                    {/* 날짜/기간 (반대쪽) */}
                                    <div className={`hidden md:block w-1/2 px-8 text-${isEven ? 'left' : 'right'}`}>
                                        <div className="inline-flex items-center text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                            <IconCalendar className="w-4 h-4 mr-2" />
                                            {item.period}
                                        </div>
                                    </div>

                                    {/* 중앙 노드 (나뭇잎/열매) */}
                                    <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-white border-4 border-blue-500 rounded-full transform -translate-x-1/2 z-10 shadow-md flex items-center justify-center">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    </div>

                                    {/* 내용 카드 */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8 mt-2 md:mt-0">
                                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative group">
                                            {/* 모바일용 기간 표시 */}
                                            <div className="md:hidden mb-3 inline-flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                                                <IconCalendar className="w-3 h-3 mr-1" />
                                                {item.period}
                                            </div>

                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                        {item.project}
                                                    </h4>
                                                    <p className="text-sm font-medium text-slate-500 mt-1">
                                                        {item.company} · <span className="text-blue-600">{item.role}</span>
                                                    </p>
                                                </div>
                                                <div className="hidden sm:block p-2 bg-slate-50 rounded-lg text-slate-400">
                                                    <IconBriefcase className="w-5 h-5" />
                                                </div>
                                            </div>
                                            
                                            <p className="text-slate-600 text-sm leading-relaxed mb-4 border-t border-slate-50 pt-3 mt-2">
                                                {item.desc}
                                            </p>

                                            {/* 사용 기술 태그 */}
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.tech.map((t, i) => (
                                                    <span key={i} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md border border-slate-200">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* 화살표 장식 (Desktop only) */}
                                            <div className={`hidden md:block absolute top-6 w-4 h-4 bg-white border-b border-l border-slate-100 transform rotate-45 
                                                ${isEven ? '-right-2 border-r-0 border-t-0' : '-left-2 border-b-0 border-r-0'} 
                                            `}></div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* 시작점 (뿌리) */}
                    <div className="flex justify-center mt-12">
                         <div className="relative z-10 px-6 py-3 bg-slate-900 text-white rounded-full font-bold text-sm shadow-lg">
                             Development Journey Start
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// [중요] 이 부분이 없으면 "Cannot read properties of undefined (reading 'default')" 에러가 발생합니다.
export default CareerTreeSection;