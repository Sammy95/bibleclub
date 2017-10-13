angular.module('starter')

.service('AuthenticationService', ["$http", "$rootScope", "$state", function($http, $rootScope, $state){
  var self = this;
  self.checkToken = function(token){
    var data = {token: token};
    console.log(data);
    $http.post("http://bibleclub.ebizindonesia.com/api/checktoken.php", data).success(function(response){
      if (response === "unauthorized"){
        console.log("Logged out");
        $rootScope.usrlvl = 0;
        $state.go("app.login");
      } else {
        console.log("Logged In");
        $rootScope.usrlvl = 1;
        return response;
        //$state.go("login")
      }
    }).error(function(error){
      $rootScope.usrlvl = 0;
      $state.go("app.home");
    })
    
  }

}])

.factory('Chats', ['$rootScope', '$ionicPopup', function($rootScope, $ionicPopup) {

    var selectedRoomId;

    var ref = mainApp;
    var chats;
    $rootScope.chatsGetRoom = [];
    var group = "01082017";
    var chats = rootRef.child('chatsgroup').child(group);

    // use for multiple apply
    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            if (displayNames == chat.from) {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Delete Message',
                    template: 'Are you sure you want to delete this message?'
                });

                confirmPopup.then(function(res) {
                    if (res) {
                        chats.child(chat.genKey).remove(function(success) {});
                    } else {}
                });
            } else if (displayNames == 'noname') {
                alert('Please login first!!!');
            } else {
                alert('This is not the your message');
            }

        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        
        selectRoom: function(roomId) {
            selectedRoomId = roomId;
            if (!isNaN(roomId)) {
                var chats = rootRef.child('chatsgroup').child(group);
                rootRef.child('chatsgroup').child(group).on('value', function(data) {
                    if (data.val() === null) {
                        $rootScope.safeApply(function() {
                            $rootScope.chatsGetRoom = [];
                        });
                    } else {
                        $rootScope.chatsGetRoom = [];
                        data.forEach(function(dataChild) {
                            $rootScope.safeApply(function() {
                                $rootScope.chatsGetRoom.push({
                                    genKey: dataChild.val().genKey,
                                    from: dataChild.val().from,
                                    message: dataChild.val().message,
                                    createdAt: dataChild.val().createdAt
                                })
                            })
                        });
                    }
                });
            }
        },
        send: function(from, message) {
            if (from && message) {
              var group = "01082017";
              var chats = rootRef.child('chatsgroup').child(group);
                var genKey = chats.push().key;
                rootRef.child('chatsgroup').child(group).child(genKey).set({
                    genKey: genKey,
                    from: from,
                    message: message,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                });
            }
        }
    }
}])
 


.directive('ionItemAccordion', function($log) {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    require: '^ionList',
    scope: {
      title: '@',
      iconClose: '@',
      iconOpen: '@',
      iconAlign: '@'
    },
    template: '<div><ion-item ng-class="classItem()" ng-click="toggleGroup(id)" ng-class="{active: isGroupShown(id)}">' +
      '<i class="icon" ng-class="classGroup(id)"></i>' +
      '&nbsp;' +
      '{{title}}' +
      '</ion-item>' +
      '<ion-item class="item-accordion" ng-show="isGroupShown(id)"><ng-transclude></ng-transclude></ion-item></div>',
    link: function(scope, element, attrs, ionList) {

      // link to parent
      if (!angular.isDefined(ionList.activeAccordion)) ionList.activeAccordion = false;
      if (angular.isDefined(ionList.counterAccordion)) {
        ionList.counterAccordion++;
      } else {
        ionList.counterAccordion = 1;
      }
      scope.id = ionList.counterAccordion;

      // set defaults
      if (!angular.isDefined(scope.id)) $log.error('ID missing for ion-time-accordion');
      if (!angular.isString(scope.title)) $log.warn('Title missing for ion-time-accordion');
      if (!angular.isString(scope.iconClose)) scope.iconClose = 'ion-minus';
      if (!angular.isString(scope.iconOpen)) scope.iconOpen = 'ion-plus';
      if (!angular.isString(scope.iconAlign)) scope.iconAlign = 'left';

      scope.isGroupShown = function() {
        return (ionList.activeAccordion == scope.id);
      };

      scope.toggleGroup = function() {
        $log.debug('toggleGroup');
        if (ionList.activeAccordion == scope.id) {
          ionList.activeAccordion = false;
        } else {
          ionList.activeAccordion = scope.id;
        }
      };

      scope.classGroup = function() {
        return (ionList.activeAccordion == scope.id) ? scope.iconOpen : scope.iconClose;
      };

      scope.classItem = function() {
        return 'item-stable ' + (scope.iconAlign == 'left' ? 'item-icon-left' : 'item-icon-right');
      };
    }

  };
})

.factory('socket',function(socketFactory){
        //Create socket and connect to http://chat.socket.io 
        var myIoSocket = io.connect('http://bibleclub.ebizindonesia/chatserver');

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
})

.factory('ContactService',['$http',function($http){
    var contactinfo = []; //Private Variable
    return {
        GetContactInfo: function(contactId){
            for(i=0;i<people.length;i++){
                if(people[i].id == personId){
                    return people[i];
                }
            }
        }
    }
}])

.directive('ngEnter', function() {
            return function(scope, element, attrs) {
                element.bind("keydown keypress", function(event) {
                    if(event.which === 13) {
                            scope.$apply(function(){
                                    scope.$eval(attrs.ngEnter);
                            })
                            event.preventDefault();
                    }
                });
            };
    });

