import React from 'react';
import styled from 'styled-components';
import {
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
} from 'reactstrap';
import * as Proptypes from 'prop-types';
import useStores from '../../../../../stores/useStores';

const WriterDropdown = ({ data, index }) => {
  const {
    ComponentPostStore, UtilAlertStore, UserStore, UserIgnoreStore,
  } = useStores();
  const { dropdown, onActive } = ComponentPostStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const { userData } = UserStore;
  const { addIgnore } = UserIgnoreStore;
  const { writerName, writerId } = data;

  return (
    <WriterDropdownIn isOpen={dropdown[`replyIndex${index}`]} toggle={onActive}>
      <WriterDropdownToggle name={`replyIndex${index}`}> {writerName} </WriterDropdownToggle>
      <WriterDropdownMenu>
        <WriterDropdownItem>
          프로필
        </WriterDropdownItem>
        <WriterDropdownItem>
          작성 글 보기
        </WriterDropdownItem>
        {userData && userData.id === writerId ? '' : (
          <WriterDropdownItem
            onClick={() => {
              toggleConfirmAlert('정말 차단하시겠습니까?', () => {
                addIgnore(writerId);
              });
            }}
          >
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
};

const WriterDropdownIn = styled(Dropdown)`
  display : inline;
  
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
  color : #DC3545 !important;
  font-weight : bold;
  font-size : 0.8rem !important;
  padding: 0 6px !important;
  background-color: transparent !important;
  border : 0 !important;
  height : 100%;
  white-space : pre;
  &:focus {
    box-shadow : none !important;
  }
`;

export default WriterDropdown;
