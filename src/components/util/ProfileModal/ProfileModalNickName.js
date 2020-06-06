import React, { memo } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';
import * as Proptypes from 'prop-types';

const ProfileModalNickName = ({ NickNameData }) => {
  const { nicknameHistory, nicknameChanged } = NickNameData;

  return (
    <TableBody>
      <Row>
        <ContentsBodyTitle xs="9">
          <ContentsTitle>{nicknameHistory}</ContentsTitle>
        </ContentsBodyTitle>
        <ContentsBodyDate xs="3">{nicknameChanged}</ContentsBodyDate>
      </Row>
    </TableBody>
  );
};

ProfileModalNickName.propTypes = {
  NickNameData: Proptypes.shape({
    nicknameHistory: Proptypes.string,
    nicknameChanged: Proptypes.string,
  }).isRequired,
};

const TableBody = styled.div`
  display: block;
  padding: 12px 0;
  color: black !important; 
  font-size: 13px;
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

export default memo(observer(ProfileModalNickName));
