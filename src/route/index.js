import Layout from '../components/Layout';
import List from './List';
import Detail from './Detail';

export default [
  {
    component: Layout,
    routes: [
      {
        exact: true,
        path: '/',
        component: List,
      },
      {
        exact: true,
        path: '/detail/',
        component: Detail,
      },
    ],
  },
];
