angular.module('kaifanla', ['ng', 'ngTouch']).
controller('parentCtrl', function ($scope,$rootScope) {
    $scope.jump=function(url,trans){
        if(!trans){
            trans='slide';
        }
        $.mobile.changePage(url,{transition:'silde'});
    }
    $scope.jumpWithData=function(url,key,value){
        $rootScope[key]=value;
        $.mobile.changePage(url,{transition:'silde'})
    }
    $(document).on('pagecreate',function(event){
        var page=event.target;
        var scope=$(page).scope();
        $(page).injector().invoke(function($compile){
            $compile(page)(scope);
            scope.$digest();
        });
    })
}).
controller('startCtrl', function ($scope) {

}).
controller('mainCtrl', function ($scope,$http) {
    $scope.isMore=true;
    $scope.dishList=[];
    $http.get('data/dish_listbypage.php').success(function(data){
        $scope.dishList=data;
    });
    $scope.addMore=function(){
        $http.get('data/dish_listbypage.php?start='+$scope.dishList.length).success(function(data){
            if(data.length<5){
                $scope.isMore=false;
            }
            $scope.dishList=$scope.dishList.concat(data);
        });
    }
}).
controller('detailCtrl', function ($scope,$http,$rootScope) {
    var did=$rootScope['did'];
    $http.get('data/dish_listbydid.php?did='+did).success(function(data){
        $scope.dish=data[0];
    });
}).
controller('orderCtrl', function ($scope) {
}).
controller('myorderCtrl', function ($scope) {
})