import {
  Exception,
  GetErrorCode,
  PayloadResponse,
} from "../../services/response.service.js";
import {
  getAllUnarchivedNotes,
  getAllArchivedNotes,
  createNewNote,
  updateNoteById,
  deleteNoteById,
  changeArchiveStatusById,
  searchNotes,
} from "./notes.helper.js";

/**
 * Get All Archived Notes Controller
 * @param req Express Request
 * @param res Express Response
 */
export const getAllUnarchivedNotesController = async (req, res) => {
  console.log("Function getAllUnarchivedNotesController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { page = 1 } = req.query;
    const notes = await getAllUnarchivedNotes(user_id, page);

    res
      .status(200)
      .json(PayloadResponse("Get All Unarchived Notes Success", notes));
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * Get All Unarchived Notes Controller
 * @param req Express Request
 * @param res Express Response
 */
export const getAllArchivedNotesController = async (req, res) => {
  console.log("Function getAllArchivedNotesController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { page = 1 } = req.query;
    const notes = await getAllArchivedNotes(user_id, page);

    res
      .status(200)
      .json(PayloadResponse("Get All Archived Notes Success", notes));
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * Note Create Controller
 * @param req Express Request
 * @param res Express Response
 */
export const createNewNoteController = async (req, res) => {
  console.log("Function createNewNoteController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { title, content } = req.body;
    const newNote = await createNewNote(user_id, title, content);

    res.status(200).json(PayloadResponse("Note Added Success", newNote));
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * Note Edit Controller
 * @param req Express Request
 * @param res Express Response
 */
export const updateNoteByIdController = async (req, res) => {
  console.log("Function updateNoteByIdController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;

    const editedNote = await updateNoteById(id, title, content, user_id);

    res.json({
      payload: editedNote,
      message: "Note Updated Successfully",
      success: true,
    });
    res.status(200).json(PayloadResponse("Note Added Success", newNote));
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * Note Delete Controller
 * @param req Express Request
 * @param res Express Response
 */
export const deleteNoteByIdController = async (req, res) => {
  console.log("Function deleteNoteByIdController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { id } = req.params;
    const deletedNote = await deleteNoteById(id, user_id);

    res
      .status(200)
      .json(PayloadResponse("Note Removed Successfully", deletedNote));
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * Note Archive Status Change Controller
 * @param req Express Request
 * @param res Express Response
 */
export const changeArchiveStatusByIdController = async (req, res) => {
  console.log("Function changeArchiveStatusByIdController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { id } = req.params;
    const archivedNote = await changeArchiveStatusById(id, user_id);

    res
      .status(200)
      .json(
        PayloadResponse("Successfully Changed Archive Status", archivedNote)
      );
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};

/**
 * Note Search Controller
 * @param req Express Request
 * @param res Express Response
 */
export const searchNotesController = async (req, res) => {
  console.log("Function searchNotesController Execution Started");
  try {
    const { id: user_id } = req.user;
    const { keyword, page = 1 } = req.query;
    const notes = await searchNotes(user_id, keyword, page);

    res.status(200).json(PayloadResponse("Search Notes Success", notes));
  } catch (err) {
    console.error(err);
    res.status(GetErrorCode(err)).json(Exception(err));
  }
};
