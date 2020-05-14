var app = angular.module('App', []);

app.controller('appCtrl', function ($scope, $http) {


    $scope.header = "India";
    $http({
        method: "GET",
        url: "https://api.covid19india.org/data.json"
    }).then(function getData(response) {
         console.log(response);
        stats = response.data.statewise;
       // console.log(stats);
        funDefault($scope, stats);
        $scope.funmappng = function ($event) {
            var cls = event.target.attributes[0].value;
            chnge(cls, stats);
        }
        $scope.myfndefault = function () {
            funDefault($scope, stats);
        }
        $scope.myfn = function ($event) {
            for (var stat of stats) {
                var s = "IN-" + stat.statecode;
                // console.log(s);
                if (event.target.attributes[0].value === s) {
                    intialize($scope, stat);
                   // document.getElementById(s).classList.toggle("stat-focus");
                }
            }
        }
    }, function error(response) {
        console.log(response.statusText);
    });

});



function intialize($scope, stat) {
    $scope.cnfrm = stat.confirmed;
    $scope.deltacnfrm = stat.deltaconfirmed;
    $scope.active = stat.active;
    $scope.recover = stat.recovered;
    $scope.deltarcvr = stat.deltarecovered;
    $scope.death = stat.deaths;
    $scope.deltadths = stat.deltadeaths;
    $scope.stateName = stat.state;
    $scope.updatedtime = stat.lastupdatedtime;

}
function funDefault($scope, stats) {
    intialize($scope, stats[0]);
    chnge("stats-red", stats);
    chngOPC(stats);
}
function chngOPC(stats) {
    var maxcnfm = 25000;
    var maxactv = 20000;
    var maxrcvr = 6000;
    var maxdths = 1000;
    for (var stat of stats) {
        var s = "IN-" + stat.statecode;
        var element = document.getElementById(s);
        var opc = parseInt(stat.confirmed) / maxcnfm;
        if (element != null) {
            element.style.fillOpacity = opc;
        }
    }
}
function chnge(cls, stats) {
   
    for (var stat of stats) {
        var s = "IN-" + stat.statecode;
        var element = document.getElementById(s);
        if (element != null) {
            if (cls === "stats-red") {
                element.style.fill = "red";
            }
            else if (cls === "stats-green") {
                element.style.fill = "green";
            }
            else if (cls === "stats-begun") {
                element.style.fill = "rgb(151, 149, 160)";
            }
            else if (cls === "stats-blue") {
                element.style.fill = "blue";
            }
           
        }

    }
}
function click(evt) {
    var title = document.getElementById(evt);
    title.style.fill = "rgba(225, 48, 40)";
    title.style.fillOpacity = "0.18";
    console.log(evt);


};
function toggle_mode(evt) {
    var element = document.body;
    element.classList.toggle("dark-mode");
  //  document.getElementById("cnf").classList.toggle("dark-red");
    var sg = document.getElementById("svg2");
    for (var i = 2; i < sg.children.length; i++) {
        sg.children[i].classList.toggle("dark-mode")
    }

    // console.log(sg.children);

}