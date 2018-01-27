import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var'
import './body.html';

var counter;

Template.punny.onCreated(function countOnCreated(){
	this.counter = new ReactiveVar(0);
});

Template.unpunny.onCreated(function countOnCreated(){
	this.count = new ReactiveVar(0);
});

// Events

Template.punny.events({
	'click button'(event,instance){
        instance.counter.set(instance.counter.get()+1);
    },
});

Template.unpunny.events({
	'click button'(event,instance){
        instance.count.set(instance.count.get()-1);
    },
});

// Helpers

Template.punny.helpers({
	counter(){
		return Template.instance().counter.get();
	}
});

Template.unpunny.helpers({
	count(){
		return Template.instance().count.get();
	}
});



