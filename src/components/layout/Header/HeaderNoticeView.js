import React, { memo, useEffect, useState } from 'react';
import { Badge, Container } from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useStores from '../../../stores/useStores';

const HeaderNoticeView = () => {
  const {
    ComponentHeaderStore, BoardPostStore,
  } = useStores();
  const {
    showMode, doCycleHeader, showingHeader, settingHeader,
  } = ComponentHeaderStore;
  const { headerNoticeList } = BoardPostStore;

  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    settingHeader(isFirst);
    setIsFirst(false);
  }, [headerNoticeList]);

  useEffect(() => {
    const interval = doCycleHeader();
    return () => clearInterval(interval);
  }, [
    doCycleHeader,
  ]);

  return (
    <>
      { showMode === 0 ? (
        <TextContainer>
          <HeaderBadge color="danger">공지사항</HeaderBadge>
          &nbsp;
          <Link to={showingHeader.url}>
            <Span>
              {showingHeader.message}
            </Span>
          </Link>
        </TextContainer>
      ) : (
        <TextContainer>
          <HeaderBadge color="danger">광고</HeaderBadge>
          &nbsp;
          { showingHeader && (showingHeader.url
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
            ))}
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
