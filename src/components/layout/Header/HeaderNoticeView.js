import React, { useEffect } from 'react';
import {
  Badge, Container,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStores from '../../../stores/useStores';

const HeaderNoticeView = () => {
  const { EventAdvertiseStore, ComponentHeaderStore } = useStores();

  const { AdvertisePostListNow } = EventAdvertiseStore;
  const {
    showIndex, showMode, doCycleAds, showingHeader,
  } = ComponentHeaderStore;

  useEffect(() => {
    const interval = doCycleAds();
    return () => clearInterval(interval);
  }, [AdvertisePostListNow, showIndex, showMode, doCycleAds, showingHeader]);

  return (
    <>
      { showMode === 0 ? (
        <TextContainer>
          <Badge color="danger">공지사항</Badge>
          &nbsp;
          최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
          최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
        </TextContainer>
      ) : (
        <TextContainer>
          <Badge color="primary">광고</Badge>
          &nbsp;
          { (showingHeader && showingHeader.url) ? (
            <Link to={showingHeader.url}>
              <Span>
                (링크) {showingHeader.message}
              </Span>
            </Link>
          ) : (
            <span>
              {showingHeader.message}
            </span>
          )}
        </TextContainer>
      )}
    </>
  );
};

const Span = styled.span`
  color: black;
`;

const TextContainer = styled(Container)`
  margin : 0 !important;
  padding : 5px !important;
  text-align : center;
  height : 40px !important;
  border-left : 1px solid #e6e6e6;
  border-right : 1px solid #e6e6e6;
  overflow : hidden;
  text-overflow : ellipsis;
  white-space:nowrap;
  padding : 5px 10px !important;
  @media (max-width: 1200px) {
    border : 0;
  }
`;

export default observer(HeaderNoticeView);
