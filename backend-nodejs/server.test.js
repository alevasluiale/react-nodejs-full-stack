const request = require("supertest");
const app = require("./server");
const axios = require("axios");

describe("GET Requests", () => {
  it("should respond with status 200 and movie data for /button_1", async () => {
    const response = await request(app).get("/button_1");
    expect(response.status).toBe(200);
  });

  it("should respond with status 200 and movie data for /button_2", async () => {
    const response = await request(app).get("/button_2");
    expect(response.status).toBe(200);
  });

  it("should respond with status 200 and movie data for /button_3", async () => {
    const response = await request(app).get("/button_3");
    expect(response.status).toBe(200);
  });

  it("should handle errors when fetching movies data", async () => {
    jest.spyOn(axios, "get").mockRejectedValue(new Error("API Error"));

    const response = await request(app).get("/button_1");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
