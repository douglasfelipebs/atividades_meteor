import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Projetos = new Mongo.Collection('projetos');

Meteor.methods({
  'projetos.insert'(doc) {
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

    return Projetos.insert(projeto);
  },
  'projetos.remove'(_id) {
    check(_id, String);

    const projeto = Projetos.findOne(_id);
    if (!projeto) {
      throw new Meteor.Error('not-existent');
    }

    if (projeto.owner !== this.userId) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    return Projetos.remove(_id);
  },
});
