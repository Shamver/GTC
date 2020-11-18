import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import { observer } from 'mobx-react';
import useStores from '../../../../stores/useStores';
import levelAdmin from '../../../../resources/images/level/levelAdmin.png';

const WriterDropdown = () => {
  const {
    ComponentPostStore, UtilAlertStore, UserStore, UserIgnoreStore,
    BoardPostStore, BoardReportStore,
  } = useStores();
  const { postView } = BoardPostStore;
  const {
    writerId, writerName, isWriterAdmin, isWriterOperator,
  } = postView;
  const { toggleReport } = BoardReportStore;
  const { dropdown, onActive, onSet } = ComponentPostStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { userData, getProfile } = UserStore;
  const { addIgnore } = UserIgnoreStore;

  // 하나하나 로우 드롭다운이 생성될때마다 그에 대한 드롭다운 객체 생성
  useLayoutEffect(() => {
    onSet('profile');
  }, [onSet]);

  return (
    <WriterDropdownIn isOpen={dropdown.profile} toggle={(e) => onActive('profile', e)}>
      <WriterDropdownToggle>
        {(isWriterAdmin || isWriterOperator) && (<LevelImage src={levelAdmin} alt="" />)}
        <b>{writerName}</b>님
      </WriterDropdownToggle>
      <WriterDropdownMenu>
        <WriterDropdownItem onClick={() => getProfile(writerId)}>프로필</WriterDropdownItem>
        {!(!userData || userData.id === writerId) && (
          <>
            <WriterDropdownItem onClick={() => toggleConfirmAlert('정말 차단하시겠습니까?', () => addIgnore(writerId))}>
              차단하기
            </WriterDropdownItem>
            <WriterDropdownItem onClick={() => toggleReport(writerId, 'RT03', '', writerName)}>
              신고하기
            </WriterDropdownItem>
          </>
        )}
      </WriterDropdownMenu>
    </WriterDropdownIn>
  );
};

const LevelImage = styled.img`
  height: 15px;
  margin-right: 3px;
  vertical-align: text-bottom;
`;

const WriterDropdownIn = styled(Dropdown)`
  display : inline-block;
  line-height : normal;
  
  & .dropdown-item:active {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
  
  & .dropdown-item:focus {
    color: #fff !important;
    text-decoration: none !important;
    background-color: #DC3545 !important;
  }
`;

const WriterDropdownItem = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
  font-size: 0.8rem;
`;

const WriterDropdownMenu = styled(DropdownMenu)`
  left: 20px !important;
`;

const WriterDropdownToggle = styled(DropdownToggle)`
  padding : 0px !important;
  display : inline-block !important;
  line-height : normal !important;
  color : #DC3545 !important;
  font-weight : bold;
  font-size : 14px !important;
  margin : auto;
  background-color: transparent !important;
  border : 0 !important;
  height : 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:focus {
    box-shadow : none !important;
  }
`;

export default memo(observer(WriterDropdown));
