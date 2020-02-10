// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = 5000;
let history = [];
// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
}) //end server up

// routes
app.post( '/calculate', ( req, res )=>{
    console.log( 'in /calculate POST:', req.body );
    let answer = 0;
    if( req.body.operator === '-' ){
        answer = Number( req.body.num0 ) - Number( req.body.num1 );
    }
    else if( req.body.operator === '*' ){
        answer = Number( req.body.num0 ) * Number( req.body.num1 );
    }
    else if( req.body.operator === '/' ){
        answer = Number( req.body.num0 ) / Number( req.body.num1 );
    }
    else {
        answer = Number( req.body.num0 ) + Number( req.body.num1 );
    }

    console.log( answer );

    res.sendStatus( 200 );
}) // end /calculate POST