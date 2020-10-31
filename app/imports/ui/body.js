import { Projetos } from '../api/projetos';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';
import './projeto.js';
import './menu.html';
import './atividade.js';

Template.body.onCreated(function () {
  const self = this;
  self.state = new ReactiveDict();
  Meteor.subscribe('projetos.all');

  self.insereProjeto = new ReactiveVar(false);
});

Template.body.helpers({
  menu_item() {
    return [
      {
        nome: 'Home',
        icone: 'fas fa-home',

      },
      {
        nome: 'Projetos',
        icone: 'fas fa-tasks',
      },
    ];
  },
  projetos() {
    return Projetos.find({}, { sort: { dataFinal: 1 } });
  },
  insereProjeto() {
    return Template.instance().insereProjeto.get();
  },
});

Template.body.events({
  'click #novoProjeto'(event, templateInstance) {
    templateInstance.insereProjeto.set(!templateInstance.insereProjeto.get());
  },
  'submit #formInsertProjeto': function (event, templateInstance) {
    event.preventDefault();

    const target = event.target;

    if (!Meteor.user()) {
      return 'nao_logado';
    }

    const projeto = {
      nome: target.nome.value,
      dataInicio: new Date(target.dataInicio.value),
      dataFinal: new Date(target.dataFinal.value),
    };

    Meteor.call('projetos.insert', projeto);

    target.nome.value = '';
    target.dataInicio.value = '';
    target.dataFinal.value = '';
    templateInstance.insereProjeto.set(false);
  },
  'input [name=search]': function (event, instance) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const search = event.target.value;

    if (search) {
      instance.state.set('textSearch', search);
    } else {
      instance.state.set('textSearch', false);
    }
  },
  'change .hide-completed input'(event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
