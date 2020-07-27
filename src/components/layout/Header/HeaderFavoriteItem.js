import React, { memo } from 'react';
import styled from 'styled-components';
import { DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';

const HeaderFavoriteItem = ({ data }) => {
  const { UserFavoriteStore } = useStores();
  const { postId, postTitle } = data;
  const { deleteFavorite } = UserFavoriteStore;

  return (
    <CustomLink to={`/post/${postId}`}>
      <DropdownItem30>
        <Text>{postTitle}</Text>
        <IconSpan onClick={(e) => deleteFavorite(postId, 'post', e)}>
          <Icon icon={faTimes} />
        </IconSpan>
      </DropdownItem30>
    </CustomLink>
  );
};

HeaderFavoriteItem.propTypes = {
  data: Proptypes.shape({
    postId: Proptypes.number,
    postTitle: Proptypes.string,
  }).isRequired,
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
  padding: 0 1.2rem !important;
  width: 190px !important;
  z-index: 1 !important;
`;

const CustomLink = styled(Link)`
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  z-index: 0 !important;
  
  &:hover {
    color: #212529;
    text-decoration: none;
    background-color: transparent;
  }
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

export default memo(HeaderFavoriteItem);
