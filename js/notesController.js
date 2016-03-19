app.controller('notesController', function($scope) {
	// localStorage.clear();
	$scope.saved = localStorage.getItem('notes');
	$scope.notesArray = (localStorage.getItem('notes') !== null) ? JSON.parse($scope.saved):[];
	clearAndFocus();
	$scope.addButton = function() {
			if ($scope.title == '' || $scope.when == '' || $scope.description == ''){
				alert("Please fill in all the neccessary details.");
 			} else {
			$scope.notesArray.push($scope.createNote($scope.title, $scope.when, $scope.description));
			clearAndFocus();
 		};
	};

	function addIfEnter(event){
				if (event.keyCode == 13) {
					$scope.addButton();
				};
			};

	$scope.createNote = function(title, when, description) {
		var note = {};
		note.title = title;
		note.when = when;
		note.description = description;
		var local = (localStorage.getItem('notes') !== null) ? JSON.parse(localStorage.getItem('notes')) : []; //set localStorage if exists,else start from an empty array
	    localStorage.clear();
	    local.push(note);
	    localStorage.setItem('notes', JSON.stringify(local));
		return note;
	}
	function clearAndFocus() {
		$scope.title = '';
		$scope.when = '';
		$scope.description = '';
		var focusOnTitle = document.getElementById('title');
		focusOnTitle.focus();
	}

	$scope.removeNote = function(note) {
		var i = $scope.notesArray.indexOf(note);
		$scope.notesArray.splice(i , 1);
		var local = JSON.parse(localStorage.getItem('notes')); 		//delete from localStorage
	    localStorage.clear();
	    local.splice(i, 1);
	    localStorage.setItem('notes', JSON.stringify(local));
	}
});
