import React, { Suspense, memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Loading from '../../util/Loading';
import useStores from '../../../stores/useStores';
import SwitchList from './SwitchList';
import 'react-toastify/dist/ReactToastify.css';

const Report = () => {
  const { UtilLoadingStore } = useStores();
  const { loading } = UtilLoadingStore;

  return (
    <>
      asd
    </>
  );
};

export default memo(Report);
