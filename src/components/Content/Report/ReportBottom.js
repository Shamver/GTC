import React, { memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Button } from 'reactstrap';
import useStores from '../../../stores/useStores';

const ReportBottom = () => {
  const { BoardReportStore } = useStores();

  return (
    <BottomWrap>
      <ButtonCustom color="danger" size="sm">
        일괄 정지
      </ButtonCustom>
      <ButtonCustom color="secondary" size="sm">
        일괄 반려
      </ButtonCustom>
    </BottomWrap>
  );
};

const BottomWrap = styled.div`
  text-align: right;
`;

const ButtonCustom = styled(Button)`
  margin-right: 5px;
`;

export default memo(observer(ReportBottom));
