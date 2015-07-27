plank
=====

plank is a backbone + bootstrap UI toolkit

Example:

    # include plank.js
    <script src="./dist/plank.js"></script>
    # build a Marionette Application object...
    # then use Plank
    Plank.brand({
      title: 'Plank',
      icon: 'leaf',
      appName: 'Plank<i class="fa fa-leaf"></i>'
    }).nav([
      { id: 'dashboard',   title: 'Dashboard',   href: '#!/dashboard', icon: 'home' },
      { id: 'features',    title: 'Features',    href: '#!/features',  icon: 'suitcase', badge: 2 }  
    ]).start(App);
