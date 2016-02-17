angular.module('app.controllers', [])
    .controller('pageCtrl', function ($scope, $interval) {

        $scope.sessionLength = 25;
        $scope.breakLength = 5;
        $scope.sessionTime = 1;

        var isTimerSession = false;
        var isSeesion = true;
        $scope.sessionName = "Session";

        $scope.sessionSecond = 60 * $scope.sessionLength;
        updateSession();

        $scope.startSession = function () {
            $scope.sessionSecond = 60 * $scope.sessionLength;
            updateSession();
            isTimerSession = $interval(updateSession, 1000);
        }


        $scope.stopSession = function () {
            if (isTimerSession) {
                $interval.cancel(isTimerSession);
            }
        }

        $scope.resetSession = function () {
            $scope.sessionLength = 25;
            $scope.sessionSecond = 60 * $scope.sessionLength;

            if (isTimerSession) {
                $interval.cancel(isTimerSession);
            }
            updateSession();
        }


        function updateSession() {
            $scope.sessionTime = convertIntoHms($scope.sessionSecond);
            $scope.sessionSecond--;
            if ($scope.sessionSecond < 0 && isSeesion == true) {

                if (isTimerSession) {
                    $interval.cancel(isTimerSession);
                }

                isSeesion = false;

                $scope.sessionLength = 5;
                $scope.sessionSecond = 60 * $scope.sessionLength;

                $scope.sessionName = "Break"

                isTimerSession = $interval(updateSession, 1000);
            }
            if ($scope.sessionSecond < 0 && isSeesion == false) {

                if (isTimerSession) {
                    $interval.cancel(isTimerSession);
                }

                isSeesion = true;
                $scope.sessionName = "Session";

                $scope.sessionLength = 25;
                $scope.sessionSecond = 60 * $scope.sessionLength;

                isTimerSession = $interval(updateSession, 1000);
            }

        }
        
        //convert into hms
        function convertIntoHms(second) {
            second = Number(second);
            var h = Math.floor(second / 3600);
            var m = Math.floor(second % 3600 / 60);
            var s = Math.floor(second % 3600 % 60);
            return (
                (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
                );

        }

    })
 