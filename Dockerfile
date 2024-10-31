# 1. Node 이미지로 빌드
FROM node:18 AS build

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 필요한 패키지 설치
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# 4. 소스 코드 복사 및 빌드 실행
COPY . .
RUN npm run build

# 5. Nginx로 서빙하기 위한 설정
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 6. Nginx 포트 설정
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
