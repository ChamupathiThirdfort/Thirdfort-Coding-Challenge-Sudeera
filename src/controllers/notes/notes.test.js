import fs from "fs";
import mongoose from "mongoose";
import { archieveNotePath } from "../../services/archive.service";
import {
  GetNoteById,
  createNewNote,
  getAllUnarchivedNotes,
  getAllArchivedNotes,
  deleteNoteById,
  changeArchiveStatusById,
} from "./notes.helper";

const notes = [
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "delectus aut autem",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: false,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "quis ut nam facilis et officia qui",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: false,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "fugiat veniam minus",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: false,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "et porro tempora",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: true,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "laboriosam mollitia et enim quasi adipisci quia provident illum",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: true,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "qui ullam ratione quibusdam voluptatem quia omnis",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: true,
  },
  {
    userId: "91868e3f-723d-4e97-9400-70119ef08bd1",
    title: "illo expedita consequatur quia in",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: true,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "quo adipisci enim quam ut ab",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: true,
  },
  {
    userId: "91868e3f-723d-4e97-9400-70119ef08bd1",
    title: "molestiae perspiciatis ipsa",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: false,
  },
  {
    userId: "4b31ea1c-5486-47f1-ac8f-996466af7a0e",
    title: "illo est ratione doloremque quia maiores aut",
    content: "molestiae ipsa aut voluptatibus pariatur dolor nihil",
    archived: true,
  },
];

// Open the DB connection
beforeAll(async () => {
  await mongoose.connect(
    global.__MONGO_URI__,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
    (err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
});

// Add New Notes Test
describe("Add New Notes", () => {
  test("Add new Note", async () => {
    await Promise.all(
      notes.map(async (note) => {
        const addedNote = await createNewNote(
          note.userId,
          note.title,
          note.content,
          note.archived
        );
        note["_id"] = addedNote._id;
        expect(note["_id"]).toBeInstanceOf(mongoose.Types.ObjectId);
      })
    );
  });
});

// Get Note by ID Test
describe("Get Note by ID", () => {
  test("Get Not Exist Note", async () => {
    try {
      await GetNoteById("1");
    } catch (err) {
      expect(err.message).toBe("Note not Exists:400");
    }
  });

  test("Get Exist Notes", async () => {
    await Promise.all(
      notes.map(async (note) => {
        const addedNote = await GetNoteById(note._id);
        expect(addedNote).toMatchObject(note);
      })
    );
  });
});

// Get All Notes Test
describe("Get All Notes", () => {
  test("Get All Archived Notes", async () => {
    const archivedNotes = await getAllArchivedNotes(
      "4b31ea1c-5486-47f1-ac8f-996466af7a0e"
    );
    expect(archivedNotes.docs.map((note) => note._id).sort()).toEqual(
      notes
        .filter(
          (note) =>
            note.userId === "4b31ea1c-5486-47f1-ac8f-996466af7a0e" &&
            note.archived === true
        )
        .map((note) => note._id)
        .sort()
    );
  });

  test("Get All Unarchived Notes", async () => {
    const archivedNotes = await getAllUnarchivedNotes(
      "4b31ea1c-5486-47f1-ac8f-996466af7a0e"
    );
    expect(archivedNotes.docs.map((note) => note._id).sort()).toEqual(
      notes
        .filter(
          (note) =>
            note.userId === "4b31ea1c-5486-47f1-ac8f-996466af7a0e" &&
            note.archived === false
        )
        .map((note) => note._id)
        .sort()
    );
  });
});

// Delete Notes Test
describe("Delete Notes", () => {
  test("Delete Note", async () => {
    try {
      const noteToBeDeleted = notes[0]._id;
      await deleteNoteById(noteToBeDeleted, noteToBeDeleted.userId);

      const isArchiveExists = fs.existsSync(archieveNotePath(noteToBeDeleted));
      expect(isArchiveExists).toBe(false);

      await GetNoteById(noteToBeDeleted);
    } catch (err) {
      expect(err.message).toBe("Note not Exists:400");
    }
  });
});

// Archive Status Change Test
describe("Archive Status Change", () => {
  test("Archive Note", async () => {
    const noteToBeArchived = notes[1];
    const currentArchiveStatus = noteToBeArchived.archived;

    // Change Archive Status
    await changeArchiveStatusById(
      noteToBeArchived._id,
      noteToBeArchived.userId
    );
    let note = await GetNoteById(noteToBeArchived);
    expect(note.archived).toBe(!currentArchiveStatus);

    // Check for Archived Zip
    let isArchiveExists = fs.existsSync(archieveNotePath(noteToBeArchived._id));
    if (note.archived) expect(isArchiveExists).toBe(true);
    else expect(isArchiveExists).toBe(false);

    // Change Archive Status
    await changeArchiveStatusById(
      noteToBeArchived._id,
      noteToBeArchived.userId
    );
    note = await GetNoteById(noteToBeArchived._id);
    expect(note.archived).toBe(currentArchiveStatus);

    // Check for Archived Zip
    isArchiveExists = fs.existsSync(archieveNotePath(noteToBeArchived._id));
    if (note.archived) expect(isArchiveExists).toBe(true);
    else expect(isArchiveExists).toBe(false);
  });
});

// Closing the DB connection allows Jest to exit successfully
afterAll((done) => {
  mongoose.connection.close();
  done();
});
