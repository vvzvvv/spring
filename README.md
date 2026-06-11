


# 🌱 Spring - 우울증 환자 자가 관리 플랫폼

> 우울증 환자들이 일상 속에서 스스로 상태를 기록하고 관리할 수 있도록 돕기 위한 웹 플랫폼입니다.
> 감정 상태, 수면, 운동, 약 복용 등을 기록하고, 의사와 함께 공유하며 건강을 관리합니다.

**🏆 교내 소프트웨어 경진대회 동상 수상**

---

## 💁🏻 프로젝트 소개

### 배경 및 목적

우울증 환자들이 자신의 상태를 스스로 기록하고 관리할 수 있는 웹 서비스입니다.
환자는 자가진단 결과와 생활 기록 데이터의 그래프를 확인하며, 스스로의 변화와 개선 정도를 시각적으로 파악할 수 있습니다.
이를 통해 회복에 대한 동기를 부여받을 수 있도록 설계되었습니다.

**Spring**은 다음 문제를 해결합니다:
- 📊 **치료 효과 추적 어려움**: 환자가 자신의 개선 정도를 시각적으로 파악하기 어려움
- 🫥 **의료진-환자 소통 부족**: 정기 방문 사이에 환자 상태를 파악할 수 없음
- 🔒 **프라이버시 우려**: 모든 기록을 공유해버려야 함
- 💪 **낮은 동기 부여**: 기록의 의미를 느끼지 못해 꾸준한 관리 어려움

### 핵심 가치

| 가치           | 설명                                   |
|--------------|--------------------------------------|
| **자가 관리**    | 환자가 주도적으로 건강 데이터 기록 및 모니터링           |
| **시각화**      | Chart.js 기반 그래프로 개선 정도를 쉽게 파악        |
| **의료진 연동**   | 의사가 환자의 동의 하에 환자가 기록한 데이터를 열람        |
| **동기 부여**    | 기록과 그래프를 통해 회복 과정의 긍정적 변화 인식         |
| **프라이버시 보호** | 각 정보(약, 수면, 운동, 테스트)의 공유 여부를 세밀하게 제어 |

---

## ✨ 주요 기능

### 🔐 인증 및 계정 관리

#### 이중 계정 시스템
- **환자(Patient)**: 건강 기록 및 자가 관리
- **의사(Doctor)**: 환자 계정 등록 및 기록 모니터링

#### 보안
- JWT 토큰 기반 인증
- Bcrypt를 활용한 비밀번호 해시 암호화
- 이메일 인증을 통한 회원가입 검증
- Nodemailer 기반 이메일 링크를 통한 안전한 비밀번호 재설정

---

### 🏥 환자 기능

#### 📝 우울증 자가진단 테스트
- 주기적인 우울증 자가진단 수행
- 자동 점수 및 결과 계산
- 테스트 이력 관리 및 추이 확인

<img alt="스크린샷 2026-06-11 오후 3 28 34" src="https://github.com/user-attachments/assets/0c31f5a4-6220-48f5-bbf2-165744f796de" />


#### 💊 약 기록 (처방전 관리)
- 처방약 정보 (약 이름, 처방일, 처방량) 기록
- 복용 기록 작성 (복용 날짜, 시간대)
- 처방약 및 복용 기록 수정/삭제
- 그래프로 날짜별 복용량 변화 체크

<img alt="스크린샷 2026-06-11 오후 3 32 37" src="https://github.com/user-attachments/assets/60cc4caf-4f34-43e3-b934-ae29df68d716" />

#### 😴 수면 기록
- 취침시간, 기상시간 입력
- 수면의 질 평가 기록
- 총 수면시간 자동 계산
- 날짜별 수면 기록 조회
- 최근 7일간 수면 기록 그래프

<img alt="스크린샷 2026-06-11 오후 3 35 29" src="https://github.com/user-attachments/assets/dee7eaa0-cc1d-4fbb-bec9-fb21916d5189" />



#### 💪 운동 기록
- 운동 종류 및 운동 평가 기록
- 운동 기록 시각화
- 운동 내역 리포트 관리


#### 📝 일기 작성
- 날짜별 일기 작성
- 일기에 사진 첨부
- 감정 상태 및 생각 기록
- 과거 일기 검색 및 열람

<img alt="스크린샷 2026-06-11 오후 3 37 06" src="https://github.com/user-attachments/assets/74ce6d5f-66ff-4253-bf4a-45f4988ded48" />

#### ⚙️ 마이페이지
- 개인정보 수정 및 계정 관리
- 정보 제공 동의 관리: 약/수면/운동/테스트 정보 각각 공유 여부 설정

---

### 🧑🏻‍⚕️ 의사 기능

#### 📋 환자 관리
- 환자 계정 검색
- 환자 추가 요청 발송 및 요청 관리
- 담당 환자 목록 조회 및 검색

<img alt="스크린샷 2026-06-11 오후 3 38 52" src="https://github.com/user-attachments/assets/7c17837b-e0c1-4727-a6eb-90e13e029038" />



#### 👁️ 환자 정보 열람
- 환자가 동의한 건강 정보만 접근 가능
- 환자별 약 복용, 수면, 운동, 테스트 기록 확인


---

## 💻 기술 스택

### Frontend
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 
![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

### Backend
![NodeJS](https://img.shields.io/badge/node.js-6DA55F.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)


### 배포

![GCP](https://img.shields.io/badge/GCP-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)

---

## 🏃‍♀️ 설치 및 실행

### 필수 요구사항
- Node.js (v14 이상)
- MySQL (v5.7 이상)
- npm 또는 yarn

### 1. 레포지토리 클론
```bash
git clone https://github.com/vvzvvv/spring.git
cd spring
```


### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
# 서버 설정
PORT=8080

# 데이터베이스 설정
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PW=your_mysql_password
DB_NAME=spring_db

# JWT 시크릿 키
MY_SECRET=your_jwt_secret_key_here

# 이메일 설정 (Gmail 기준)
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# Google Cloud Storage (선택사항)
GCS_BUCKET=your_bucket_name
GCS_PROJECT_ID=your_project_id
GCS_KEYFILE=path/to/keyfile.json
```

### 4. 데이터베이스 설정
```bash
# MySQL 접속
mysql -u root -p

# 데이터베이스 생성
CREATE DATABASE spring_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 5. 서버 실행
```bash
# 개발 모드 (Nodemon - 자동 재시작)
npm start

# 프로덕션 모드
node ./bin/www
```

### 6. 브라우저 접속
http://localhost:3000

---

## 🧪 테스트

### 테스트 실행
```bash
npm test
```


