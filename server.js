const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

// R-ONE API 설정
const REB_API_URL = 'https://www.reb.or.kr/r-one/openapi/SttsApiTblData.do';
const API_KEY = '561757e064204dcb9432835864216915';
const STATBL_ID = 'A_2024_00045';

// 지역별 STATBL_ID 매핑
const REGION_IDS = {
  '전국': 'A_2024_00045',
  '서울특별시': 'A_2024_00045',
  '부산광역시': 'A_2024_00045',
  '대구광역시': 'A_2024_00045',
  '인천광역시': 'A_2024_00045',
  '광주광역시': 'A_2024_00045',
  '대전광역시': 'A_2024_00045',
  '울산광역시': 'A_2024_00045',
  '세종특별자치시': 'A_2024_00045',
  '경기도': 'A_2024_00045',
  '강원특별자치도': 'A_2024_00045',
  '충청북도': 'A_2024_00045',
  '충청남도': 'A_2024_00045',
  '전라북도': 'A_2024_00045',
  '전라남도': 'A_2024_00045',
  '경상북도': 'A_2024_00045',
  '경상남도': 'A_2024_00045',
  '제주특별자치도': 'A_2024_00045'
};

// R-ONE API 호출 함수
async function fetchRateData() {
  try {
    const url = `${REB_API_URL}?KEY=${API_KEY}&Type=json&STATBL_ID=${STATBL_ID}&pIndex=1&pSize=1000&DTACYCLE_CD=MM`;
    
    console.log('API 호출 중:', url);
    
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('API 응답:', JSON.stringify(data).substring(0, 500));
    
    return data;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return null;
  }
}

// API 엔드포인트: 모든 지역 변동률 반환
app.get('/api/rates', async (req, res) => {
  try {
    const data = await fetchRateData();
    
    if (!data) {
      return res.json({
        success: false,
        message: 'R-ONE API 호출 실패',
        data: null,
        baseDate: ''
      });
    }
    
    // 응답 데이터 정리
    const result = {
      success: true,
      message: '정상 조회됨',
      data: data,
      baseDate: new Date().toISOString(),
      timestamp: new Date().getTime()
    };
    
    res.json(result);
  } catch (error) {
    console.error('에러:', error);
    res.status(500).json({
      success: false,
      message: error.message,
      data: null
    });
  }
});

// 헬스 체크
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 기본 라우트
app.get('/', (req, res) => {
  res.send('부동산 모닝리포트 API 서버 - R-ONE 연동');
});

// 포트 설정
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버 시작: http://localhost:${PORT}`);
  console.log(`API 엔드포인트: http://localhost:${PORT}/api/rates`);
});

module.exports = app;
