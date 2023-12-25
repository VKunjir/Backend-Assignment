// Task 1: Array Manipulation
// function to get unique element from given array
function getUniqueElement(arr) {
    let uniqueArr = [];

    for (let i = 0; i < arr.length; i++) {
        let flag = true;

        for (let j = 0; j < uniqueArr.length; j++) {
            if (arr[i] === uniqueArr[j]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            uniqueArr.push(arr[i]);
        }
    }

    return uniqueArr;
}


let arr = [1, 2, 6, 8, 2, 3, 1, 5, 6, 3, 8];
let newArr = getUniqueElement(arr);
console.log("Unique element in array",newArr);

// Task 2: Object Operations
function mergeCarObjects(car1, car2) {
    // Create a new object to store the merged properties
    let mergedCar = {};

    // Merge properties from car1
    for (let prop in car1) {
        if (car1.hasOwnProperty(prop)) {
            mergedCar[prop] = car1[prop];
        }
    }

    // Merge properties from car2, overriding existing properties from car1 if present in car2
    for (let prop in car2) {
        if (car2.hasOwnProperty(prop)) {
            mergedCar[prop] = car2[prop];
        }
    }

    return mergedCar;
}

// Car objects
let car1 = {
    brand: 'Toyota',
    model: 'Camry',
    year: 2020
};

let car2 = {
    color: 'Red',
    year: 2022
};

let mergedCar = mergeCarObjects(car1, car2);
console.log(mergedCar);

// Task 3: Logical Operations
function findCommonElements(arr1, arr2) {
    let commonElements = [];

    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                // Check if the common element already exists in the commonElements array
                let isAlreadyAdded = false;
                for (let k = 0; k < commonElements.length; k++) {
                    if (arr1[i] === commonElements[k]) {
                        isAlreadyAdded = true;
                        break;
                    }
                }
                // If the element is not already in the commonElements array, add it
                if (!isAlreadyAdded) {
                    commonElements.push(arr1[i]);
                }
                break; // Break the inner loop as the common element is found
            }
        }
    }

    return commonElements;
}

// Two array
let array1 = [1, 2, 3, 4, 5];
let array2 = [3, 4, 5, 6, 7];
let commonElements = findCommonElements(array1, array2);
console.log(commonElements); // Output: [3, 4, 5]
