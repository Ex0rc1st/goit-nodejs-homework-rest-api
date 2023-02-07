const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const supertest = require("supertest");
require("dotenv").config();

const app = require("../app");

const { MONGO_CON_URL } = process.env;

describe("user login test", () => {
  beforeAll(async () => {
    await mongoose.connect(MONGO_CON_URL);
  });

  afterAll(async () => {
    await mongoose.disconnect(MONGO_CON_URL);
  });

  it("should login user", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: "user7@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
    expect(response.body.token).not.toBeNull();
    expect(response.body.token).not.toBeUndefined();
    expect(response.body.token).not.toBe("");
  });
});
