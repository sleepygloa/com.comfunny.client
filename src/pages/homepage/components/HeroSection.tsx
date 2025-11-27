import React from 'react';

// [아이콘] 필요한 아이콘을 import 하거나, 공통 아이콘 파일에서 가져오세요.
// import { IconArrowDown } from '../../../components/icons';

// (편의를 위해 여기에 아이콘을 포함해 두었습니다. 실제로는 공통 파일에서 import 하는 것을 추천합니다.)
const IconArrowDown: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const HeroSection: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-white bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_50%_400px,#dbeafe,transparent)] opacity-40"></div>
      </div>
      <div className="container relative z-10 px-4 text-center">
        <span className="inline-block py-1 px-3 mb-6 md:mb-8 rounded-full bg-white/50 backdrop-blur-sm text-slate-500 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase border border-slate-200 shadow-sm">
          Since 2025 • Web & App Studio
        </span>
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-6 md:mb-8 drop-shadow-sm">
          COMFUNNY
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient-x">
            DEVELOPERS
          </span>
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
          끊임없이 <span className="font-semibold text-slate-900">노력</span>하고, 치열하게 <span className="font-semibold text-blue-600">개발</span>하고, 멈춤 없이 <span className="font-semibold text-indigo-600">도전</span>하여<br className="hidden md:block"/>
          결국에는 완벽한 <span className="font-semibold text-slate-900">성과</span>를 만들어냅니다.
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
};

export default HeroSection;