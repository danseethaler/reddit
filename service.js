var reddit = angular.module('reddit');

reddit.service('FirebaseService', function ($http, $q) {

	this.getRequest = function () {

		$http.delete('https://devmtn.firebaseio.com/posts/0a2e1071-f95b-0b9f-bcec-b89aa225fcaf.json')

		return $http.get('https://devmtn.firebaseio.com/posts.json')
	};

	var guid = function () {
		var s4 = function () {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
			s4() + '-' + s4() + s4() + s4();
	}

	this.addPost = function (post) {
		post.timestamp = Date.now();
		post.comments = [];
		post.karma = 0;
		post.id = guid();
		return $http.put('https://devmtn.firebaseio.com/posts/' + post.id + '.json', post)
	}

	this.bombsAway = function () {
		return $http.get('https://devmtn.firebaseio.com/posts.json')
			.then(function (response) {
				var posts = response.data
				for (var post in posts) {
					if (posts.hasOwnProperty(post)) {
						$http.delete('https://devmtn.firebaseio.com/posts/' + posts[post].id + '.json')
					}
				}
			})
	}

    this.removePost = function(postID){
        console.log('https://devmtn.firebaseio.com/posts/' + postID + '.json');
        return $http.delete('https://devmtn.firebaseio.com/posts/' + postID + '.json');
    }

});
