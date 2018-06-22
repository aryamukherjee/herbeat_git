angular.module("app", ['chart.js','ngRoute'])
  // Optional configuration
  .config(['ChartJsProvider', '$routeProvider', '$httpProvider', function (ChartJsProvider, $routeProvider, $httpProvider) {
    
    $routeProvider
        // default route
        .when('/', {
            templateUrl : 'views/partial/dashboard.html'
        })
        
        .when('/statistics', {
            templateUrl : 'views/partial/statistics.html'
        })
        
        .when('/sentMessages', {
            templateUrl : 'views/partial/sentMessages.html'
        });
                  
    // Configure all charts
    
  }]).controller("mainCtrl", ['$scope', '$http', function ($scope, $http) {
      
        //changes for date range search
        $scope.startDate = "";
        $scope.endDate = "";
        //initialize the date picker control
        $('#startDate').datepicker({
            format: "mm/dd/yyyy",
            autoclose: true
        });
        $('#endDate').datepicker({
            format: "mm/dd/yyyy",
            autoclose: true
        });
        
        
        //end
        $scope.usermessage = "";
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
        
        $scope.searchByDate = function()
        {
            if(new Date($scope.startDate) < new Date($scope.endDate))
            {
                var stDate = $scope.startDate;
                var edDate = $scope.endDate;
                $scope.$broadcast('searchbydate', {stDate, edDate});    
            }
            else
            {
                alert('Invalid dates selected!');
            }
        };
        
        $scope.sendMessage = function()
        {
            var config = {
                headers : {
                    'Content-Type': 'application/json'
                }
            }
            $http.post('/api/sendmsgtodevice', JSON.stringify({
                    username: $scope.username.username,
                    message: $scope.usermessage,
                    date: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + new Date().toTimeString().slice(0, 8)
            }), config)
            .success(function(data) {
                console.log(data);
                $scope.usermessage = "";
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
            //console.log($scope.username.username + $scope.message);
        };
    
    $scope.$watch('username', function(newVal, oldVal){
        if(newVal!=oldVal){
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.welcomeVisible = false;
        $scope.statVisible = true;
            $scope.$broadcast('usernamechange',{"val":newVal});
        }
    });
}]).controller("heartRateCtrl", ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {

  /* $scope.labels = [];
  $scope.series = [];
  $scope.data = [
    []
  ];
  
  $scope.hstDate = "";
    $scope.hendDate = "";
    $('#hstartDate').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#hendDate').datepicker({
        format: "mm/dd/yyyy",
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
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.hendDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            var labels = [];
            var dat = [];
			var chartcolors=[];
            $scope.labels = [];
            $scope.data = [[]];
            for(var i = 0; i< data.length; i++)
            {
                labels.push(data[i].activity_time);
                dat.push(data[i].user_heart_rate);
				chartcolors.push('#FF5252');
            }
            $scope.labels = labels;
            $scope.data = dat;
			$scope.colours = chartcolors;
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
        if(new Date($scope.hstDate) <= new Date($scope.hendDate))
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
				var chartcolors=[];
                $scope.labels = [];
                $scope.data = [[]];
                for(var i = 0; i< data.length; i++)
                {
                    labels.push(data[i].activity_time);
                    dat.push(data[i].user_heart_rate);
					chartcolors.push('#FF5252');
                }
                $scope.labels = labels;
                $scope.data = dat;
				$scope.colours = chartcolors;
            })
            .error(function(error) {
                    console.log('Error: ' + error);
            });
        }
        else
        {
            alert('Invalid dates selected!');
        }
  }; */
  
  $scope.hcurpage = 0;
  $scope.hisNext = true;
  $scope.hisPrev = true;
  const hpageSize = 10;
  $scope.hpageData = [[]];
  $scope.hlabels = [];
  $scope.hcolors = [];
  $scope.labels = [];
  $scope.series = ['Minimum', 'Average', 'Maximum'];
  $scope.data = [];
	
	$scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }, { yAxisID: 'y-axis-3' }];
	 
  
  $scope.hstDate = "";
    $scope.hendDate = "";
    $('#hstartDate').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#hendDate').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
	
	//Arya Mukherjee - logic for pagination in bar graph
	function initPage(data, startingIndex, dataLength){
		$scope.hpageData = [[]];
	    $scope.hlabels = [];
	    $scope.hcolors = [];
		var dat1 = [];
		var dat2 = [];
		var dat3 = [];
		$scope.hcurpage = 1;
		if(dataLength <= hpageSize)
		{
			for(var i = startingIndex; i< dataLength; i++)
			{
				$scope.hlabels.push($scope.labels[i]);
				dat1.push(data[0][i]);
				dat2.push(data[1][i]);
				dat3.push(data[2][i]);
				$scope.hcolors.push('#cc9900','#808080','#FF5252');
			}	
			$scope.hpageData = [dat1, dat2, dat3];
			$scope.hisNext = true;
			$scope.hisPrev = true;
		}
		else
		{
			for(var i = startingIndex; i< hpageSize; i++)
			{
				$scope.hlabels.push($scope.labels[i]);
				dat1.push(data[0][i]);
				dat2.push(data[1][i]);
				dat3.push(data[2][i]);
				$scope.hcolors.push('#cc9900','#808080','#FF5252');
			}	
			$scope.hpageData = [dat1, dat2, dat3];
			$scope.hisNext = false;
			$scope.hisPrev = true;
		}
	}
	
	$scope.goNext = function(){
		var nextPage = $scope.hcurpage + 1;
		$scope.hpageData = [[]];
	    $scope.hlabels = [];
	    $scope.hcolors = [];
		var dat1 = [];
		var dat2 = [];
		var dat3 = [];
		if(nextPage * hpageSize >= $scope.data[0].length)
		{
			for(var i = (nextPage * hpageSize) - hpageSize; i< $scope.data[0].length; i++)
			{
				$scope.hlabels.push($scope.labels[i]);
				dat1.push($scope.data[0][i]);
				dat2.push($scope.data[1][i]);
				dat3.push($scope.data[2][i]);
				$scope.hcolors.push('#cc9900','#808080','#FF5252');
			}	
			$scope.hpageData = [dat1, dat2, dat3];
			$scope.hisNext = true;
			$scope.hisPrev = false;
		}
		else
		{
			for(var i = (nextPage * hpageSize) - hpageSize; i< nextPage * hpageSize; i++)
			{
				$scope.hlabels.push($scope.labels[i]);
				dat1.push($scope.data[0][i]);
				dat2.push($scope.data[1][i]);
				dat3.push($scope.data[2][i]);
				$scope.hcolors.push('#cc9900','#808080','#FF5252');
			}	
			$scope.hpageData = [dat1, dat2, dat3];
			$scope.hisNext = false;
			$scope.hisPrev = false;
		}
		$scope.hcurpage = nextPage;
		
	}
	$scope.goPrev = function(data){
		var prevPage = $scope.hcurpage - 1;
		$scope.hpageData = [[]];
	    $scope.hlabels = [];
	    $scope.hcolors = [];
		var dat1 = [];
		var dat2 = [];
		var dat3 = [];
		if((prevPage * hpageSize) - hpageSize == 0)
		{
			for(var i = (prevPage * hpageSize) - hpageSize; i< prevPage * hpageSize; i++)
			{
				$scope.hlabels.push($scope.labels[i]);
				dat1.push($scope.data[0][i]);
				dat2.push($scope.data[1][i]);
				dat3.push($scope.data[2][i]);
				$scope.hcolors.push('#cc9900','#808080','#FF5252');
			}	
			$scope.hpageData = [dat1, dat2, dat3];
			$scope.hisPrev = true;
			$scope.hisNext = false;
		}
		else
		{
			for(var i = (prevPage * hpageSize) - hpageSize; i< prevPage * hpageSize; i++)
			{
				$scope.hlabels.push($scope.labels[i]);
				dat1.push($scope.data[0][i]);
				dat2.push($scope.data[1][i]);
				dat3.push($scope.data[2][i]);
				$scope.hcolors.push('#cc9900','#808080','#FF5252');
			}	
			$scope.hpageData = [dat1, dat2, dat3];
			$scope.hisPrev = false;
			$scope.hisNext = false;
		}
		$scope.hcurpage = prevPage;
	}
	//Arya Mukherjee - logic for pagination in bar graph
  
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
			var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.hendDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
              var labels = [];
				var chartcolors=[];
                $scope.labels = [];
                $scope.data = [[]];
                var data1 = [];
			var data2 = [];
			var data3 = [];
			for(var i = 0; i< data.length; i++)
			{
				labels.push((data[i].activity_time_formatted));
				data1.push(data[i].mine);
				data2.push(data[i].avge.toFixed(2));
				data3.push(data[i].maxe);
				chartcolors.push('#cc9900','#808080','#FF5252');
			}
			$scope.labels = labels;
			$scope.data = [data1,data2,data3];
			$scope.colours = chartcolors;
            
			initPage($scope.data, 0, data.length);
			
			//$("#hratebarchartc").css("width", (data.length * 60) + 200 + "px");
			
			$scope.options = {
		 tooltips: {
			 position: 'average',
                callbacks: {
        title: function(tooltipItem, data,labels,index) {
			
          return data['labels'][tooltipItem[0]['index']];
        }
        }
		},
    scales: {
    
	  xAxes: [
        {
          barPercentage: 1.0,
			categoryPercentage: 0.8,
		  position: 'bottom',
          ticks: { 
          userCallback:  function(label, index, labels) {
					   
					   if(labels.length>1){
					  return labels[index].split(" ")[1];
					   }
					  
    }
        }
		  }
		
      ],
	  yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Heart Rate'
      }
    }]
    }
  };
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
    
    function searchHeartrate(val){

            $http({
            url: '/api/gethratebyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toISOString(), 
                enddate: new Date(val.edDate).toISOString()}
            })
            .success(function(data) {
				debugger;
                console.log(data);
                  var labels = [];
				var chartcolors=[];
                $scope.labels = [];
                $scope.data = [[]];
                var data1 = [];
			var data2 = [];
			var data3 = [];
            for(var i = 0; i< data.length; i++)
            {
                labels.push((data[i].activity_time_formatted));
                data1.push(data[i].mine);
				data2.push(data[i].avge.toFixed(2));
				data3.push(data[i].maxe);
				chartcolors.push('#cc9900','#808080','#FF5252');
            }
            $scope.labels = labels;
            $scope.data = [data1,data2,data3];
			$scope.colours = chartcolors;
			
			initPage($scope.data, 0, data.length);
			
			//$("#hratebarchartc").css("width", (data.length * 60) + 200 + "px");
			
			$scope.options = {
		 tooltips: {
			 position: 'average',
                callbacks: {
        title: function(tooltipItem, data,labels,index) {
			
          return data['labels'][tooltipItem[0]['index']];
        }
        }
		},
    scales: {
    
	  xAxes: [
        {
          barPercentage: 1.0,
			categoryPercentage: 0.8,
		  position: 'bottom',
          ticks: {  
          userCallback:  function(label, index, labels) {
					   
					   if(labels.length>1){
					  return labels[index].split(" ")[0];
					   }
					  
    }
        }
		  }
		
      ], yAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Heart Rate'
      }
    }]
    }
  };
			
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchHeartrate(args);
    });
    //end
        
}]).controller("userGoalsCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {

    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    //chart configuration
    $scope.labels = [];
    $scope.series = ['Step Count'];
    $scope.data = [];
    $scope.readinessdata = [];
    $scope.walktargetdata = [];
    $scope.currenergydata = [];
    $scope.colors = [];
    
    $scope.options = {
            responsive: true,
            title: {
                display: true,
                text: 'User Goals'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Readiness Level'
                    }
                }]
            }
        };
    
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#goalendDate').datepicker({
        format: "mm/dd/yyyy",
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
    
    $scope.readinessLevel = function(){
        $scope.data = $scope.readinessdata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Readiness Level'
                    }
                }];
    };
    $scope.walkTarget = function(){
        $scope.data = $scope.walktargetdata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Walk Target'
                    }
                }];
    };
    $scope.currEnergy = function(){
        $scope.data = $scope.currenergydata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Curr. Energy'
                    }
                }];
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            $scope.goalResp = []
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.goalendDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            for(var i = 0; i< data.length; i++)
            {
                $scope.data.push(data[i].user_readiness_level);
                //push chart data
                $scope.readinessdata.push(data[i].user_readiness_level);
                $scope.walktargetdata.push(data[i].user_walk_target);
                $scope.currenergydata.push(data[i].user_current_energy);
                $scope.labels.push(data[i].date);
                $scope.colors.push('#a8011a');
                
                $scope.goalResp.push({
                    readiness_level: data[i].user_readiness_level, 
                    walk_target: data[i].user_walk_target,
                    current_energy: data[i].user_current_energy,
                    activity_date: data[i].date,
                    activity_time: data[i].time,
                    serial_no : i+1});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchUsergoals(val){

        $http({
        url: '/api/getusergoalsbyDate',
        method: 'GET',
        params: {p_id: $scope.$parent.$parent.username.username, 
            startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                    + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                    + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                    + "00:00:00", 
            enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                    + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                    + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                    + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            $scope.goalResp = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.data.push(data[i].user_readiness_level);
                //push chart data
                $scope.readinessdata.push(data[i].user_readiness_level);
                $scope.walktargetdata.push(data[i].user_walk_target);
                $scope.currenergydata.push(data[i].user_current_energy);
                $scope.labels.push(data[i].date);
                $scope.colors.push('#a8011a');
                
                $scope.goalResp.push({
                    readiness_level: data[i].user_readiness_level, 
                    walk_target: data[i].user_walk_target,
                    current_energy: data[i].user_current_energy,
                    activity_date: data[i].date,
                                        activity_time: data[i].time,
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchUsergoals(args);
    });
    //end
    
    
}]).controller("userActivitiesCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
     //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    //chart configuration
    $scope.labels = [];
    $scope.series = ['Step Count'];
    $scope.data = [];
    $scope.sittingdata = [];
    $scope.walkingdata = [];
    $scope.stepcountdata = [];
    $scope.distcovereddata = [];
    $scope.colors = [];
    
    $scope.options = {
            responsive: true,
            title: {
                display: true,
                text: 'User Activities'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Step Count'
                    }
                }]
            }
        };
    
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#actendDate').datepicker({
        format: "mm/dd/yyyy",
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
    
    $scope.sittingduration = function(){
        $scope.data = $scope.sittingdata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Sitting Duration'
                    }
                }];
    };
    $scope.walkingduration = function(){
        $scope.data = $scope.walkingdata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Walking Duration'
                    }
                }];
    };
    $scope.stepcount = function(){
        $scope.data = $scope.stepcountdata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Step Count'
                    }
                }];
    };
    $scope.distcovered = function(){
        $scope.data = $scope.distcovereddata;
        $scope.options.scales.yAxes = [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Dist. Covered'
                    }
                }];
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            $scope.activityResp = [];
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.activityendDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            for(var i = 0; i< data.length; i++)
            {
                $scope.data.push(data[i].user_sitting_duration);
                //push chart data
                var hr = (data[i].user_sitting_duration).split(':')[0];
                var min = (data[i].user_sitting_duration).split(':')[1];
                $scope.sittingdata.push(parseInt(hr) + '.' + parseInt(min));
                var hr = (data[i].user_walking_duration).split(':')[0];
                var min = (data[i].user_walking_duration).split(':')[1];
                $scope.walkingdata.push(parseInt(hr) + '.' + parseInt(min));
                $scope.stepcountdata.push(data[i].user_step_count);
                $scope.distcovereddata.push(data[i].distance_covered_in_miles);
                $scope.colors.push('#580277');
                
                $scope.labels.push(data[i].date);
            	 $scope.activityResp.push({
            		 user_sitting_duration: data[i].user_sitting_duration, 
            		 user_walking_duration: data[i].user_walking_duration,
            		 user_step_count: data[i].user_step_count,
            		 activity_date: data[i].date,
                         activity_time: data[i].time,
            		 serial_no : i+1,
            		 distance_covered_in_miles : data[i].distance_covered_in_miles });
            		
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchActivity(val){

            $http({
            url: '/api/getuseractivitybyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.activityResp = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.data.push(data[i].user_step_count);
                    //push chart data
                    var hr = (data[i].user_sitting_duration).split(':')[0];
                    var min = (data[i].user_sitting_duration).split(':')[1];
                    $scope.sittingdata.push(parseInt(hr) + '.' + parseInt(min));
                    var hr = (data[i].user_walking_duration).split(':')[0];
                    var min = (data[i].user_walking_duration).split(':')[1];
                    $scope.walkingdata.push(parseInt(hr) + '.' + parseInt(min));
                    $scope.stepcountdata.push(data[i].user_step_count);
                    $scope.distcovereddata.push(data[i].distance_covered_in_miles);
                    $scope.colors.push('#580277');
                
                    $scope.labels.push(data[i].date);
                     $scope.activityResp.push({
                             user_sitting_duration: data[i].user_sitting_duration, 
                             user_walking_duration: data[i].user_walking_duration,
                             user_step_count: data[i].user_step_count,
                             activity_date: data[i].date,
                             activity_time: data[i].time,
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
    
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchActivity(args);
    });
    //end
    
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#emaendDate').datepicker({
        format: "mm/dd/yyyy",
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.emaendDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"-"+dat[1]+"-"+dat[2];
            $scope.emaResp = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.emaResp.push({serial_no: i+1, user_selected_activity: data[i].user_selected_activity,
                    user_company: data[i].user_company, user_curr_location: data[i].user_curr_location,
                    user_food_habit: data[i].user_food_habit, user_feelings: data[i].user_feelings,
                    motivation_screen: data[i].motivation_screen,
                    activity_date: data[i].date,
                    activity_time: data[i].time
					});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchEmaResp(val){

            $http({
            url: '/api/getemarespbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.emaResp = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.emaResp.push({serial_no: i+1, user_selected_activity: data[i].user_selected_activity,
                        user_company: data[i].user_company, user_curr_location: data[i].user_curr_location,
                        user_food_habit: data[i].user_food_habit, user_feelings: data[i].user_feelings,
                        motivation_screen: data[i].motivation_screen,
                        activity_date: data[i].date,
                        activity_time: data[i].time
						});
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
    
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchEmaResp(args);
    });
    //end
    
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#endDate').datepicker({
        format: "mm/dd/yyyy",
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.videos = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.videos.push({serial_no: i+1, 
				activity_date: data[i].date,
                activity_time: data[i].time,
                            video_title: data[i].video_title});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchWatchedVideos(val){

            $http({
            url: '/api/getWatchedVideosbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.videos = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.videos.push({serial_no: i+1, 
					activity_date: data[i].date,
                    activity_time: data[i].time,
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchWatchedVideos(args);
    });
    //end
  
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#blueendDate').datepicker({
        format: "mm/dd/yyyy",
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.records = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.records.push({serial_no: i+1, 
				activity_date: data[i].date,
                activity_time: data[i].time
				});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchBluetoothConFailed(val){

            $http({
            url: '/api/getBluetoothDiscbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.records = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.records.push({serial_no: i+1, 
					activity_date: data[i].date,
                    activity_time: data[i].time
					});
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchBluetoothConFailed(args);
    });
    //end
}]).controller("remainingBatteryCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
    //pagination
    $scope.sort = {       
        sortingOrder : 'id',
        reverse : false
    };
    $scope.gap = 5;
    
    //chart configuration
    $scope.labels = [];
    $scope.series = ['Step Count'];
    $scope.data = [];
    $scope.remainingbatterydata = [];
    $scope.colors = [];
    
    $scope.options = {
            responsive: true,
            title: {
                display: true,
                text: 'Remaining Battery'
            },
            tooltips: {
                mode: 'index',
                intersect: false
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Date'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                            display: true,
                            labelString: 'Remaining Battery %'
                    }
                }]
            }
        };
    
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#remainingendDate').datepicker({
        format: "mm/dd/yyyy",
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.records = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.data.push(data[i].remaining_battery);
                $scope.labels.push(data[i].date);
                $scope.colors.push('#0c6601');
                
                $scope.records.push({
                    serial_no: i+1, 
                    activity_date: data[i].date,
                    activity_time: data[i].time,
                    remaining_battery: data[i].remaining_battery});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchRemainingBattery(val){

            $http({
            url: '/api/getRemainingBatterybyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.records = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.data.push(data[i].remaining_battery);
                    $scope.labels.push(data[i].date);
                    $scope.colors.push('#0c6601');
                
                    $scope.records.push({
                        serial_no: i+1, 
                        activity_date: data[i].date,
                        activity_time: data[i].time,
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchRemainingBattery(args);
    });
    //end
  
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#wifiendDate').datepicker({
        format: "mm/dd/yyyy",
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.records = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.records.push({serial_no: i+1, 
				activity_date: data[i].date,
                activity_time: data[i].time
				});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchWifiDisc(val){

            $http({
            url: '/api/getWifiDiscbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.records = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.records.push({serial_no: i+1, 
					activity_date: data[i].date,
                    activity_time: data[i].time
					});
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchWifiDisc(args);
    });
    //end
  
   /*Added by Bharath*/
  }]).controller("HeartRateCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
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
    $scope.heartRate = [];
    $scope.stHrDate = "";
    $scope.endHrDate = "";
    $('#startHrDate').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#endHrDate').datepicker({
        format: "mm/dd/yyyy",
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
            $scope.filteredItems = $filter('filter')($scope.heartRate, function (item) {
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
            url: '/api/getheartRatebypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endHrDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.heartRate = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.heartRate.push({serial_no: i+1, 
				activity_date: data[i].date,
                activity_time: data[i].time,
                            user_heart_rate: data[i].user_heart_rate});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchHeartRate(val){

            $http({
            url: '/api/getheartRatebyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.heartRate = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.heartRate.push({serial_no: i+1, 
					activity_date: data[i].date,
                    activity_time: data[i].time,
                                user_heart_rate: data[i].user_heart_rate});
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
    
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchHeartRate(args);
    });
    //end
  
  }]).controller("messageCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
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
    $scope.message = [];
    $scope.stMsgDate = "";
    $scope.endMsgDate = "";
    $('#stMsgDateId').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#endMsgDateId').datepicker({
        format: "mm/dd/yyyy",
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
            $scope.filteredItems = $filter('filter')($scope.message, function (item) {
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
            url: '/api/getmsgbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endMsgDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"-"+dat[1]+"-"+dat[2];
            $scope.message = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.message.push({serial_no: i+1, 
				activity_date: data[i].date,
                activity_time: data[i].time,
                            message : data[i].message});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchMessage(val){

            $http({
            url: '/api/getmsgbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.message = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.message.push({serial_no: i+1, 
					activity_date: data[i].date,
                    activity_time: data[i].time,
                                message: data[i].message});
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
    
  //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchMessage(args);
    });
    //end
  
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
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#watchendDate').datepicker({
        format: "mm/dd/yyyy",
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
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.watchrecords = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.watchrecords.push({serial_no: i+1, 
				activity_date: data[i].date,
                activity_time: data[i].time
				});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchWatchDisc(val){

            $http({
            url: '/api/getWatchDiscbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.watchrecords = [];

                for(var i = 0; i< data.length; i++)
                {
                    $scope.watchrecords.push({serial_no: i+1, 
					activity_date: data[i].date,
                    activity_time: data[i].time
					});
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
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchWatchDisc(args);
    });
    //end
  
}]).controller("sentMsgCtrl", ['$scope', '$http', '$timeout', '$filter', function ($scope, $http, $timeout, $filter) {
    
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
    $scope.messages = [];
    $scope.stMsgDate = "";
    $scope.endMsgDate = "";
    $('#stSentMsgDateId').datepicker({
        format: "mm/dd/yyyy",
        autoclose: true
    });
    $('#endSentMsgDateId').datepicker({
        format: "mm/dd/yyyy",
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
        $scope.filteredItems = $filter('filter')($scope.messages, function (item) {
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
            url: '/api/getsentmsgbypid',
            method: 'GET',
            params: {p_id: val.username == null? val: val.username, startdate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "00:00:00", enddate: new Date().toLocaleDateString().split('/')[2] + "-" + new Date().toLocaleDateString().split('/')[0] + "-" + new Date().toLocaleDateString().split('/')[1] + " " + "23:59:59"}
        })
        .success(function(data) {
            console.log(data);
            var dat = new Date().toLocaleString().split(',')[0].split('/');
            $scope.endMsgDate = (dat[0].length == 1? "0"+dat[0]: dat[0])+"/"+(dat[1].length == 1? "0"+dat[1]: dat[1])+"/"+dat[2];
            $scope.messages = [];
            for(var i = 0; i< data.length; i++)
            {
                $scope.messages.push({message: data[i].msg, 
                    date: data[i].date,
                    time: data[i].time});
            }
            $scope.search();
        })
        .error(function(error) {
                console.log('Error: ' + error);
        });
  };
  
  function searchSentMessage(val){

            $http({
            url: '/api/getsentmsgbyDate',
            method: 'GET',
            params: {p_id: $scope.$parent.$parent.username.username, 
                startdate: new Date(val.stDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.stDate).toLocaleDateString().split('/')[1] + " " 
                        + "00:00:00", 
                enddate: new Date(val.edDate).toLocaleDateString().split('/')[2] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[0] + "-" 
                        + new Date(val.edDate).toLocaleDateString().split('/')[1] + " " 
                        + "23:59:59"}
            })
            .success(function(data) {
                console.log(data);
                $scope.messages = [];
                for(var i = 0; i< data.length; i++)
                {
                    $scope.messages.push({message: data[i].msg, 
                        date: data[i].date,
                        time: data[i].time});
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
    
    //call the search API on event searchByDate
    $scope.$on('searchbydate', function(event, args){
        searchSentMessage(args);
    });
    //end
  
}]);