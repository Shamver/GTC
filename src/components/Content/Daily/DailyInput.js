import React from 'react';
import {
  Input, Button,
} from 'reactstrap';
import { observer } from 'mobx-react';

const DailyInput = () => (
  <>
    <Input type="text" placeholder="여기에 한마디를 입력하세요" />
    <br />
    <Button type="button" color="primary">
      출석체크 하기
    </Button>
  </>
);

export default observer(DailyInput);
