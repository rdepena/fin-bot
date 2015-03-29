var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var speech = require('./lib/speech.js');
var nerfTurret = require('nerf-turret'),
  turret = new nerfTurret.Turret();

app.use(express.static(__dirname + '/public'));

var functionMap = {
    up : turretMove,
    down: turretMove,
    left: turretMove,
    right: turretMove,
    stop: turretMove,
    fire: fire,
    demoralize: demoralize
};

function turretMove(direction) {
    console.log(direction);
    var turretCommand = turret[direction];
    if (turretCommand) {
        turretCommand.call();
    }
}

function fire() {
    speech.taunt();
    setTimeout(function () {
        turret.fire();
    }, 2000);
}
function demoralize() {
    speech.demoralize();
}
io.on('connection', function(socket){
  socket.on('command', function(data) {
    console.log(data);
    var response = functionMap[data.command];
    response(data.command);
  });
});

turret.on('ready', function () {
    speech.say('Turret is Online');
    http.listen(9000, function(){
        console.log('listening on *:9000');
    });
});
