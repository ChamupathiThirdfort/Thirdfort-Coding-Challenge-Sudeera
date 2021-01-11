import mongoose from "mongoose";
import {
  ArchieveNote,
  UnarchieveNote,
} from "../../services/archive.service.js";

// Models
import Note from "../../models/Note.model.js";

/**
 * Get Note by ID
 * @param note_id Note ID
 */
export const GetNoteById = async (note_id) => {
  console.log(`Getting Note ${note_id}`);
  try {
    const note = await Note.findById(note_id);
    if (!note) throw Error("Note not Exists:400");
    return note;
  } catch (err) {
    throw Error("Note not Exists:400");
  }
};

/**
 * Get All Unarchieved Notes
 * @param user_id User ID
 */
export const getAllUnarchivedNotes = async (user_id, page = 1, limit = 10) => {
  console.log(
    `Getting All Unarchived Notes for User ${user_id}, Page ${page}, Limit ${limit}`
  );
  try {
    const query = {
      userId: user_id,
      archived: false,
    };
    const paginate_config = {
      page: page,
      limit: limit,
      sort: { updatedAt: -1 },
    };
    const notes = await Note.paginate(query, paginate_config);

    return notes;
  } catch (err) {
    throw err;
  }
};

/**
 * Get All Archieved Notes
 * @param user_id User ID
 */
export const getAllArchivedNotes = async (user_id, page = 1, limit = 10) => {
  console.log(
    `Getting All Archived Notes for User ${user_id}, Page ${page}, Limit ${limit}`
  );
  try {
    const query = {
      userId: user_id,
      archived: true,
    };
    const paginate_config = {
      page: page,
      limit: limit,
      sort: { updatedAt: -1 },
    };
    const notes = await Note.paginate(query, paginate_config);

    return notes;
  } catch (err) {
    throw err;
  }
};

/**
 * Create New Note
 * @param user_id User ID
 * @param title Title
 * @param content Content
 */
export const createNewNote = async (
  user_id,
  title,
  content,
  archived = false
) => {
  console.log(
    `Creating Note. User Id: ${user_id}. Title: ${title}, Content: ${content}`
  );
  try {
    const newNote = new Note({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      content: content,
      archived: archived,
      userId: user_id,
    });

    const addedNote = await newNote.save();
    return addedNote;
  } catch (err) {
    throw err;
  }
};

/**
 * Update a Note
 * @param id Note ID
 * @param title Title to be Updated
 * @param content Content to be Updated
 */
export const updateNoteById = async (id, title, content, user_id) => {
  console.log(`Updating Note ${id}. Title: ${title}, Content: ${content}`);
  try {
    const note = await GetNoteById(id);
    if (note.userId !== user_id) throw Error("Note not Exists:400");

    await ArchieveNote(id, title, content);

    note.title = title;
    note.content = content;
    await note.save();

    return note;
  } catch (err) {
    throw err;
  }
};

/**
 * Delete a Note
 * @param id Note ID
 */
export const deleteNoteById = async (id, user_id) => {
  console.log(`Deleting Note ${id}`);
  try {
    const note = await GetNoteById(id);
    if (note.userId !== user_id) throw Error("Note not Exists:400");

    if (note.archived) await UnarchieveNote(id);
    await note.remove();

    return note;
  } catch (err) {
    throw err;
  }
};

/**
 * Changing Archive Status
 * @param id Note ID
 */
export const changeArchiveStatusById = async (id, user_id) => {
  console.log(`Changing ArchiveStatus in Note ${id}`);
  try {
    const note = await GetNoteById(id);
    if (note.userId !== user_id) throw Error("Note not Exists:400");

    note.archived
      ? await UnarchieveNote(id)
      : await ArchieveNote(id, note.title, note.content);

    note.archived = !note.archived;
    await note.save();

    return note;
  } catch (err) {
    throw err;
  }
};

/**
 * Search Notes
 * @param user_id User ID
 * @param keyword Search Keyword
 */
export const searchNotes = async (user_id, keyword, page = 1, limit = 10) => {
  console.log(
    `Searching Notes for User ${user_id}, Keyword ${keyword}, Page ${page}, Limit ${limit}`
  );
  try {
    const query = {
      userId: user_id,
      $text: { $search: keyword },
    };
    const paginate_config = {
      page: page,
      limit: limit,
      sort: { updatedAt: -1 },
    };
    const notes = await Note.paginate(query, paginate_config);

    return notes;
  } catch (err) {
    throw err;
  }
};
