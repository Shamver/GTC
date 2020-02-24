import React from 'react';
import styled from 'styled-components';

const DailyHeader = () => (
  <>
    <H4>출석 체크</H4>
    <p>매일 1회 출석체크를 하시면 포인트를 드립니다. 매일매일 출석체크로 GTC와 함께 기분좋은 하루를 시작해보세요.</p>
    <ul>
      <li>출첵 기본 포인트 : 20점</li>
      <li>1,2,3등 각각 +50, +30, +10점 보너스</li>
      <li>7콤보 마다 +20점 보너스</li>
      <li>30콤보 마다 +100점 보너스</li>
    </ul>
  </>
);

const H4 = styled.h4`
  margin-bottom: 0;
  font-weight: 600;
`;

export default DailyHeader;
