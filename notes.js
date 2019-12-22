{
    init: function(elevators, floors) {
        for (let i = 0; i < elevators.length; i++) {
            elevators[i].name = i;
        }
        function printElevatorQueues() {
            console.log("");
            elevators.forEach(function(elevator) {
                console.log("E" + elevator.name + ": " + elevator.destinationQueue);
            })
            console.log("");
        }
        floors.forEach(function(floor) {
          floor.on("down_button_pressed up_button_pressed", function() {
              let num = floor.floorNum();
              console.log("F" + num + " wants pickup");
              let closest = closestElevator(num);
              closest.goToFloor(num);
              printElevatorQueues();
          })
        })
        elevators.forEach(function(elevator) {
            elevator.on("floor_button_pressed", function(num) {
                console.log("E" + elevator.name + " wants F" + num);
                elevator.goToFloor(num);
                printElevatorQueues();
            })
        })
        function closestElevator(num) {
            let distances = [];
            for (let i = 0; i < elevators.length; i++) {
                let curr = elevators[i].currentFloor();
                console.log("E" + i + " is at F" + curr);
                let distance = Math.abs(num - curr);
                distances[i] = distance;
            }
            let min = Math.min(...distances);
            let closestIndex = distances.indexOf(min);
            console.log("E" + closestIndex + " is closest to " + "F" + num);
            return elevators[closestIndex];
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}






{
    init: function(elevators, floors) {
        var a = 0;
        floors.forEach(function(floor) {
          floor.on("down_button_pressed up_button_pressed", function() {
              elevators[a].goToFloor(floor.floorNum());
              update_active_elevator();
          })
        })
        elevators.forEach(function(elevator) {
            elevator.on("passing_floor", function(num, dir) {
                if (elevator.loadFactor < 1) {
                if (dir == "up" && floors[num].buttonStates.up == "activated") {
                    elevator.destinationQueue.splice(0,0,num);
                    elevator.checkDestinationQueue();
                }
                if (dir == "down" && floors[num].buttonStates.down == "activated") {
                    elevator.destinationQueue.splice(0,0,num);
                    elevator.checkDestinationQueue();
                }
                }
            })
        })

        function update_active_elevator() {
            //a = (a + 1) % elevators.length;
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}









{
    init: function(elevators, floors) {
        var e0 = elevators[0];
        var e1 = elevators[1];
        floors.forEach(function(f) {
          f.on("down_button_pressed up_button_pressed", function() {
              e0.goToFloor(f.floorNum());
          })
        })
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}


// Whenever the elevator is idle (has no more queued destinations) ...
e0.on("idle", function() {
    // let's go to all the floors (or did we forget one?)
    e0.goToFloor(7);
    e0.goToFloor(6);
    e0.goToFloor(5);
    e0.goToFloor(4);
    e0.goToFloor(3);
    e0.goToFloor(2);
    e0.goToFloor(1);
    e0.goToFloor(0);
});

// Whenever the elevator is idle (has no more queued destinations) ...
e1.on("idle", function() {
    // let's go to all the floors (or did we forget one?)
    e1.goToFloor(0);
    e1.goToFloor(1);
    e1.goToFloor(2);
    e1.goToFloor(3);
    e1.goToFloor(4);
    e1.goToFloor(5);
    e1.goToFloor(6);
    e1.goToFloor(7);
});
