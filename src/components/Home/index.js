import React from 'react';
import { inject, observer } from 'mobx-react';
import HomeTemplate from './HomeTemplate';


const Home = ({ title, text }) => <HomeTemplate title={title} text={text} />;

export default inject(({ HomeStore }) => ({
  title: HomeStore.home.title,
  text: HomeStore.home.text,
}))(observer(Home));
