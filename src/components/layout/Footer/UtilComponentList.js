import React, { lazy, memo, Suspense } from 'react';
import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '../ScrollToTop';

const Alert = lazy(() => import('../../util/Alert'));
const Sign = lazy(() => import('../../util/Sign'));
const ConfirmAlert = lazy(() => import('../../util/ConfirmAlert'));
const Report = lazy(() => import('../../util/Report'));

const UtilComponentList = () => (
  <Suspense fallback={<></>}>
    <ScrollToTop />
    <Report />
    <Alert />
    <Sign />
    <ConfirmAlert />
    <ToastContainerCustom
      position="bottom-left"
      autoClose={1500}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />
  </Suspense>
);

const ToastContainerCustom = styled(ToastContainer)`
  & .Toastify__toast-body {
    font-family: 'Jeju Gothic', sans-serif !important;
    padding : 10px !important;
  }
  width : auto !important;
`;


export default memo(UtilComponentList);
