import React, { memo } from 'react';
import {
  Container,
} from 'reactstrap';
import styled from 'styled-components';

const Advertising = () => (
  <MainContainer>
    <h3>GTC 광고 문의</h3>
    <Description>
      <p>GTC는 트위치 시청자를 위한 커뮤니티 사이트입니다.</p>
      <p>GTC는 2018년 1월 기준 월간 사용자 수 650만명을 돌파하였으며, 국내 사이트 100위권에 해당하고 있는 사이트로 현재도 꾸준히 성장하고 있습니다.</p>
      <p>디스플레이 광고는 물론,
        시청자와 스트리머가 함께 참여할 수 있는 참여형 프로모션 등 Gaming Industry에 새로운 브랜드 홍보와 이미지 재고의 기회를 제공하고 있습니다.
      </p>
      <p>GTC를 운영중인 주식회사 이제이엔은 트위치 커뮤니티 GTC를 포함,
        e스포츠 플랫폼 Battle.dog 등 게이밍 커뮤니티를 위한 다양한 서비스를 운영 및 개발 중에 있으며,
        방문자들에게 기존 프로모션과는 차원이 다른 특별한 경험을 제공할 수 있도록 노력하고 있습니다.
      </p>
      <p>다양한 방법의 협력이 가능하오니 관련 문의사항이 있으시면 주저말고 문의해 주십시오.</p>
      <p>열린 마음과 합리적인 비용으로 귀사의 브랜드에 도움이 될 수 있도록 이제이엔은 최선을 다하겠습니다.</p>
      <p>감사합니다.</p>
    </Description>
  </MainContainer>
);

const MainContainer = styled(Container)`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color: white;
  padding: 1rem !important;
`;

const Description = styled.div`
  & p{
    font-weight: 300;
    font-size: 15px;
  }
`;

export default memo(Advertising);
