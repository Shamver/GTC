import { lazy } from 'react';

const Setting = lazy(() => import('./Setting'));
const Board = lazy(() => import('./Board'));
const PostView = lazy(() => import('./Board/PostView'));
const PostLocker = lazy(() => import('./PostLocker'));
const NewAlert = lazy(() => import('./NewAlert'));
const MyAccount = lazy(() => import('./MyAccount'));
const MyPoint = lazy(() => import('./MyPoint'));
const Mail = lazy(() => import('./Mail'));
const Search = lazy(() => import('./Search'));
const Daily = lazy(() => import('./Daily'));
const Code = lazy(() => import('./Code'));
const Advertise = lazy(() => import('./Advertise'));
const Home = lazy(() => import('./Home'));
const Report = lazy(() => import('./Report'));
const Test = lazy(() => import('./Test'));
const Posting = lazy(() => import('./Board/Posting'));
const Consult = lazy(() => import('./Consult'));
const BoardSetting = lazy(() => import('./Menu'));

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
  Home,
  Report,
  Test,
  Posting,
  Consult,
  BoardSetting,
};
