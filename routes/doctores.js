const express = require("express");
const {
  obtenerDoctores,
  agregarDoctor,
  eliminarDoctor,
  editarDoctor,
} = require("../controllers/doctor.controller");

const router = express.Router();

router.get("/", obtenerDoctores);
router.post("/", agregarDoctor);
router.delete("/:id", eliminarDoctor);
router.put("/:id", editarDoctor);

module.exports = router;
