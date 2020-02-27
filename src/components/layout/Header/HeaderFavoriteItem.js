import React from 'react';
import styled from 'styled-components';
import {
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HeaderFavoriteItem = (data, onClick) => {
  const { postId, postTitle } = data;

  return (
    <Link to={`/post/${postId}`} key={`HeaderFavoriteItem${postId}`}>
      <DropdownItem30>
        <Text>
          {postTitle}
        </Text>
        <IconSpan onClick={(e) => { onClick(postId, 'post', e); }}>
          <Icon icon={faTimes} />
        </IconSpan>
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

const IconSpan = styled.span`
  display: inline-block;
  line-height: 21px;
  float: right;
  cursor: pointer;
  height: 21px;
  width: 20px;
  text-align: center;
  z-index: 2 !important;
  padding-top: 1px;
  
  & > * {
    z-index: 1 !important;
  }
  
  &:hover {
    background-color: #e4e3e5;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  color: #aaa;
`;

export default HeaderFavoriteItem;
