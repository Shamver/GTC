import React from 'react';
import { MobXProviderContext } from 'mobx-react';

export const useStores = () => React.useContext(MobXProviderContext);
