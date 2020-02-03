import React from 'react';
import styled from 'styled-components';
import {
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const HeaderFavoriteItem = (data) => {
  const { postId, postTitle } = data;

  return (
    <Link to={`/post/${postId}`} key={`HeaderFavoriteItem${postId}`}>
      <DropdownItem30>
        <Text>
          {postTitle}
        </Text>
      </DropdownItem30>
    </Link>
  );
};

const Text = styled.span`
  max-width: 130px;
  line-height: 21px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 0;
  padding-top : 0px;
  padding-bottom : 0px;
`;

export default HeaderFavoriteItem;
