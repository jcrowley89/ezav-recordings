const express = require("express");
const router = express.Router();
const controllers = require("./controllers");
const authenticate = require("./middleware/authenticate");
const authorize = require("./middleware/authorize");
const upload = require("./middleware/upload");
const convertPresentation = require("./middleware/convertPresentation");

router.post("/login", controllers.auth.login);
router.get("/getCurrentUser", controllers.auth.getCurrentUser);

router.use(authenticate);

router.get("/programs", authorize("anyAdmin"), controllers.program.index);
router.post("/programs", authorize("anyAdmin"), upload.program, controllers.program.create);
router.get("/programs/:id", controllers.program.read);
router.put("/programs/:id", authorize("anyAdmin"), controllers.program.update);
router.delete("/programs/:id", authorize("anyAdmin"), controllers.program.delete);

router.get("/recordings", controllers.recording.index);
router.post("/recordings", upload.presentation, convertPresentation, controllers.recording.create);
router.get("/recordings/:id", controllers.recording.read);
router.put("/recordings/:id", controllers.recording.update);
router.delete("/recordings/:id", authorize("anyAdmin"), controllers.recording.delete);

router.get("/presenters", authorize("anyAdmin"), controllers.presenter.index);
router.post("/presenters", authorize("anyAdmin"), controllers.presenter.create);
router.get("/presenters/:id", authorize("anyAdmin"), controllers.presenter.read);
router.put("/presenters/:id", authorize("anyAdmin"), controllers.presenter.update);
router.delete("/presenters/:id", authorize("anyAdmin"), controllers.presenter.delete);

router.get("/admins", authorize("anyAdmin"), controllers.admin.index);
router.post("/admins", authorize("anyAdmin"), controllers.admin.create);
router.get("/admins/:id", authorize("anyAdmin"), controllers.admin.read);
router.put("/admins/:id", authorize("anyAdmin"), controllers.admin.update);
router.delete("/admins/:id", authorize("anyAdmin"), controllers.admin.delete);

module.exports = router;
