import React, { useEffect } from 'react';
import {
  TabContent, TabPane, Nav, NavItem, NavLink, Table, CustomInput, Button, Container,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faExclamationTriangle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import useStores from '../../stores/useStores';

const TableBody = (title, data, onClickEvent) => {
  const {
    id, nickname, date,
  } = data;

  return (
    <tr key={title + id}>
      <TableTh scope="row">
        <CustomInput type="checkbox" id={title + id} name={id} onClick={onClickEvent} />
      </TableTh>
      <TableTd>
        { nickname }
      </TableTd>
      <TableTd>{date}</TableTd>
    </tr>
  );
};

const Settings = () => {
  const {
    UserIgnoreStore, ComponentSettingStore, UserStore, UtilAlertStore,
  } = useStores();

  const {
    ignoreList, onChangeIgnore, getDataIgnore, onDeleteIgnore,
  } = UserIgnoreStore;

  const {
    withdrawal,
  } = UserStore;

  const {
    activeTab, onClickWithdrawal, isCheckedWithdrawal, onActive,
  } = ComponentSettingStore;

  const {
    toggleConfirmAlert,
  } = UtilAlertStore;

  useEffect(() => {
    getDataIgnore();
  }, [getDataIgnore, ignoreList]);

  const IgnoreTableData = ignoreList.map((v) => (TableBody('ignore', v, onChangeIgnore)));

  return (
    <MainContainer>
      <Nav tabs>
        <NavItem>
          <NavLinkBtn
            className={(activeTab === 'ignore' ? 'active' : '')}
            onClick={onActive}
            name="ignore"
          >
            차단 목록
          </NavLinkBtn>
        </NavItem>
        <NavItem>
          <NavLinkBtn
            className={(activeTab === 'withdrawal' ? 'active' : '')}
            onClick={onActive}
            name="withdrawal"
          >
            회원탈퇴
          </NavLinkBtn>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="ignore">
          <ListTable size="sm" bordered>
            <thead>
              <tr>
                <TableTh>선택</TableTh>
                <TableTh>차단 닉네임</TableTh>
                <TableTh>차단 일자</TableTh>
              </tr>
            </thead>
            <tbody>
              {IgnoreTableData.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                  차단한 유저가 없습니다.
                  </td>
                </tr>
              ) : IgnoreTableData}
            </tbody>
          </ListTable>
          {IgnoreTableData.length === 0 ? '' : (
            <Button color="danger" onClick={() => { toggleConfirmAlert('정말 삭제하시겠어요?', onDeleteIgnore); }}>
              <FontAwesomeIcon icon={faTrashAlt} />  삭제하기
            </Button>
          )}
        </TabPane>
        <TabPane tabId="withdrawal">
          <WithdrawalWrapper>
            <h3>GTC 회원탈퇴 안내</h3>
            <Hr width={120} />
            <div>
              <P>
                <FontAwesomeIcon icon={faExclamationTriangle} /> 회원탈퇴를 신청하기 전에 안내 사항을 꼭 확인해 주세요.
              </P>
              <p>
                <FontAwesomeIcon icon={faExclamationCircle} /> 탈퇴 후, 30일 동안 재가입이 불가능하며 당연히 로그인도 불가능합니다.
              </p>
              <p>
                <FontAwesomeIcon icon={faExclamationCircle} /> 탈퇴일을 기준으로 30일 이후에 재가입이 가능합니다.
              </p>
              <p>
                <FontAwesomeIcon icon={faExclamationCircle} /> 탈퇴일 기준 30일 이후에는 개인정보와 관련된 데이터가 모두 삭제됩니다.
              </p>
            </div>
            <Hr width={120} />
            <CustomInput
              type="checkbox"
              id="withdrawalIsChecked"
              name="withdrawalIsChecked"
              onClick={onClickWithdrawal}
              label="위 내용을 충분히 이해했으며, 회원탈퇴를 진행하겠습니다."
            />
            <br />
            <Button
              color="danger"
              onClick={() => {
                isCheckedWithdrawal(() => {
                  toggleConfirmAlert('정말 삭제하시겠어요?', () => {
                    withdrawal();
                  });
                });
              }}
            >
              <FontAwesomeIcon icon={faTrashAlt} /> 회원탈퇴
            </Button>
          </WithdrawalWrapper>
        </TabPane>
      </TabContent>
    </MainContainer>
  );
};

const MainContainer = styled(Container)`
  background-color: white;
  padding: 14px !important;
`;

const NavLinkBtn = styled(NavLink)`
  padding: 10px 15px !important;
  border: 1px solid transparent !important;
  margin-right: 2px;
  
  &:hover {
    cursor: pointer;
    border-color: #eee #eee #ddd;
    background-color: #eee;
  }
  
  &.active {
    cursor: default;
    border: 1px solid #c9c9c9 !important;
    border-bottom-color: transparent !important;
  }
`;

const TableTh = styled.th`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  padding: 8px !important;
`;

const TableTd = styled.td`
  vertical-align: middle !important;
  width: ${(props) => props.width}%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 8px !important;
`;

const ListTable = styled(Table)`
  border: 1px solid #c9c9c9 !important;
`;

const WithdrawalWrapper = styled.div`
  padding-top: 8px;
`;

const Hr = styled.hr`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 0;
  border-top: 1px solid #eee;
  margin-left: 0px;
`;

const P = styled.p`
  color: #c00;
`;

export default observer(Settings);
