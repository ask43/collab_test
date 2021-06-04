const	{ Octokit  } = require("@octokit/rest"),
			express = require("express"),
			app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/postRequest', function(req,res){
	let auth = req.body.auth_token,
			owner = req.body.owner,
			repo = req.body.repo,
			username = req.body.username;
	try {
		//Аутентификация
		const clientAuth = new Octokit ({
			auth: auth,
		});
		//Отправка приглашения
		clientAuth.repos.addCollaborator({
			owner: owner,
			repo: repo,
			username: username,
		});
		res.send("You've invited " + username);
	} catch (e) {
		console.log(e)
	}	
});
		
function start() {
	try {
			app.listen(3000, () => {
			console.log('Server has been started...')
		})
		} catch (e) {
			console.log(e)
		}
}

start()