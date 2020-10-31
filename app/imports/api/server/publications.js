// This code only runs on the server
import { Meteor } from 'meteor/meteor';
import { Projetos } from '../projetos';
import { Atividades } from '../atividades';

Meteor.publish('projetos.all', function () {
  if (!this.userId) {
    return;
  }

  return Projetos.find({
    owner: this.userId,
  });
});

Meteor.publish('atividades.all', function (id_projeto) {
  if (!this.userId) {
    return;
  }

  return Atividades.find({
    id_projeto,
    owner: this.userId,
  });
});
