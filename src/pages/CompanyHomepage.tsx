import React, { useState } from 'react';

// [Import] 분리한 섹션 컴포넌트들
import HeroSection from './homepage/components/HeroSection';
import AboutSection from './homepage/components/AboutSection';
import TechStackSection from './homepage/components/TechStackSection';
import SkillMatrixSection from './homepage/components/SkillMatrixSection';
import CareerTreeSection from './homepage/components/CareerTreeSection';
import PortfolioSection from './homepage/components/PortfolioSection';
import ServicesSection from './homepage/components/ServicesSection';
import JobMatchingSection from './homepage/components/JobMatchingSection';
import ContactInfoSection from './homepage/components/ContactInfoSection';

// [ICONS] 헤더와 푸터에서 사용하는 아이콘만 남김
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
const iconProps = (props: React.SVGProps<SVGSVGElement>) => ({ ...iconDefaults, ...props });

const IconCode: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...iconProps(p)}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>);
const IconMenu: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...iconProps(p)}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>);
const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (p) => (<svg {...iconProps(p)}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);

// [LAYOUT] Header & Footer
// (나중에 src/components/layout 폴더로 분리하면 더 좋습니다)

const Header: React.FC<{ onMobileMenuToggle: () => void; isMobileMenuOpen: boolean, onHomeClick: () => void }> = ({ onMobileMenuToggle, isMobileMenuOpen, onHomeClick }) => {
  const navItems = [
    { name: '홈', href: '#' },
    { name: '소개', href: '#about' },
    { name: '기술 스택', href: '#tech' },
    { name: '경력', href: '#career' }, // 메뉴 추가
    { name: '포트폴리오', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 transition-all duration-300 border-b border-slate-100/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={onHomeClick}>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 md:p-2 rounded-lg text-white group-hover:shadow-lg transition-all duration-300">
                <IconCode className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <div className="ml-2 md:ml-3 flex flex-col">
                 <span className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-none">Comfunny</span>
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
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 shadow-lg">
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

const Footer: React.FC = () => (
  <footer className="bg-white py-8 border-t border-slate-100">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center">
        <div className="p-1.5 bg-slate-900 rounded mr-2">
            <IconCode className="h-4 w-4 text-white" />
        </div>
        <span className="text-sm font-bold text-slate-900">Comfunny Developers</span>
      </div>
      <p className="text-xs text-slate-500">
         &copy; {new Date().getFullYear()} Comfunny Developers. All rights reserved.
      </p>
    </div>
  </footer>
);

// ==========================================
// Main Component
// ==========================================

const CompanyHomepage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // TechStackSection과 PortfolioSection 간의 필터 연동 상태
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  return (
    <div className="font-sans antialiased text-slate-900 bg-white scroll-smooth selection:bg-blue-100 selection:text-blue-900">
      
      <Header 
        isMobileMenuOpen={isMobileMenuOpen} 
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        onHomeClick={() => window.scrollTo(0, 0)}
      />

      <main>
        <HeroSection />
        <AboutSection />
        
        {/* TechStack과 Portfolio는 서로 연동되므로 상태를 공유합니다. */}
        <TechStackSection 
            selectedTech={selectedTech} 
            onSelectTech={setSelectedTech} 
        />
        {/* PortfolioSection 내부에서 모달 처리 */}
        <PortfolioSection 
            selectedTech={selectedTech}
            onSelectProject={(id) => {
                console.log("Selected Project ID:", id);
            }}
        />
        
        <SkillMatrixSection />

        <CareerTreeSection />
        
        
        <ServicesSection />
        
        {/* 채용 매칭 시뮬레이터 추가 */}
        <JobMatchingSection />
        
        <ContactInfoSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default CompanyHomepage;