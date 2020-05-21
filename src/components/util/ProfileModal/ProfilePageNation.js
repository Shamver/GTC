import React from 'react';
import { PaginationItem, Pagination } from 'reactstrap';
import styled from 'styled-components';
import useStores from '../../../stores/useStores';
import {observer} from "mobx-react";

const ProfilePaginationList = observer(({rows}) => {
    const { UtilStore } = useStores();
    const { getPostList, getCommentList, pageIndex, activeTab } = UtilStore;

    const pagingToggle = ( activeTab === '1' ) ? rows.postCount : rows.commentCount;
    const pageIdx = ( activeTab === '1' ) ? pageIndex.postIndex : pageIndex.commentIndex;

    const arr = new Array(( pagingToggle % 5 ) === 0 ? (pagingToggle / 5) : ( (pagingToggle / 5 ) >> 0 ) );
    const max = ( pagingToggle % 5 ) === 0 ? (pagingToggle / 5) : ( (pagingToggle / 5 ) >> 0 );

    for (let i = 1; i <= max + 1; i += 1) {
        arr.push(
            <CustomPaginationItem active={i === pageIdx} key={i}>
                <CustomLink className="page-link" activeClassName="active" onClick={ () => ( activeTab === '1' ) ? getPostList(i) : getCommentList(i) }>
                    {i}
                </CustomLink>
            </CustomPaginationItem>,
        );
    }

    return arr;
});

const ModalPagination = ({rows}) => (
    <PaginationListWrap>
        <ProfilePaginationList rows={rows} />
    </PaginationListWrap>
);


const PaginationListWrap = styled.ul`
  padding: 0;
  margin: 0 auto;
  text-align: center;
  
  & .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #DC3545;
    border-color: #DC3545;
  }
`

const CustomPaginationItem = styled(PaginationItem)`
  list-style: none;
  display: inline-block;
  
  & .page-link {
    z-index: 1;
    color: #DC3545;
    cursor: pointer;
  }
  
  & .page-link:hover {
    z-index: 1;
    color: #DC3545;
    cursor: pointer;
  }
`

const CustomLink = styled.span`
  text-decoration: none;
`;

export default ModalPagination;
