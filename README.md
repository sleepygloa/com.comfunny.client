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
- 기술 스택: React, Vite, TypeScript, Tailwind CSS
- 배포: Docker Compose (Nginx + React App)
- 구조:
  - / (루트): 회사 홈페이지 (src/pages/homepage/CompanyHomepage.tsx)
  - /portal: WMS 시스템 (src/components/App.tsx)
- 상태 관리: Context API (UserContext, LayoutContext 등)
- 데이터: src/data/portfolioData.ts 에서 통합 관리 중

[현재 구현 상황]
- 홈페이지는 Hero, About, TechStack, Portfolio, Service, Contact 섹션으로 컴포넌트 분리됨.
- 포트폴리오 섹션은 모달로 상세 내용을 보여줌.
- 기술 스택 섹션은 뱃지와 매트릭스 테이블 형태로 구현됨.
- 채용 매칭 시뮬레이터(JobMatchingSection) 구현됨.

[요청 사항]
이 상황에서 [새로운 기능]을 추가하려고 해.