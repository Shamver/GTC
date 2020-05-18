import React from 'react';
import { PaginationItem, Pagination } from 'reactstrap';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import useStores from '../../../stores/useStores';

const ProfilePaginationList = ( {rows} ) => {
    const { UtilStore } = useStores();
    const { currentPage } = UtilStore;

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
    // to={`/profile/${contentId}/${contentType}/${i}`}
    for (let i = 0; i <= max; i += 1) {
        arr.push(
            <PaginationItem active={i === 1} key={i}>
                <CustomLink className="page-link" activeClassName="active" to={`/profile/3/post/1`}>
                    {i}
                </CustomLink>
            </PaginationItem>,
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

    // 추후 max 값 조정후 추가
    return arr;
};

// PaginationList.propTypes = {
//     path: Proptypes.string.isRequired,
//     currentPage: Proptypes.string,
//     noPagination: Proptypes.bool,
// };
//
// PaginationList.defaultProps = {
//     currentPage: '1',
// };
//
//
// const BoardPagination = ({ path, noPagination, currentPage }) => (
//     <PaginationCustom>
//         <PaginationList currentPage={currentPage} path={path} noPagination={noPagination} />
//     </PaginationCustom>
// );
//
// BoardPagination.propTypes = {
//     path: Proptypes.string.isRequired,
//     noPagination: Proptypes.bool,
//     currentPage: Proptypes.string,
// };
//
// BoardPagination.defaultProps = {
//     noPagination: false,
//     currentPage: '1',
// };


const CustomLink = styled(NavLink)`
  &.active {
    z-index: 1;
    color: #fff !important;
    background-color: #DC3545;
    border-color: #DC3545;
  }

  &.active:hover {
    background-color: #DC3545;
    border-color: #DC3545;
  }
`;


const PaginationCustom = styled(Pagination)`
  color : #DC3545;
  width : max-content;
  margin : 0 auto;
  margin-top : 20px;

  & ul {
    margin : 0px;
  }

  & .page-link {
    color: #DC3545;
  }

  & .page-link:hover {
    color: #DC3545;
  }

  & .page-link:focus {
    box-shadow: none;
  }

  & .page-item.active .page-link {
    z-index: 1;
    color: #fff;
    background-color: #DC3545;
    border-color: #DC3545;
  }
`;

export default ProfilePaginationList;
