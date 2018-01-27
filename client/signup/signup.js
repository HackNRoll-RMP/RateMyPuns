import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './signup.html';

Template.signup.events ({
  'submit form': function(event, template) {
    event.preventDefault();
    var email = template.find('#email').value;
    var password = template.find('#password').value;
    var password1 = template.find('#password1').value;
    var booleanPassword = false;
    var booleanError = false;

    console.log("Data Collected");

    if (password === password1) {
      Accounts.createUser({
        email: email,
        password: password,
      },
      function(error){
        if(error){
          console.log(error.reason);
          alert(error.reason);
          booleanError = true;
        }
      });
    }
    else {
      booleanPassword = true;
      alert("Password mismatch!");
    }
    console.log("booleanError = " + booleanError);
    console.log("booleanPassword = " + booleanPassword);

    if (booleanPassword == false && booleanError == false) {
      console.log("User created");
      //Router.go('/signup-details');
      booleanError = !booleanError;
      booleanPassword = !booleanPassword;
    }
  }
});
