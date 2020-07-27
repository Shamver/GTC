import React, { memo } from 'react';
import styled from 'styled-components';
import { DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Proptypes from 'prop-types';
import useStores from '../../../stores/useStores';


const HeaderLatelyItem = ({ data }) => {
  const { id, title } = data;
  const { CookieLatelyStore } = useStores();
  const { deleteLately } = CookieLatelyStore;

  return (
    <CustomLink to={`/post/${id}`}>
      <DropdownItem30>
        <Text>{title}</Text>
        <IconSpan onClick={(e) => deleteLately(e, id)}>
          <Icon icon={faTimes} />
        </IconSpan>
      </DropdownItem30>
    </CustomLink>
  );
};

HeaderLatelyItem.propTypes = {
  data: Proptypes.shape({
    id: Proptypes.number,
    title: Proptypes.string,
  }).isRequired,
};

const DropdownItem30 = styled(DropdownItem)`
  height : 27px;
  line-height : 27px;
  display : inline-block;
  padding: 0 1.2rem !important;
  width: 190px !important;
  z-index: 1 !important;
  
  &:focus {
    background-color: none !important;
  }
  
  &:active {
    background-color: none !important;
  }
`;

const CustomLink = styled(Link)`
  display : block;
  height : 27px;
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
    background-color: #e4e3e5;
  }
`;

const Text = styled.span`
  max-width: 130px;
  line-height: 27px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IconSpan = styled.span`
  display: inline-block;
  line-height: 27px;
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

export default memo(HeaderLatelyItem);
