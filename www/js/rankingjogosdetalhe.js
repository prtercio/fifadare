'Use Strict';
var dashdetalle = angular.module('App.RankingJogosDetalhe', []);

dashdetalle.controller('RankingJogosDetalheCtrl', function($scope, $state, $localStorage, Popup, Chats, $stateParams, Utils, $window, idJogoDetalhe, $ionicNavBarDelegate) {

  $ionicNavBarDelegate.showBackButton(true);

  var id = idJogoDetalhe.substring(0, idJogoDetalhe.indexOf("|"));
  var keyUsuario = idJogoDetalhe.substring(idJogoDetalhe.indexOf("|") + 1);
  //console.log(id, keyUsuario);
  var idJogo = id;

  var itemList=[];
  $scope.suma = 0; 
  var jogosDisputados = 0;
  var pontosSomados = 0;
  var data;
  var key = keyUsuario;
  $scope.verPontos = false;
  $scope.chat = "jogo"+idJogo; 
  $scope.jogoNome = "Jogo "+idJogo;
  //console.log("jogo: "+idJogo);
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

    var refImagens = firebase.database().ref('fifadare/users/'+key+'/jogos/'+$scope.chat+'/capturas/');
    refImagens.once("value").then(function(snapshot) {
       $scope.$apply(function(){
         $scope.imagenes = snapshot.val();         
         //console.log("imag "+snapshot.key)
       });
    });   
    	

  	var ref = firebase.database().ref("fifadare/regra");
  	ref.once("value").then(function(snapshot) {
       $scope.$apply(function(){
    	   $scope.regra = snapshot.val(); 
    	   $scope.blisterPackTemplates=snapshot.val();
       });
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
         // console.log(itemList[i][0]+":"+itemList[i][1]);
          conquistas.push(itemList[i][0]+":"+itemList[i][1]);
        }
        
        firebase.database().ref().child('fifadare/users/'+key+'/jogos/'+$scope.chat).update({
          estado:"Terminado",
          jogo: idJogo,
          pontos: $scope.suma,
          conquistas:conquistas
        }).then(function(response) {

           firebase.database().ref().child('fifadare/users/'+key).update({
             pontos: pontosSomados + $scope.suma,
             jogosQuantidade: jogosDisputados + 1
            }).then(function(response) {
                var sumaNum = parseInt(idJogo) +1;
                var proximoJogo = "jogo"+sumaNum;

                if(idJogo < 5){
                   //console.log("menor que 6");
                  firebase.database().ref().child('fifadare/users/'+key+'/jogos/'+proximoJogo).update({
                    bloqueado:false
                  }).then(function(response) {
                    data = new Date();
                    calcularTempo();
                    Utils.message(Popup.successIcon, Popup.PontosSuccess).then(function() {                      
                      $state.go('tab.chats');
                      $window.location.reload();
                      
                    })
                  });

                }  else { 

                  data = new Date();
                  calcularTempo();
                  Utils.message(Popup.successIcon, Popup.concluir50Jogos).then(function() {                   
                    $state.go('tab.chats');
                    $window.location.reload();
                  });

                }// if
          });
        }); 

      } else {
        Utils.message(Popup.successIcon, Popup.SelecioneConquista).then(function() {
         
        })

      }

  	};
        
    $scope.changedValue=function(item){
      //console.log(itemList);
      var encontrouEmpate = buscarConflictos("Empate");
      var encontrouDerrota = buscarConflictos("Derrota");
      var encontrouVitoria = buscarConflictos("Vitória");
      var encontrouVitoriaGol = buscarConflictos("Vitória sem tomar gol");
      var encontrouPlacar3a0 = buscarConflictos("Placar 3 a 0");
      var encontrouPlacar4a0 = buscarConflictos("Placar 4 a 0");
      var encontrouPlacar5a0 = buscarConflictos("Placar 5 a 0");
      var encontrouPlacar6a0 = buscarConflictos("Placar 6 a 0 ou mais");
      var vitoriaOponenteTorneio = buscarConflictos("Vitória Oponente Torneio");
      var encontrouPosse70 = buscarConflictos("Posse de Bola 70%");
      var encontrouPosse80 = buscarConflictos("Posse de Bola 80%");
      var encontrouPosse90 = buscarConflictos("Posse de Bola 90%");
      var encontrouSequencia3 = buscarConflictos("Sequencia 3 Vitórias");
      var encontrouSequencia4 = buscarConflictos("Sequencia 4 Vitórias");
      var encontrouSequencia5 = buscarConflictos("Sequencia 5 Vitórias");

            // si nao encontra o item
    	if(buscarItemIgual(item) === false){

        var pontos = 0;
        function agregarDatos(){
              pontos = item.pontos;
              itemList.push([item.descricao, pontos, item.titulo]);
              $scope.items = itemList;
              $scope.verPontos = true;
              somarPontos();
        }

        function mensagemConflito(){
          Utils.message(Popup.errorIcon, Popup.conflictoConquista).then(function() { 
            });
        }

        // si tenho empate ou derrota nao posso add
        if(item.titulo === "Vitória" || item.titulo === "Vitória sem tomar gol"){
          
          if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouDerrota){
             mensagemConflito();
          } else {
            agregarDatos(); 
          }
        }

        if(item.titulo === "Temporada" || item.titulo === "Temporada Invicto"){
          if(encontrouDerrota){
            mensagemConflito();
          } else {
            agregarDatos();
          }
        }

        if(item.titulo === "Derrota"){
          if(encontrouVitoria){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouPlacar3a0){
            mensagemConflito();
          } else if(encontrouPlacar4a0){
            mensagemConflito();
          } else if(encontrouPlacar5a0){
            mensagemConflito();
          } else if(encontrouPlacar6a0){
            mensagemConflito();
          } else if(vitoriaOponenteTorneio){
           mensagemConflito();
          } else{
            agregarDatos();                   
          }              
            
        }

        if(item.titulo === "Empate"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouVitoria){
            mensagemConflito();
          } else if(encontrouVitoriaGol){                
            mensagemConflito();    
          } else if(vitoriaOponenteTorneio){
            mensagemConflito();
          } else {
            agregarDatos();
          }          
        } 

      //__________________________________________________________________________// Placar 3 a 0
     
        if(item.titulo === "Placar 3 a 0"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouPlacar4a0){
            mensagemConflito();
          } else if(encontrouPlacar5a0){
            mensagemConflito();
          } else if(encontrouPlacar6a0){
            mensagemConflito();
          } else {
            agregarDatos();
          }
        } 
               
      //__________________________________________________________________________// Placar 4 a 0
        if(item.titulo === "Placar 4 a 0"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouPlacar3a0){
            mensagemConflito();
          } else if(encontrouPlacar5a0){
            mensagemConflito();
          } else if(encontrouPlacar6a0){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }

        //__________________________________________________________________________// Placar 5 a 0
        if(item.titulo === "Placar 5 a 0"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouPlacar3a0){
            mensagemConflito();
          } else if(encontrouPlacar4a0){
            mensagemConflito();
          } else if(encontrouPlacar6a0){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }

        //__________________________________________________________________________// Placar 6 a 0
        if(item.titulo === "Placar 6 a 0 ou mais"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouPlacar3a0){
            mensagemConflito();
          } else if(encontrouPlacar4a0){
            mensagemConflito();
          } else if(encontrouPlacar5a0){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }                        

         //__________________________________________________________________________// Vitória oponentes
        if(item.titulo === "Vitória Oponente Torneio"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();          
          } else {            
            agregarDatos();
          }
        }

        //__________________________________________________________________________// Fair Play
        if(item.titulo === "Fair Play"){
          if(encontrouDerrota){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }

        //__________________________________________________________________________// Posse 70%
        if(item.titulo === "Posse de Bola 70%"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouPosse80){
            mensagemConflito();
          } else if(encontrouPosse90){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }  

        //__________________________________________________________________________// Posse 80%
        if(item.titulo === "Posse de Bola 80%"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouPosse70){
            mensagemConflito();
          } else if(encontrouPosse90){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }

        //__________________________________________________________________________// Posse 90%
        if(item.titulo === "Posse de Bola 90%"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouPosse70){
            mensagemConflito();
          } else if(encontrouPosse80){
            mensagemConflito();
          } else {            
            agregarDatos();
          }
        }

        //__________________________________________________________________________// 3 Vitórias
        if(item.titulo === "Sequencia 3 Vitórias"){
          if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouSequencia4){
            mensagemConflito();
          } else if(encontrouSequencia5){
            mensagemConflito();
          }else {            
            agregarDatos();
          }
        }                                           
       
       //__________________________________________________________________________// 4 Vitórias
        if(item.titulo === "Sequencia 4 Vitórias"){
           if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouSequencia3){
            mensagemConflito();
          } else if(encontrouSequencia5){
            mensagemConflito();
          }else {            
            agregarDatos();
          }
        }        
        
        //__________________________________________________________________________// 5 Vitórias
        if(item.titulo === "Sequencia 5 Vitórias"){
           if(encontrouDerrota){
            mensagemConflito();
          } else if(encontrouEmpate){
            mensagemConflito();
          } else if(encontrouSequencia3){
            mensagemConflito();
          } else if(encontrouSequencia4){
            mensagemConflito();
          }else {            
            agregarDatos();
          }
        }        
              	
      } //if
    	
    }

    // remover elementos da lista
    $scope.removeLista = function(shop){
    	itemList.splice(itemList.indexOf(shop), 1);
       if(itemList.length === 0){
          //console.log("nao há elementos");
          $scope.verPontos =false;
        }
        somarPontos();
    }

    //buscar se um elementos está na lista
    function buscarItemIgual(item) {
    	for (var i = 0; i < itemList.length; i++) {
        if (itemList[i][0] === item.descricao) {
          //console.log("hay um igual");          
          return true;
        }
      }
      //console.log("nao há um igual");
      return false;
    }

    function buscarConflictos(selecao){

      if(itemList.length > 0){
        //console.log(selecao+" total list "+itemList);
        for (var i = 0; i < itemList.length; i++) {
          //console.log("Lista "+itemList[i][2]);
          if(String(itemList[i][2]) === String(selecao)){                        
              return true;
              break;
          }
        }
      } else {
        return false;
      }  

    }

    function buscarConflictosP(selecao){
      //console.log("------"+itemList.length+"-------")
      for (var i = 0; i < itemList.length; i++) {
          if(String(itemList[i][2]) === String(selecao)){
            //console.log("es igual" + true);
            return true;
            break;
          }                        
      }
      /*
       if(itemList.length > 0){
        console.log(selecao+" total list "+itemList);
        for (var i = 0; i < itemList.length; i++) {
          console.log("Lista "+itemList[i][2] + "  - "+ itemList.indexOf(selecao));
          //if(itemList[i][2] === selecao){                        
          if(itemList.indexOf(selecao) > 0){
              return true;
              break;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }  
    */
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
      //console.log(elapsed);
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