import React, { useState } from 'react';
import { CAREER_DATA } from '../../../data/portfolioData';

// --- 아이콘 (로컬 정의) ---
const IconSearch: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);
const IconBriefcase: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>);
const IconCheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...p} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>);

const JobMatchingSection: React.FC = () => {
    const sampleKeywords = [
        "Java", "Spring Boot", "MSA", "React", "Oracle", 
        "AWS", "Python", "Node.js", "Docker", "PostgreSQL",
        "JPA", "Git", "Nexacro", "Linux", "Kotlin", "Kafka",
        "DDD", "TDD", "Event-driven"
    ];
    
    const [jdText, setJdText] = useState("");
    const [matchResult, setMatchResult] = useState<{ score: number, message: string, matchedKeywords: string[], missingKeywords: string[] } | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const mySkills = Array.from(new Set(CAREER_DATA.flatMap(c => c.tech))).map(t => t.toLowerCase());
    const extraSkills = ["ci/cd", "jenkins", "git", "restful api", "ddd", "tdd", "event-driven", "kotlin", "clean architecture"];
    const allMySkills = [...mySkills, ...extraSkills];

    const analyzeMatch = () => {
        setIsAnalyzing(true);
        
        // 약간의 지연 효과로 분석하는 느낌 주기
        setTimeout(() => {
            // 1. 텍스트에서 키워드 추출
            const extractedKeywords = sampleKeywords.filter(keyword => 
                jdText.toLowerCase().includes(keyword.toLowerCase())
            );

            if (extractedKeywords.length === 0) {
                alert("공고 내용에서 기술 스택을 찾을 수 없습니다. 주요 기술 키워드(Java, React 등)가 포함되어 있는지 확인해주세요.");
                setIsAnalyzing(false);
                return;
            }

            // 2. 매칭 분석
            const matched = extractedKeywords.filter(req => 
                allMySkills.some(skill => skill.includes(req.toLowerCase()) || req.toLowerCase().includes(skill))
            );
            const missing = extractedKeywords.filter(req => 
                !allMySkills.some(skill => skill.includes(req.toLowerCase()) || req.toLowerCase().includes(skill))
            );

            const score = Math.round((matched.length / extractedKeywords.length) * 100);
            
            let message = "";
            if (score >= 90) message = "완벽한 매칭입니다! 당장 투입되어 성과를 낼 수 있습니다.";
            else if (score >= 70) message = "핵심 역량이 일치합니다. 빠른 적응이 가능합니다.";
            else if (score >= 40) message = "새로운 도전을 환영합니다. 기본기가 탄탄하여 금방 배울 수 있습니다.";
            else message = "새로운 분야군요! 하지만 10년 차의 내공으로 빠르게 습득하겠습니다.";

            setMatchResult({ score, message, matchedKeywords: matched, missingKeywords: missing });
            setIsAnalyzing(false);
        }, 1500);
    };

    return (
        <section id="job-matching" className="py-24 bg-slate-900 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* 왼쪽: 입력 폼 */}
                    <div className="lg:w-1/2">
                        <div className="mb-8">
                            <h2 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">Recruitment Simulator</h2>
                            <h3 className="text-3xl md:text-4xl font-bold text-white">
                                채용 적합도 분석
                            </h3>
                            <p className="mt-4 text-slate-400 leading-relaxed">
                                채용 공고(JD) 내용을 아래에 붙여넣어 보세요.<br/>
                                10년 8개월의 SI/SM 경험 데이터와 대조하여 매칭 결과를 분석해 드립니다.
                            </p>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                            <div className="mb-4">
                                <label htmlFor="jd-textarea" className="block text-sm font-bold text-slate-300 mb-2 flex items-center">
                                    <IconSearch className="w-4 h-4 mr-2" />
                                    채용 공고 내용 (주요 업무, 자격 요건 등)
                                </label>
                                <textarea 
                                    id="jd-textarea"
                                    className="w-full h-48 bg-slate-900/80 border border-slate-600 rounded-xl p-4 text-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none placeholder-slate-600"
                                    placeholder="예시: Java, Spring Boot 기반 백엔드 개발자 모집합니다. MSA, Kafka 경험자 우대..."
                                    value={jdText}
                                    onChange={(e) => setJdText(e.target.value)}
                                />
                            </div>
                            
                            <button
                                onClick={analyzeMatch}
                                disabled={jdText.length < 10 || isAnalyzing}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center
                                    ${jdText.length >= 10 && !isAnalyzing
                                        ? "bg-white text-slate-900 hover:bg-blue-50 hover:shadow-xl transform hover:-translate-y-1"
                                        : "bg-slate-700 text-slate-500 cursor-not-allowed"
                                    }`}
                            >
                                {isAnalyzing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        분석 중...
                                    </>
                                ) : "매칭 분석 시작하기"}
                            </button>
                        </div>
                    </div>

                    {/* 오른쪽: 결과 및 메시지 */}
                    <div className="lg:w-1/2 flex items-center justify-center">
                        {matchResult ? (
                            <div className="w-full animate-fade-in-up transition-all duration-500">
                                <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                                    
                                    <div className="relative z-10 text-center mb-8">
                                        <span className="text-slate-400 text-sm font-medium uppercase tracking-wider">Compatibility Score</span>
                                        <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mt-2 mb-4 drop-shadow-lg">
                                            {matchResult.score}%
                                        </div>
                                        <p className="text-xl text-white font-bold leading-snug">"{matchResult.message}"</p>
                                    </div>

                                    {/* 매칭된 키워드 표시 */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {matchResult.matchedKeywords.map(k => (
                                                <span key={k} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30">
                                                    ✓ {k}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6 border-t border-slate-700 pt-8 text-left">
                                        <div className="flex items-start">
                                            <div className="p-3 bg-blue-500/20 rounded-xl mr-4 text-blue-400 shrink-0">
                                                <IconBriefcase className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-white mb-2 text-lg">Developer's Promise</h5>
                                                <div className="text-slate-300 text-sm leading-relaxed space-y-2">
                                                    <p>
                                                        물류, 유통, 공공 등 다양한 도메인에서 <b>MSA 전환, 대용량 트래픽 처리, 레거시 마이그레이션</b>을 성공적으로 수행했습니다.
                                                    </p>
                                                    {matchResult.missingKeywords.length > 0 && (
                                                        <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200/90 text-xs">
                                                            <span className="font-bold text-yellow-400">Challenge Accepted:</span><br/> 
                                                            공고에 언급된 <b>{matchResult.missingKeywords.join(", ")}</b> 기술은 실무 경험이 부족할 수 있으나, 
                                                            10년 차의 탄탄한 엔지니어링 베이스로 빠르게 흡수하여 비즈니스 가치를 만들어내겠습니다.
                                                        </div>
                                                    )}
                                                    <p className="font-medium text-white pt-2">
                                                        "코드는 수단일 뿐, 본질은 비즈니스 문제 해결입니다.<br/>
                                                        안정적이고 확장 가능한 시스템으로 귀사의 성장을 뒷받침하겠습니다."
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-slate-600 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/50">
                                <IconSearch className="w-16 h-16 mb-6 opacity-20" />
                                <p className="text-lg font-medium text-slate-500 text-center">
                                    왼쪽에 채용 공고 내용을 입력하고<br/>
                                    분석 버튼을 눌러주세요.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobMatchingSection;