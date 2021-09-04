const { Router } = require("express");
const router = Router();
const { Diet } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    let dietTypes = await Diet.findAll();

    dietTypes = dietTypes.map((type) => {
      return {
        id: type.id,
        name: type.name,
      };
    });

    res.json(dietTypes);
  } catch (error) {}
});

module.exports = router;
