export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'client',
    title: 'Client',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      // {
      //   id: 'default',
      //   title: 'Default',
      //   type: 'item',
      //   classes: 'nav-item',
      //   url: '/dashboard/default',
      //   icon: 'dashboard',
      //   breadcrumbs: false
      // },
      {
        id: 'take-appointment',
        title: 'Mes rendez-vous',
        type: 'item',
        url: '/client/take-appointment',
        classes: 'nav-item',
        icon: 'dashboard'
      },
      {
        id: 'Vehicules',
        title: 'Mes véhicules',
        type: 'item',
        url: '/client/vehicule',
        classes: 'nav-item',
        icon: 'dashboard'
      },
      // {
      //   id: 'Progress',
      //   title: 'Progress',
      //   type: 'item',
      //   url: '/client/progress',
      //   classes: 'nav-item',
      //   icon: 'dashboard',
      //   children:[
      //     {
      //       id: 'detail',
      //       title: 'Detail',
      //       type: 'item',
      //       url: '/client/progress/detail', // Sans :id ici
      //       classes: 'nav-item',
      //       icon: 'dashboard',
      //       breadcrumbs: false // Important de le mettre à false car l'url va changer
      //     },
      //   ]
      // },
    ]
  },
  {
    id: 'manager',
    title: 'Manager',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Statistiques',
        title: 'Statistiques',
        type: 'item',
        url: '/manager/statistics',
        classes: 'nav-item',
        icon: 'dashboard'
      },
      {
        id: 'Appointment List',
        title: 'Liste des rendez-vous',
        type: 'item',
        url: '/manager/appointment-list',
        classes: 'nav-item',
        icon: 'dashboard'
      },
      // {
      //   id: 'Repair List',
      //   title: 'Réparations',
      //   type: 'item',
      //   url: '/manager/repair-list',
      //   classes: 'nav-item',
      //   icon: 'dashboard'
      // },
      {
        id: 'Mécaniciens',
        title: 'Mécaniciens',
        type: 'item',
        url: '/manager/mechanics',
        classes: 'nav-item',
        icon: 'dashboard'
      },
      {
        id: 'Managers',
        title: 'Managers',
        type: 'item',
        url: '/manager/managers',
        classes: 'nav-item',
        icon: 'dashboard'
      },
      {
        id: 'Services',
        title: 'Services',
        type: 'item',
        url: '/manager/service-types',
        classes: 'nav-item',
        icon: 'dashboard'
      },
    ]
  },
  {
    id: 'mechanic',
    title: 'Mechanic',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Repair List',
        title: 'Liste des rendez-vous',
        type: 'item',
        url: '/mechanic/repair-list',
        classes: 'nav-item',
        icon: 'dashboard'
      },
    ]
  },
  // {
  //   id: 'authentication',
  //   title: 'Authentication',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'login',
  //       title: 'Login',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/login',
  //       icon: 'login',
  //       target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'register',
  //       title: 'Register',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/register',
  //       icon: 'profile',
  //       target: true,
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  // {
  //   id: 'utilities',
  //   title: 'UI Components',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'typography',
  //       title: 'Typography',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/typography',
  //       icon: 'font-size'
  //     },
  //     {
  //       id: 'color',
  //       title: 'Colors',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/color',
  //       icon: 'bg-colors'
  //     },
  //     {
  //       id: 'tabler',
  //       title: 'Tabler',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://ant.design/components/icon',
  //       icon: 'ant-design',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // },

  // {
  //   id: 'other',
  //   title: 'Other',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'sample-page',
  //       title: 'Sample Page',
  //       type: 'item',
  //       url: '/sample-page',
  //       classes: 'nav-item',
  //       icon: 'chrome'
  //     },
  //     {
  //       id: 'document',
  //       title: 'Document',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: 'https://codedthemes.gitbook.io/mantis-angular/',
  //       icon: 'question',
  //       target: true,
  //       external: true
  //     }
  //   ]
  // }
];
