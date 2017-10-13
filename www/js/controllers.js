angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $http, $state, $rootScope, $timeout, AuthenticationService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var token;
  if (localStorage['token'] != ""){
    token = localStorage['token'];
    AuthenticationService.checkToken(token);
  } else {
  token = "xxxxxx";
  AuthenticationService.checkToken(token);
  }
  $rootScope.usrlvl;
  $rootScope.usrlvl = localStorage['usrlvl'];
  $rootScope.username = localStorage['username'];
  $rootScope.email = localStorage['email']; 
  $rootScope.nomember = localStorage['nomember'];
  $rootScope.group = localStorage['group'];
   //$rootScope.group = "01082017";

   $scope.logout = function(){
    var data = {
      token: token
    }
    //alert("tes");
    $http.post('http://bibleclub.ebizindonesia.com/api/logout.php', data).success(function(response){
      console.log(response)
      localStorage.clear();
      $rootScope.usrlvl = 0;
      $state.go("login");
    }).error(function(error){
      console.error(error);
    })
  }

})

.controller('LoginCtrl', function($state, $scope, $rootScope, $http){
  $scope.data={};
  $scope.loginUser = function () {
       
    var data = {
        username: $scope.data.username,
        password: $scope.data.password
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/login.php", data).success(function(res){
        console.log(res);
        var token = res.token;
        $rootScope.username = res.username;
        $rootScope.nama = res.nama;
        $rootScope.nohp = res.nohp;
        $rootScope.group = res.group;
        console.log($rootScope.username);
        console.log($rootScope.nama);
        console.log($rootScope.nohp);
        console.log(res.msg);
        
        localStorage.setItem("group",$rootScope.group);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("nama",$rootScope.nama);
        localStorage.setItem("username",$rootScope.username);
        localStorage.setItem("nohp",$rootScope.nohp);
        
        //$scope.insertdb();
        if(res.msg == "login success")
        {
        $rootScope.usrlvl = 1;  
        localStorage.setItem("usrlvl", $rootScope.usrlvl);
        $state.go("app.home");
        }
        else
        {
          alert(res.msg);
        }
    }).error(function(error){
        alert(error);
    });
        
  }
})

.controller('HomeCtrl', function($state, $scope, $rootScope, $http){
 
  $scope.gotochat = function(){
     $state.go('app.chat',{group:$rootScope.group})
  }
})

.controller('NotifCtrl', function($scope,$rootScope,$http){
  $scope.notif={};
  var data = {
    idbiodata: $rootScope.idpeople
  }
  $http.post("http://bibleclub.ebizindonesia.com/api/getnotif.php", data).success(function(res){
        console.log(res);
        $scope.notif = res;

      }).error(function(error){
          alert(error);
      });
})

.controller('ChatCtrl',function($stateParams, $scope, Chats, $rootScope, $state, moment, $sanitize,$ionicScrollDelegate,$timeout) {
    
    $scope.IM = {
        textMessage: ""
    };

    $scope.isNotCurrentUser = function(user){
    var current_user = $rootScope.username;
    if(current_user != user){
        return 'not-current-user';
    }
    return 'current-user';
    };

    Chats.selectRoom($rootScope.group);

    var roomName = $rootScope.group;


    // Fetching Chat Records only if a Room is Selected
    $scope.sendMessage = function(msg) {
      var msg = $scope.IM.textMessage;
    console.log(msg);
        if ($rootScope.username === "noname") {
          $state.go('login');
        } else {
            Chats.send($rootScope.username, msg);
            $scope.IM.textMessage = "";
        }

    }

    console.log($rootScope.chatsGetRoom);

    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('DateBibleCtrl', function($scope, $rootScope, $http, $state, $stateParams){
  $rootScope.today = new Date();   
  $rootScope.tomorrow = new Date();
  $rootScope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $rootScope.yesterday = new Date();
  $rootScope.yesterday.setDate($scope.yesterday.getDate() - 1);

  $scope.yesterdaylink = function(){
    $state.go("app.bibleyesterday");
  }
  $scope.todaylink = function(){
    $state.go("app.bibletoday");
  }
  $scope.tomorrowlink = function(){
    $state.go("app.bibletomorrow");
  }

})

.controller('BibleYesterdayCtrl', function($scope, $rootScope, $filter, $http, $state, $stateParams){
 
  var date = $filter('date')($rootScope.yesterday, "yyyy-MM-dd");
  console.log(date);
  var yesterday = 'Yesterday';
    var data = {
        date: yesterday,
        group: $rootScope.group
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/bible.php", data).success(function(res){
      console.log(res);
      $scope.biblecontent = res;
      $scope.bibleverse = res.ayat;
      console.log(res.day);
      $scope.day = res.day;
    })
   $scope.submit = function(){
    var data = {
      date: date,
      username: $rootScope.username,
      idgroup: $rootScope.group,
      day: $scope.day
    }

    $http.post("http://bibleclub.ebizindonesia.com/api/rekap.php", data).success(function(res){
      console.log(res);
      if(res == "\"success\""){
        alert("Rekap telah berhasil diupdate");
      }
      else{
        alert("Gagal Rekap");
      }
    })
  
    }

})

.controller('BibleTodayCtrl', function($scope, $rootScope, $filter, $http, $state, $stateParams){
  var date = $filter('date')($rootScope.today, "yyyy-MM-dd");
  console.log(date);
  var today = "Today";
    var data = {
        date: today,
        group: $rootScope.group
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/bible.php", data).success(function(res){
      console.log(res);
      $scope.biblecontent = res;
      $scope.bibleverse = res.ayat;
      $scope.day = res.day;
    
    })
   $scope.submit = function(){
    var data = {
      date: date,
      username: $rootScope.username,
      idgroup: $rootScope.group,
      day: $scope.day
    }

    $http.post("http://bibleclub.ebizindonesia.com/api/rekap.php", data).success(function(res){
      console.log(res);
      if(res == "\"success\""){
        alert("Rekap telah berhasil diupdate");
      }
      else{
        alert("Gagal Rekap");
      }
    })
  
    }

})

.controller('BibleTomorrowCtrl', function($scope, $rootScope, $filter, $http, $state, $stateParams){
  var date = $filter('date')($rootScope.tomorrow, "yyyy-MM-dd");
  console.log(date);
  var tomorrow = "Tomorrow";
    var data = {
        date: tomorrow,
        group: $rootScope.group
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/bible.php", data).success(function(res){
      console.log(res);
      $scope.biblecontent = res;
      $scope.bibleverse = res.ayat;
      $scope.day = res.day;
    })

    $scope.submit = function(){
    var data = {
      date: date,
      username: $rootScope.username,
      idgroup: $rootScope.group,
      day: $scope.day
    }

    $http.post("http://bibleclub.ebizindonesia.com/api/rekap.php", data).success(function(res){
      console.log(res);
      if(res == "\"success\""){
        alert("Rekap telah berhasil diupdate");
      }
      else{
        alert("Gagal Rekap");
      }
    })
  
    }
})


.controller('DateRekapCtrl', function($scope, $rootScope, $http, $state, $stateParams){
  $rootScope.today = new Date();   
  $rootScope.tomorrow = new Date();
  $rootScope.tomorrow.setDate($scope.tomorrow.getDate() + 1);
  $rootScope.yesterday = new Date();
  $rootScope.yesterday.setDate($scope.yesterday.getDate() - 1);

  $scope.yesterdaylink = function(){
    $state.go("app.rekapyesterday");
  }
  $scope.todaylink = function(){
    $state.go("app.rekaptoday");
  }
  $scope.tomorrowlink = function(){
    $state.go("app.rekaptomorrow");
  }
})

.controller('RekapTodayCtrl', function( $scope, $rootScope, $filter, $http, $state, $stateParams){
  var date = $filter('date')($rootScope.today, "yyyy-MM-dd");
  console.log(date);
    var data = {
        date: date,
        username: $rootScope.username
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/getrekap.php", data).success(function(res){
      console.log(res);
      $scope.rekap = res;
      
    })
})
.controller('RekapYesterdayCtrl', function( $scope, $rootScope, $filter, $http, $state, $stateParams){
  var date = $filter('date')($rootScope.yesterday, "yyyy-MM-dd");
  console.log(date);

    var data = {
        date: date,
        username: $rootScope.username
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/getrekap.php", data).success(function(res){
      console.log(res);
      $scope.rekap = res;
      
    })
})

.controller('RekapTomorrowCtrl', function( $scope, $rootScope, $filter, $http, $state, $stateParams){
  var date = $filter('date')($rootScope.tomorrow, "yyyy-MM-dd");
  console.log(date);
    var data = {
        date: date,
        username: $rootScope.username
    }
    
    $http.post("http://bibleclub.ebizindonesia.com/api/getrekap.php", data).success(function(res){
      console.log(res);
      $scope.rekap = res;
      
    })
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
