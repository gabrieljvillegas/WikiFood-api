const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", async () => {
        try {
          await Recipe.create({
            summary: "Pastas rellenas con salsa roja y trozos de carne picada",
          });
        } catch (error) {
          expect(err.message).to.equal(
            "Es necesario cargar el resumen y el nombre"
          );
        }
      });
      it("should throw an error if summary is null", async () => {
        try {
          await Recipe.create({ name: "Milanesa a la napolitana" });
        } catch (error) {
          expect(err.message).to.equal(
            "Es necesario cargar el resumen y el nombre"
          );
        }
      });
      it("should work when its a valid title and summary", async () => {
        try {
          await Recipe.create({
            name: "Ravioles con bolognesa",
            summary: "Pastas rellenas con salsa roja y trozos de carne picada",
          });
          const recipe = await Recipe.findOne({
            where: {
              name: "Ravioles con bolognesa",
            },
          });
          expect(recipe.name).to.equal("Ravioles con bolognesa");
          expect(recipe.summary).to.equal(
            "Pastas rellenas con salsa roja y trozos de carne picada"
          );
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});
