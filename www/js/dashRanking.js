'Use Strict';
var dashRanking = angular.module('App.DashRanking', []);

dashRanking.controller('RankingCtrl', function($scope, $state, $localStorage, Popup, Chats, $window, $ionicLoading, $ionicPopover, $ionicHistory) {
  $ionicLoading.show().then(function(){
    //console.log("Loading");
  });

  //var test = $ionicHistory.viewHistory();
  //console.log("back "+ test.backViewId);

  if(window.localStorage.getItem("lang") == null){
      window.localStorage.setItem("lang", "pt");
      console.log("Idioma selecionado.")
    }
	
  $scope.usuario = $localStorage.account.gamertag;

  var ranking = [];
  var key = localStorage.getItem('key');

   $scope.refresh = function(){
    $window.location.reload(true);
  }

	var refTodosjogos = firebase.database().ref('fifadare/users');
    refTodosjogos.orderByChild('pontos').once("value").then(function(snapshot) {
      $scope.$apply(function(){
        $scope.jogos = snapshot.val(); 
          snapshot.forEach(function(minisnapshot) {
               $ionicLoading.hide().then(function(){
                  //console.log("Loading Hide");
                });
          	   ranking.push({
                "key":minisnapshot.key, 
                "gamertag":minisnapshot.val().gamertag, 
                "quantidade":minisnapshot.val().jogosQuantidade, 
                "pontos":minisnapshot.val().pontos,
                "vitoria":minisnapshot.val().vitoria,
                "empate":minisnapshot.val().empate,
                "derrota":minisnapshot.val().derrota
              })
          });
       });      
      });  
    $scope.resultado = ranking;

    //abrir menuFlotante
      $ionicPopover.fromTemplateUrl('templates/popover.html', {
          scope: $scope,
      }).then(function(popover) {
          $scope.popover = popover;
      });

      $scope.cerrarMenu = function(){
         $scope.popover.hide();
      };

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
      //console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      //Account details.
      var email = JSON.stringify(firebase.auth().currentUser.email);
      var uid = JSON.stringify(firebase.auth().currentUser.uid); 
      //console.log("Account: " + email);
      //Set the variables to be shown on home.html
      $scope.email = $localStorage.account.email;
      $scope.provider = $localStorage.account.provider;
      $scope.gamertag = $localStorage.account.gamertag;

      /*

      var ref = firebase.database().ref("fifadare/users/"+key);
      ref.once("value").then(function(snapshot) {
       $scope.$apply(function(){
            $scope.games = snapshot.val(); // {first:"Ada",last:"Lovelace"}
            //$scope.pontos = $scope.games.pontos;
            //$scope.jogosQuantidade = $scope.games.jogosQuantidade;
          });
     });
     */


      if($localStorage.account.email == "benbaodan@outlook.com"){
        $scope.agregarRegra = true;
      } else {
        $scope.agregarRegra = false;
      }
    } else {
      //Logged in user is previously logged in as guest. Set variables to Guest variables.
      //console.log("Firebase Auth: " + JSON.stringify(firebase.auth().currentUser));
      $scope.email = "Guest";
      $scope.provider = "Firebase";
      $scope.loggedIn = true;
    }
  })

});