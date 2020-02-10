$( document ).ready( onReady );

// globals
let selectedOperator = '';
let num0Input = '';
let num1Input = '';

function clearInputs(){
    console.log( 'in clearInputs' );
    selectedOperator = '';
    num0Input = '';
    num1Input = '';
} //end clearInputs

function displayEquation(){
    console.log( 'in displayEquation' );
    $( '#equationOut' ).text( num0Input + selectedOperator + num1Input );
} // end displayEquation

function equals(){
    console.log( 'in equals' );
    let objectToSend = {
        num0: num0Input,
        num1: num1Input,
        operator: selectedOperator
    }
    console.log( 'sending:', objectToSend );
    $.ajax({
        type: 'POST',
        url: '/calculate',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST with:', response );
        getAnswer();
    }).catch( function( err ){
        console.log( err );
        alert( 'error with calculation. see console for details' );
    })
} // end equals

function getAnswer(){
    console.log( 'in getAnswer' );
    // make AJAX GET call to /calculate
    $.ajax({
        type: 'GET',
        url: '/calculate'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        // display answer
        let el = $( '#answerOut' );
        el.empty();
        el.append( response );
        $( '#equationOut' ).text( response );
        getHistory();
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting answer' );
    })
} // end getAnswer

function getHistory(){
    console.log( 'in getHistory' );
    $.ajax({
        type: 'GET',
        url: '/history'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        // display history on DOM
        let el = $( '#historyOut' );
        el.empty();
        for( let i=0; i<response.length; i++){
            el.append( `<li>${ response[i].equation.num0 } ${ response[i].equation.operator }
                ${ response[i].equation.num1 } = ${ response[i].answer }</li>` );
        } //end for
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting history' );
    })
} // end getHistory

function onReady(){
    $( '#equalsButton' ).on( 'click', equals );
    $( '.numberButton' ).on( 'click', selectNumber );
    $( '.operatorButton' ).on( 'click', operator );
    $( '#clearButton' ).on( 'click', clearInputs );
    // load history when page loads
    getHistory();
} // end onReady

function operator(){
    console.log( 'in operator:', $( this ).text() );
    selectedOperator = $( this ).text();
    displayEquation();
} // end operator

function selectNumber(){
    console.log( 'in selectNumber:', $( this ).text() );
    if( selectedOperator === '' ){
        // append to num0Input
        num0Input += $( this ).text();
    }else{
        // append to num1Input
        num1Input += $( this ).text();
    }
    displayEquation();
} // end selectNumber