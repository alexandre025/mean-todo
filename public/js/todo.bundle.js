webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use.strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp',[]);

	__webpack_require__(3);
	__webpack_require__(5);
	__webpack_require__(7);




/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use.strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp').service('dataService', __webpack_require__(4));

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use.strict';

	function DataService($http, $q) {
		this.getTodos = function(callback) {
			$http.get('/api/todos')
			.then(callback)
		};

		this.deleteTodo = function(todo) {
			console.log("The "+todo.name+" has been deleted");
		};

		this.saveTodos = function(todos) {
			var queue = [];
			todos.forEach(function(todo) {
				var request;
				if(!todo._id) {
					request = $http.post('/api/todos', todo);
				}else{
					request = $http.put('/api/todos/' + todo._id, todo).then(function(result){
						todo = result.data.todo;
						return todo;
					});
				}
				queue.push(request);
			});
			return $q.all(queue).then(function(results){
				console.log(todos.length + " todos have been saved!");
			});
			
		}
	}

	module.exports = DataService;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp').directive('todos', __webpack_require__(6));

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	function TodosDirective () {
	  return {
	    templateUrl: '/templates/todos.html',
	    replace: true,
	    controller: 'mainController'
	  }
	}

	module.exports = TodosDirective;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use.strict';

	var angular = __webpack_require__(1);

	angular.module('todoListApp').controller('mainController', __webpack_require__(8));

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use.strict';

	function MainController($scope, dataService) {

		$scope.addTodo = function() {
			var todo = {"name": "New todo"};
			$scope.todos.unshift(todo);
		};

		dataService.getTodos(function(response){
			$scope.todos = response.data.todos;
		});

		$scope.deleteTodo = function(todo, $index) {
			dataService.deleteTodo(todo);
			$scope.todos.splice($index,1)
		};

		$scope.saveTodos = function() {
			var filteredTodos = $scope.todos.filter(function(todo) {
				if(todo.edited) {
					return todo;
				}
			});
			dataService.saveTodos(filteredTodos).finally($scope.resetTodoState());
		};

		$scope.resetTodoState = function() {
			$scope.todos.forEach(function(todo) {
				todo.edited = false;
			});
		}

	}

	module.exports = MainController;

/***/ }
]);