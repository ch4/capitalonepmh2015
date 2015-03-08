angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Dashboard) {
        $scope.gauge_shopping = 0;
        $scope.gauge_groceries = 0;
    $scope.refreshDash = function(){
        Dashboard.get_transactions(function(data){
            console.log(data);
            $scope.gauge_shopping = data['Shopping'];
            $scope.gauge_groceries = data['Groceries'];
        });
    };
    $scope.refreshDash();
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
