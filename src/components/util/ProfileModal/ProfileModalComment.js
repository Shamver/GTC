import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {Col, Row} from "reactstrap";

const ProfileModalComment = ({ commentData }) => {
  const { commentId, commentContent, commentCreated, postCommentId } = commentData;
  return (
    <TableBody to={`/post/${postCommentId}`}>
        <Row>
            <ContentsBodyTitle xs="9">
                <ContentsTitle>{commentContent}</ContentsTitle>
            </ContentsBodyTitle>
            <ContentsBodyDate xs={"3"}>{commentCreated}</ContentsBodyDate>
        </Row>
    </TableBody>
  );
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