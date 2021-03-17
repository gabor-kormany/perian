const bearings = [
    {label: 'NORTH', advance: {x: 0, y: 1}},
    {label: 'EAST', advance: {x: 1, y: 0}},
    {label: 'SOUTH', advance: {x: 0, y: -1}},
    {label: 'WEST', advance: {x: -1, y: 0}}
    ];

const TURN_RIGHT = 1,
      TURN_LEFT  = -1
;

class Robot {
    constructor() {
        // not using ES6 private members as those don't work with Vue's Proxy based reactivity
        let bearing = 0,
            position = {
                x: 0,
                y: 0
            }
        ;


        // functions that are here and not in the prototype need to have access to the private fields

        function turn(direction) {
            bearing = (bearing + direction + bearings.length) % bearings.length;
        }

        function advance() {
            position.x += bearings[bearing].advance.x;
            position.y += bearings[bearing].advance.y;
        }

        function report() {
            return [position.x.toString(), position.y.toString(), bearings[bearing].label].join(' ');
        }

        this.execute = function execute(input) {
            let [x, y, bearingLabel, orders] = input.split(' ');

            position.x = parseInt(x);
            position.y = parseInt(y);

            bearing = bearings.findIndex((bearing) => {
                return bearing.label === bearingLabel;
            });

            return orders.split('').reduce((carry, order) => {
                switch(order) {
                    case 'L':
                        turn(TURN_LEFT);
                        break;
                    case 'R':
                        turn(TURN_RIGHT);
                        break;
                    case 'A':
                        advance()
                        break;
                }
                return report()
            }, '');
        }
    }
}

export default Robot;