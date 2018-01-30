angular.module("app", ['chart.js','ngRoute'])
  // Optional configuration
  .config(['ChartJsProvider', '$routeProvider', '$httpProvider', function (ChartJsProvider, $routeProvider, $httpProvider) {
    
    $routeProvider
        // default route
        .when('/', {
            templateUrl : 'views/dashboard.html'
        })
        
        .when('/statistics', {
            templateUrl : 'views/statistics.html'
        });
                  
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF5252'],
      responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: true
    });
  }]).controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
      
        $scope.username = "";
        $scope.welcomeVisible = true;
        $scope.statVisible = false;
        $scope.users = [];
        $http({
            url: '/api/getallusernames',
            method: 'GET'
        })
        .success(function(data) {
            console.log(data);
            for(var i = 0; i< data.length; i++)
            {
                $scope.users.push({username: data[i].username});
            }
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
    
    $scope.$watch('username', function(newVal, oldVal){
        if(newVal!=oldVal){
            
            $scope.welcomeVisible = false;
        $scope.statVisible = true;
            $scope.$broadcast('usernamechange',{"val":newVal});
        }
    });
}]).controller("heartRateCtrl", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  $scope.labels = [];
  $scope.series = [];
  $scope.data = [
    []
  ];
  
  $scope.hstDate = "";
    $scope.hendDate = "";
    $('#hstartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#hendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
  
  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
        var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/gethratebypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            var labels = [];
            var dat = [];
            $scope.labels = [];
            $scope.data = [[]];
            for(var i = 0; i< data.length; i++)
            {
                labels.push(new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString());
                dat.push(data[i].user_heart_rate);
            }
            $scope.labels = labels;
            $scope.data = dat;
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
    
    };
    if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    $scope.searchHeartrate = function(){
        if($scope.hstDate <= $scope.hendDate)
        {
            $http({
            url: '/api/gethratebyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.hstDate).toISOString(), enddate: new Date($scope.hendDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                var labels = [];
                var dat = [];
                $scope.labels = [];
                $scope.data = [[]];
                $scope.hstDate = "";
                $scope.hendDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    labels.push(new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString());
                    dat.push(data[i].user_heart_rate);
                }
                $scope.labels = labels;
                $scope.data = dat;
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
    
}]).controller("userGoalsCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {

    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
 $scope.goalResp = [];
 $scope.goalstDate = "";
    $scope.goalendDate = "";
    $('#goalstartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#goalendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.goalResp, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedRecords = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, pageSize) {
        var ret = []; 
        var end = 0;
        var start = 0;
        if(size == 0)
        {
            end = -1;
        }
        else if(size > pageSize)
        {
            if (size % pageSize == 0) {
                end = Math.floor(size/pageSize);
            }
            else
            {
                end = Math.floor(size/pageSize) + 1
            }
        }
        else
        {
            end = 1;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
        return ret;
    };



    // functions have been describe process the data for display

    //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
        var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getgoalsbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            $scope.goalResp = []
          
            for(var i = 0; i< data.length; i++)
            {
                $scope.goalResp.push({
                    readiness_level: data[i].user_readiness_level, 
                    walk_target: data[i].user_walk_target,
                    current_energy: data[i].user_current_energy,
                    activity: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                    serial_no : i+1});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    $scope.searchUsergoals = function(){
        if($scope.goalstDate <= $scope.goalendDate)
        {
            $http({
            url: '/api/getusergoalsbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.goalstDate).toISOString(), enddate: new Date($scope.goalendDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.goalResp = [];
                $scope.goalstDate = "";
                $scope.goalendDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.goalResp.push({
                        readiness_level: data[i].user_readiness_level, 
                        walk_target: data[i].user_walk_target,
                        current_energy: data[i].user_current_energy,
                        activity: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                        serial_no : i+1});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
    
}]).controller("userActivitiesCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
     //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    
    $scope.activityResp = [];
    $scope.activitystDate = "";
    $scope.activityendDate = "";
    $('#actstartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#actendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.activityResp, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedRecords = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, pageSize) {
        var ret = []; 
        var end = 0;
        var start = 0;
        if(size == 0)
        {
            end = -1;
        }
        else if(size > pageSize)
        {
            if (size % pageSize == 0) {
                end = Math.floor(size/pageSize);
            }
            else
            {
                end = Math.floor(size/pageSize) + 1
            }
        }
        else
        {
            end = 1;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
        return ret;
    };



    // functions have been describe process the data for display

    //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };
    
  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
        var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getactivitesbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            $scope.activityResp = [];
            for(var i = 0; i< data.length; i++)
            {
            	 $scope.activityResp.push({
            		 user_sitting_duration: data[i].user_sitting_duration, 
            		 user_walking_duration: data[i].user_walking_duration,
            		 user_step_count: data[i].user_step_count,
            		 activity: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
            		 serial_no : i+1,
            		 distance_covered_in_miles : data[i].distance_covered_in_miles });
            		
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    $scope.searchActivity = function(){
        if($scope.activitystDate <= $scope.activityendDate)
        {
            $http({
            url: '/api/getuseractivitybyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.activitystDate).toISOString(), enddate: new Date($scope.activityendDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.activityResp = [];
                $scope.activitystDate = "";
                $scope.activityendDate = "";
                for(var i = 0; i< data.length; i++)
                {
                     $scope.activityResp.push({
                             user_sitting_duration: data[i].user_sitting_duration, 
                             user_walking_duration: data[i].user_walking_duration,
                             user_step_count: data[i].user_step_count,
                             activity: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                             serial_no : i+1,
                             distance_covered_in_miles : data[i].distance_covered_in_miles });

                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
    
}]).controller("EMAResCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
     //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    $scope.emaResp = [];
    $scope.emastDate = "";
    $scope.emaendDate = "";
    $('#emastartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#emaendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.emaResp, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedRecords = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, pageSize) {
        var ret = []; 
        var end = 0;
        var start = 0;
        if(size == 0)
        {
            end = -1;
        }
        else if(size > pageSize)
        {
            if (size % pageSize == 0) {
                end = Math.floor(size/pageSize);
            }
            else
            {
                end = Math.floor(size/pageSize) + 1
            }
        }
        else
        {
            end = 1;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
        return ret;
    };



    // functions have been describe process the data for display

    //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
        var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getEMAresbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            $scope.emaResp = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.emaResp.push({serial_no: i+1, user_selected_activity: data[i].user_selected_activity,
                    user_company: data[i].user_company, user_curr_location: data[i].user_curr_location,
                    user_food_habit: data[i].user_food_habit, user_feelings: data[i].user_feelings,
                    activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    $scope.searchEmaResp = function(){
        if($scope.emastDate <= $scope.emaendDate)
        {
            $http({
            url: '/api/getemarespbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.emastDate).toISOString(), enddate: new Date($scope.emaendDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.emaResp = [];
                $scope.emastDate = "";
                $scope.emaendDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.emaResp.push({serial_no: i+1, user_selected_activity: data[i].user_selected_activity,
                        user_company: data[i].user_company, user_curr_location: data[i].user_curr_location,
                        user_food_habit: data[i].user_food_habit, user_feelings: data[i].user_feelings,
                        activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
}]).controller("watchedVideoCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    $scope.videos = [];
    $scope.stDate = "";
    $scope.endDate = "";
    $('#startDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#endDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        // init the filtered items
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')($scope.videos, function (item) {
                for(var attr in item) {
                    if (searchMatch(item[attr], $scope.query))
                        return true;
                }
                return false;
            });
            // take care of the sorting order
            if ($scope.sort.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
            }
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };


        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedRecords = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                } else {
                    $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (size, pageSize) {
            var ret = []; 
            var end = 0;
            var start = 0;
            if(size == 0)
            {
                end = -1;
            }
            else if(size > pageSize)
            {
                if (size % pageSize == 0) {
                    end = Math.floor(size/pageSize);
                }
                else
                {
                    end = Math.floor(size/pageSize) + 1
                }
            }
            else
            {
                end = 1;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }        
            return ret;
        };

        
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
    var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getWatchedVideosbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            $scope.videos = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.videos.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                            video_title: data[i].video_title});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
  $scope.searchWatchedVideos = function(){
        if($scope.stDate <= $scope.endDate)
        {
            $http({
            url: '/api/getWatchedVideosbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.stDate).toISOString(), enddate: new Date($scope.endDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.videos = [];
                $scope.stDate = "";
                $scope.endDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.videos.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                                video_title: data[i].video_title});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
}]).controller("bluetoothConCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    $scope.records = [];
    $scope.stDate = "";
    $scope.endDate = "";
    $('#bluestartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#blueendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });

        //pagination logic
        var searchMatch = function (haystack, needle) {
            if (!needle) {
                return true;
            }
            return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
        };

        // init the filtered items
        $scope.search = function () {
            $scope.filteredItems = $filter('filter')($scope.records, function (item) {
                for(var attr in item) {
                    if (searchMatch(item[attr], $scope.query))
                        return true;
                }
                return false;
            });
            // take care of the sorting order
            if ($scope.sort.sortingOrder !== '') {
                $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
            }
            $scope.currentPage = 0;
            // now group by pages
            $scope.groupToPages();
        };


        // calculate page in place
        $scope.groupToPages = function () {
            $scope.pagedRecords = [];

            for (var i = 0; i < $scope.filteredItems.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
                } else {
                    $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
                }
            }
        };

        $scope.range = function (size, pageSize) {
            var ret = []; 
            var end = 0;
            var start = 0;
            if(size == 0)
            {
                end = -1;
            }
            else if(size > pageSize)
            {
                if (size % pageSize == 0) {
                    end = Math.floor(size/pageSize);
                }
                else
                {
                    end = Math.floor(size/pageSize) + 1
                }
            }
            else
            {
                end = 1;
            }
            for (var i = start; i < end; i++) {
                ret.push(i);
            }        
            return ret;
        };

        

        // functions have been describe process the data for display

        //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
    var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getBluetoothDiscbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            $scope.records = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.records.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
    
  $scope.searchBluetoothConFailed = function(){
        if($scope.stDate <= $scope.endDate)
        {
            $http({
            url: '/api/getBluetoothDiscbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.stDate).toISOString(), enddate: new Date($scope.endDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.records = [];
                $scope.stDate = "";
                $scope.endDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.records.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
}]).controller("remainingBatteryCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    $scope.records = [];
    $scope.stDate = "";
    $scope.endDate = "";
    $('#remainingstartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#remainingendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.records, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedRecords = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, pageSize) {
        var ret = []; 
        var end = 0;
        var start = 0;
        if(size == 0)
        {
            end = -1;
        }
        else if(size > pageSize)
        {
            if (size % pageSize == 0) {
                end = Math.floor(size/pageSize);
            }
            else
            {
                end = Math.floor(size/pageSize) + 1
            }
        }
        else
        {
            end = 1;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
        return ret;
    };



    // functions have been describe process the data for display

    //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
    var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getRemainingBatterybypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            $scope.records = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.records.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                                        remaining_battery: data[i].remaining_battery});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
    
  $scope.searchRemainingBattery = function(){
        if($scope.stDate <= $scope.endDate)
        {
            $http({
            url: '/api/getRemainingBatterybyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.stDate).toISOString(), enddate: new Date($scope.endDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.records = [];
                $scope.stDate = "";
                $scope.endDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.records.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString(),
                                        remaining_battery: data[i].remaining_battery});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
}]).controller("wifiDiscCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    $scope.records = [];
    $scope.stDate = "";
    $scope.endDate = "";
    $('#wifistartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#wifiendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.records, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedRecords = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, pageSize) {
        var ret = []; 
        var end = 0;
        var start = 0;
        if(size == 0)
        {
            end = -1;
        }
        else if(size > pageSize)
        {
            if (size % pageSize == 0) {
                end = Math.floor(size/pageSize);
            }
            else
            {
                end = Math.floor(size/pageSize) + 1
            }
        }
        else
        {
            end = 1;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
        return ret;
    };



    // functions have been describe process the data for display

    //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
    var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getWifiDiscbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            $scope.records = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.records.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
    
  $scope.searchWifiDisc = function(){
        if($scope.stDate <= $scope.endDate)
        {
            $http({
            url: '/api/getWifiDiscbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.stDate).toISOString(), enddate: new Date($scope.endDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.records = [];
                $scope.stDate = "";
                $scope.endDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.records.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
}]).controller("watchDiscCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedRecords = [];
    $scope.currentPage = 0;
    //paination end
    $scope.watchrecords = [];
    $scope.stDate = "";
    $scope.endDate = "";
    $('#watchstartDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    $('#watchendDate').datepicker({
        format: "mm-dd-yyyy",
        autoclose: true
    });
    
    //pagination logic
    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.watchrecords, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedRecords = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedRecords[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };

    $scope.range = function (size, pageSize) {
        var ret = []; 
        var end = 0;
        var start = 0;
        if(size == 0)
        {
            end = -1;
        }
        else if(size > pageSize)
        {
            if (size % pageSize == 0) {
                end = Math.floor(size/pageSize);
            }
            else
            {
                end = Math.floor(size/pageSize) + 1
            }
        }
        else
        {
            end = 1;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
        return ret;
    };



    // functions have been describe process the data for display

    //pagination logic end
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedRecords.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

  function getByPatientId(val){
      var today = new Date();
      var startOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,00,00,00);
    var endOfDayToday = new Date(today.getFullYear()
                           ,today.getMonth()
                           ,today.getDate()
                           ,23,59,59);
      $http({
            url: '/api/getWatchDiscbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: startOfDayToday.toISOString(), enddate: endOfDayToday.toISOString()}
        })
        .success(function(data) {
            console.log(data);
            $scope.watchrecords = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.watchrecords.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  $scope.$on('usernamechange', function(event, args){
        getByPatientId(args.val);
    });
    
    if($scope.$parent.$parent.username.username != null)
    {
        getByPatientId($scope.$parent.$parent.username.username);
    }
    
  $scope.searchWatchDisc = function(){
        if($scope.stDate <= $scope.endDate)
        {
            $http({
            url: '/api/getWatchDiscbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, startdate: new Date($scope.stDate).toISOString(), enddate: new Date($scope.endDate).toISOString()}
            })
            .success(function(data) {
                console.log(data);
                $scope.watchrecords = [];
                $scope.stDate = "";
                $scope.endDate = "";
                for(var i = 0; i< data.length; i++)
                {
                    $scope.watchrecords.push({serial_no: i+1, activity_time: new Date(data[i].activity_time).toDateString() + " " + new Date(data[i].activity_time).toLocaleTimeString()});
                }
                $scope.search();
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  };
}]);