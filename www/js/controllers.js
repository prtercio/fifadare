'Use Strict';
var tab = angular.module('App.controllers', []);

/*
tab.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
});*/

/*
tab.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})
*/

tab.controller('AccountCtrl', function($scope, $state, $localStorage, Popup) {
  $scope.settings = {
    enableFriends: true
  };

  var key = localStorage.getItem('key');

  $scope.$on('$ionicView.enter', function() {
    //Check if there's an authenticated user, if there is non, redirect to login.
    if(firebase.auth().currentUser) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
      $state.go('login');
    }
    if(!$localStorage.isGuest) {
      //Authentication details.
      console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      //Account details.
      var email = JSON.stringify(firebase.auth().currentUser.email);
      var uid = JSON.stringify(firebase.auth().currentUser.uid); 
      console.log("Account: " + email);
      //Set the variables to be shown on home.html
      $scope.email = $localStorage.account.email;
      $scope.provider = $localStorage.account.provider;
      $scope.gamertag = $localStorage.account.gamertag;

      var ref = firebase.database().ref("fifadare/users/"+key);
      ref.once("value").then(function(snapshot) {
         $scope.$apply(function(){
            $scope.games = snapshot.val(); // {first:"Ada",last:"Lovelace"}
            $scope.pontos = $scope.games.pontos;
            $scope.jogosQuantidade = $scope.games.jogosQuantidade;
         });
      });
     

      if($localStorage.account.email == "benbaodan@outlook.com"){
        $scope.agregarRegra = true;
      } else {
        $scope.agregarRegra = false;
      }
    } else {
      //Logged in user is previously logged in as guest. Set variables to Guest variables.
      console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      $scope.email = "Guest";
      $scope.provider = "Firebase";
      $scope.loggedIn = true;
    }
  })

  $scope.logout = function() {
    if (firebase.auth()) {
      firebase.auth().signOut().then(function() {
        //Clear the saved credentials.
        $localStorage.$reset();
        //Proceed to login screen.
        $state.go('login');
      }, function(error) {
        //Show error message.
        Utils.message(Popup.errorIcon, Popup.errorLogout);
      });
    }
  };

  $scope.enviarregra = function(regra) {
    //Check if form is filled up.

              //Add Firebase account reference to Database. Firebase v3 Implementation.
              firebase.database().ref().child('fifadare/regra').push({
                titulo: regra.titulo,
                pontos: regra.pontos,
                descricao: regra.descricao                
              }).then(function(response) {
                console.log(response);
                //Account created successfully, logging user in automatically after a short delay.
                /*Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                  .then(function() {
                    getAccountAndLogin(response.key);
                  })
                  .catch(function() {
                    //User closed the prompt, proceed immediately to login.
                    getAccountAndLogin(response.key);
                  });
                  */
               
              });           
   }
});
