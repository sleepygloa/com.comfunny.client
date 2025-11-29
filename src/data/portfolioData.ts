// --- 타입 정의 (Type Definitions) ---

export interface CareerItem {
    id: number;
    period: string;
    company: string;
    role: string;
    project: string;
    desc: string;
    tech: string[];
}

export interface PortfolioItem {
    id: number;
    title: string;
    category: string;
    shortDesc: string;
    fullDesc: string;
    challenge: string;
    solution: string;
    tech: string[];
    image: string;
    date: string;
    role: string;
    links: { demo: string; github: string };
}

// ==========================================
// 1. 연혁/경력 데이터 (Career Tree용)
// ==========================================
export const CAREER_DATA: CareerItem[] = [
    {
        id: 1,
        period: "2025.09 - 2025.12",
        company: "파일론소프트 (프리랜서)",
        role: "차장 / Backend Lead",
        project: "CJ대한통운 역직구 OMS/WMS 운영 및 개발",
        desc: "글로벌 물류 처리를 위한 OMS/WMS 시스템 고도화. MSA 환경에서의 대용량 배치 처리 최적화.",
        tech: ["Java", "Spring Boot", "JPA", "MSA", "Oracle", "Batch", "EAI", "Jira"]
    },
    {
        id: 2,
        period: "2025.05 - 2025.08",
        company: "플라잉아이에스티 (프리랜서)",
        role: "차장 / Backend Dev",
        project: "DTC 국가생명윤리정책원 재구축",
        desc: "공공기관 홈페이지 및 관리자 페이지 재구축. 전자정부 프레임워크 4.2 기반 웹 접근성 준수.",
        tech: ["Java", "Spring Boot", "JPA", "MariaDB", "전자정부4.2", "Javascript"]
    },
    {
        id: 3,
        period: "2024.08 - 2025.05",
        company: "플라잉아이에스티 (프리랜서)",
        role: "차장 / PL (Part Leader)",
        project: "청주산단 스마트팩토리 WMS/TMS 개발",
        desc: "스마트팩토리 물류/운송 관리 시스템 구축 총괄. React 도입을 통한 현대적인 웹 환경 전환 주도.",
        tech: ["React", "Java", "Spring Boot", "PostgreSQL", "Javascript"]
    },
    {
        id: 4,
        period: "2023.02 - 2024.05",
        company: "솔루텍제이 (프리랜서)",
        role: "대리 / Backend Dev",
        project: "신세계 백화점 차세대 시스템 (MD행사)",
        desc: "백화점 MD 행사 관리 및 대량 MMS 발송 시스템 개발. MSA 기반의 서비스 분리 및 안정화.",
        tech: ["Java", "Spring Boot", "MSA", "MySQL", "NexacroN", "Devon"]
    },
    {
        id: 5,
        period: "2022.08 - 2023.01",
        company: "솔루텍제이 (프리랜서)",
        role: "대리 / System Operator",
        project: "신세계 백화점 앱/웹 운영 및 개발",
        desc: "이벤트 및 대량 MMS 대응, 고객사 요구사항 처리 및 WebView 기반 하이브리드 앱 운영.",
        tech: ["Java", "Javascript", "Oracle", "WebView"]
    },
    {
        id: 6,
        period: "2021.08 - 2022.08",
        company: "가우비즈 (프리랜서)",
        role: "대리 / Backend Dev",
        project: "현대백화점 HRIS 재구축",
        desc: "통합 행사 관리 시스템 재구축. 레거시 시스템 마이그레이션 및 비즈니스 로직 최적화.",
        tech: ["Java", "Spring Boot", "MSA", "Oracle", "Nexacro17"]
    },
    {
        id: 7,
        period: "2020.12 - 2021.07",
        company: "엔디에스",
        role: "대리 / Backend Dev",
        project: "깨끗한나라 WCS 개발",
        desc: "물류 센터 자동화 설비 제어 시스템(WCS) 개발. 실시간 설비 통신 인터페이스 구현.",
        tech: ["Java", "Spring Boot", "Oracle", "Exbuilder6", "Jasper Report"]
    },
    {
        id: 8,
        period: "2020.08 - 2020.11",
        company: "엔디에스",
        role: "대리 / Backend Dev",
        project: "3SForYou 정산시스템 개발",
        desc: "정산 시스템 비즈니스 로직 개발 및 데이터 처리.",
        tech: ["Java", "WebSquare", "Oracle"]
    },
     {
        id: 9,
        period: "2020.06 - 2020.07",
        company: "엔디에스",
        role: "대리 / Backend Dev",
        project: "자사 TMS 솔루션 개발",
        desc: "자사 운송 관리 시스템(TMS) 솔루션 고도화 개발.",
        tech: ["Java", "Spring Boot", "Oracle", "Jasper Report", "Javascript"]
    },
    {
        id: 10,
        period: "2019.08 - 2020.06",
        company: "그리티스",
        role: "대리 / PL",
        project: "동원홈푸드 통합물류시스템 TMS",
        desc: "식자재 유통 배차/운송 관리 시스템 PL. Tmap API 연동 및 최적 경로 산출 로직 구현.",
        tech: ["Java", "Oracle", "Nexacro", "Tmap API", "Javascript"]
    },
    {
        id: 11,
        period: "2018.06 - 2019.07",
        company: "그리티스",
        role: "대리",
        project: "오리온 베트남 공장 WMS 구축",
        desc: "해외 공장 WMS 및 PDA 시스템 개발. 현지 환경에 최적화된 물류 프로세스 구현.",
        tech: ["Java", "Oracle", "Android", "Javascript", "Jasper Report"]
    },
     {
        id: 12,
        period: "2018.02 - 2018.05",
        company: "그리티스",
        role: "대리",
        project: "한국 이콜랩 WMS 구축",
        desc: "WMS 및 PDA 시스템 개발.",
        tech: ["Java", "Oracle", "Android", "Javascript", "Jasper Report"]
    },
     {
        id: 13,
        period: "2017.11 - 2018.01",
        company: "그리티스",
        role: "대리",
        project: "롯데정보통신 MMS 개발",
        desc: "자산관리 및 예방 점검 시스템 개발.",
        tech: ["Java", "Oracle", "Javascript"]
    },
     {
        id: 14,
        period: "2017.08 - 2017.10",
        company: "보우테크",
        role: "대리",
        project: "버텍스아이디 WMS 개발",
        desc: "WMS 솔루션 구축 및 PDA 개발.",
        tech: ["Java", "Oracle", "Android", "Javascript", "Jasper Report"]
    },
     {
        id: 15,
        period: "2013.07 - 2016.05",
        company: "미르기술",
        role: "주임연구원",
        project: "자동화 데이터 연구 분석",
        desc: "자동화 기술 개발 및 연구 데이터 통계 분석.",
        tech: ["Java", "Oracle"]
    }
];

// ==========================================
// 2. 상세 포트폴리오 데이터 (Portfolio Section용 - 주요 프로젝트 선별)
// ==========================================
export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 1,
    title: "CJ대한통운 역직구 OMS/WMS",
    category: "Logistics (물류)",
    shortDesc: "글로벌 역직구 물동량 처리를 위한 OMS/WMS 시스템 고도화 및 운영.",
    fullDesc: "급증하는 글로벌 역직구 물량을 효율적으로 처리하기 위한 주문 관리(OMS) 및 창고 관리(WMS) 시스템을 구축하고 운영했습니다. 대량 주문 데이터의 안정적인 처리가 핵심 과제였습니다.",
    challenge: "하루 수십만 건의 주문 데이터가 몰릴 때 시스템 부하가 발생하고, 배송 추적 데이터의 실시간 동기화가 지연되는 문제가 있었습니다.",
    solution: "Spring Batch를 활용하여 대용량 데이터 처리를 비동기로 전환하고, MSA 아키텍처를 도입하여 주문 접수와 재고 관리 서비스를 분리함으로써 시스템 안정성을 확보했습니다. 또한 EAI를 통해 통관 시스템과의 연동 속도를 개선했습니다.",
    tech: ["Java", "Spring Boot", "MSA", "Oracle", "Batch", "EAI", "Jira"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2025.09 - 2025.12",
    role: "Backend Developer (운영/개발)",
    links: { demo: "#", github: "#" }
  },
  {
    id: 2,
    title: "청주산단 스마트팩토리 WMS/TMS",
    category: "Smart Factory",
    shortDesc: "React와 Spring Boot를 도입한 스마트팩토리 물류/운송 관리 시스템 구축 총괄.",
    fullDesc: "청주 산업단지 내 공장들의 물류 프로세스를 자동화하고, 운송 차량의 배차를 최적화하는 스마트팩토리 통합 관리 시스템입니다. PL(Part Leader)로서 프로젝트 전반을 리딩했습니다.",
    challenge: "기존의 노후화된 레거시 시스템은 UI가 불편하고, 공정 장비와의 데이터 연동이 원활하지 않아 작업자의 불만이 높았습니다.",
    solution: "프론트엔드에 React를 도입하여 직관적인 대시보드 UI를 제공하고, 백엔드는 Spring Boot로 재구축하여 유연한 API 구조를 만들었습니다. PostgreSQL을 도입하여 복잡한 공정 데이터를 체계적으로 관리했습니다.",
    tech: ["React", "Java", "Spring Boot", "PostgreSQL", "Javascript"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024.08 - 2025.05",
    role: "WMS/TMS PL (Part Leader)",
    links: { demo: "#", github: "#" }
  },
  {
    id: 3,
    title: "신세계 백화점 차세대 시스템",
    category: "Retail (유통)",
    shortDesc: "백화점 MD 행사 관리 및 대량 MMS 발송 시스템 개발 (MSA 적용).",
    fullDesc: "신세계 백화점의 차세대 시스템 구축 프로젝트 중, MD(상품 기획자)가 행사를 기획하고 관리하는 모듈과 고객에게 대량의 행사 안내 메시지(MMS)를 발송하는 시스템을 개발했습니다.",
    challenge: "정기 세일 기간 등 특정 시점에 트래픽이 폭증하여 시스템이 느려지는 현상이 발생했습니다. 또한, 복잡한 결재 라인과 행사 조건 설정이 필요했습니다.",
    solution: "MSA(Microservice Architecture)를 적용하여 행사 관리 서비스와 발송 서비스를 분리, 트래픽 폭주 시에도 전체 시스템에 영향을 주지 않도록 했습니다. Devon 프레임워크 기반으로 표준화된 로직을 구현하여 유지보수성을 높였습니다.",
    tech: ["Java", "Spring Boot", "MSA", "MySQL", "NexacroN", "Devon"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2023.02 - 2024.05",
    role: "Backend Developer",
    links: { demo: "#", github: "#" }
  },
  {
    id: 4,
    title: "현대백화점 HRIS 재구축",
    category: "Retail (유통)",
    shortDesc: "통합 행사 관리 시스템 재구축 및 고객사 대응.",
    fullDesc: "현대백화점 내부 직원들이 사용하는 인사 및 행사 관리 시스템(HRIS)을 고도화하는 프로젝트였습니다. 사용성이 떨어지는 구형 시스템을 최신 웹 표준에 맞춰 재구축했습니다.",
    challenge: "다양한 부서의 요구사항이 얽혀 있어 비즈니스 로직이 매우 복잡했고, Oracle DB의 프로시저 의존도가 너무 높았습니다.",
    solution: "복잡한 비즈니스 로직을 Java 애플리케이션 계층으로 옮겨와 테스트와 관리가 용이하도록 개선했습니다. Nexacro 17을 활용하여 사용자 친화적인 UI를 제공했습니다.",
    tech: ["Java", "Spring Boot", "Oracle", "Nexacro17", "MSA"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2021.08 - 2022.08",
    role: "Backend Developer",
    links: { demo: "#", github: "#" }
  },
  {
    id: 5,
    title: "깨끗한나라 WCS 개발",
    category: "Logistics (물류)",
    shortDesc: "창고 제어 시스템(WCS) 및 설비 인터페이스(IF) 개발.",
    fullDesc: "깨끗한나라 물류 센터의 자동화 설비(Conveyor, Stacker Crane 등)를 제어하는 WCS(Warehouse Control System)를 개발했습니다. 상위 시스템(WMS)과 하위 설비 간의 다리 역할을 수행했습니다.",
    challenge: "물리적인 설비의 움직임과 소프트웨어 데이터 간의 실시간 동기화가 0.1초 단위로 정확해야 했습니다.",
    solution: "Socket 통신을 최적화하여 데이터 전송 지연을 최소화하고, 설비 상태를 실시간으로 모니터링할 수 있는 대시보드를 구현했습니다. Jasper Report로 일일 물동량 리포트를 자동 생성하도록 했습니다.",
    tech: ["Java", "Spring Boot", "Oracle", "Jasper Report", "Exbuilder6"],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2020.12 - 2021.07",
    role: "Backend Developer",
    links: { demo: "#", github: "#" }
  },
  {
    id: 6,
    title: "동원홈푸드 통합물류시스템 TMS",
    category: "Logistics (물류)",
    shortDesc: "식자재 유통을 위한 배차 및 운송 관리 시스템(TMS) PL 수행.",
    fullDesc: "동원홈푸드의 전국 식자재 배송을 위한 운송 관리 시스템(TMS)을 구축했습니다. 배차 계획 수립부터 운송비 정산까지의 전 과정을 시스템화했습니다.",
    challenge: "전국 각지로 배송되는 수천 건의 주문을 가장 효율적인 경로로 배차하는 알고리즘이 필요했습니다.",
    solution: "Tmap API를 연동하여 실시간 교통 상황을 반영한 최적 경로를 산출하고, Opinet API로 유가 정보를 연동하여 운송비를 정확하게 산정했습니다. Nexacro 기반의 관리자 UI를 통해 배차 효율을 극대화했습니다.",
    tech: ["Java", "Oracle", "Nexacro", "Tmap API", "Javascript"],
    image: "https://images.unsplash.com/photo-1595054225696-26435cc4a776?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2019.08 - 2020.06",
    role: "TMS PL (Part Leader)",
    links: { demo: "#", github: "#" }
  },
];