import React from 'react';
import { MobXProviderContext } from 'mobx-react';

const useStores = () => React.useContext(MobXProviderContext);

export default useStores;
