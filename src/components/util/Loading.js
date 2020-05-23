import React from 'react';
import { css } from '@emotion/core';
import { SyncLoader } from 'react-spinners';

const override = css`
  margin: auto;
  margin-top: 10px;
  padding-top: 20px;
  text-align: center;
`;

const Loading = () => (
  <SyncLoader
    css={override}
    size={15}
    color="#DC3545"
    loading
  />
);


export default Loading;
