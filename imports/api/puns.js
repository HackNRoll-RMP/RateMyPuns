import { Mongo } from 'meteor/mongo';
 
export const Puns = new Mongo.Collection('puns');

let PunsSchema = new SimpleSchema({
	'owner': {
		type: String,
		label: 'The ID of the user that created the pun.'
	},
	'pun': {
		type: String,
		label: 'The content of the pun.'
	},
	'punpoints': {
		type: Number,
		label: 'The pun points.'
	},
	'timestamp': {
		type: Date,
		label: 'The date and time the pun was created.'
	}
});

Puns.attachSchema(PunsSchema);