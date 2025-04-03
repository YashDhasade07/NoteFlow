import mongoose from "mongoose";
import NoteSchema from "./notes.schema.js";

let NoteModel = mongoose.model("note", NoteSchema);
export default class NoteRepository {
  async getNotes(email) {
    try {
      let notes = await NoteModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $match: {
            "userDetails.email": email,
            isArchived: false,
          },
        },
        {
          $project: {
            userId: 1,
            title: 1,
            content: 1,
            isArchived: 1,
            categories: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ]);
      return notes;
    } catch (error) {
      console.log(error);
    }
  }

  async getNoteById(id, userId) {
    try {
      let note = await NoteModel.findById(id);
      if (!note) {
        return { status: false, message: "No note exist with this id" };
      }
      if (note.userId == userId) {
        // await NoteModel.findByIdAndDelete(id);
        return { status: true, note };
      } else {
        return {
          status: false,
          message: "You are not authorised to access this note",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getNoteByCategory(category, userId) {
    let objectUserId = new mongoose.Types.ObjectId(userId);
    try {
      let notes = await NoteModel.aggregate([
        {
          $match: {
            userId: objectUserId,
            categories: { $in: [category] },
            isArchived: false,
          },
        },
      ]);
    //   console.log(notes);
      return notes;
    } catch (error) {
      console.log(error);
    }
  }

  async createNote(userId, title, content, categories) {
    try {
      let noteObj = { userId, title, content };
      if (categories instanceof Array) {
        noteObj = { ...noteObj, categories };
      }
      let note = new NoteModel(noteObj);
      await note.save();
      return note;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteNote(userId, noteId) {
    try {
      let note = await NoteModel.findById(noteId);
      if (!note) {
        return { status: false, message: "No note exist with this id" };
      }
      if (note.userId == userId) {
        await NoteModel.findByIdAndDelete(noteId);
        return { status: true, message: "Note deleted successfully" };
      } else {
        return {
          status: false,
          message: "You are not authorised to delete this note",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateNote(userId, noteId, data) {
    try {
      let note = await NoteModel.findById(noteId);
      if (!note) {
        return { status: false, message: "No note exist with this id" };
      }
      if (note.userId == userId) {
        let result = await NoteModel.findByIdAndUpdate(noteId, data, {
          new: true,
        });
        return result;
      } else {
        return {
          status: false,
          message: "You are not authorised to update this note",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async switchArchive(userId, noteId) {
    try {
      let note = await NoteModel.findById(noteId);
      if (!note) {
        return { status: false, message: "No note exist with this id" };
      }
      if (note.userId == userId) {
        note.isArchived = !note.isArchived;

        await note.save();
        // await NoteModel.updateOne(noteId, note);
        return "switched archive status";
      } else {
        return {
          status: false,
          message: "You are not authorised to update this note",
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
}
// }

//     userId:{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
//     title: {type: String, required: true,},
//     content: {type: String},
//     isArchived: {type: Boolean, default: false},
//     categories: [{type: String}],
//     createdAt: {type: Date, default : Date.now()},
//     updatedAt: {type: Date, default : Date.now() ,}
