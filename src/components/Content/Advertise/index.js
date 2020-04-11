import React from 'react';
import styled from 'styled-components';
import { Input, Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

const Advertise = () => (
  <BoardWrapper>
    <TableWrapper>
      <h3>포스팅 광고</h3>
      <span>포인트를 이용하여 트게더 상단 전광판에 하고 싶은 말을 쓸 수 있어요.</span>
      <br />
      <b>하고 싶은 말</b>
      <Input type="text" />
      <span>욕설, 음란성 글, 비방, 협의되지 않은 상업적 광고 등 부적절한 내용은 임의로 삭제될 수 있습니다.</span>
      <br />
      <b>링크(선택)</b>
      <Input type="text" />
      <span>꼭 입력할 필요는 없고 입력하면 클릭 시 어디로 이동할 지 주소를 정할 수 있습니다 / GTC 포스팅 주소만 가능</span>
      <br />
      <b>몇시간 동안</b>
      <Input type="text" value="1" />
      <span>시간 당 100포인트. 등록 시점으로부터 최대 48시간까지 올릴 수 있어요.</span>
      <br />
      <Button color="danger">
        광고하기
      </Button>
      <hr />

      <h5>현재 진행중인 광고</h5>
      <span>아래 광고 중 랜덤으로 10건이 상단에 노출됩니다.</span>
      <Table bordered>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>메시지</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <BoldTd>비스트ㆍ3ㆍ</BoldTd>
            <td>
              <Link to="temp">
                평균티어 브론즈의 롤 합방!! 버틸 수 있으면 구경오쉴?
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>


    </TableWrapper>
  </BoardWrapper>
);

const BoardWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
`;

const TableWrapper = styled.div`
  padding : 20px;
  font-size : 14px !important;
`;

const BoldTd = styled.td`
  font-weight : bold;
`;

export default Advertise;