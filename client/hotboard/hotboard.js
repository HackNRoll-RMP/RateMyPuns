import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Puns } from '../../imports/api/puns.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './hotboard.html';

Template.hotboard.events({

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
Template.hotcard.events({
  'click button.punny'(event,instance){
        Puns.update(this._id, {
          $set: { "punpointsPos": this.punpointsPos+1 },
        });
    },
    'click button.delete'() {
      Puns.remove(this._id);
    },
});

Template.hotcard.events({
  'click button.unpunny'(event,instance){
        Puns.update(this._id, {
          $set: { "punpointsNeg": this.punpointsNeg-1 },
        });
    },
});

Template.hotboard.helpers({
  punlist() {
      //Puns.find({}, { sort : { punpointsNeg: -1} });
      return Puns.find({}, { sort : {punpointsPos : -1, punpointsNeg : -1}});
  },
});

Template.userdataHot.helpers({
  userdata(){
    return Meteor.user().username;
  }
});

//var counter;


// Events


// Helpers
