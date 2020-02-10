$( document ).ready( onReady );

// globals
let selectedOperator = '';

function equals(){
    console.log( 'in equals' );
    let objectToSend = {
        num0: $( '#num0In').val(),
        num1: $( '#num1In').val(),
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
    }).catch( function( err ){
        console.log( err );
        alert( 'error getting answer' );
    })
} // end getAnswer

function onReady(){
    $( '#equalsButton' ).on( 'click', equals );
    $( '.operatorButton' ).on( 'click', operator );
} // end onReady

function operator(){
    console.log( 'in operator:', $( this ).text() );
    selectedOperator = $( this ).text();
} // end operator