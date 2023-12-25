# Backend-Assignment
# JavaScript Operations Explained

### Refer index.js for first 3 task and app.js and app.test.js for Node.js and TypeScript Assignment

## Task 1: Array Manipulation

The `getUniqueElement` function takes an array as input and returns a new array containing only the unique elements from the original array. It iterates through the input array and checks for uniqueness by comparing elements and populating a new array with unique elements. For example:

~~~javascript
let arr = [1, 2, 6, 8, 2, 3, 1, 5, 6, 3, 8];
let newArr = getUniqueElement(arr);
console.log("Unique elements in the array:", newArr); // Output: [1, 2, 6, 8, 3, 5]
~~~

## Task 2: Object Operations
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
console.log(mergedCar); // Output: { brand: 'Toyota', model: 'Camry', year: 2022, color: 'Red' }

## Task 3: Logical Operations
let array1 = [1, 2, 3, 4, 5];
let array2 = [3, 4, 5, 6, 7];
let commonElements = findCommonElements(array1, array2);
console.log(commonElements); // Output: [3, 4, 5]

# Node.js and TypeScript Assignment

This assignment involves the development of a simple RESTful API using Node.js and TypeScript.

## Task 4: RESTful API Development

### Description
The provided code implements an API with the following endpoints:

- `GET /api/products`: Retrieve a list of products.
- `GET /api/products/:id`: Retrieve details of a specific product by ID.
- `POST /api/products`: Create a new product.
- `PUT /api/products/:id`: Update details of a specific product by ID.
- `DELETE /api/products/:id`: Delete a product by ID.

The API uses an in-memory data store (an array) to manage product data.

### Usage

1. **GET /api/products**: Fetches all products.
2. **GET /api/products/:id**: Fetches details of a product with a specific ID.
3. **POST /api/products**: Creates a new product. Requires a 'name' and 'price' field in the request body.
4. **PUT /api/products/:id**: Updates details of a product with a specific ID. Requires a valid product ID and the updated fields in the request body.
5. **DELETE /api/products/:id**: Deletes a product with a specific ID.

## Task 5: Middleware Implementation

### Description
The middleware `logRequest` logs details of incoming requests to the API, including the timestamp, HTTP method, and requested URL.

## Task 6: Unit Testing

### Description
Unit tests have been implemented using the Jest testing framework to test various endpoints of the API. These tests cover different scenarios, including success cases and error handling.

### Running Tests
To run the unit tests:

1. Install dependencies: `npm install`
2. Run tests: `npm test`

---

## Project Setup

### Prerequisites
- Node.js installed on your machine
- MongoDB database running locally on `mongodb://127.0.0.1:27017/Product`

### Installation
1. Clone this repository.
2. Install dependencies: `npm install`

### Running the Application
To start the server:

```bash
npm start

