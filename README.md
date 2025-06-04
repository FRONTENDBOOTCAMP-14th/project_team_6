# 🛍️ Blue Mall - 식스센스(6조) UI 프로젝트

(https://github.com/FRONTENDBOOTCAMP-14th/project_team_6/)

> 마켓컬리 사이트를 참조하여, 컴포넌트 기반의 Blue Mall 쇼핑몰 UI 웹페이지를 구현하였습니다.  
> VS Code 인터페이스를 모티프로 index 페이지를 구성하였습니다.

---

## 📂 목차

1. [프로젝트 개요](#-프로젝트-개요)
2. [구현 방법](#-구현-방법)
3. [인덱스 페이지 구성](#️-인덱스-페이지-구성)
4. [사용 방법 요약](#-사용-방법-요약)
5. [결과물 기능 리스트](#-결과물-기능-리스트)
6. [컴포넌트 구현 담당자 정리](#-컴포넌트-구현-담당자-정리)

---

## 📌 프로젝트 개요

- **프로젝트 명**: 식스센스(6조) UI 프로젝트
- **진행 기간**: 2025.05.26 ~ 2025.06.05
- **참여 인원**: 4명
- **목표**: HTML/CSS와 간단한 JavaScript를 활용하여 실전 UI 구조 설계 및 기능 구현

---

## 🛠 구현 방법

이 프로젝트는 재사용 가능한 UI 컴포넌트 구조를 기반으로 HTML, CSS, JavaScript를 조합하여 구현되었습니다.  
개발 환경은 Vite와 node.js 및 vanilla html, css, js를 기반으로 구성하였습니다.

### 🧪 기술 스택

- **HTML/CSS**: 시맨틱 마크업 + BEM 네이밍, CSS Grid/Flex 조합
- **JavaScript**: Vanilla JS (컴포넌트 별 JS 모듈 분리)
- **개발 환경**: Vite, Node.js 기반 로컬 서버
- **스타일 관리**: `reset.css`, `theme.css`, `base.css` 등 공통 스타일 분리
- **버전 관리**: Git + GitHub

### 🔧 주요 구조 및 컴포넌트

- `/src/components/...`  
  → 페이지 단위 구성 폴더 내 UI 컴포넌트 (`login`, `footer`, `list-category`, `product-list` 등)

- `/src/assets`  
  → 이미지 및 정적 리소스 저장

- `/src/common`  
  → 공통 스타일 파일 위치

- `/index`  
  → index 페이지 구성요소 위치

- `/output`  
  → output 페이지 구성요소 위치

- Production 구조
  → output-index.html이 렌더링 페이지 역할을 하며 main 부분을 output-index.js로 동적으로 import하여 직접DOM을 조작하여 렌더링 하는 형태

### 👩‍🦽‍➡️ 접근성 전략

- 개발 초기에는 ARIA 속성 적용이 미흡,  
  컴포넌트 개발 완료 후 접근성 개선(`aria-label`, `aria-expanded`, `aria-hidden` 등)을 단계적으로 반영할 계획

---

## 🖥️ 인덱스 페이지 구성

### 🎨 디자인

- VS Code를 본뜬 3분할 인터페이스
  - 사이드바 메뉴
  - 코드 편집 영역
  - 터미널 입력창

### 📂 사이드바

| 메뉴         | 동작                                                                                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `6th sense`  | 하위 메뉴 `Members`, `Components` 표시                                                                                                                                          |
| `Members`    | 에디터 창에서 팀원별 자기소개 및 회고 내용을 마크다운 스타일로 확인 가능                                                                                                        |
| `Components` | 각 컴포넌트의 HTML 마크업 구조를 코드 스타일로 확인할 수 있으며,<br>원하는 항목을 선택한 뒤 좌측 하단 Preview 버튼을 클릭하면 해당 컴포넌트의 실제 렌더링 결과를 확인할 수 있음 |

### 💻 터미널 창

- 실제 터미널처럼 구현되어 있으며, 사용자 입력을 받을 수 있음
- 아래 명령어를 입력하면 **Blue Mall 완성 페이지로 이동하는 링크가 출력**

```bash
npm run dev
```

---

## 📌 사용 방법 요약

1. `index.html`을 실행합니다.
2. 사이드바에서 `6th sense` 클릭 → `Members`, `Components` 메뉴 표시
3. `Members` 클릭 → 팀원별 `.md` 형식 자기소개 및 회고 확인
4. `Components` 클릭 → 구현된 컴포넌트 구조 시각적으로 확인
5. 터미널 창에 `npm run dev` 입력 → 완성된 쇼핑몰 페이지로 이동

---

## 🔨 결과물 기능 리스트

### Common

1. header

- 로고 : home page로 이동
- 장바구니 로고 : Cart page로 이동
- 사람모양 로고 : login page로 이동
- 리스트 카테고리 : Products list page로 이동

2. footer

- 전화번호 : a 태그로 전화번호로 연결

### HOME

1. Main banner

- 배너 컨트롤 넘버 : next와 prev 버튼으로 배너 이동
- Play 버튼 : 배너 자동재생의 실행/중지

2. Product Card

- 제품이미지 / 제품명 : 제품 상세 페이지로 이동
- 장바구니 로고 : 장바구니 Modal 실행

### Products list

1. filter

- 분류 : 클릭 시 해당 분류의 아코디언 펼침 및 타 분류 hidden
- 초기화 : 모든 체크박스 해제

2. list Nav

- 네비 : 클릭 시 active / inactive 상태 구분 구현

3. Product Card

- 제품이미지 / 제품명 : 제품 상세 페이지로 이동
- 장바구니 로고 : 장바구니 Modal 실행

### Product detail

1. 상품 상세

- 상품 갯수 조정 버튼 : 상품 갯수 변경 및 가격 연동
- 즐겨찾기 / 알림 버튼 : active / inactive 상태 구분 구현

2. 상세 Nav

- 네비 : 클릭 시 section 이동 및 active / inactive 상태 구분 구현
- 스크롤 감지에 따른 네비 active / inactive 상태 구분 구현

3. 상품 리뷰

- 리뷰 리스트 : 제목 클릭 시 내용 아코디언 펼침 및 타 리뷰 hidden
- 비밀 리뷰 : 비밀번호 입력 input / 입력 시 비밀번호 오류 메시지 출력

### Cart

1. 장바구니 리스트

- 체크박스 : 전체 선택 시 모든 체크박스 checked / unchecked
- 카테고리 제목 : 클릭 시 해당 카테고리의 아코디언 펼침
- 제품 수량 조정 버튼 : 제품 수량 변경 및 가격 연동

2. 주문 정보

- 배송지 버튼 : 클릭 시 modal 작동
- 주문 결제 금액 계산 : 체크박스 체크와 수량을 연동하여 총 금액 출력 / 1만원을 threshold로 배송비 변동

### LOGIN

1. 로그인

- 로그인 버튼 : 클릭 시 modal 작동
- 회원가입 버튼 : 클릭 시 register page로 이동

### REGISTER

1. 회원가입 입력

- 주소검색 버튼 : 클릭 시 modal 작동
- 약관동의 체크박스 : 전체 동의 체크박스 클릭 시 모든 체크박스의 checked / unchecked
- 가입하기 버튼 : 클릭 시 modal 작동

---

## 🧑‍💻 컴포넌트 구현 담당자 정리

| 이름     | 담당 컴포넌트 / 역할 요약                                         |
| -------- | ----------------------------------------------------------------- |
| 김에스더 | `cart-content`, `product-list`, `detail`, `list-container`        |
| 심현보   | `cart`, `login`, `Register`                                       |
| 윤동식   | `item-inquire`, `item-review`, `list-category`                    |
| 이수진   | `banner`, `footer`, `header`, `detail-nav`, `detail-product-desc` |
