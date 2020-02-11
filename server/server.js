// requires
const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );
// globals
const port = process.env.port || 5000;// use Heroku port or 5000 (so we can still local host it)
let history = [];
let answer = 0;
// spin up server
app.listen( port, ()=>{
    console.log( 'server is up on:', port );
}) //end server up

// routes
app.get( '/calculate', ( req, res )=>{
    console.log( 'in /calculate GET' );
    res.send( answer.toString() );
}) //end calculate GET
app.post( '/calculate', ( req, res )=>{
    console.log( 'in /calculate POST:', req.body );
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
    let historyObject = {
        equation: req.body,
        answer: answer
    }
    console.log( 'adding to history:', historyObject );
    history.push( historyObject );
    res.sendStatus( 200 );
}) // end /calculate POST
app.get( '/history', ( req, res )=>{
    console.log( 'in /history GET' );
    res.send( history );
}) //end /history GET