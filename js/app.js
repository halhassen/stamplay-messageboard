//Initializes Stamplay App
Stamplay.init('messageboard402');

//Create a instance of the Stamplay User Model
var user = new Stamplay.User().Model;

// Login Button Event Listener, init GitHub Login OAuth on "click"
$('#login-button').on('click', function() {
	user.login('github')
})

//Running the currentUser method, onload to check if user is already signed in
user.currentUser().then(function() {
	if(user.isLogged()) {

	};
})

$('#new-message').on('submit', function(e) {
	e.preventDefault();
	if(!$('#message-input').val() == '') {
		// Create an instance of the Stamplay message model
		var message = new Stamplay.Cobject('message').Model
		var comment = $('#message-input').val();
		message.set('comment', comment);
		message.set('avatar', user.get('profileImg'));
		message.set('username', user.instance.identities.github._json.login);
		message.save();
		//clear input content
		$('#message-input').val(' ');
	}
});

var feed = new Stamplay.Cobject('message').Collection;
feed.fetch({page:1, per_page:100, sort'-dt_create'}).then(function() {
	feed.instance.forEach(function(msg) {
		var elemStr = "";
		var d = new Date(msg.instance.dt_create);
		msg.instance.date = d.toLocaleString('en-EN');
		elemStr += "<div>"
		elemStr += "<img style='max-height: 50px;' src='" + msg.instance.avatar + "'>";
		elemStr += "<span>" + msg.instance.comment + "</span>";
		elemStr += "<div> by: " + msg.instance.username + " - " + msg.instance.dt_create + "</div>";
		elemStr += "</div>";
		elemStr += "<br>";
		$('#output').append(elemStr);
	})
});

