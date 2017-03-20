'Use Strict';
var dash = angular.module('App.Configuracao', []);

dash.controller('ConfiguracaoCtrl', function($scope, $state, $localStorage, Popup, $ionicPopup, $window, $ionicHistory, idXbox, $http, $ionicLoading, dataService) {
	
	var keyUsuario = localStorage.getItem("key");
	console.log(" - "+idXbox);
	$ionicLoading.show().then(function(){
    //console.log("Loading");
  	});

	$ionicLoading.hide();
	var dadosRecuperados = dataService.get();
	console.log(dadosRecuperados);
	$scope.profile = dadosRecuperados;
	//});


	//Xbox
	/*
	$scope.$on('$ionicView.enter', function() {
	 $http({
       url: 'https://xboxapi.com/v2/'+idXbox+'/profile',
      method: 'GET',
      headers: {
                  'Access-Control-Allow-Origin': '*',                
                  'X-AUTH': '4a58d6c0d49e5884e43a756d729940c95c82cca7', //Benbaodan
                  //'X-AUTH' : '5056c2081205740a2d765ebe3ff5807dd4178a87', // BenbaodanJr
                  //'X-Authorization':idXbl,
                  //'Access-Control-Allow-Methods': 'GET',
                  'Accept-Language':'es-ES',
                  'Content-Type':'application/json'
                }
      }).then(function(respuesta) { 
      	$ionicLoading.hide();
      	console.log("Resp "+respuesta.data);
      	$scope.profile = respuesta.data;
      }, function(err) {
             console.log("Error2 "+err.data);
             $scope.error = err;
             $ionicLoading.hide();
    	});    
    });
    */


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