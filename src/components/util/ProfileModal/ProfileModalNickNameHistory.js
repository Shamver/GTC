import React, { memo } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalNickName from './ProfileModalNickName';

const ProfileModalNickNameHistory = () => {
  const { UtilStore } = useStores();
  const { profileData } = UtilStore;
  const { profileNicknameHistory } = profileData;
  const nicknameList = profileNicknameHistory.map((index) => (
    <ProfileModalNickName NickNameData={index} key={index.userId} />
  ));

  return (
    <>
      <TableBox>
        <TableHeader>
          <Col xs="9">닉네임</Col>
          <Col xs="3">마지막 사용일</Col>
        </TableHeader>
        { nicknameList.length > 0
          ? nicknameList
          : <NoPost>변경 이력이 없습니다.</NoPost>}
      </TableBox>
    </>
  );
};

const TableBox = styled.div`
  padding: 5px;
`;

const TableHeader = styled(Row)`
  font-size: 15px;
  padding: 12px 0;
`;

const NoPost = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
`;

export default memo(observer(ProfileModalNickNameHistory));
