import React, { memo } from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Col, Row} from 'reactstrap';

const AdvertiseRow = ({ data }) => (
  <TableBody>
    <div className="responsive-wrap-column">
      <div className="responsive-wrap">
        <ColCell className="col-4 message">
          {data.url ? (
            <Link to={data.url}>
              <span>
                (링크) {data.message}
              </span>
            </Link>
          ) : (
            <span>
              {data.message}
            </span>
          )}
        </ColCell>
      </div>
      <div className="responsive-wrap">
        <ColCell className="col-8 name">
          {data.name}
        </ColCell>
      </div>
    </div>
  </TableBody>
);

AdvertiseRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

const TableBody = styled(Row)`
  border: 1px solid #dee2e6;
  border-bottom: 0;
  cursor: pointer;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  :hover {    
    color: #212529;
    background-color: rgba(0,0,0,.075);
  }
  
  & .responsive-wrap, .responsive-wrap-column {
    display: contents;
  }
  
  @media (max-width: 740px) {
    & .responsive-wrap {
      width: 100%;
      display: block;
      line-height: 26px;
      font-size: 13px;
    }
    
    & .responsive-wrap-column {
      display: flex;
      flex-direction: column;
      flex: 5;
    }
    
    & .responsive-wrap > div {
      display: inline;
      padding-right: 0;
      vertical-align: middle;
      padding-left: 10px;
    }
    
    .message {
      font-size: 14px;
      font-weight: 600;
    }
    
    .name {
      color: #757575;
    }
  }
`;

const ColCell = styled(Col)`
  padding: 12px 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default memo(AdvertiseRow);
