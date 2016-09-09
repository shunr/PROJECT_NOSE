N_CONTROLLERS.controller("ctrl_register", function($scope, $firebaseAuth, $firebaseObject, $state) {
    $scope.authObj = $firebaseAuth();
    $scope.data = {};
    $scope.error = null;
    $scope.success = false;
    $scope.register = function() {
        $scope.authObj.$createUserWithEmailAndPassword($scope.data.user, $scope.data.password).then(function(auth) {
            firebase.database().ref('users/' + auth.uid).set({
                credentials: {
                    user: auth.email,
                    pass: utils.ntlm($scope.data.password),
                },
                enabled: true
            });
        }).catch(function(error) {
            $scope.error = error;
        });
    }
    $scope.isRegistrationValid = function() {
        if ($scope.data.user && $scope.data.password && $scope.data.confirm) {
            if ($scope.data.password == $scope.data.confirm) {
                return true;
            }
        }
        return false;
    }
    if ($scope.authObj.$getAuth()) {
        $state.go("dashboard");
    }
});
