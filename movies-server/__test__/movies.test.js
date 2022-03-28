const request = require("supertest");
const app = require("../src/app");

it("Return 200 with successfull movie creation with given title", async () => {
  const response = await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "no entry" });
  expect(response.statusCode).toBe(200);
});

it("Return 400 when a movie title already exists", async () => {
  await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "no entry" });
  const response = await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "no entry" });

  expect(response.statusCode).toBe(400);
});

it("Return 400 when user pass empty movie titile", async () => {
  const response = await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "" });

  expect(response.statusCode).toBe(400);
});

it("Return 400 for case insentisative title", async () => {
  await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "no entry" });

  const response = await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "No entry" });

  expect(response.statusCode).toBe(400);
});

it("Return 200 for list of all movies for user", async () => {
  await await request(app)
    .post("/movies")
    .set("authorization", process.env.JWT_TOKEN)
    .send({ movieTitle: "no entry" });

  const response = await await request(app)
    .get("/movies")
    .set("authorization", process.env.JWT_TOKEN);

  expect(response.statusCode).toBe(200);
});
