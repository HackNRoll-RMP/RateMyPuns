import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Puns } from '../../imports/api/puns.js';
import { ReactiveVar } from 'meteor/reactive-var';

import './dashboard.html';

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
        Puns.update(this._id, {
          $set: { "punpointsPos": this.punpointsPos+1 },
        });
        //document.location.reload(true);
    },
    'click button.delete'() {
    	Puns.remove(this._id);
  	},
});

Template.card.events({
  'click button.unpunny'(event,instance){
        Puns.update(this._id, {
          $set: { "punpointsNeg": this.punpointsNeg-1 },
        });
        //document.location.reload(true);
    },
});

Template.dashboard.helpers({
  punlist() {
      return Puns.find({}, { sort : { timestamp: -1} });
  },
});

Template.userdata.helpers({
  userdata(){
    return Meteor.user().username;
  }
});

//var counter;


// Events


// Helpers
