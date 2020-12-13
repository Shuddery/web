const laba5 = angular.module('labAngular', []);

laba5.controller('Controller', ['$scope', '$http', function($scope, $http) {

    $scope.data = {
        students: [],
        averageScore: 0,
        edit: false,
        newStudent: {
            name: '',
            surname: '',
            age: 0,
            average: 0
        }
    }

    $scope.addStudent = function () {
        if ($scope.data.newStudent.name.length > 3 && $scope.data.newStudent.surname.length > 3) {
            $scope.data.students.push({
                name: $scope.data.newStudent.name, 
                surname: $scope.data.newStudent.surname,
                age: +$scope.data.newStudent.age,
                average: +$scope.data.newStudent.average,
                id: $scope.data.students.length + 1  
            });

            $scope.data.newStudent.name = '';
            $scope.data.newStudent.surname = '';
            $scope.data.newStudent.age = '';
            $scope.data.newStudent.average = '';
        }
    }

    $scope.endEditStudent = function() {
        const { id } = $scope.data.newStudent;
        const index = $scope.data.students.findIndex(student => student.id === id);
        console.log($scope.data.newStudent);
        const newStudent = {
            name: $scope.data.newStudent.name, 
            surname: $scope.data.newStudent.surname,
            age: +$scope.data.newStudent.age,
            average: +$scope.data.newStudent.average,
            id: $scope.data.students.length + 1  
        };
        const students = [
            ...$scope.data.students.slice(0, index),
            newStudent,
            ...$scope.data.students.slice(index + 1)
        ];
        $scope.data.newStudent = {};
        $scope.data.students = students;
        $scope.data.edit = false;
        console.log($scope.data);
    }

    $scope.editStudent = function(student) {
        $scope.data.edit = true;
        $scope.data.newStudent = student;
        console.log($scope.data.newStudent)
    }

    $scope.deleteStudent = function(student) {
        const indexS = $scope.data.students.indexOf(student);
        $scope.data.students.splice(indexS, 1);
    }


    $scope.getTotal = function() {
        const sum = $scope.data.students.reduce((acc, current) => {
            acc += +current.average;
            return acc;
        }, 0);

        return (sum / $scope.data.students.length).toFixed(1);
    }

    $http({ method: 'GET', url: 'https://reqres.in/api/users?page=1' }).then(function(res) {
        return res.data
    })
    .then(function(data) {
        $scope.data.students = data.data.map(item => ({
            name: item.first_name,
            surname: item.last_name,
            id: item.id,
            average: +(Math.random() * 10).toFixed(0),
            age: +(item.id * Math.random()*10 + 1).toFixed(0)
        }));

    })
    .catch(function(err) {
        console.log(err);
    })


}])