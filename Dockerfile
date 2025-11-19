# 1단계: 빌드 (Build Stage)
FROM node:20-alpine AS builder

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 파일 복사 및 설치
COPY package.json package-lock.json ./
RUN npm ci

# 소스 코드 복사 및 빌드
COPY . .
RUN npm run build

# 2단계: 실행 (Production Stage)
FROM nginx:stable-alpine

# 빌드 단계에서 생성된 결과물(dist)을 Nginx의 서빙 디렉토리로 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx 설정 파일 복사 (선택 사항, 아래 3번 참조)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]