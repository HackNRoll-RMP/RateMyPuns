Router.route('/signup', {
    template: 'signup'
});
Router.route('/dashboard', {
  template: 'dashboard',
  onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    }
});
Router.route('/', {
  template: 'login'
});
