import React from 'react';

// [아이콘] 로컬 정의 (필요시 공통 아이콘 파일로 이동 가능)
const IconLayers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const IconCloudCog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 16.2A8.97 8.97 0 0 0 12 6a8.97 8.97 0 0 0-8 10.2" />
    <circle cx="12" cy="17" r="3" />
    <path d="M12 14v-1" />
    <path d="M12 21v-1" />
    <path d="M15 17h1" />
    <path d="M8 17h1" />
    <path d="m14.2 14.8-.7.7" />
    <path d="m8.5 19.5-.7.7" />
    <path d="m14.2 19.2-.7-.7" />
    <path d="m8.5 14.5-.7-.7" />
  </svg>
);

const IconBarChart3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18" />
    <path d="M7 12h4v6H7z" />
    <path d="M12 7h4v11h-4z" />
    <path d="M17 3h4v15h-4z" />
  </svg>
);

const ServicesSection: React.FC = () => {
  const services = [
    { icon: <IconLayers />, title: 'Web App', desc: '고객 니즈에 맞는 맞춤형 웹 개발' },
    { icon: <IconCloudCog />, title: 'Infra', desc: 'Docker, AWS 기반의 안정적 인프라' },
    { icon: <IconBarChart3 />, title: 'Consulting', desc: '시스템 진단 및 성능 최적화' },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Services</h2>
          <h3 className="text-2xl md:text-4xl font-bold text-slate-900">What We Do</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {services.map((s) => (
            <div key={s.title} className="group p-6 md:p-8 rounded-3xl bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
              <div className="inline-block p-4 bg-slate-50 rounded-2xl mb-4 md:mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                {React.cloneElement(s.icon as React.ReactElement, { className: "h-6 w-6 md:h-8 md:w-8 text-blue-600 group-hover:text-white transition-colors duration-300" })}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-4">{s.title}</h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;