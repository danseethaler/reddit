var reddit = angular.module('reddit', []);

reddit.controller('PostsController', function ($scope, FirebaseService) {

	$scope.newPost = {};

	$scope.loadPosts = function () {
		FirebaseService.getRequest().then(function (response) {
			$scope.posts = response.data;
		})
	};

	$scope.loadPosts();

	$scope.addPost = function () {
		FirebaseService.addPost($scope.newPost)
			.then(function (reponse) {
				$scope.loadPosts();
			})
	}

	$scope.bombsAway = function () {
		FirebaseService.bombsAway()
			.then(function () {
				$scope.loadPosts();
			})
	}

	$scope.removePost = function (postID) {
		FirebaseService.removePost(postID)
			.then(function (response) {
				console.log(response);
				for (var post in $scope.posts) {
					if ($scope.posts.hasOwnProperty(post)) {
						if (post === postID) {
							delete $scope.posts[post];
						}
					}
				}
			});
	};
});
