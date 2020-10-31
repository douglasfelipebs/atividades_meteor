import { Template } from 'meteor/templating';
import './atividade.html';

Template.atividade.events({
  'click .delete'() {
    Meteor.call('atividades.remove', this._id);
  },
  'click .toggle-checked' () {
    // Set the checked property to the opposite of its current value
    Meteor.call('atividades.setChecked', this._id, !this.checked);
  },
});
