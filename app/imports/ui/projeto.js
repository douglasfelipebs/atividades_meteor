import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Atividades } from '../api/atividades';
import './projeto.html';

Template.projeto.onCreated(function () {
  const self = this;
  self.isOpen = new ReactiveVar(false);
  self.insereAtividade = new ReactiveVar(false);
  self.renderizado = new ReactiveVar(false);
  self.atrazado = new ReactiveVar(false);
  Meteor.subscribe('atividades.all', self.data._id);
});

Template.projeto.onRendered(function (){
  const self = this;
  self.renderizado.set(true);
})

Template.projeto.helpers({
  isOpen() {
    return Template.instance().isOpen.get();
  },
  insereAtividade() {
    return Template.instance().insereAtividade.get();
  },
  atividades() {
    return Atividades.find({ id_projeto: this._id });
  },
  atrazado() {
    const projeto = this;
    const atividadesAtrazadas = Atividades.find({
      id_projeto: projeto._id,
      dataFinal: {
        $gt: projeto.dataFinal,
      },
    }).fetch();
    return !!atividadesAtrazadas.length;
  },
  porcentagem() {
    const projeto = this;
    const atividades = Atividades.find({ id_projeto: projeto._id }).fetch();
    const finalizadas = atividades.filter(({ checked }) => checked);
    if (atividades.length) {
      return Math.floor(((finalizadas.length * 100) / atividades.length));
    }
    return 'sem_atividades';
  },
  renderizado() {
    return Template.instance().renderizado.get();
  }
});

Template.projeto.events({
  'click #novaAtividade'(event, templateInstance) {
    templateInstance.insereAtividade.set(!templateInstance.insereAtividade.get());
  },
  'click .js-toggleOpen'(event, templateInstance) {
    if (event.target.className === 'js-toggleOpen') {
      templateInstance.isOpen.set(!templateInstance.isOpen.get());
    }
  },
  'submit #formInsertAtividade': function (event, templateInstance) {
    event.preventDefault();

    const target = event.target;
    if (!Meteor.user()) {
      return 'nao_logado';
    }

    const atividade = {
      nome: target.nome.value,
      dataInicio: new Date(target.dataInicio.value),
      dataFinal: new Date(target.dataFinal.value),
      id_projeto: this._id,
    };

    Meteor.call('atividades.insert', atividade);

    target.nome.value = '';
    target.dataInicio.value = '';
    target.dataFinal.value = '';
    templateInstance.insereAtividade.set(false);
  },
  'click .delete'() {
    Meteor.call('projetos.remove', this._id);
  },
});
