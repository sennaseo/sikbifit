# 식비핏 배포 가이드

## 권장 배포 환경

Netlify 또는 Vercel 정적 배포를 권장합니다. 서버, DB, 환경변수 없이도 기본 서비스가 동작합니다.

현재 배포 URL: https://sikbifit.netlify.app
Netlify 프로젝트: https://app.netlify.com/projects/sikbifit

## Netlify 배포

1. GitHub에 프로젝트를 push합니다.
2. Netlify에서 `Add new site`를 선택합니다.
3. 저장소를 연결합니다.
4. Build command에 `npm run build`를 입력합니다.
5. Publish directory에 `dist`를 입력합니다.
6. 배포 후 사이트 URL을 확인합니다.

## Vercel 배포

1. Vercel에서 `Add New Project`를 선택합니다.
2. GitHub 저장소를 import합니다.
3. Framework Preset은 Vite를 선택합니다.
4. Build command는 `npm run build`, Output directory는 `dist`로 둡니다.
5. Deploy를 실행합니다.

## 배포 후 해야 할 일

- `index.html`의 canonical URL을 실제 도메인으로 변경
- `og-image.png` 제작 후 public 폴더에 추가
- Google Search Console 등록
- Google Analytics 또는 Plausible 연결
- AdSense 승인 후 광고 슬롯에 스크립트 삽입

## 운영 가이드

- 초기 2주는 Search Console에서 노출 키워드를 확인합니다.
- 유입 키워드가 잡히면 해당 키워드 FAQ를 추가합니다.
- 광고는 결과 확인 이후 영역부터 테스트합니다.
- 제휴 링크는 사용자의 계산 흐름을 방해하지 않는 CTA 영역에만 둡니다.
