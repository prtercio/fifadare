'Use Strict';
var dashdetalle = angular.module('App.DashJogosDetalle', []);

dashdetalle.controller('JogosDetalheCtrl', function($scope, $state, $localStorage, Popup, Chats, $stateParams, Utils, $window, idJogo, $ionicNavBarDelegate) {

  $ionicNavBarDelegate.showBackButton(true);
    console.log("camera "+navigator.camera);

  var itemList=[];
  $scope.suma = 0; 
  var jogosDisputados = 0;
  var pontosSomados = 0;
  var data;
  var key = localStorage.getItem('key');
  $scope.verPontos = false;
  $scope.chat = "jogo"+idJogo; 
  $scope.jogoNome = "Jogo "+idJogo;
  console.log("jogo: "+idJogo);
  /*
    var jogo = $scope.chat.lastText;
  
  console.log(jogo, key);
  */

   var refBuscar = firebase.database().ref('fifadare/users/'+key);
   refBuscar.once('value').then(function(snapshot){
    //var pontosR = JSON.stringify(snapshot.val());
    $scope.todo = snapshot.val();
    jogosDisputados = $scope.todo.jogosQuantidade;
    pontosSomados = $scope.todo.pontos
   });

    
    var refjogos = firebase.database().ref('fifadare/users/'+key+'/jogos/'+$scope.chat);
    refjogos.once("value").then(function(snapshot) {
      $scope.detalheJogo = snapshot.val();    
    });  
  
  	

  	var ref = firebase.database().ref("fifadare/regra");
  	ref.once("value").then(function(snapshot) {
  	   $scope.regra = snapshot.val(); 
  	   $scope.blisterPackTemplates=snapshot.val();
  	});

  	$scope.enviarPontos = function() {
      // $localStorage.key é o key do jogador na DB
  		/*firebase.database().ref().child('fifadare/users/'+$localStorage.key+'/jogos/'+$scope.chat).push({
        jogoId: $stateParams.chatId,
        pontos: $scope.suma
      }).then(function(response) {
         Utils.message(Popup.successIcon, Popup.PontosSuccess).then(function() {
            console.log("Pontos enviados.")
          })
      }); 
      */
      //enviarImagen();
      if($scope.suma !== 0){

        var conquistas = [];
        for(var i =0; i < itemList.length; i++){
          console.log(itemList[i][0]+":"+itemList[i][1]);
          conquistas.push(itemList[i][0]+":"+itemList[i][1]);
        }
        
        firebase.database().ref().child('fifadare/users/'+key+'/jogos/'+$scope.chat).update({
          estado:"Enviado",
          jogo: parseInt($stateParams.chatId),
          pontos: $scope.suma,
          conquistas:conquistas
        }).then(function(response) {


           firebase.database().ref().child('fifadare/users/'+key).update({
             pontos: pontosSomados + $scope.suma,
             jogosQuantidade: jogosDisputados + 1
            }).then(function(response) {
                data = new Date();
                calcularTempo();
                 Utils.message(Popup.successIcon, Popup.PontosSuccess).then(function() {
                    console.log("Pontos enviados.");
                    $window.location.reload();
                    $state.go('tab.chats', {}, {reload: true});
                  })
          });
        }); 

      } else {
        Utils.message(Popup.successIcon, Popup.SelecioneConquista).then(function() {
         
        })

      }

  	};
        
    $scope.changedValue=function(item){
      // si nao encontra o item
    	if(buscarItemIgual(item) === false){
    	 var pontos = 0;
      	if(
      		item.titulo === "Vitória" || 
      		item.titulo === "Vitória sem tomar gol" ||
      		item.titulo === "Temporada" ||
      		item.titulo === "Temporada Invicto"
      	){
      		var pontos = item.pontos;
      	}
      	itemList.push([item.descricao, pontos]);
      	$scope.items = itemList;
        $scope.verPontos = true;
       
      	somarPontos();
      	}
    	
    }

    // remover elementos da lista
    $scope.removeLista = function(shop){
    	itemList.splice(itemList.indexOf(shop), 1);
       if(itemList.length === 0){
          console.log("nao há elementos");
          $scope.verPontos =false;
        }
      somarPontos();
    }

    //buscar se um elementos está na lista
    function buscarItemIgual(item) {
    	for (var i = 0; i < itemList.length; i++) {
        if (itemList[i][0] === item.descricao) {
          return true;
        }
      }
      return false;
    } 

    function somarPontos(){
    	var suma = 0;
    	for(var i = 0; i<itemList.length; i++){
    		suma += itemList[i][1];
    	}
    	$scope.suma = suma;
    }

    function calcularTempo (){
      var startTime = data;
      var startMsec = startTime.getMilliseconds();
      startTime.setTime(500000);
      var elapsed = (startTime.getTime() - startMsec) / 1000; 
      console.log(elapsed);
    }



    //____________________________________________________________________ IMAGES
    // File or Blob, assume the file is called rivers.jpg
    /*
    function enviarImagen(){
      var file;

      var options = {
      quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
      correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = document.getElementById('myImage');
        image.src = "data:image/jpeg;base64," + imageData;
        file = image;
      }, function(err) {
        // error
      });
      
      var metadata = {
  contentType: 'image/jpeg',
};

      var storage = firebase.storage();

      // Create a storage reference from our storage service
      var storageRef = storage.ref();

      // Upload the file to the path 'images/rivers.jpg'
      // We can use the 'name' property on the File API to get our file name
      var uploadTask = storageRef.child('images50/' + 'image').put(image, metadata);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed', function(snapshot){
        console.log("1");
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log(snapshot.metadata);
      }, function(error) {
        console.log("2 "+error);
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log("3 " + downloadURL);
      });
    }

    */





});