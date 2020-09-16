import React, { memo } from 'react';
import { Col, CustomInput, Row } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const SettingIgnoreTable = ({ data }) => {
  const { UserIgnoreStore } = useStores();
  const { onChangeIgnore } = UserIgnoreStore;
  const { id, nickname, date } = data;

  return (
    <TableBody>
      <div className="responsive-wrap">
        <ColCell className="col-2 center">
          <CustomInput type="checkbox" id={id} name={id} onClick={onChangeIgnore} />
        </ColCell>
        <ColCell className="col-5">
          {nickname}
        </ColCell>
        <ColCell className="col-5 info">
          {date}
        </ColCell>
      </div>
    </TableBody>
  );
};

SettingIgnoreTable.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    nickname: Proptypes.string,
    date: Proptypes.string,
  }).isRequired,
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  @media (max-width: 800px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 32px;
      font-size: 14px;
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 3;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
    }
    
    .info {
      color: #989898;
      font-size: 13px;
      line-height: 24px;
    }
    
    .custom-control {
      display: inline;
      padding: 0;
      margin-right: 10px;
    }
    
    .custom-control-label::before, .custom-control-label::after {
      top: 0.55em !important;
      left: -0.5em !important;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(SettingIgnoreTable);
