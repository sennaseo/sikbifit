# 식비핏

자취생과 직장인을 위한 월 식비 예산 계산기입니다. 외식, 배달, 장보기, 카페 패턴을 입력하면 월 예상 식비와 절약 루틴, 장보기 체크리스트를 바로 확인할 수 있습니다.

라이브 사이트: https://sikbifit.netlify.app

## 핵심 기능

- 월 식비 목표 대비 예상 지출 계산
- 평일 외식, 주말 외식, 배달, 장보기, 카페 지출 반영
- 예산 여유/주의/초과 상태 진단
- localStorage 기반 입력값 저장
- Web Share API 기반 결과 공유
- SEO 랜딩 문구, FAQ, Open Graph 메타태그
- AdSense 및 제휴 CTA 삽입 가능 영역

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

## 빌드 방법

```bash
npm run build
npm run preview
```

## 배포 방법

### Netlify

1. GitHub 저장소에 프로젝트를 올립니다.
2. Netlify에서 새 사이트를 생성합니다.
3. Build command는 `npm run build`, Publish directory는 `dist`로 설정합니다.
4. 배포 후 `VITE_SITE_URL` 값을 실제 도메인으로 맞춥니다.

### Vercel

1. Vercel에서 저장소를 Import 합니다.
2. Framework Preset은 Vite로 선택합니다.
3. Build command는 `npm run build`, Output directory는 `dist`로 설정합니다.

## SEO 키워드

- 식비 계산기
- 자취 식비
- 월 식비 예산
- 생활비 계산기
- 외식비 계산기
- 배달비 줄이기
- 장보기 체크리스트
- 1인 가구 생활비

## 수익화 위치

- 결과 카드 하단: 반응형 AdSense 영역
- 절약 힌트 아래: 장보기/밀프렙 제휴 CTA
- FAQ 전: 광고 또는 뉴스레터 구독 영역으로 확장 가능

## 초기 홍보 문구

이번 달 식비가 왜 이렇게 많이 나왔는지 궁금하다면, 식비핏에서 30초 만에 계산해보세요. 외식, 배달, 장보기 패턴만 넣으면 월 예상 식비와 줄일 수 있는 포인트를 바로 보여줍니다.

## 포트폴리오 설명

식비핏은 검색 유입을 목표로 설계한 SEO형 미니 웹서비스입니다. 백엔드 없이 React와 localStorage만으로 계산기형 서비스를 구현했고, 공유 기능과 광고/제휴 CTA 영역을 포함해 초기 수익화 실험 구조까지 설계했습니다.
