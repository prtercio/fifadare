angular.module('App.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 1,
    name: 'Jogo 1',
    lastText: 'jogo1',
    face: 'img/ben.png'
  }, {
    id: 2,
    name: 'Jogo 2',
    lastText: 'jogo2',
    face: 'img/max.png'
  }, {
    id: 3,
    name: 'Jogo 3',
    lastText: 'jogo3',
    face: 'img/adam.jpg'
  },{
   id: 4,
    name: 'Jogo 4',
    lastText: 'jogo4',
    face: 'img/adam.jpg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };


});
