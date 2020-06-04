import React, { Suspense, memo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Loading from '../../util/Loading';
import useStores from '../../../stores/useStores';
import SwitchList from './SwitchList';
import UtilComponentList from '../Footer/UtilComponentList';
import 'react-toastify/dist/ReactToastify.css';


const Content = () => {
  const { UtilLoadingStore } = useStores();
  const { loading } = UtilLoadingStore;

  return (
    <>
      { !!loading && (<Loading />)}
      <BorderedDiv loading={loading}>
        <Suspense fallback={<></>}>
          <SwitchList />
        </Suspense>
      </BorderedDiv>
    </>
  );
};

const BorderedDiv = styled.div`
  margin-bottom : 20px;
  display : ${(props) => (props.loading ? 'none' : 'block')};
`;


export default memo(observer(Content));
