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
    const menus = [
      {
        nome: 'Menu',
        icone: icones[getRandomInt(0, 10)],
      },
      {
        nome: 'Meramete',
        icone: icones[getRandomInt(0, 10)],
      },
      {
        nome: 'Ilustrativo',
        icone: icones[getRandomInt(0, 10)],
      },
      {
        nome: 'E Dinâmico',
        icone: icones[getRandomInt(0, 10)],
      },
    ];
    for (let i = 1; i < getRandomInt(2, 7); i++) {
      menus.push({
        nome: i,
        icone: icones[getRandomInt(0, 10)],
      })
    }
    return menus;
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

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

const icones = [
  'fa fa-tasks',
  'fa fa-user-o',
  'fa fa-address-book',
  'fa fa-anchor',
  'fa fa-bed',
  'fa fa-battery-half',
  'fa fa-bookmark',
  'fa fa-car',
  'fa fa-clone',
  'fa fa-cutlery',
  'fa fa-cloud-upload',
];
