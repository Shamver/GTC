import React from 'react';
import { PaginationItem, Pagination } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useStores from '../../../stores/useStores';
import {observer} from "mobx-react";

const ProfilePaginationList = observer(({rows}) => {
    const { UtilStore } = useStores();
    const { getPostList, pageIndex, activeTab } = UtilStore;

    // const currentPageNum = parseInt(currentPage, 0);
    const arr = new Array(( rows % 5 ) === 0 ? (rows / 5) : ( (rows / 5 ) >> 0 ) );
    const max = ( rows % 5 ) === 0 ? (rows / 5) : ( (rows / 5 ) >> 0 );

    // const min = (currentPageNum - 3) <= 0 ? 1 : currentPageNum - 3;
    // const max = (currentPageNum + 3) > currentBoardMaxPage ? currentBoardMaxPage : currentPageNum + 3;
    // const array = new Array((max - min) + 1 < 0 ? 0 : (max - min) + 1); //

    // currentPage -> 시작 페이지
    // if (currentPage > 1) {
    //     array.push(
    //         <PaginationItem key={0}>
    //             <CustomLink className="page-link" activeClassName="active" to={`/profile/${contentId}/${contentType}/${currentPage - 1}`}>
    //                 ‹
    //             </CustomLink>
    //         </PaginationItem>,
    //     );
    // }
    // to={`/profile/${writerId}/${contentType}/${i}`} {`/profile/${writerId}/post/${currentPage}`}
    for (let i = 1; i <= max + 1; i += 1) {
        arr.push(
            <CustomPaginationItem active={i === pageIndex} key={i}>
                <CustomLink className="page-link" activeClassName="active" onClick={ () => getPostList(i) }>
                    {i}
                </CustomLink>
            </CustomPaginationItem>,
        );
    }

    // if (currentPageNum !== currentBoardMaxPage) {
    //     array.push(
    //         <PaginationItem key={-1}>
    //             <CustomLink className="page-link" activeClassName="active" to={`/profile/${contentId}/${contentType}/${currentPage + 1}`}>
    //                 ›
    //             </CustomLink>
    //         </PaginationItem>,
    //     );
    // }

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
