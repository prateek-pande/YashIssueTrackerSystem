var issueModule = angular.module('issueTrackerApp',['ngRoute']);
	issueModule.config(function($routeProvider){
		$routeProvider
			.when('/createIssue',{
				templateUrl:'createIssueView',
				controller:'issueController as ic'
			})
	});
	
	issueModule.controller('issueController',['$scope','$http','issueService',function($scope,$http,issueService){
	
		/*issueService returns list to populate drop-down*/
		issueService.initializeSelect()
        .then(
                 function(d) {
                	 
                	 /*retrieve and assign value from list*/
                	 angular.forEach(d,function(value,key){
            			 switch(key){
            			 	case 0:
            					 $scope.priorities=value;
            					 break;
            			 	case 1:
            			 		$scope.assignedStatusList=value;
            			 		break;
            			 	case 2:
            			 		$scope.issueStatusList=value;
            			 		break;
            			 	case 3:
            			 		$scope.issueTypeList=value;
            			 		break;
            			 	case 4:
            			 		$scope.projects=value;
            			 		break;
            			 }
            		 });
                	 
                 },
                  function(errResponse){
                      console.error('Error while fetching');
                  }
             );
		
		this.createIssue={};
		this.add=function(){
			// call service to persist in db
			issueService.submitCreateIssue(this.createIssue);
	        /*.then(
	                 function(d) {
	                	 
	                 },
	                  function(errResponse){
	                      console.error('Error while fetching');
	                  }
	             );*/
			this.createIssue={};
		};
	}]);