const express	 =  require('express'),
      cors       =  require('cors'),
      mongoose   = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/heroes');

//Get the default connection
const db = mongoose.connection;

db.on('error', function() {
    console.log("Connection to MongoDB database failed");
    process.exit(1);
    //console.error.bind(console, 'connection error:');
});

db.once('open', function() {
    const heroRepository = require('./repositories/HeroRepository');
    const userRepository = require('./repositories/UserRepository');
    heroRepository.initDb();
    //Creates an admin user
    userRepository.initDb();
});

const app = express();

/*  extracts the body portion of an incoming request
    and assigns it to req.body.
 */
app.use( express.json() );

//Allow serving static files from public folder
app.use( express.static('public') );

// Allow CORS (Cross-Origin Resource Sharing)
// i.e., Fulfill requests from another domain other than localhost:3040
app.use(cors());

//Mount the routes
const routes = require('./app-routes');
app.use('/api/', routes);

const port = 3040;
app.listen(port, () => {
    const host = "localhost";
    console.log(`App is running @ http://${host}:${port}/`);
});