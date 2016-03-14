'use strict';

function TodosDirective () {
  return {
    templateUrl: '/templates/todos.html',
    replace: true,
    controller: 'mainController'
  }
}

module.exports = TodosDirective;