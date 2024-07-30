import SvgColor from '../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Home',
    path: '/',
    icon: icon('home_icon'),
  },
  {
    title: 'user',
    path: '/user',
    icon: icon('ic_user'),
    items: [  
      {
        title: 'Profile',
        path: 'profile',
        icon: icon('profile_icon'),
      },
      {
        title: 'user',
        path: 'user',
        icon: icon('userPr_icon'),
      },
    ],
  },
  {
    title: 'product',
    path: 'products',
    icon: icon('ic_cart'),
  },
  {
    title: 'store',
    path: '/store',
    icon: icon('store_icon'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'profile',
    path: 'profile',
    icon: icon('ic_disabled'),
  }, 
];

export default navConfig;

