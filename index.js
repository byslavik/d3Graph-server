var mongoose = require('mongoose');
var Currency = require('./models/currency.model');

// mongoose.Promise = global.Promise;
mongoose.Promise = require('q').Promise;
// mongoose.connect('mongodb://heroku_133q26vg:sciencehit2016@ds141368.mlab.com:41368/heroku_133q26vg', ()=>{console.log('horaay... I`m connected')});
// mongoose.connect('mongodb://localhost:27017/sciencehit', ()=>{});

var options = {};

var mongodbUri = 'mongodb://pdpexchange:pdpexchange2016@ds139262.mlab.com:39262/heroku_7d2slbkg';

mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;

conn.on('error', function(err) {
  console.log('noup', err)
});

conn.once('open', function() {
  console.log('horaay... I`m connected')
});


var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var cors = require('cors');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
var port = process.env.PORT || 8084;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


router.use(function(req, res, next) {

    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});



router.route('/currency')

    .post(function(req, res) {
        console.log(req.body);
        let newArray = [];
        let item = JSON.parse(req.body.item)
        item.map(function(item) {
            let newItem = {
                "Cur_ID": item.Cur_ID,
                "Date": new Date(item.Date),
                "Cur_OfficialRate": item.Cur_OfficialRate
            }

            newArray.push(newItem);
        });
        Currency.insertMany(newArray, function(err) {
                if (err){
                    res.send(err);
                }
                res.json({ message: 'item created!' });
            });




    });
router.route('/currency/:id/:from/:to')
    .get(function(req, res) {

        Currency.find({"Cur_ID": req.params.id, "Date": {"$gte": new Date(req.params.from), $lte: new Date(req.params.to)}}, function(err, currency) {
            if (err){
                res.send(err);
            }
            res.json(currency);
        }).sort({"Date": 1})

    });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
