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
          floor.on("up_button_pressed down_button_pressed", function() {
              let num = floor.floorNum();
              console.log("F" + num + " wants pickup");
              let closest = closestElevator(num);
              if (!closest.destinationQueue.includes(num)) {
                  closest.goToFloor(num);
              }
              printElevatorQueues();
          })
        })
        elevators.forEach(function(elevator) {
            elevator.on("floor_button_pressed", function(num) {
                console.log("E" + elevator.name + " wants F" + num);
                if (!elevator.destinationQueue.includes(num)) {elevator.goToFloor(num);}
                printElevatorQueues();
            })
        })
        function closestElevator(wantedFloor) {
            let distances = [];
            for (let i = 0; i < elevators.length; i++) {
                let currentFloor = elevators[i].currentFloor();
                console.log("E" + i + " is at F" + currentFloor + ", " + elevators[i].destinationDirection() + " then F" + elevators[i].destinationQueue[0]);
                let distance = wantedFloor - currentFloor;
                if (distance >= 0 && elevators[i].destinationQueue[0] >= currentFloor) {
                    distances[i] = distance;  //distance is already positive
                } else if (distance <= 0 && elevators[i].destinationQueue[0] <= currentFloor) {
                    distances[i] = distance * -1; //distance is negative, make it positive
                } else {
                    distances[i] = 999;
                }
            }
            let min = Math.min(...distances);
            let closestIndex = distances.indexOf(min);
            console.log("E" + closestIndex + " is closest to " + "F" + wantedFloor);
            return elevators[closestIndex];
        }
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
