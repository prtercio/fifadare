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
    "jogo5":{"estado":"Próximo","jogo":5,"pontos":0, "bloqueado":true},
    "jogo6":{"estado":"Próximo","jogo":6,"pontos":0, "bloqueado":true},
    "jogo7":{"estado":"Próximo","jogo":7,"pontos":0, "bloqueado":true},
    "jogo8":{"estado":"Próximo","jogo":8,"pontos":0, "bloqueado":true},
    "jogo9":{"estado":"Próximo","jogo":9,"pontos":0, "bloqueado":true},
    "jogo10":{"estado":"Próximo","jogo":10,"pontos":0, "bloqueado":true},
    "jogo11":{"estado":"Próximo","jogo":11,"pontos":0, "bloqueado":true},
    "jogo12":{"estado":"Próximo","jogo":12,"pontos":0, "bloqueado":true},
    "jogo13":{"estado":"Próximo","jogo":13,"pontos":0, "bloqueado":true},
    "jogo14":{"estado":"Próximo","jogo":14,"pontos":0, "bloqueado":true},
    "jogo15":{"estado":"Próximo","jogo":15,"pontos":0, "bloqueado":true},
    "jogo16":{"estado":"Próximo","jogo":16,"pontos":0, "bloqueado":true},
    "jogo17":{"estado":"Próximo","jogo":17,"pontos":0, "bloqueado":true},
    "jogo18":{"estado":"Próximo","jogo":18,"pontos":0, "bloqueado":true},
    "jogo19":{"estado":"Próximo","jogo":19,"pontos":0, "bloqueado":true},
    "jogo20":{"estado":"Próximo","jogo":20,"pontos":0, "bloqueado":true},
    "jogo21":{"estado":"Próximo","jogo":21,"pontos":0, "bloqueado":true},
    "jogo22":{"estado":"Próximo","jogo":22,"pontos":0, "bloqueado":true},
    "jogo23":{"estado":"Próximo","jogo":23,"pontos":0, "bloqueado":true},
    "jogo24":{"estado":"Próximo","jogo":24,"pontos":0, "bloqueado":true},
    "jogo25":{"estado":"Próximo","jogo":25,"pontos":0, "bloqueado":true},
    "jogo26":{"estado":"Próximo","jogo":26,"pontos":0, "bloqueado":true},
    "jogo27":{"estado":"Próximo","jogo":27,"pontos":0, "bloqueado":true},
    "jogo28":{"estado":"Próximo","jogo":28,"pontos":0, "bloqueado":true},
    "jogo29":{"estado":"Próximo","jogo":29,"pontos":0, "bloqueado":true},
    "jogo30":{"estado":"Próximo","jogo":30,"pontos":0, "bloqueado":true},
    "jogo31":{"estado":"Próximo","jogo":31,"pontos":0, "bloqueado":true},
    "jogo32":{"estado":"Próximo","jogo":32,"pontos":0, "bloqueado":true},
    "jogo33":{"estado":"Próximo","jogo":33,"pontos":0, "bloqueado":true},
    "jogo34":{"estado":"Próximo","jogo":34,"pontos":0, "bloqueado":true},
    "jogo35":{"estado":"Próximo","jogo":35,"pontos":0, "bloqueado":true},
    "jogo36":{"estado":"Próximo","jogo":36,"pontos":0, "bloqueado":true},
    "jogo37":{"estado":"Próximo","jogo":37,"pontos":0, "bloqueado":true},
    "jogo38":{"estado":"Próximo","jogo":38,"pontos":0, "bloqueado":true},
    "jogo39":{"estado":"Próximo","jogo":39,"pontos":0, "bloqueado":true},
    "jogo40":{"estado":"Próximo","jogo":40,"pontos":0, "bloqueado":true},
    "jogo41":{"estado":"Próximo","jogo":41,"pontos":0, "bloqueado":true},
    "jogo42":{"estado":"Próximo","jogo":42,"pontos":0, "bloqueado":true},
    "jogo43":{"estado":"Próximo","jogo":43,"pontos":0, "bloqueado":true},
    "jogo44":{"estado":"Próximo","jogo":44,"pontos":0, "bloqueado":true},
    "jogo45":{"estado":"Próximo","jogo":45,"pontos":0, "bloqueado":true},
    "jogo46":{"estado":"Próximo","jogo":46,"pontos":0, "bloqueado":true},
    "jogo47":{"estado":"Próximo","jogo":47,"pontos":0, "bloqueado":true},
    "jogo48":{"estado":"Próximo","jogo":48,"pontos":0, "bloqueado":true},
    "jogo49":{"estado":"Próximo","jogo":49,"pontos":0, "bloqueado":true},
    "jogo50":{"estado":"Próximo","jogo":50,"pontos":0, "bloqueado":true}
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
                jogos: jogos,
                vitoria: 0,
                empate: 0,
                derrota: 0

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
