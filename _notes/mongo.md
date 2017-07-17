## Using mLab


## Using mongo locally
    $ brew update
    $ brew install mongodb
    $ mongo --version
    $ mongod -dbpath /data/prd-latest/


## Mongo GUI tool
    MongoDB Compass


## Connect to DB
    mongoose.connect(process.env.DATABASE);
    mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
    mongoose.connection.on('error', (err) => {
        console.error(`Can not connect to db with error: ${err.message}`);
    });

    // import all of the models
    require('./models/Store');

## Using aggregate

## Data relation
    User<->Store<->Review

    virtual field

    populate

    autopopulate  (review.js)

## Index
