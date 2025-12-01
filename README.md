## 1. 스마트물류창고


## 2. 서비스소개
- 서비스명 : 컴디 스마트물류창고
- 서비스설명 :
  1.3D형태로 물류창고를 구현해 재고 및 입출고 상태를 실시간으로 시각화 하여 관리하는 3PL 스마트물류관리시스템
  2.배송관련하여 실시간위치추적 및 상품의 배송상태 를 관리하는 물류배송시스템
  3.출고 및 배송완료된 상품에 대해 정산하여, 물류운영에 최적화된 금액을 산출하는 AI분석

## 3. 프로그램 설명
#### 1. WMS
##### 기준정보
- 창고관리 : 자신의 창고를 관리, 수정, 삭제 할 수 있다.
- 구역관리 : 등록된 창고 내 구역을 관리, 생성, 수정, 삭제 할 수 있다.
- 존관리 : 등록된 창고, 구역 내 존을 관리, 생성, 수정, 삭제 할 수 있다.
- 로케이션 관리 : 등록된 창고, 구역, 존 내 로케이션을 관리, 생성, 수정, 삭제 할 수 있다.
- 고객사 관리 : 창고를 이용하는 고객사를 관리, 생성, 수정, 삭제 할 수 있다.
- 상품관리 : 고객사의 상품을 관리, 생성, 수정 삭제 할 수 있다.

#### 입고관리
- 입고관리 : 입고되는 상품을 전표별로 묶어 각 단계별 조회 및 입고관리 할 수 있다.(입고예정,검수,적치)

#### 출고관리
- 출고관리 : 보관중인 재고를 전표별로 묶어 각 단계별 조회 및 출고 할 수 있다.(출고예정, 출고지시, 출고피킹, 출하상차)

#### 재고관리
- 재고이동 : 보관중인 재고를 선택하여, 위치를 이동 시킬 수 있다.
- 제품별 재고조회 : 보관중인 재고에 대해 제품별로 수량 및 상태 등을 조회 할 수 있다.
- 로케이션별 재고조회 : 보관중인 재고에 대해 로케이션별로 수량 및 상태 등을 조회할 수 있다.
- 3D창고실시간 조회 : 물류창고의 영역(창고, 구역, 존, 로케이션), 로케이션에 위치한 재고의 실시간 조회(수량, 상태 등), 작업중인 재고 에 대해 실시간으로 조회할 수 있다.

## 4. 프로젝트 기간
- 없음(계속 추가중)

## 5. 주요 기능
- 기능1 : 물류운영, 물류배송 에 서 이루어지는 재고 관리 모든 기능
- 기능2 : 3D창고 조회, 실시간 위치 조회 기능, 재고이동에 대한 지시처리 (three.js)
- 기능3 : 물류배송에 대해 배송상태를 실시간조회 (KakaoMap)
- 기능4 : 정산 데이터에 대해 AI 를 통한 설정기간(일, 주, 월, 분기, 년) 별 분석(OpenAI)

## 6. 기술스택
- React V16, 의 MUI Framework 를 활용한 클라이언트 개발
- HTML 내 three.js 를 Embeding 하여 WebGL 개발(범용성을 위해 React 로 개발하지 않고, HTML로 개발)
- Java 11(OpenJDK11) 를 이용한 SpringBoot 내 JPA-Hibernate 환경의 서버개발
- 서버환경 (AWS, Lightsail 내 클라이언트, 서버, 데이터베이스 서버 구현), (추후 클라우드 서버 비용 문제로 Rasp서버로 이동)
- Github 버전관리, Github Action 기능을 이용한 서버내 클라이언트, 백엔드 소스 무중단배포


## 7. 프로세스 흐름도

## 8. 참고사진

## 9. 시연영상


## 10. 개발자의 말
- 이제껏 한건 많지만, 포폴처럼 보여줄만한게 없어서, 이제까지 했던 내용 다 집약 최적화해서, 하나의 포트폴리오로 만듬

##### 10. Reference

react-datepicker : https://reactdatepicker.com/
react-datepicker sameple blog : https://doooodle932.tistory.com/150
floating-ui : https://floating-ui.com/
threejs-obj-turbosquid : https://www.turbosquid.com/Search/Index.cfm?keyword=lift&media_typeid=2&min_price=0&max_price=1



#### 11. AI Prompt
[프로젝트 개요]
- 프로젝트명: Comfunny Developers (회사 홈페이지 & WMS 통합 포탈)
- 개발자: 김선호 (10년 8개월 경력의 Java/SI/SM 개발자)
- 기술 스택: React (Vite), TypeScript, Tailwind CSS, Material-UI, Docker
- 데이터 소스: src/data/portfolioData.ts 파일에서 모든 경력 및 포트폴리오 데이터를 통합 관리 중.
- 백엔드/API: http://localhost:8080/api (Axios 기반)와 연동 예정.
- Git Repo: https://github.com/sleepygloa/com.comfunny.client (최신 커밋 상태)

[시스템 구조 및 라우팅]
- 프로젝트 진입점: src/main.tsx (Vite Entry Point)
- 라우팅 라이브러리: react-router-dom
- URL 분기:
  - / (루트): 회사 홈페이지 (CompanyHomepage) - Tailwind CSS 전용
  - /portal/*: WMS 통합 포탈 (WmsPortalWithProviders) - MUI + Context 적용

[홈페이지 (CompanyHomepage) 주요 구현 사항]
- 구조: 모든 섹션이 src/pages/homepage/components/ 폴더에 분리됨.
- 포트폴리오:
  - 이력서 기반의 실제 프로젝트 데이터(CJ대한통운, 청주산단 WMS 등) 반영.
  - 모달 팝업을 통해 Challenge/Solution/Tech Stack 상세 내용 제공.
- 기술 스택:
  - TechStackSection: Backend, Frontend 등 카테고리별로 그룹화되어 라인형 뱃지로 표시.
  - SkillMatrixSection: 경력 데이터를 활용하여 프로젝트 x 기술 스택 매트릭스 표를 동적 생성.
- JobMatchingSection: 채용 공고(JD) 텍스트를 붙여넣으면 내 이력과 비교하여 매칭 점수 및 개발자 메시지를 보여주는 시뮬레이터 기능 구현.

[WMS 통합 포탈 (App.tsx) 주요 구현 사항]
- 기능: WMS 외에 Dev Tools, Office Board, Playground 영역으로 확장됨.
- Dev Tools (구현 완료):
  - JSON to XML Converter
  - Excel File to JSON (파일 업로드)
  - Excel Data to JSON (클립보드 붙여넣기)
  - String Replacer
  - YouTube Downloader (시뮬레이션)
  - Base64 Encoder / Decoder
  - Text Diff Checker (텍스트 비교)
  - API Tester (Axios 요청 시뮬레이터)

[최종 요청 사항 및 다음 목표]
- 모든 핵심 유틸리티 컴포넌트는 src/pages/blog/ 폴더에 .tsx 파일로 존재함.
- 현재 모든 컴포넌트가 올바른 데이터를 바라보는지 확인 완료됨.

다음 목표는 [여기에 새로운 요청 사항을 적어주세요. 예: WMS 기능(기준정보) 구현 시작, 또는 JWT Debugger 유틸리티 추가 등].