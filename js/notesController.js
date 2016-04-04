app.controller('notesController', ['$scope' , function($scope) {
	// localStorage.clear();
	$scope.saved = localStorage.getItem('notes');
	$scope.notesArray = (localStorage.getItem('notes') !== null) ? JSON.parse($scope.saved):[];
	$scope.dim = false; // dim background on edit
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

	function addIfEnterEdit(event, note){
				if (event.keyCode == 13) {
					$scope.editNote(note);
				};
			};

	$scope.createNote = function(title, when, description) {
		var note = {};
		note.title = title;
		note.when = when;
		note.description = description;
		note.inEdit = false;
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

	$scope.editNote = function(note) {
		note.inEdit = true;
		$scope.dim = true;
	}
	$scope.saveEditedNote = function(note) {
		if (note.title == '' || note.when == '' || note.description == ''){
				alert("Please fill in all the neccessary details.");
			} else {
		note.inEdit = false;
		$scope.dim = false;
		var i = $scope.notesArray.indexOf(note);		//edit from localStorage
		var local = JSON.parse(localStorage.getItem('notes')); 
	    localStorage.clear();
	    local[i] = note;
	    localStorage.setItem('notes', JSON.stringify(local));
		};
	};
}]);
