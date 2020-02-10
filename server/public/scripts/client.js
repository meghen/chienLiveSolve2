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
} // end equals

function onReady(){
    $( '#equalsButton' ).on( 'click', equals );
    $( '.operatorButton' ).on( 'click', operator );
} // end onReady

function operator(){
    console.log( 'in operator:', $( this ).text() );
    selectedOperator = $( this ).text();
} // end operator