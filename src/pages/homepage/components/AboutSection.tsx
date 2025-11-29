import React from 'react';

const IconCheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <img className="relative rounded-3xl shadow-xl w-full h-auto object-cover" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Team" />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Who We Are</h2>
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              일은 <span className="text-blue-600">프로</span>처럼,<br/>과정은 <span className="text-indigo-500">유쾌</span>하게.
            </h3>
            <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6">
              <b>Comfunny Developers(컴디)</b>는 개발이 즐거워야 결과물도 훌륭하다고 믿습니다. 
              단순히 코드를 짜는 것을 넘어, 클라이언트와 함께 성장하는 파트너가 되겠습니다.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {["책임감 있는 소통", "최신 트렌드 적용", "확장 가능한 코드", "사용자 중심 설계"].map((item, idx) => (
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
};

export default AboutSection;