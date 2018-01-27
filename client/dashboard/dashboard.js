import { Template } from 'meteor/templating';
import { Puns } from '../../imports/api/puns.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './dashboard.html';

Template.card.onCreated(function countOnCreated(){
  this.counter = new ReactiveVar(0);
});

Template.card.onCreated(function countOnCreated(){
  this.count = new ReactiveVar(0);
});


Template.dashboard.events({

  'click .logout' :function(event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
  },

  'submit .new-pun'(event, template) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = template.find('#pun').value;

    // Insert a task into the collection
    Puns.insert({
      owner: Meteor.userId(),
      pun: text,
      punpoints: 0,
      timestamp: new Date(), // current time
    });

    // Clear form
    template.find('#pun').value = '';
  },

});
Template.card.events({
  'click button.punny'(event,instance){
        instance.counter.set(instance.counter.get()+1);
    },
});

Template.card.events({
  'click button.unpunny'(event,instance){
        instance.count.set(instance.count.get()-1);
    },
});


Template.dashboard.helpers({
  punlist() {
    return Puns.find({});
  },
});
Template.card.helpers({
  counter(){
    return Template.instance().counter.get();
  }
});

Template.card.helpers({
  count(){
    return Template.instance().count.get();
  }
});

//var counter;


// Events


// Helpers

