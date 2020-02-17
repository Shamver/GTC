import React from 'react';
import {
  Col,
} from 'reactstrap';
import styled from 'styled-components';

const SearchContentItem = (text, data) => {
  const {
    id, title, content, writer, date, replyCount,
  } = data;
  return (
    <Item key={`${text}${id}`} sm={12}>
      <div>
        <span>
          {title}
        </span>
        <span>
          &nbsp;[{replyCount}]
        </span>
      </div>
      <div>
        <span>
          {writer} |
        </span>
        <span>
          &nbsp;{date}
        </span>
      </div>
      <div>
        {content}
      </div>
    </Item>
  );
};

const Item = styled(Col)`
  border-bottom: 1px dotted #e2e2e2;
  border-bottom-width: 1px;
  border-bottom-style: dotted;
  border-bottom-color: rgb(226, 226, 226);
  padding: 4px 0 !important;
  display: table-cell;
  vertical-align: middle;
`;

export default SearchContentItem;
