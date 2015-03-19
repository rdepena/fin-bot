var HID = require('node-hid'),
    DOWN = 0x01,
    UP = 0x02,
    LEFT = 0x04,
    RIGHT = 0x08,
    FIRE = 0x10,
    STOP = 0x20,
    vendorId = 8483,
    productId = 4112,
    turretHid = new HID.HID(vendorId, productId),
    turret = {
        left : writeToTurret(LEFT),
        right: writeToTurret(RIGHT),
        up: writeToTurret(UP),
        down:writeToTurret(DOWN),
        stop: writeToTurret(STOP),
        fire: writeToTurret(FIRE)
    };

function writeToTurret(command) {
    return function () {
        turretHid.write([0x02, command, 0x00,0x00,0x00,0x00,0x00,0x00]);
    };
}

module.exports = turret;
