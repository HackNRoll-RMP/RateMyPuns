import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Puns } from '../../imports/api/puns.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './dashboard.html';

var fresh = true;

Template.card.onCreated(function countOnCreated(){
  this.counter = new ReactiveVar(0);
});

Template.card.onCreated(function countOnCreated(){
  this.count = new ReactiveVar(0);
});


Template.dashboard.events({
  'click .sortHotClass' : function(event) {
    fresh = false;
    console.log("sortHot");
  },

  'click .sortFreshClass' : function(event) {
    fresh = true;
    console.log("sortFresh");
  },

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
      username: Meteor.user().username,
      pun: text,
      punpointsPos: 0,
      punpointsNeg: 0,
      timestamp: new Date(), // current time
    });

    // Clear form
    template.find('#pun').value = '';
  },

});
Template.card.events({
  'click button.punny'(event,instance){
        instance.counter.set(instance.counter.get()+1);
        Puns.update(this._id, {
          $set: { punpointsPos: instance.counter.get() },
        });
    },
});

Template.card.events({
  'click button.unpunny'(event,instance){
        instance.count.set(instance.count.get()-1);
        Puns.update(this._id, {
          $set: { punpointsNeg: instance.count.get() },
        });
    },
});

Template.dashboard.helpers({
  punlist() {
    if(fresh === true) {
      return Puns.find({}, { sort : { timestamp: -1} });
    }
    else
      return Puns.find({}, { sort : { punpointsPos: -1} });
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

Template.userdata.helpers({
  userdata(){
    return Meteor.user().username;
  }
});

//var counter;


// Events


// Helpers
