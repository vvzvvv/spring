# 🌱 Spring - 우울증 환자 자가 관리 플랫폼


> 우울증 환자들이 일상 속에서 스스로 상태를 기록하고 관리할 수 있도록 돕기 위한 웹 플랫폼입니다. 감정 상태, 수면, 운동, 일기 등 생활 기록 기능을 제공하며, 의사와 연동하여 보다 체계적인 관리를 지원합니다.
>
> **🏆 교내 소프트웨어 경진대회 동상 수상**

## 1. 프로젝트 소개

### 배경 및 목적
우울증 환자들이 자신의 상태를 스스로 기록하고 관리할 수 있는 웹 서비스입니다. 환자는 자가진단 결과와 생활 기록 데이터의 그래프를 확인하며, 스스로의 변화와 개선 정도를 시각적으로 파악할 수 있습니다. 이를 통해 회복에 대한 동기를 부여받을 수 있도록 설계되었습니다.

### 핵심 가치
- **자가 관리**: 환자가 주도적으로 자신의 건강 상태를 기록하고 모니터링
- **시각화**: Chart.js를 활용한 데이터 시각화로 변화와 개선 정도를 직관적으로 파악
- **의료진 연동**: 의사가 환자의 건강 데이터를 열람하고 처방전을 관리
- **동기 부여**: 그래프와 기록을 통해 회복 과정의 긍정적 변화를 확인하고 동기 부여
- **프라이버시 보호**: 환자가 각 건강 정보의 공유 여부를 세밀하게 제어

### 제공 서비스
- 우울증 자가진단 테스트 및 기록 관리
- 일상생활 기록 (약 복용, 운동, 수면)
- 일기 작성을 통한 감정 정리 및 불안감 해소
- 의사-환자 연동 및 처방전 관리
- 데이터 시각화 및 통계 제공

## 2. 주요 기능

### 2-1. 사용자 관리
- **이중 계정 시스템**
  - 환자(Patient) 계정: 건강 기록 및 자가 관리
  - 의사(Doctor) 계정: 환자 관리 및 처방전 발행
- **회원가입 및 로그인**: JWT 기반 인증 시스템
- **이메일 인증**: Nodemailer를 활용한 회원가입 이메일 확인
- **비밀번호 재설정**: 이메일 링크를 통한 안전한 비밀번호 복구

### 2-2. 건강 기록 관리
#### 🔬 우울증 자가진단 테스트
- 주기적인 우울증 자가진단 수행
- 점수 및 결과 자동 계산
- 테스트 이력 관리 및 추이 확인
- 과거 테스트 상세 내역 조회

#### 💊 약 기록 (처방전 관리)
- 의사의 처방전 발행 및 관리
- 처방약 기록 (약 이름, 처방일, 처방량)
- 복용 기록 작성 (복용 날짜, 시간대)
- 약별 복용 현황 그래프 시각화 (Chart.js)
- 처방약 및 복용약 기록 수정/삭제 기능

#### 😴 수면 기록
- 취침시간, 기상시간 입력
- 수면의 질 평가 기록
- 총 수면시간 자동 계산
- 최근 7일간 수면 패턴 그래프
- 날짜별 수면 기록 조회

#### 💪 운동 기록
- 운동 종류 및 운동량 기록
- 운동 내역 리포트 관리
- 운동 패턴 시각화

#### 📝 일기 작성
- 날짜별 일기 작성 및 조회
- 감정 상태 및 생각 기록
- 과거 일기 검색 및 열람



### 2-3. 의사 기능
- **환자 검색 및 추가**: 이메일 기반 환자 검색 및 관리 요청
- **요청 관리**: 환자 추가 요청 목록 조회, 수락/거절
- **환자 관리**: 담당 환자 목록 조회 및 검색
- **환자 정보 열람**: 환자가 동의한 건강 정보만 접근 가능
- **처방전 발행**: 환자별 처방전 작성 및 관리
- **건강 데이터 모니터링**: 환자의 복약, 수면, 운동, 테스트 기록 확인

### 2-4. 기타 기능
- **마이페이지**: 개인정보 수정 및 계정 관리
- **정보 제공 동의 관리**: 복약/수면/운동/테스트 정보 각각 공유 여부 설정

## 3. 기술 스택

### Frontend
- **HTML5, CSS3, JavaScript (ES6+)**
- **Chart.js**: 데이터 시각화 (수면, 운동, 약 복용 그래프)
- **EJS**: 서버 사이드 템플릿 엔진

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (웹 애플리케이션 프레임워크)
- **ORM**: Sequelize (데이터베이스 모델링 및 쿼리)
- **Database**: MySQL

### 인증 & 보안
- **JWT**: jsonwebtoken (토큰 기반 인증)
- **Bcrypt**: 비밀번호 해시 암호화
- **Passport.js**: 인증 미들웨어 (JWT, Local 전략)

### 파일 처리 & 이메일
- **Multer**: 파일 업로드 처리 (의사 면허증)
- **multer-google-storage**: Google Cloud Storage 연동
- **Nodemailer**: 이메일 발송 (인증, 비밀번호 재설정)

### Infrastructure
- **GCP Compute Engine**: 데이터베이스 서버 배포


## 4. 아키텍처

### MVC 패턴
이 프로젝트는 **MVC(Model-View-Controller)** 아키텍처를 따릅니다.

```
Client (Browser)
    ↓ HTTP Request
View (EJS Templates)
    ↓
Controller (비즈니스 로직)
    ↓
Model (Sequelize ORM)
    ↓
Database (MySQL)
```


- **Model**: Sequelize를 통한 데이터베이스 스키마 정의 및 관계 설정
- **View**: EJS 템플릿을 사용한 동적 HTML 렌더링
- **Controller**: 요청 처리, 비즈니스 로직 실행, 응답 반환

## 5. 시작하기

### 필수 요구사항
- Node.js (v14 이상)
- MySQL (v5.7 이상)
- npm 또는 yarn

### 설치 및 실행

1. **레포지토리 클론**
```bash
git clone https://github.com/vvzvvv/spring.git
cd spring-project
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 입력하세요:

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

4. **데이터베이스 설정**
```bash
# MySQL 접속
mysql -u root -p

# 데이터베이스 생성
CREATE DATABASE spring_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Sequelize가 자동으로 테이블을 생성합니다
```

5. **서버 실행**
```bash
# 개발 모드 (Nodemon - 자동 재시작)
npm start

# 프로덕션 모드
node ./bin/www
```

6. **브라우저에서 접속**
```
http://localhost:8080
```

## 6. 프로젝트 구조

```
spring-project/
├── app.js                          # Express 애플리케이션 메인 파일
├── authenticateToken.js            # JWT 인증 미들웨어
├── emailVerificationConfig.js      # 이메일 인증 설정
├── package.json                    # 프로젝트 의존성 및 스크립트
├── bin/
│   └── www                         # 서버 실행 스크립트
├── config/
│   └── config.js                   # 데이터베이스 연결 설정
├── constants/
│   ├── responseMessage.js          # API 응답 메시지 상수
│   └── statusCode.js               # HTTP 상태 코드 상수
├── controllers/                    # 컨트롤러 (비즈니스 로직)
│   ├── user/                       # 사용자 인증 및 관리
│   │   ├── joinPatientPOST.js      # 환자 회원가입
│   │   ├── joinDoctorPOST.js       # 의사 회원가입
│   │   ├── loginPOST.js            # 로그인
│   │   ├── emailCheckingPOST.js    # 이메일 중복 확인
│   │   ├── passwordResetLinkPOST.js # 비밀번호 재설정 링크 발송
│   │   └── passwordPUT.js          # 비밀번호 변경
│   ├── doctor/                     # 의사 기능
│   │   ├── searchPatientPOST.js    # 환자 검색
│   │   └── addPatientPOST.js       # 환자 추가 요청
│   ├── doctor_main/                # 의사 메인 페이지
│   │   ├── getAllPatientsGET.js    # 전체 환자 조회
│   │   ├── requestListGET.js       # 요청 목록 조회
│   │   ├── cancelRequestPOST.js    # 요청 취소
│   │   ├── searchMyPatientsPOST.js # 담당 환자 검색
│   │   └── openPatientPageGET.js   # 환자 상세 페이지
│   ├── prescription/               # 처방전 관리
│   │   ├── chartGET.js             # 차트 데이터 조회
│   │   ├── mainChartGET.js         # 메인 차트
│   │   ├── prescriptionContentGET.js    # 처방 내용 조회
│   │   ├── prescriptionContentPOST.js   # 처방 내용 작성
│   │   ├── prescriptionContentEDIT.js   # 처방 내용 수정
│   │   ├── prescriptionContentDELETE.js # 처방 내용 삭제
│   │   ├── prescriptionReportGET.js     # 복용 리포트 조회
│   │   ├── prescriptionReportPOST.js    # 복용 리포트 작성
│   │   ├── prescriptionReportEDIT.js    # 복용 리포트 수정
│   │   └── prescriptionReportDELETE.js  # 복용 리포트 삭제
│   ├── sleep/                      # 수면 기록
│   │   ├── sleepGET.js             # 수면 기록 조회
│   │   ├── sleepPOST.js            # 수면 기록 작성
│   │   ├── sleepByDateGET.js       # 날짜별 수면 조회
│   │   ├── getTotalSleep.js        # 총 수면 통계
│   │   └── getLast7DaysSleep.js    # 최근 7일 수면
│   ├── exercise/                   # 운동 기록
│   │   ├── exerciseGET.js          # 운동 기록 조회
│   │   └── exercisePOST.js         # 운동 기록 작성
│   ├── diary/                      # 일기
│   │   ├── diaryGET.js             # 일기 조회
│   │   └── diaryPOST.js            # 일기 작성
│   ├── test/                       # 우울증 자가진단
│   │   ├── testGET.js              # 테스트 조회
│   │   ├── testPOST.js             # 테스트 작성
│   │   └── testListGET.js          # 테스트 목록 조회
│   ├── board/                      # 게시판
│   │   └── boardUserInfoGET.js     # 게시판 사용자 정보
│   └── mypage/                     # 마이페이지
│       ├── managementGET.js        # 계정 정보 조회
│       ├── managementPUT.js        # 계정 정보 수정
│       ├── agreementGET.js         # 정보 제공 동의 조회
│       └── agreementPUT.js         # 정보 제공 동의 수정
├── models/                         # 모델 (Sequelize)
│   ├── index.js                    # 모델 초기화 및 관계 설정
│   ├── user.js                     # 환자(사용자) 모델
│   ├── doctor.js                   # 의사 모델
│   ├── prescription.js             # 처방약 모델
│   ├── prescription_report.js      # 복용 리포트 모델
│   ├── sleep_report.js             # 수면 리포트 모델
│   ├── exercise_report.js          # 운동 리포트 모델
│   ├── test.js                     # 우울증 테스트 모델
│   ├── diary.js                    # 일기 모델
│   ├── patient_management.js       # 의사-환자 관계 모델
│   ├── request_status.js           # 환자 추가 요청 상태 모델
│   ├── post.js                     # 게시판 게시글 모델
│   ├── comment.js                  # 게시판 댓글 모델
│   ├── password_token.js           # 비밀번호 재설정 토큰 모델
│   ├── db.js                       # 데이터베이스 연결
│   ├── prescriptionQuery.js        # 처방 관련 쿼리
│   ├── sleepQuery.js               # 수면 관련 쿼리
│   ├── exerciseQuery.js            # 운동 관련 쿼리
│   ├── diaryQuery.js               # 일기 관련 쿼리
│   ├── testQuery.js                # 테스트 관련 쿼리
│   ├── boardQuery.js               # 게시판 관련 쿼리
│   ├── myPageQuery.js              # 마이페이지 관련 쿼리
│   ├── doctorMainQuery.js          # 의사 메인 쿼리
│   └── addPatientQuery.js          # 환자 추가 쿼리
├── routes/                         # 라우터 (API 엔드포인트)
│   ├── index.js                    # 메인 라우터
│   ├── user/                       # 사용자 라우트
│   ├── doctor/                     # 의사 라우트
│   ├── prescription/               # 처방전 라우트
│   ├── sleep/                      # 수면 라우트
│   ├── exercise/                   # 운동 라우트
│   ├── diary/                      # 일기 라우트
│   ├── test/                       # 테스트 라우트
│   ├── board/                      # 게시판 라우트
│   └── mypage/                     # 마이페이지 라우트
├── views/                          # 뷰 (EJS 템플릿)
│   ├── index.ejs                   # 메인 페이지
│   ├── header.ejs                  # 헤더 컴포넌트
│   ├── menu.ejs                    # 메뉴 컴포넌트
│   ├── error.ejs                   # 에러 페이지
│   ├── user/                       # 사용자 관련 뷰
│   ├── doctor/                     # 의사 관련 뷰
│   ├── prescription/               # 처방전 관련 뷰
│   ├── sleep/                      # 수면 관련 뷰
│   ├── exercise/                   # 운동 관련 뷰
│   ├── diary/                      # 일기 관련 뷰
│   ├── test/                       # 테스트 관련 뷰
│   ├── board/                      # 게시판 관련 뷰
│   └── mypage/                     # 마이페이지 관련 뷰
├── public/                         # 정적 파일
│   ├── stylesheets/                # CSS 파일
│   │   ├── style.css               # 공통 스타일
│   │   ├── header.css              # 헤더 스타일
│   │   ├── menu.css                # 메뉴 스타일
│   │   ├── prescription.css        # 처방전 스타일
│   │   ├── sleep.css               # 수면 스타일
│   │   ├── exercise.css            # 운동 스타일
│   │   ├── diary.css               # 일기 스타일
│   │   ├── test.css                # 테스트 스타일
│   │   ├── board.css               # 게시판 스타일
│   │   ├── mypage.css              # 마이페이지 스타일
│   │   └── doctor_*.css            # 의사 관련 스타일
│   ├── javascripts/                # 클라이언트 JavaScript
│   │   └── myPatients.js           # 환자 관리 스크립트
│   ├── images/                     # 이미지 파일
│   └── fonts/                      # 폰트 파일
└── __test__/                       # 테스트 파일
    └── doctorJoin.test.js          # 의사 회원가입 테스트
```

## 7. 데이터 모델링

### ERD



## 8. 실행 화면

### 회원가입 및 로그인

#### 로그인 화면


#### 환자 회원가입


#### 의사 회원가입


#### 비밀번호 재설정

### 건강 기록 관리

### 🔬 우울증 자가진단 테스트

- 우울증 자가진단 설문 수행
- 점수 및 결과 확인
- 테스트 이력 관리
- 과거 테스트 상세 내역 조회

#### 💊 처방약 및 복용 기록

- 처방약 이름, 처방일, 처방량 입력
- 복용 날짜 및 시간대 기록
- Chart.js를 활용한 약별 복용 현황 시각화
- 처방약 및 복용 기록 수정/삭제

#### 😴 수면 기록

- 취침시간, 기상시간 입력
- 수면의 질 평가
- 총 수면시간 자동 계산
- 일주일간 수면 패턴 그래프

#### 💪 운동 기록


#### 📝 일기 작성

- 날짜별 일기 작성
- 과거 일기 조회 및 검색




</div>
