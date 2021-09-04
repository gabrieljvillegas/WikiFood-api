/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Recipe, conn } = require("../../src/db.js");

const agent = session(app);
const recipe = {
  name: "Milanea a la napolitana",
};

describe("Recipe routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Recipe.sync({ force: true }).then(() => Recipe.create(recipe))
  );
  describe("GET /recipes", () => {}).timeout(6000);
  it("Si pasan un name como query, responde con una receta que incluye ese nombre", async () => {
    try {
      const res = await agent.get("/recipes?name=rice");
      expect(res.body[0].name).to.be.include("rice");
    } catch (error) {
      console.log(error);
    }
  }).timeout(6000);
});
describe("POST /recipes", () => {
  it("responds with 200", async () => {
    try {
      await agent
        .post("/recipes")
        .send({ name: "prueba", summary: "prueba" })
        .expect(200);
    } catch (err) {
      console.log(err);
    }
  });

  it("Si no pasa el nombre responda con un 400", async () => {
    try {
      await agent.post("/recipes").send({}).expect(400);
    } catch (err) {
      console.log(err);
    }
  });
  it("Si no pasa summary responde con 400", async () => {
    try {
      await agent.post("/recipe").send({ name: "prueba" }).expect(400);
    } catch (err) {
      console.log(err);
    }
  });
  it("Muestra que crea correctamente una receta", async () => {
    try {
      const res = await agent
        .post("/recipe")
        .send({ name: "prueba", description: "summary" });
      expect(res.body.name).to.be.equal("prueba");
    } catch (err) {
      console.log(err);
    }
  });
});
