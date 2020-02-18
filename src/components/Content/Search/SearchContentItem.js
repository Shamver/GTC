import React from 'react';
import {
  Col,
} from 'reactstrap';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const SearchContentItem = (text, data) => {
  const {
    id, title, content, writer, date, replyCount, thumbnail,
  } = data;
  return (
    <Item key={`${text}${id}`} sm={12}>
      <TableRow>
        {!thumbnail ? '' : (
          <TableCell img>
            <Img src={thumbnail} alt="a" />
          </TableCell>
        )}
        <TableCell>
          <div>
            <Link to={`/post/${id}`}>
              <Span link>
                {title}
              </Span>
            </Link>
            <ReplyCountSpan>
              &nbsp;[{replyCount}]
            </ReplyCountSpan>
          </div>
          <div>
            <Span small>
              {writer}
            </Span>
            <Span small>
              |&nbsp;{date}
            </Span>
          </div>
          <div>
            {content}
          </div>
        </TableCell>
      </TableRow>
    </Item>
  );
};

const Img = styled.img`
  width: 92px;
  height: 85px;
  vertical-align: middle;
`;

const TableRow = styled.div`
  display: table-row;
`;

const TableCell = styled.div`
  display: table-cell;
  vertical-align: middle;
  width: ${(props) => (props.img ? '102px' : 'auto')};
`;

const ReplyCountSpan = styled.span`
  font-size: 0.7rem;
  color: black;
  font-weight: 800;
`;

const Span = styled.span`
  color: ${(props) => (props.link ? 'default' : 'gray')};
  font-weight: ${(props) => (props.link ? '700' : 'default')};
  font-size: ${(props) => (props.small ? '0.9rem' : '1rem')};
`;

const Item = styled(Col)`
  border-bottom: 1px dotted #e2e2e2;
  border-bottom-width: 1px;
  border-bottom-style: dotted;
  border-bottom-color: rgb(226, 226, 226);
  padding: 6px 0 !important;
  display: table-cell;
  vertical-align: middle;
  
  &:hover {
    background-color: #fafafa;
  }
`;

export default SearchContentItem;
