export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/videos', authority: ['admin', 'user'] },
      { path: '/videos', name: 'home', icon: 'home', component: './Video' },
      { path: '/trending', name: 'trending', icon: 'dash', component: './Trending' },
      { path: '/history', name: 'history', icon: 'dash', component: './History' },
      { path: '/liked', name: 'likedVideo', icon: 'dash', component: './LikedVideo' },
      {
        path: '/category',
        name: 'category',
        icon: 'dash',
        children: [
          { path: '/technology', name: 'technology' },
          { path: '/life', name: 'life' },
          { path: '/music', name: 'music' },
          { path: '/teaching', name: 'teaching' },
          { path: '/radio', name: 'radio' },
          { path: '/movie', name: 'movie' },
        ],
      },
      {
        path: '/videoManager',
        name: 'videoManager',
        icon: 'dash',
        component: './Manager/BasicList',
        authority: ['admin'],
      },

      // detail
      { path: '/detail/:id', name: 'Detail', component: './Detail/VideoPlayer', noMenu: true },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        noMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
