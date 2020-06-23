import { Button, Input } from 'reactstrap';
import { observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import React, { memo } from 'react';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';

const AdvertiseForm = () => {
  const { EventAdvertiseStore } = useStores();
  const { onChangeAdvertise, AdvertisePost, AddAdPostList } = EventAdvertiseStore;
  const { message, url, hours } = AdvertisePost;
  return (
    <>
      <h3>포스팅 광고</h3>
      <span>포인트를 이용하여 트게더 상단 전광판에 하고 싶은 말을 쓸 수 있어요.</span>
      <br />
      <SetDiv>
        <b>하고 싶은 말</b>
        <MarginInput type="text" name="message" onChange={onChangeAdvertise} value={message} />
        <span>욕설, 음란성 글, 비방, 협의되지 않은 상업적 광고 등 부적절한 내용은 임의로 삭제될 수 있습니다.</span>
        <br />
      </SetDiv>
      <SetDiv>
        <b>링크(선택)</b>
        <MarginInput type="text" placeholder="/post/*" name="url" onChange={onChangeAdvertise} value={url} />
        <span>꼭 입력할 필요는 없고 입력하면 클릭 시 어디로 이동할 지 주소를 정할 수 있습니다 / GTC 포스팅 주소만 가능</span>
        <br />
      </SetDiv>
      <SetDiv>
        <b>몇시간 동안</b>
        <MarginInput type="text" name="hours" onChange={onChangeAdvertise} value={hours} />
        <span>시간 당 100포인트. 등록 시점으로부터 최대 48시간까지 올릴 수 있어요.</span>
        <br />
      </SetDiv>
      <Button size="sm" color="danger" onClick={AddAdPostList}>
        <FontAwesomeIcon icon={faPen} />
        &nbsp; 광고하기
      </Button>
    </>
  );
};

const MarginInput = styled(Input)`
  margin: 5px 0px;
`;

const SetDiv = styled.div`
  margin : 10px 0px;
`;

export default memo(observer(AdvertiseForm));
