const request = require('supertest');
const app = require('./app'); // Importing the Express app
const Product = require("./Product");

// Testing POST /api/products endpoint
describe('Products API - POST /api/products', () => {
// Test to create a new product
test("should create a new product", async () => {
  const response = await request(app)
    .post("/api/products")
    .send({
      name: 'Sample Product',
      desc: 'Sample description',
      price: 10
    });

  console.log(response.body);

  expect(response.statusCode).toBe(201); // Change to response.statusCode
  expect(response.body).toHaveProperty('success', true);
  expect(response.body).toHaveProperty('product');
  // expect(response.body.product).toHaveProperty('id');
});

  // Test to validate if request body is empty
  test("should return 500 if request body is empty", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({});

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  // Test to validate if 'name' field is missing
  test("should return 500 if 'name' field is missing", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        desc: 'Sample description',
        price: 10
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });

  // Test to validate if 'price' field is missing
  test("should return 500 if 'price' field is missing", async () => {
    const response = await request(app)
      .post("/api/products")
      .send({
        name: 'Sample Product',
        desc: 'Sample description'
      });

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });
});

// Testing PUT /api/products/:id endpoint
describe('Products API - PUT /api/products/:id', () => {
  // Test to update an existing product
  test("should update an existing product", async () => {
    // const existingProduct = await Product.findOne(3);
    const existingProduct = await Product.findOne({ id: 3 });


    const response = await request(app)
      .put(`/api/products/${existingProduct.id}`)
      .send({
        name: 'Updated Product',
        desc: 'Updated description',
        price: 20
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toHaveProperty('id', existingProduct.id);
  });

  // Test to validate if product ID doesn't exist
  test("should return 404 if product ID doesn't exist", async () => {
    const invalidProductId = 'invalid_id';

    const response = await request(app)
      .put(`/api/products/${invalidProductId}`)
      .send({
        name: 'Updated Product',
        desc: 'Updated description',
        price: 20
      });

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Product not found');
  });

  // Test to validate if request body is empty
  test("should return 500 if request body is empty", async () => {
    const existingProduct = await Product.findOne(2);

    const response = await request(app)
      .put(`/api/products/${existingProduct.id}`)
      .send({});

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });
});

// Testing DELETE /api/products/:id endpoint
describe('Products API - DELETE /api/products/:id', () => {
  // Test to delete an existing product
  test("should delete an existing product", async () => {
    const existingProduct = await Product.findOne(2);

    const response = await request(app)
      .delete(`/api/products/${existingProduct.id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Product deleted successfully');
  });

  // Test to validate if product ID doesn't exist
  test("should return 404 if product ID doesn't exist", async () => {
    const invalidProductId = 'invalid_id';

    const response = await request(app)
      .delete(`/api/products/${invalidProductId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Product not found');
  });
});

// Testing GET /api/products/:id endpoint
describe('Products API - GET /api/products/:id', () => {
  // Test to retrieve product by ID
  test("should retrieve product by ID", async () => {
    const productId = 3;

    const response = await request(app)
      .get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toHaveProperty('id', productId);
  });

  // Test to validate if product is not found
  test("should handle product not found", async () => {
    const productId = 2;

    const response = await request(app)
      .get(`/api/products/${productId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Product not found');
  });

  // Test to handle server error
  test("should handle server error", async () => {
    jest.spyOn(Product, 'findOne').mockImplementation(() => {
      throw new Error('Server error');
    });

    const response = await request(app)
      .get("/api/products/3");

    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('error');
  });
});