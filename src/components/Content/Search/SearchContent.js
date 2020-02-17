import React, { useEffect } from 'react';
import {
  Row,
} from 'reactstrap';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import SearchContentItem from './SearchContentItem';

const SearchContent = () => {
  const data = [
    {
      id: 0,
      title: '제목0',
      writer: '작성자0',
      replyCount: 1,
      content: 'ㅁㄴ알ㄴㅇ마ㅓ룬아룬ㅇ말ㄴㅇ맒ㄴ',
      date: '2020-02-02 10:10:10',
    },
    {
      id: 1,
      title: '제목1',
      writer: '작성자1',
      replyCount: 0,
      content: 'ㅁㄴㅁㄴㅁㄻ알ㄴㅇ마ㅓ룬아룬ㅇ말ㄴㅇ맒ㄴ',
      date: '2020-02-01 10:10:10',
    },
    {
      id: 2,
      title: '제목2',
      writer: '작성자2',
      replyCount: 5,
      content: 'ㅁㄴ알ㄴㅇ마ㅓ룬아룬ㅇ말ㅁㄴㅇㅁㄴㄴㅇ맒ㄴ',
      date: '2020-02-01 09:10:10',
    },
  ];

  const Item = data.map((v) => (SearchContentItem('search', v)));

  console.log(Item);

  return (
    <>
      <H5>게시글 (총 {}건)</H5>
      <Hr />
      <ItemRow>
        {Item}
      </ItemRow>
    </>
  );
};

const ItemRow = styled(Row)`
  margin-right: 0 !important;
  margin-left: 0 !important;
`;

const H5 = styled.h5`
  margin-bottom: 0px;
`;

const Hr = styled.hr`
  background-color: #DC3545;
  width: 100%;
  margin: 5px 0;
  height: 1px;
`;

export default observer(SearchContent);
