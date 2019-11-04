import React from 'react';

import { observer } from 'mobx-react';

const HomeTemplate = ({ title, text }) => (
  <div>
    <h1>{title}</h1>
    <hr />
    <h3>{text}</h3>
  </div>
);

export default observer(HomeTemplate);
