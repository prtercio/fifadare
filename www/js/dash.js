'Use Strict';
var dash = angular.module('App.Dash', []);

dash.controller('DashCtrl', function($scope, $state, $localStorage, Popup) {

	var ref = firebase.database().ref("fifadare/users");
	ref.once("value").then(function(snapshot) {
	   var datos = snapshot.val(); // {first:"Ada",last:"Lovelace"}
	   console.log(datos);
	   //var firstName = snapshot.child("name/first").val(); // "Ada"
	   //var lastName = snapshot.child("name").child("last").val(); // "Lovelace"
	   //var age = snapshot.child("age").val(); // null
	});

	

});
