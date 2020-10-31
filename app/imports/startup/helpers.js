import { Template } from 'meteor/templating';
import { check } from 'meteor/check';
import moment from 'moment';

Template.registerHelper('formataDataBrasileira', function (data){
  check(data, Date);
  return moment(data).utc().format('DD/MM/YYYY');
});

Template.registerHelper('print', function (data){
  console.log(data)
});

Template.registerHelper('equals', function (a, b){
  return a === b;
});

Template.registerHelper('or', function (...args){
  args.pop();
  return !!args.filter((x) => x).length;
});
