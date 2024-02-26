import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'HomePage',
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reminder-customer/add',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/features/reminder-customer/AddPage.vue'),
        name: 'AddReminderCustomerPage',
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/reminder-customer/edit/:id',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('pages/features/reminder-customer/EditPage.vue'),
        name: 'EditReminderCustomerPage',
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/interval',
    component: () => import('layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/features/interval/IndexPage.vue'),
        name: 'IntervalIndexPage',
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signin',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/auth/SignInPage.vue'),
        name: 'SignInPage',
      },
    ],
    meta: {
      requiresGuest: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
