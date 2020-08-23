import React, { memo, useEffect } from 'react';
import { Badge, Container } from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStores from '../../../stores/useStores';

const HeaderNoticeView = () => {
  const {
    EventAdvertiseStore, ComponentHeaderStore, BoardPostStore,
  } = useStores();
  const { AdvertisePostListNow } = EventAdvertiseStore;
  const {
    showIndex, showMode, doCycleAds, showingHeader,
  } = ComponentHeaderStore;

  const { headerNoticeList } = BoardPostStore;

  useEffect(() => {
    const interval = doCycleAds();
    return () => clearInterval(interval);
  }, [AdvertisePostListNow, showIndex, showMode, doCycleAds, showingHeader]);

  console.log(headerNoticeList);

  return (
    <>
      { showMode === 0 ? (
        <TextContainer>
          <HeaderBadge color="danger">공지사항</HeaderBadge>
          &nbsp;
          최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
          최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자최대글자
        </TextContainer>
      ) : (
        <TextContainer>
          <HeaderBadge color="danger">광고</HeaderBadge>
          &nbsp;
          { showingHeader ? (showingHeader.url
            ? (
              <Link to={showingHeader.url}>
                <Span>
                  (링크) {showingHeader.message}
                </Span>
              </Link>
            ) : (
              <span>
                {showingHeader.message}
              </span>
            )) : (
              <span>&nbsp;</span>
          )}
        </TextContainer>
      )}
    </>
  );
};

const HeaderBadge = styled(Badge)`
  padding-top: .45em !important;
  line-height: 14px;
`;

const Span = styled.span`
  color: black;
`;

const TextContainer = styled(Container)`
  margin : 0 !important;
  text-align : center;
  line-height: 26px;
  vertical-align: middle;
  height : 40px !important;
  overflow : hidden;
  text-overflow : ellipsis;
  white-space:nowrap;
  padding : 5px 10px !important;
  border: 1px solid #e6e6e6;
  @media (max-width: 1200px) {
    border : 0;
  }
`;

export default memo(observer(HeaderNoticeView));
