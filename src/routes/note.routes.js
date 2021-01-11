import expressValidator from "express-joi-validation";
import express from "express";
const router = express.Router();

// Middlewares
import auth from "./../middleware/auth.middleware.js";

// Controller
import {
  createNewNoteController,
  getAllUnarchivedNotesController,
  getAllArchivedNotesController,
  updateNoteByIdController,
  deleteNoteByIdController,
  changeArchiveStatusByIdController,
  searchNotesController,
} from "../controllers/notes/notes.controller.js";

// Validators
import {
  NoteValidator,
  NoteSearchValidator,
} from "../validators/note.validator.js";

const validator = expressValidator.createValidator({
  passError: true,
});

/**
 * @api {get} /api/notes/
 * @apiName Get All Archived Notes
 *
 * @apiSuccess (200) {Object} `Note` object array
 */
router.get("/archived", auth, getAllArchivedNotesController);

/**
 * @api {get} /api/notes/
 * @apiName Get All Unarchived Notes
 *
 * @apiSuccess (200) {Object} `Note` object array
 */
router.get("/unarchived", auth, getAllUnarchivedNotesController);

/**
 * @api {post} /api/notes
 * @apiName Create new Note
 *
 * @apiParam  {String} [title] Note Title
 * @apiParam  {String} [content] Note Content
 *
 * @apiSuccess (200) {Object} Success Message Object
 */
router.post("/", auth, validator.body(NoteValidator), createNewNoteController);

/**
 * @api {put} /api/notes
 * @apiName Edit a Note
 *
 * @apiParam  {String} [id] Note ID
 * @apiParam  {String} [title?] Note Title
 * @apiParam  {String} [content?] Note Content
 *
 * @apiSuccess (200) {Object} Success Message Object
 */
router.put(
  "/:id",
  auth,
  validator.body(NoteValidator),
  updateNoteByIdController
);

/**
 * @api {delete} /api/notes
 * @apiName Delete a Note
 *
 * @apiParam  {String} [id] Note ID
 *
 * @apiSuccess (200) {Object} Success Message Object
 */
router.delete("/:id", auth, deleteNoteByIdController);

/**
 * @api {patch} /api/notes
 * @apiName Archive or Unarchive a Note
 *
 * @apiParam  {String} [id] Note ID
 *
 * @apiSuccess (200) {Object} Success Message Object
 */
router.patch("/:id", auth, changeArchiveStatusByIdController);

/**
 * @api {get} /api/notes/search
 * @apiName Search Notes
 *
 * @apiSuccess (200) {Object} `Note` object array
 */
router.get(
  "/search",
  auth,
  validator.query(NoteSearchValidator),
  searchNotesController
);

export default router;
