# 부동산 모닝리포트 API 서버

R-ONE(한국부동산원) API를 호출하여 지역별 매매가격지수 변동률을 제공하는 Node.js 서버입니다.

## 구성

- `server.js` - Express 서버
- `package.json` - 의존성 설정
- `vercel.json` - Vercel 배포 설정

## 엔드포인트

### GET /api/rates
모든 지역의 매매가격지수 변동률 데이터 반환

**응답 예시:**
```json
