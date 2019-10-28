import React from 'react';
import HomeTemplate from './HomeTemplate';

import { inject, observer } from 'mobx-react';

const Home = ({title, text}) => {
  return <HomeTemplate title={title} text={text} />;
};

export default inject(({HomeStore}) => ({
  title: HomeStore.home.title,
  text: HomeStore.home.text,
}))(observer(Home));