const request = require("supertest");
const app = require("./server"); // Import the Express app
// dbConnection.test.js
const mysql = require("mysql");

// Mock the mysql.createConnection function
jest.mock("mysql", () => ({
  createConnection: jest.fn(() => ({
    connect: jest.fn(),
    query: jest.fn(),
  })),
}));

describe("GET /button_1", () => {
  it("should return status 200 and an array of unique movies", async () => {
    const response = await request(app).get("/button_1");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    // Assuming the response contains movie objects with "Title", "Type", "Year", "imdbID", and "Poster" fields
    const movieFields = ["Title", "Type", "Year", "imdbID", "Poster"];
    response.body.forEach((movie) => {
      expect(movie).toEqual(expect.objectContaining(movieFields));
    });
  });

  // Test other scenarios if needed
});

describe("Database Connection", () => {
  it("should create a database connection", () => {
    // Call the Express app to initiate the database connection
    // The mocked createConnection function will be used
    request(app).get("/button_1");

    // Ensure mysql.createConnection was called
    expect(require("mysql").createConnection).toHaveBeenCalled();

    // Ensure that the connect function was called on the connection object
    const mockConnection = require("mysql").createConnection();
    expect(mockConnection.connect).toHaveBeenCalled();
  });
});
