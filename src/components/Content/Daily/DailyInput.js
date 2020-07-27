import React, { memo } from 'react';
import {
  Input, Button,
} from 'reactstrap';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useStores from '../../../stores/useStores';

const DailyInput = () => {
  const { EventDailyStore, UserStore } = useStores();
  const { userData, guestAuthor } = UserStore;
  const {
    message, onChangeValue, addDaily, dailyLast,
  } = EventDailyStore;
  const { combo, isDoneToday, date } = dailyLast;

  return (
    <>
      {!!combo && (
        <LastDailyDiv>
          마지막 출첵 : {date}, {combo} Combo
        </LastDailyDiv>
      )}
      <CustomInput
        type="text"
        placeholder={isDoneToday ? '오늘 출석체크를 완료하셨습니다.' : '여기에 한마디를 입력해주세요.'}
        maxLength={20}
        value={message}
        onChange={onChangeValue}
        disabled={isDoneToday}
      />
      <Button type="button" color="primary" onClick={userData === null ? guestAuthor : addDaily} disabled={isDoneToday}>
        <FontAwesomeIcon icon={faPencilAlt} /> 출석체크 하기
      </Button>
    </>
  );
};

const LastDailyDiv = styled.div`
  color: #31708f;
  background-color: #d9edf7;
  border-color: #bce8f1;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
`;

const CustomInput = styled(Input)`
  margin-bottom: 1rem;
`;

export default memo(observer(DailyInput));
