import React from 'react';
import { css } from '@emotion/core';
// First way to import
import { SyncLoader } from 'react-spinners';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: auto;
  margin-top: 10px;
  padding-top: 20px;
  text-align: center;
`;

const Loading = ({ loading }) => (
  <Div loading={loading}>
    <SyncLoader
      css={override}
      size={15}
      color="#DC3545"
      loading
    />
  </Div>
);

Loading.propTypes = {
  loading: PropTypes.number.isRequired,
};

const Div = styled.div`
  display: ${(props) => (props.loading ? 'block' : 'none')}
  height: 100px;
`;

export default Loading;
