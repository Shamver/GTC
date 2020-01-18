import React from 'react';
import styled from 'styled-components';
import {
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

const HeaderFavoriteItem = (data) => {
  const {
    postId, postTitle,
  } = data;

  return (
    <Link to={`/post/${postId}`} key={`HeaderFavoriteItem${postId}`}>
      <DropdownItem30>{postTitle}</DropdownItem30>
    </Link>
  );
};

export default HeaderFavoriteItem;
