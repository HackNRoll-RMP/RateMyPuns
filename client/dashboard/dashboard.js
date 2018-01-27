import { Template } from 'meteor/templating';
import { Puns } from '../../imports/api/puns.js';

import './dashboard.html';

Template.dashboard.events({
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

Template.dashboard.helpers({
  punlist() {
    return Puns.find({});
  },
});