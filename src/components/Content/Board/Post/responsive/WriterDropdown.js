import React, { memo, useLayoutEffect } from 'react';
import styled from 'styled-components';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../../../stores/useStores';

const WriterDropdown = ({
  data, index, isNotice, isMobile,
}) => {
  const {
    ComponentPostStore, UtilAlertStore, UserStore, UserIgnoreStore,
  } = useStores();
  const { dropdown, onActive, onSet } = ComponentPostStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { userData, getProfile } = UserStore;
  const { addIgnore } = UserIgnoreStore;
  const { writerName, writerId } = data;
  const dropdownKey = isNotice ? `notice_${index}` : index.toString();
  const lastKey = isMobile ? 'mobile_'.concat(dropdownKey) : dropdownKey;

  // 하나하나 로우 드롭다운이 생성될때마다 그에 대한 드롭다운 객체 생성
  useLayoutEffect(() => {
    onSet(lastKey);
  }, [onSet, lastKey]);

  return (
    <WriterDropdownIn isOpen={dropdown[lastKey]} toggle={(e) => onActive(lastKey, e)}>
      <WriterDropdownToggle>{writerName}</WriterDropdownToggle>
      <WriterDropdownMenu>
        <WriterDropdownItem onClick={() => getProfile(writerId)}>프로필</WriterDropdownItem>
        {!(!userData || userData.id === writerId) && (
          <WriterDropdownItem onClick={() => toggleConfirmAlert('정말 차단하시겠습니까?', () => addIgnore(writerId))}>
            차단하기
          </WriterDropdownItem>
        )}
      </WriterDropdownMenu>
    </WriterDropdownIn>
  );
};

WriterDropdown.propTypes = {
  data: Proptypes.shape({
    writerName: Proptypes.string,
    writerId: Proptypes.number,
  }).isRequired,
  index: Proptypes.number.isRequired,
  isNotice: Proptypes.bool.isRequired,
  isMobile: Proptypes.bool,
};

WriterDropdown.defaultProps = {
  isMobile: false,
};

const WriterDropdownIn = styled(Dropdown)`
  display : block;
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
  display : block !important;
  width: 100% !important;
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
  @media (max-width: 992px) {
    display: none !important;
  }
`;

export default memo(observer(WriterDropdown));
