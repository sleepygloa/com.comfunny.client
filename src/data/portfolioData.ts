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
        role: "차장 / Backend Dev",
        project: "CJ대한통운 역직구 OMS/WMS 운영 및 개발",
        desc: "글로벌 물류 처리를 위한 OMS/WMS 시스템 고도화. MSA 환경에서의 대용량 배치 처리 최적화.",
        tech: ["Java", "Spring Boot", "MSA", "Oracle", "Jira"]
    },
    {
        id: 2,
        period: "2024.08 - 2025.08",
        company: "플라잉아이에스티 (프리랜서)",
        role: "차장 / PL (Part Leader)",
        project: "청주산단 스마트팩토리 WMS/TMS 구축",
        desc: "스마트팩토리 물류/운송 관리 시스템 구축 총괄. React 도입을 통한 현대적인 웹 환경 전환 주도.",
        tech: ["React", "Java", "Spring Boot", "PostgreSQL"]
    },
    {
        id: 3,
        period: "2023.02 - 2024.05",
        company: "솔루텍제이 (프리랜서)",
        role: "대리 / Backend Dev",
        project: "신세계 백화점 차세대 시스템 (MD행사)",
        desc: "백화점 MD 행사 관리 및 대량 MMS 발송 시스템 개발. MSA 기반의 서비스 분리 및 안정화.",
        tech: ["Java", "Spring Boot", "MSA", "MySQL", "NexacroN"]
    },
    {
        id: 4,
        period: "2021.08 - 2022.08",
        company: "가우비즈 (프리랜서)",
        role: "대리 / Backend Dev",
        project: "현대백화점 HRIS 재구축",
        desc: "통합 행사 관리 시스템 재구축. 레거시 시스템 마이그레이션 및 비즈니스 로직 최적화.",
        tech: ["Java", "Spring Boot", "Oracle", "Nexacro17"]
    },
    {
        id: 5,
        period: "2020.12 - 2021.07",
        company: "엔디에스",
        role: "대리 / Backend Dev",
        project: "깨끗한나라 WCS 및 설비 IF 개발",
        desc: "물류 센터 자동화 설비 제어 시스템(WCS) 개발. 실시간 설비 통신 인터페이스 구현.",
        tech: ["Java", "Spring Boot", "Oracle", "Exbuilder6"]
    },
    {
        id: 6,
        period: "2019.08 - 2020.06",
        company: "그리티스",
        role: "대리 / PL",
        project: "동원홈푸드 통합물류시스템 TMS",
        desc: "식자재 유통 배차/운송 관리 시스템 PL. Tmap API 연동 및 최적 경로 산출 로직 구현.",
        tech: ["Java", "Oracle", "Nexacro", "Tmap API"]
    },
    {
        id: 7,
        period: "2018.06 - 2019.07",
        company: "그리티스",
        role: "대리",
        project: "오리온 베트남 공장 WMS 구축",
        desc: "해외 공장 WMS 및 PDA 시스템 개발. 현지 환경에 최적화된 물류 프로세스 구현.",
        tech: ["Java", "Oracle", "Android", "JasperReport"]
    },
];

// ==========================================
// 2. 상세 포트폴리오 데이터 (Portfolio Section용)
// ==========================================
export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 1,
    title: "CJ대한통운 역직구 OMS/WMS",
    category: "Logistics",
    shortDesc: "Spring Boot & MSA 기반의 역직구 주문/창고 관리 시스템 운영 및 개발.",
    fullDesc: "CJ대한통운의 글로벌 역직구 물류 시스템(OMS/WMS)을 운영 및 개발했습니다. 대량의 주문 데이터를 안정적으로 처리하기 위해 배치(Batch) 작업을 최적화하고, EAI 연동을 통해 시스템 간 데이터 흐름을 원활하게 했습니다.",
    challenge: "복잡한 역직구 프로세스와 대량 주문 데이터의 실시간 처리가 요구됨.",
    solution: "MSA 환경에서 각 모듈을 독립적으로 구성하여 안정성을 높이고, Spring Batch를 활용해 대용량 데이터 처리를 최적화함.",
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
    fullDesc: "청주 산업단지의 스마트팩토리 고도화를 위한 WMS(창고 관리) 및 TMS(운송 관리) 시스템 구축 프로젝트입니다. PL(Part Leader) 역할을 수행하며 프론트엔드(React)와 백엔드(Spring Boot) 간의 API 설계를 주도했습니다.",
    challenge: "기존 레거시 시스템을 현대적인 웹 환경으로 전환하고, 공정 자동화 장비와의 연동성을 확보해야 했음.",
    solution: "React를 도입하여 직관적인 사용자 인터페이스를 제공하고, PostgreSQL을 활용하여 데이터 구조를 최적화함.",
    tech: ["React", "Java", "Spring Boot", "PostgreSQL", "Javascript"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2024.08 - 2025.08",
    role: "WMS/TMS PL (Part Leader)",
    links: { demo: "#", github: "#" }
  },
  {
    id: 3,
    title: "신세계 백화점 차세대 시스템",
    category: "Retail",
    shortDesc: "백화점 MD 행사 관리 및 대량 MMS 발송 시스템 개발 (MSA 적용).",
    fullDesc: "신세계 백화점의 차세대 시스템 구축 프로젝트에서 MD 행사 관리 모듈과 대량 MMS 발송 시스템을 담당했습니다. 대규모 트래픽이 발생하는 백화점 이벤트 기간에도 안정적인 서비스를 제공했습니다.",
    challenge: "이벤트 기간 중 폭증하는 트래픽과 복잡한 행사 데이터 구조를 효율적으로 관리해야 했음.",
    solution: "MSA 아키텍처를 기반으로 서비스를 분리하여 장애 전파를 막고, Devon 프레임워크를 활용하여 표준화된 개발 프로세스를 적용함.",
    tech: ["Java", "Spring Boot", "MSA", "MySQL", "NexacroN", "Devon"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "2022.08 - 2024.05",
    role: "Backend Developer",
    links: { demo: "#", github: "#" }
  },
  {
    id: 4,
    title: "현대백화점 HRIS 재구축",
    category: "Retail",
    shortDesc: "통합 행사 관리 시스템 재구축 및 고객사 대응.",
    fullDesc: "현대백화점의 인사 및 행사 관리 시스템(HRIS)을 재구축하는 프로젝트에 참여했습니다. 기존 시스템의 노후화된 로직을 분석하여 Spring Boot 기반으로 마이그레이션하고, Nexacro 17을 활용해 UI를 개선했습니다.",
    challenge: "다양한 행사 유형과 복잡한 승인 프로세스를 시스템화하는 것이 과제였음.",
    solution: "Oracle DB의 프로시저를 최적화하고, Spring Boot의 유연성을 활용해 복잡한 비즈니스 로직을 체계화함.",
    tech: ["Java", "Spring Boot", "Oracle", "Nexacro17"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    date: "2021.08 - 2022.08",
    role: "Backend Developer",
    links: { demo: "#", github: "#" }
  },
  {
    id: 5,
    title: "깨끗한나라 WCS 개발",
    category: "Logistics",
    shortDesc: "창고 제어 시스템(WCS) 및 설비 인터페이스(IF) 개발.",
    fullDesc: "제지/생활용품 기업 깨끗한나라의 물류 센터 자동화를 위한 WCS(Warehouse Control System)를 개발했습니다. 자동화 설비와의 실시간 통신 인터페이스를 구현하여 물류 흐름을 제어했습니다.",
    challenge: "물리적인 설비와 소프트웨어 간의 통신 지연을 최소화해야 했음.",
    solution: "소켓 통신 및 인터페이스 모듈을 최적화하여 실시간성을 확보하고, Jasper Report를 통해 현황 리포팅 기능을 제공함.",
    tech: ["Java", "Spring Boot", "Oracle", "Jasper Report", "Exbuilder6"],
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    date: "2020.12 - 2021.07",
    role: "Backend Developer",
    links: { demo: "#", github: "#" }
  },
  {
    id: 6,
    title: "동원홈푸드 통합물류시스템 TMS",
    category: "Logistics",
    shortDesc: "식자재 유통을 위한 배차 및 운송 관리 시스템(TMS) PL 수행.",
    fullDesc: "동원홈푸드의 통합 물류 시스템 중 TMS(Transportation Management System) 파트의 PL을 맡아 반고정 배차 로직 등을 개발했습니다. Tmap API와 Opinet API를 연동하여 운송 경로 및 유가 정보를 제공했습니다.",
    challenge: "복잡한 배송 경로 최적화와 외부 API 연동의 정확성이 중요했음.",
    solution: "Tmap API를 활용해 정교한 거리 계산 로직을 구현하고, Nexacro를 통해 관리자가 쉽게 배차를 관리할 수 있는 UI를 제공함.",
    tech: ["Java", "Oracle", "Nexacro", "Tmap API", "Javascript"],
    image: "https://images.unsplash.com/photo-1595054225696-26435cc4a776?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
    date: "2019.08 - 2020.06",
    role: "TMS PL (Part Leader)",
    links: { demo: "#", github: "#" }
  },
];