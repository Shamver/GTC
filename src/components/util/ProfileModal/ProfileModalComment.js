import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import renderHTML from 'react-render-html';
import useStores from '../../../stores/useStores';
import * as Proptypes from 'prop-types';

const ProfileModalComment = ({ commentData }) => {
  const { UtilStore } = useStores();
  const { toggleProfile } = UtilStore;
  const { commentId, commentContent, commentCreated } = commentData;
  const commentContentText = renderHTML(`${commentContent}`);

  return (
    <TableBody to={`/post/${commentId}`} onClick={toggleProfile}>
      <Row>
        <ContentsBodyTitle xs="9">
          <ContentsTitle>{commentContentText}</ContentsTitle>
        </ContentsBodyTitle>
        <ContentsBodyDate xs="3">{commentCreated}</ContentsBodyDate>
      </Row>
    </TableBody>
  );
};

ProfileModalComment.propTypes = {
  commentData: Proptypes.string.isRequired,
};

const TableBody = styled(Link)`
  display: block;
  padding: 12px 0;
  color: black !important; 
  font-size: 13px;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;

const ContentsBodyTitle = styled(Col)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  p {
    margin: 0 !important;
  }
`;

const ContentsTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 90%;
  vertical-align: middle;
`;

const ContentsBodyDate = styled(Col)`
`;

export default observer(ProfileModalComment);
