
/**
 * Module dependencies.
 */

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var path = require('path');
var querystring = require('querystring');
var session = require('express-session');

var index = require('./routes/index');
var oauth2 = require('./routes/oauth2');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: '12345QWERTY' }));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(path.join(__dirname, 'PlantClient')));

app.get('/', GoToHomepage);

app.get('/login', GetIsUserLoggedIn);

app.get('/accesstoken', GetAccessToken);

app.get('/oauth2/callback', OAuthenticate);

app.get('/welcome', function (req, res) {
    res.redirect(path.join(__dirname, 'PlantClient'));
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

//---------------------------------------------------------------------------//

function GoToHomepage(req, res) {
    
}
//----------------------------------AUTHENTICATION---------------------------//

function OAuthenticate(req, res)
{

    var code = req.query.code;
    if (code === null) {

        // TODO: Redirect to invalid login page
        //
        console.log("Returned code is NULL");
    }
    else {

        var post_options = {
            host: "developer.api.autodesk.com",
            path: "/authentication/v1/gettoken",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        var post_data = querystring.stringify({
            "client_id": "Pe9pXeA6YYAUzJGmE4TzsHg1K15D9QBX",
            "client_secret": "8XN3VcFfCYD9lOxb",
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": "http://localhost:1337/oauth2/callback"

        });

        var post_req = https.request(post_options, function ExchangeOAuthCodeForAccessTokenCallback(authResponse) {
            //
            // TODO: make preliminary checks and redirect on incorrect response
            //
            var responseString = "";

            authResponse.on('data', function (data) {
                responseString += data;
            });
            authResponse.on("end", function () {
                var access_token = JSON.parse(responseString).access_token;
                req.session.access_token = access_token;
                console.log(req.get('referer'));

                res.redirect('/');

            });

        });

        post_req.write(post_data);

        post_req.end();
    }
}

function GetIsUserLoggedIn(req, res) {

    var isLoggedIn;

    if (req.session.access_token === null
        || req.session.access_token === undefined)
        //isLoggedIn = false;
        isLoggedIn = JSON.stringify({'loggedin': false});
    else
        //isLoggedIn = true;
        isLoggedIn = JSON.stringify({'loggedin': true});

    res.send(isLoggedIn);
}

function GetAccessToken(req, res) {
    var access_token;
    if (req.session.access_token === null)
        access_token = JSON.stringify("loggedin:" + null);
    else
            access_token = JSON.stringify("loggedin:" + req.session.access_token);
    res.send(access_token);
}

//------------------------------------//