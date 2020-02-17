import { lazy } from 'react';

const Setting = lazy(() => import('./Setting'));
const Board = lazy(() => import('./Board'));
const PostView = lazy(() => import('./Board/Post/PostView'));
const PostLocker = lazy(() => import('./PostLocker'));
const NewAlert = lazy(() => import('./NewAlert'));
const MyAccount = lazy(() => import('./MyAccount'));
const MyPoint = lazy(() => import('./MyPoint'));
const Mail = lazy(() => import('./Mail'));

export default {
  Board,
  Setting,
  PostLocker,
  PostView,
  NewAlert,
  MyAccount,
  MyPoint,
  Mail,
};
