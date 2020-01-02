import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import avatar from '../../../resources/images/anonymous.png';
import * as Proptypes from 'prop-types';
import renderHTML from 'react-render-html';

const ReplyInHeader = styled.div`
  background: #f7f7f7;
  border-bottom: 1px solid #efefef;
  padding: 0.4em 0.5em;
  
  & .replyOption {
    padding-top: 6px;
    font-size : 12px;
    float : right;
  }
`;

const ReplyInContent = styled.div`
  padding: 0.7em;
`;

const AvatarImg = styled.img`
  height : 30px;
  border-radius: 50%;
  margin-right : 1px;
`;

const ReplyWrapper = styled.div`
  margin-bottom: 0.5em;
  border: 1px solid #f1f1f1;
  width : 100%;
`;

const ReplyWriter = styled.span`
  color : #DC3545;
  font-weight : bold;
  font-size : 14px;
`;

const ReplyLayout = styled.div`
  display : flex;
`;

const ReplyDepthIcon = styled(FontAwesomeIcon)`
  margin : 8px;
`;


const Reply = ({ data }) => {
  console.log(data);
  return (
    <>
      <ReplyWrapper>
        <ReplyInHeader>
          <AvatarImg src={avatar} />
          <ReplyWriter> {data.writer} </ReplyWriter> (글쓴이)
          <span className="replyOption"> 좋아요  · 대댓글 ·  29분 전  ·  수정  · 신고 #</span>
        </ReplyInHeader>
        <ReplyInContent>
          {renderHTML(`${data.content}`)}
        </ReplyInContent>
      </ReplyWrapper>

      {/*<ReplyLayout>*/}
      {/*  <Link href="#"><ReplyDepthIcon icon={faShare} /></Link>*/}
      {/*  <ReplyWrapper>*/}
      {/*    <ReplyInHeader>*/}
      {/*      <AvatarImg src={avatar} />*/}
      {/*      <ReplyWriter> 그림일기 </ReplyWriter> (글쓴이)*/}
      {/*      <span className="replyOption"> 좋아요  · 대댓글 ·  29분 전  ·  수정  · 신고 #</span>*/}
      {/*    </ReplyInHeader>*/}
      {/*    <ReplyInContent>*/}
      {/*      개창렬ㅇㅈ 얍얍프리미엄으로삼*/}
      {/*      <br />*/}
      {/*      저 밑에보니 인터넷으로 곽으로된거 4400원에 사셨네 ㅋㅋ*/}
      {/*    </ReplyInContent>*/}
      {/*  </ReplyWrapper>*/}
      {/*</ReplyLayout>*/}
    </>
  );
};

Reply.propTypes = {
  data: Proptypes.shape({
    writer: Proptypes.string,
    content: Proptypes.string,
  }).isRequired,
}

export default Reply;