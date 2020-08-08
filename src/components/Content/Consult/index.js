import React, { useLayoutEffect, memo } from 'react';
import styled from 'styled-components';
import * as Proptypes from 'prop-types';
import { observer } from 'mobx-react';
import useStores from '../../../stores/useStores';
import ConsultNav from './ConsultNav';
import ConsultContent from './ConsultContent';

const Consult = ({ match, parentProps }) => {
  const {
    UtilLoadingStore, SystemCodeStore, ConsultStore,
  } = useStores();

  const { params } = match;
  let { noPagination } = parentProps;
  let { currentPage, currentTab } = params;

  currentTab = currentTab || 'send';
  currentPage = currentPage || '1';
  noPagination = noPagination !== undefined;

  const { loadingProcess } = UtilLoadingStore;
  const { getCodeComponent } = SystemCodeStore;
  const {
    setCategoryCodeList, getMyConsultList, getConsultList,
  } = ConsultStore;

  useLayoutEffect(() => {
    loadingProcess([
      () => getCodeComponent('CONSULT_CATEGORY', setCategoryCodeList),
      () => getMyConsultList(currentPage),
      () => getConsultList(currentPage),
    ]);
  }, [
    getCodeComponent, setCategoryCodeList, getMyConsultList,
    currentPage, getConsultList,
  ]);

  return (
    <ConsultWrapper>
      <h4>1:1 문의</h4>
      <ConsultNav currentTab={currentTab} />
      <ConsultContent
        currentTab={currentTab}
        currentPage={currentPage}
        noPagination={noPagination}
      />
    </ConsultWrapper>
  );
};

Consult.propTypes = {
  match: Proptypes.shape({
    params: Proptypes.shape({
      board: Proptypes.string,
      currentPage: Proptypes.string,
      currentTab: Proptypes.string,
    }).isRequired,
    noPagination: Proptypes.bool.isRequired,
  }).isRequired,
  parentProps: Proptypes.shape({
    isPagination: Proptypes.bool,
  }).isRequired,
  location: Proptypes.shape({
    search: Proptypes.string,
  }).isRequired,
};

const ConsultWrapper = styled.div`
  border-bottom: 2px solid #ebeae8;
  border-right: 2px solid #ebeae8;
  background-color : white;
  padding: 20px;
`;

export default memo(observer(Consult));
