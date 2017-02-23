// register.js
// This is the controller that handles the registration of the user through Firebase.
// When the user is done registering, the user is automatically logged in.
'Use Strict';
angular.module('App').controller('registerController', function($scope, $state, $localStorage, Utils, Popup) {
  $scope.$on('$ionicView.enter', function() {
    //Clear the Registration Form.
    $scope.user = {
      email: '',
      password: ''
    };
  })
  
  var jogos = {
    "jogo1":{"estado":"Próximo","jogo":1,"pontos":0, "bloqueado":false},
    "jogo2":{"estado":"Próximo","jogo":2,"pontos":0, "bloqueado":true},
    "jogo3":{"estado":"Próximo","jogo":3,"pontos":0, "bloqueado":true},
    "jogo4":{"estado":"Próximo","jogo":4,"pontos":0, "bloqueado":true},
    "jogo5":{"estado":"Próximo","jogo":5,"pontos":0, "bloqueado":true}
  }
    
  $scope.register = function(user) {
    //Check if form is filled up.
    if (angular.isDefined(user)) {
      Utils.show();
      firebase.database().ref('fifadare/users').orderByChild('email').equalTo(user.email).once('value').then(function(accounts) {
        if (accounts.exists()) {
          Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
        } else {
          //Create Firebase account.
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(function() {
              //Add Firebase account reference to Database. Firebase v3 Implementation.
              firebase.database().ref().child('fifadare/users').push({
                email: user.email,
                gamertag: user.gamertag,
                userId: firebase.auth().currentUser.uid,
                dateCreated: Date(),
                provider: 'Firebase',
                pontos: 0,
                jogosQuantidade:0,                
                jogos: jogos

              }).then(function(response) {
                //Account created successfully, logging user in automatically after a short delay.
                Utils.message(Popup.successIcon, Popup.accountCreateSuccess)
                  .then(function() {
                    getAccountAndLogin(response.key);
                    $localStorage.key = response.key;
                    window.localStorage.setItem('key', response.key);
                    /*
                    firebase.database().ref().child('fifadare/users/'+response.key).push({}).then(function(response) {
                      console.log("exito");
                    });
                    */

                  })
                  .catch(function() {
                    //User closed the prompt, proceed immediately to login.
                    getAccountAndLogin(response.key);
                    $localStorage.key = response.key;
                    window.localStorage.setItem('key', response.key);
                  });
                $localStorage.loginProvider = "Firebase";
                $localStorage.email = user.email;
                $localStorage.password = user.password;
                $localStorage.gamertag = user.gamertag;
                
              });
            })
            .catch(function(error) {
              var errorCode = error.code;
              var errorMessage = error.message;
              //Show error message.
              console.log(errorCode);
              switch (errorCode) {
                case 'auth/email-already-in-use':
                  Utils.message(Popup.errorIcon, Popup.emailAlreadyExists);
                  break;
                case 'auth/invalid-email':
                  Utils.message(Popup.errorIcon, Popup.invalidEmail);
                  break;
                case 'auth/operation-not-allowed':
                  Utils.message(Popup.errorIcon, Popup.notAllowed);
                  break;
                case 'auth/weak-password':
                  Utils.message(Popup.errorIcon, Popup.weakPassword);
                  break;
                default:
                  Utils.message(Popup.errorIcon, Popup.errorRegister);
                  break;
              }
            });
        }
      });
    }
  };

  //Function to retrieve the account object from the Firebase database and store it on $localStorage.account.
  getAccountAndLogin = function(key) {
    console.log(key);
    firebase.database().ref('accounts/' + key).on('value', function(response) {
      var account = response.val();
      $localStorage.account = account;
    });
    //$state.go('tab.dash');
    $state.go('login');
  };

});
