let socket = io( 'http://localhost:8000' );
let message;

$('#notify').on('click',function(){
    console.log('click')
    socket.emit( 'notification', {} );
})

function getMessage(msg){
    if(msg.type == 'join'){
        message = 'joined us!'
    }
    else if(msg.type == 'disconnect'){
        message = 'left us!'
    } 
    else{
        message = 'just triggered a notification!'
    }

    let newMessage = `<p> Socket ID ${msg.id} ${message} </p>`;
    $( '.messageBox' ).append( newMessage );

}


socket.on( 'newMessage', function( data ){
    getMessage(data.message);
});

socket.on('allMessages', function(data){
    for(let i=0; i<data.messages.length; i++){
        let msg= data.messages[i];
        getMessage(msg);
    }

}
)