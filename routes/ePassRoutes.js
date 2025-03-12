const { generatePass } = require("../controllers/epassControllers");

const router = require("express").Router();

router.get("/v1/epass/download/:id", generatePass);
module.exports = router;
