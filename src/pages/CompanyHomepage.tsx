import React, { useState } from 'react';
// 'lucide-react' import를 제거하고 아래에 SVG 아이콘 컴포넌트를 직접 정의합니다.

// --- 아이콘 컴포넌트 정의 ---

// SVG 아이콘에 공통적으로 적용될 기본 속성
// React.SVGProps<SVGSVGElement>로 명시적으로 타입을 지정하여
// strokeLinecap, strokeLinejoin 등이 올바른 타입("round")을 갖도록 합니다.
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

// 헬퍼 함수: 기본값과 전달된 props(className 등)를 병합합니다.
const iconProps = (props: React.SVGProps<SVGSVGElement>) => ({
  ...iconDefaults,
  ...props, // 사용자가 전달한 props가 기본값을 덮어쓸 수 있습니다.
});

const IconBuilding2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

const IconStar: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const IconPhone: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMenu: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconX: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconCheckCircle: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconArrowRight: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const IconLayers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
);

const IconBarChart3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
    <path d="M3 3v18h18" />
    <path d="M7 12h4v6H7z" />
    <path d="M12 7h4v11h-4z" />
    <path d="M17 3h4v15h-4z" />
  </svg>
);

const IconCloudCog: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconProps(props)}>
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

// --- 1. 헤더 (Header) 컴포넌트 ---
const Header: React.FC<{ onMobileMenuToggle: () => void; isMobileMenuOpen: boolean }> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const navItems = [
    { name: '홈', href: '#' },
    { name: '회사 소개', href: '#about' },
    { name: '서비스', href: '#services' },
    { name: '문의하기', href: '#contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* 로고 */}
          <div className="flex-shrink-0 flex items-center">
            <IconBuilding2 className="h-8 w-8 text-blue-600" /> {/* 변경됨 */}
            <span className="ml-2 text-2xl font-bold text-slate-800">OurCompany</span>
          </div>

          {/* 데스크탑 네비게이션 */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-medium text-slate-600 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* 데스크탑 CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              견적 받기
            </a>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="lg:hidden">
            <button
              onClick={onMobileMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">메뉴 열기</span>
              {isMobileMenuOpen ? <IconX className="block h-6 w-6" /> : <IconMenu className="block h-6 w-6" />} {/* 변경됨 */}
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 (드롭다운) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="px-5 pb-4">
            <a
              href="#contact"
              className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              견적 받기
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

// --- 2. 히어로 (Hero) 섹션 ---
const HeroSection: React.FC = () => (
  <section className="relative bg-gradient-to-r from-blue-50 via-white to-blue-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] py-24">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">
          귀사의 비즈니스를 위한
          <br />
          <span className="text-blue-600">혁신적인 솔루션</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl">
          우리는 복잡한 문제를 해결하고 비즈니스 성장을 가속화하는 맞춤형 디지털 솔루션을 제공합니다.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            서비스 둘러보기
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-300 text-lg font-medium rounded-full shadow-sm text-slate-700 bg-white hover:bg-slate-50 transition-all duration-300 transform hover:scale-105"
          >
            회사 소개 <IconArrowRight className="ml-2 h-5 w-5" /> {/* 변경됨 */}
          </a>
        </div>
      </div>
    </div>
  </section>
);

// --- 3. 회사 소개 (About) 섹션 ---
const AboutSection: React.FC = () => (
  <section id="about" className="py-24 bg-white">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold text-sm rounded-full uppercase tracking-wider">
            About Us
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900">
            우리는 누구인가?
          </h2>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            OurCompany는 2010년에 설립되어 기술의 힘으로 비즈니스를 변화시키는 것을 사명으로 삼아왔습니다. 
            우리의 전문가 팀은 전략, 디자인, 개발 전반에 걸쳐 포괄적인 서비스를 제공하며, 고객의 성공을 최우선으로 생각합니다.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-start">
              <IconCheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" /> {/* 변경됨 */}
              <span className="ml-3 text-lg text-slate-600">고객 중심의 맞춤형 솔루션 제공</span>
            </li>
            <li className="flex items-start">
              <IconCheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" /> {/* 변경됨 */}
              <span className="ml-3 text-lg text-slate-600">최신 기술 트렌드와 업계 전문성 결합</span>
            </li>
            <li className="flex items-start">
              <IconCheckCircle className="flex-shrink-0 h-6 w-6 text-green-500 mt-1" /> {/* 변경됨 */}
              <span className="ml-3 text-lg text-slate-600">투명한 커뮤니케이션과 신속한 프로젝트 관리</span>
            </li>
          </ul>
        </div>
        <div className="mt-10 lg:mt-0">
          <img
            className="rounded-2xl shadow-xl w-full h-auto object-cover"
            src="https://placehold.co/600x450/e2e8f0/334155?text=Our+Team&font=inter"
            alt="Our Team"
          />
        </div>
      </div>
    </div>
  </section>
);

// --- 4. 서비스 (Services) 섹션 ---
const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: <IconLayers className="h-10 w-10 text-blue-600" />, // 변경됨
      title: '맞춤형 소프트웨어 개발',
      description: '비즈니스 요구에 정확히 맞는 확장 가능하고 효율적인 소프트웨어를 구축합니다.',
    },
    {
      icon: <IconCloudCog className="h-10 w-10 text-blue-600" />, // 변경됨
      title: '클라우드 인프라 구축',
      description: 'AWS, Azure, GCP를 활용하여 안전하고 유연한 클라우드 환경을 설계하고 관리합니다.',
    },
    {
      icon: <IconBarChart3 className="h-10 w-10 text-blue-600" />, // 변경됨
      title: '데이터 분석 및 AI',
      description: '데이터에서 인사이트를 도출하고 AI 모델을 통해 비즈니스 의사결정을 자동화합니다.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold text-sm rounded-full uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="mt-4 text-4xl font-extrabold text-slate-900">
            우리가 제공하는 것
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            아이디어 구상부터 배포, 유지보수까지 비즈니스 성공에 필요한 모든 기술 스택을 지원합니다.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-block p-4 bg-blue-100 rounded-full">
                {service.icon}
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">{service.title}</h3>
              <p className="mt-4 text-base text-slate-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 5. 고객 후기 (Testimonials) 섹션 ---
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "OurCompany와의 작업은 정말 환상적이었습니다. 복잡한 요구사항을 정확히 파악하고 기대 이상의 결과물을 만들어냈습니다.",
      name: '김영희',
      title: 'ABC 주식회사, CEO',
      avatar: 'https://placehold.co/100x100/dbeafe/4338ca?text=YH&font=inter'
    },
    {
      quote: "프로젝트 내내 보여준 전문성과 신속한 대응에 깊은 인상을 받았습니다. 다음 프로젝트도 함께하고 싶습니다.",
      name: '이철수',
      title: 'Startup X, CTO',
      avatar: 'https://placehold.co/100x100/dbeafe/4338ca?text=CS&font=inter'
    },
    {
      quote: "클라우드 마이그레이션을 성공적으로 완료하여 운영 비용을 30% 절감할 수 있었습니다. 최고의 파트너입니다.",
      name: '박지민',
      title: 'MegaCorp, IT 매니저',
      avatar: 'https://placehold.co/100x100/dbeafe/4338ca?text=JM&font=inter'
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-extrabold text-slate-900">
            고객의 목소리
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            우리의 파트너들이 직접 경험한 성공 스토리를 확인해 보세요.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="flex flex-col bg-slate-50 p-8 rounded-2xl shadow-lg">
              <div className="flex-1">
                <div className="flex text-yellow-400 space-x-1">
                  <IconStar className="w-5 h-5 fill-current" /> {/* 변경됨 */}
                  <IconStar className="w-5 h-5 fill-current" /> {/* 변경됨 */}
                  <IconStar className="w-5 h-5 fill-current" /> {/* 변경됨 */}
                  <IconStar className="w-5 h-5 fill-current" /> {/* 변경됨 */}
                  <IconStar className="w-5 h-5 fill-current" /> {/* 변경됨 */}
                </div>
                <blockquote className="mt-6 text-lg text-slate-700 italic">
                  "{item.quote}"
                </blockquote>
              </div>
              <div className="mt-8 flex items-center">
                <img className="h-12 w-12 rounded-full" src={item.avatar} alt={item.name} />
                <div className="ml-4">
                  <div className="text-base font-bold text-slate-900">{item.name}</div>
                  <div className="text-sm text-slate-600">{item.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 6. CTA (Call to Action) 섹션 ---
const CTASection: React.FC = () => (
  <section id="contact" className="bg-blue-600">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left gap-8">
        <div>
          <h2 className="text-4xl font-extrabold text-white">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-2xl">
            지금 바로 연락주시면, 전문 컨설턴트가 귀사의 비즈니스에 최적화된 솔루션을 제안해 드립니다.
          </p>
        </div>
        <div className="flex-shrink-0">
          <a
            href="#"
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-lg font-medium rounded-full shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
          >
            무료 상담 신청 <IconPhone className="ml-2 h-5 w-5" /> {/* 변경됨 */}
          </a>
        </div>
      </div>
    </div>
  </section>
);

// --- 7. 푸터 (Footer) 섹션 ---
const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center">
            <IconBuilding2 className="h-8 w-8 text-white" /> {/* 변경됨 */}
            <span className="ml-2 text-2xl font-bold text-white">OurCompany</span>
          </div>
          <p className="mt-4 text-base leading-relaxed">
            기술을 통해 비즈니스의 가능성을 현실로 만듭니다.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">솔루션</h3>
          <ul className="mt-4 space-y-3">
            <li><a href="#" className="text-base hover:text-white transition-colors">소프트웨어 개발</a></li>
            <li><a href="#" className="text-base hover:text-white transition-colors">클라우드</a></li>
            <li><a href="#" className="text-base hover:text-white transition-colors">데이터 분석</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">회사</h3>
          <ul className="mt-4 space-y-3">
            <li><a href="#about" className="text-base hover:text-white transition-colors">회사 소개</a></li>
            <li><a href="#" className="text-base hover:text-white transition-colors">채용 정보</a></li>
            <li><a href="#" className="text-base hover:text-white transition-colors">블로그</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">연락처</h3>
          <ul className="mt-4 space-y-3">
            <li><a href="#contact" className="text-base hover:text-white transition-colors">문의하기</a></li>
            <li><a href="#" className="text-base hover:text-white transition-colors">파트너십</a></li>
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-700 text-center">
        <p className="text-base">&copy; 2025 OurCompany. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// --- 8. App (메인) 컴포넌트 ---
export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans antialiased text-slate-800 bg-white">
      {/* React.StrictMode는 개발 모드에서 잠재적인 문제를 감지하기 위해
        컴포넌트를 두 번 렌더링할 수 있습니다.
      */}
      <React.StrictMode>
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </React.StrictMode>
    </div>
  );
}