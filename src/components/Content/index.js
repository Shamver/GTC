import { lazy } from 'react';

const Setting = lazy(() => import('./Setting'));
const Board = lazy(() => import('./Board'));
const PostView = lazy(() => import('./Board/Post/PostView'));
const PostLocker = lazy(() => import('./PostLocker'));
const NewAlert = lazy(() => import('./NewAlert'));
const MyAccount = lazy(() => import('./MyAccount'));
const MyPoint = lazy(() => import('./MyPoint'));
const Mail = lazy(() => import('./Mail'));
const Search = lazy(() => import('./Search'));
const Daily = lazy(() => import('./Daily'));
const Code = lazy(() => import('./Code'));
const Advertise = lazy(() => import('./Advertise'));
const Advertising = lazy(() => import('../layout/Footer/Advertising'));
const Team = lazy(() => import('../layout/Footer/Team'));

export default {
  Board,
  Setting,
  PostLocker,
  PostView,
  NewAlert,
  MyAccount,
  MyPoint,
  Mail,
  Search,
  Daily,
  Code,
  Advertise,
  Advertising,
  Team,
};
