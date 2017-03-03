'Use Strict';
var dash = angular.module('App.Configuracao', []);

dash.controller('ConfiguracaoCtrl', function($scope, $state, $localStorage, Popup, $ionicPopup, $window, $ionicHistory) {
	console.log($ionicHistory.currentStateName());

	$scope.showPopup = function() {
	    $ionicPopup.show({
	              template: '',
	              title: 'Idioma:',
	              scope: $scope,
	              buttons: [
	                { text: 'Portugues', onTap: function(e) { return 'pt'; } },
	                { text: 'Español', onTap: function(e) { return 'es'; } }

	              ]
	              }).then(function(res) {
	                console.log('Tapped!', res);
	                if(res === "pt"){
	                      window.localStorage.setItem("lang", "pt");
	                      //
	                      $state.go('tab.dash', {}, {reload: true});
	                      $window.location.reload(true);
	                      
	                } else {
	                      window.localStorage.setItem("lang", "es");
	                      //
	                      $state.go('tab.dash', {}, {reload: true});
	                      $window.location.reload(true);
	                     
	                }
	              }, function(err) {
	                console.log('Err:', err);
	              }, function(msg) {
	                console.log('message:', msg);
	              });

	  }

	$scope.logout = function() {
	    if (firebase.auth()) {
	      firebase.auth().signOut().then(function() {
	        $ionicHistory.removeBackView();
	        //Clear the saved credentials.
	        $localStorage.$reset();
	        
	        //Proceed to login screen.
	        $state.go('login', {}, {reload: true});
	      }, function(error) {
	        //Show error message.
	        Utils.message(Popup.errorIcon, Popup.errorLogout);
	      });
	    }
	  };



});