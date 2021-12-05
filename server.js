const express = require( 'express' );
let path = require('path');
const app = express();
let notification=[]
let message;
app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

const server = app.listen(8000);

const io = require( 'socket.io' )( server );

app.get('/', function(req, res) {
    res.render("index", {});
})

io.on( 'connection', function( socket ){
    message = {id: socket.id, type:'join'}
    notification.push(message)
    socket.emit('allMessages', {messages:notification})
    socket.broadcast.emit( 'newMessage', {message:message} );
    socket.on('notification', function(){
        message = {id: socket.id, type:'notification'}
        notification.push(message)
        io.emit( 'newMessage', {message:message} );
    })

    socket.on('disconnect', function(){
        message = {id: socket.id, type:'disconnect'}
        notification.push(message)
        socket.broadcast.emit( 'newMessage', {message:message} );
    })

});