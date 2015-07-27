plank
=====

plank is a backbone + bootstrap UI toolkit

Example:

    Plank.brand({
      title: 'Plank',
      icon: 'leaf',
      appName: 'Plank<i class="fa fa-leaf"></i>'
    }).nav([
      { id: 'dashboard',   title: 'Dashboard',   href: '#!/dashboard', icon: 'home' },
      { id: 'features',    title: 'Features',    href: '#!/features',  icon: 'suitcase', badge: 2 }  
    ]).start(App);
