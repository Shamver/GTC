import React, { memo } from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import ProfileModalNickName from './ProfileModalNickName';
import ModalPagination from './ProfilePageNation';

const ProfileModalNickNameHistory = () => {
  const { UserStore, UtilStore } = useStores();
  const { profileData, getNickNameList } = UserStore;
  const {
    pageIndex, rows, startPage,
  } = UtilStore;
  const { nickNameRows } = rows;
  const { nickNameStart } = startPage;
  const { nickNameIndex } = pageIndex;
  const { profileNicknameHistory, profileInfo } = profileData;
  const { changeCount } = profileInfo;

  const nicknameList = profileNicknameHistory.map((index) => (
    <ProfileModalNickName NickNameData={index} key={index.id} />
  ));

  return (
    <>
      <TableBox xs="12">
        <TableHeader>
          <Col xs="9">닉네임</Col>
          <Col xs="3">마지막 사용일</Col>
        </TableHeader>
        { nicknameList.length > 0
          ? nicknameList
          : <NoPost>변경 이력이 없습니다.</NoPost>}
      </TableBox>
      <ModalPagination rows={nickNameRows} pageIndex={nickNameIndex} req={getNickNameList} count={changeCount} postStart={nickNameStart} />
    </>
  );
};

const TableBox = styled(Col)`
  padding: 5px;
`;

const TableHeader = styled(Row)`
  font-size: 15px;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const NoPost = styled.div`
  width: 100%;
  text-align: center;
  padding: 12px 0;
  font-size: 13px;
`;

export default memo(observer(ProfileModalNickNameHistory));
