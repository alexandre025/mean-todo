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