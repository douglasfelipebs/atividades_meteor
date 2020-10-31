import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Atividades = new Mongo.Collection('atividades');

Meteor.methods({
  'atividades.insert'(doc) {
    check(doc, Object);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    const projeto = {
      ...doc,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    };

    return Atividades.insert(projeto);
  },
  'atividades.remove'(_id) {
    check(_id, String);

    const projeto = Atividades.findOne(_id);
    if (!projeto) {
      throw new Meteor.Error('not-existent');
    }

    if (projeto.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Atividades.remove(_id);
  },
  'atividades.setChecked'(_id, setChecked) {
    check(_id, String);
    check(setChecked, Boolean);

    const atividade = Atividades.findOne(_id);
    if (atividade.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Atividades.update(_id,
      {
        $set: { checked: setChecked },
      });
  },
});
