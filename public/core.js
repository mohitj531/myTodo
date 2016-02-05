var myTodo = angular.module('myTodo', []);

myTodo.controller('mainController', function ($scope, $http) {
    $scope.formData = {};
    $scope.currentList = "Tasks";
    $scope.show = false;

    // when landing on the page, get all todos and show them
    function getTodoList() {
        $http.get('/getTodos')
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }

    getTodoList();

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function () {
        $http.post('/createTodo', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function (id) {
        $http.delete('/deleteTodo' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    // mark as done to task
    $scope.markDone = function (id) {
        console.log("in markDone");
        $http.put('/markDone' + id)
            .success(function (data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.todoList = function (id) {
        console.log("in todoList");
        $scope.currentList = "Tasks";
        $scope.show = false;
        return getTodoList();
    };

    $scope.doneList = function (id) {
        console.log("in doneList");
        $scope.currentList = "Done";
        $scope.show = true;
        $http.get('/getDoneList', $scope.formData).success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

});