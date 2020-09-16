import React, { memo } from 'react';
import {
  TabPane, Button, Row, Col,
} from 'reactstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import SettingIgnoreTable from './SettingIgnoreTable';

const SettingIgnore = () => {
  const { UserIgnoreStore, UtilAlertStore } = useStores();
  const { ignoreList, deleteIgnore } = UserIgnoreStore;
  const { toggleConfirmAlert } = UtilAlertStore;
  const IgnoreTableData = ignoreList.map((v) => <SettingIgnoreTable data={v} key={v.id} />);

  return (
    <TabPane tabId="ignore">
      <Wrapper size="sm">
        <Row className="content-header">
          <Col className="col-sm-12">
            <TableHeader>
              <ColCell className="col-2 center">
                선택
              </ColCell>
              <ColCell className="col-5">
                차단 닉네임
              </ColCell>
              <ColCell className="col-5">
                차단 일자
              </ColCell>
            </TableHeader>
          </Col>
        </Row>
        {IgnoreTableData.length === 0 ? (
          <TableBody>
            <div className="center">
              <ColCell className="col-12">
                차단한 유저가 없습니다.
              </ColCell>
            </div>
          </TableBody>
        ) : IgnoreTableData}
      </Wrapper>
      {IgnoreTableData.length === 0 ? '' : (
        <CustomButton color="danger" onClick={() => toggleConfirmAlert('정말 삭제하시겠어요?', deleteIgnore)}>
          <FontAwesomeIcon icon={faTrashAlt} />  삭제하기
        </CustomButton>
      )}
    </TabPane>
  );
};

const Wrapper = styled.div`
  padding: 0px 1rem;
  border-bottom: 1px solid #dee2e6;
  
  & .content-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  & .center {
    text-align: center;
  }
  
  @media (max-width: 800px) {
    & .content-header {
      display: none;
    }
    
    & .content-body {
      display: block;
    }
    
    .col {
      max-width: 100%;
    }
  }
`;

const TableHeader = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
`;

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  align-items: center;
  font-size: 14px;
`;

const CustomButton = styled(Button)`
  margin-top: 10px;
  font-size: 14px !important;
`;

export default memo(observer(SettingIgnore));
