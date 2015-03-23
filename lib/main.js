var dualShock = require('dualshock-controller'),
    turret = require('./turret.js'),
    speech = require('./speech.js'),
    armed = false,
    controller = dualShock(),
    controllerEvents = [{
        controllerEvent: 'dpadUp:press',
        response: turret.up
    }, {
        controllerEvent: 'dpadUp:release',
        response: turret.stop
    }, {
        controllerEvent: 'dpadDown:press',
        response: turret.down
    }, {
        controllerEvent: 'dpadUp:release',
        response: turret.stop
    }, {
        controllerEvent: 'dpadLeft:press',
        response: turret.left
    }, {
        controllerEvent: 'dpadLeft:release',
        response: turret.stop
    }, {
        controllerEvent: 'dpadRight:press',
        response: turret.right
    }, {
        controllerEvent: 'dpadRight:release',
        response: turret.stop
    }, {
        controllerEvent: 'r2:press',
        response: fire
    }, {
        controllerEvent: 'l2:press',
        response: quickFire
    }, {
        controllerEvent: 'psxButton:press',
        response: armWeapons
    },{
        controllerEvent: 'r1:press',
        response: demoralize
    }];

function demoralize () {
    speech.demoralize();
}

function armWeapons () {
    if(armed) {
        speech.say('Weapon systems standing by');
        armed = !armed;
    } else {
        speech.say('Weapons hot');
        armed = !armed;
    }
}
function quickFire () {
    if (armed) {
        turret.fire();
        setTimeout(function () {
            speech.taunt();
        }, 2000);
    } else {
       speech.say('negative');
    }
}

function fire() {
    if (armed) {
        speech.taunt();
        setTimeout(function () {
            turret.fire();
        }, 2000);
    } else {
        speech.say('negative');
    }
}

controller.connect();
//Wire up controller events.
for (var i = 0; i < controllerEvents.length; i++) {
    controller.on(controllerEvents[i].controllerEvent, controllerEvents[i].response);
}
speech.say('turret is Online');
