import mongoose from "mongoose";
import NoteSchema from "./notes.schema.js";
import ApplicationError from "../../middlewares/applicationError.js";
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
      throw new ApplicationError("Something went wrong while fetching notes", 400)
    }
  }

  async getNoteById(id, userId) {
    try {
      let note = await NoteModel.findById(id);
      if (!note) {
        // return { status: false, message: "No note exist with this id" };
        throw new ApplicationError("No note exist with this id", 404)
        
    }
    if (note.userId == userId) {
        // await NoteModel.findByIdAndDelete(id);
        return { status: true, note };
    } else {
        // return {
            //   status: false,
            //   message: "You are not authorised to access this note",
            // };
            throw new ApplicationError("You are not authorised to access this note", 403)
      }
    } catch (error) {
        if(error instanceof ApplicationError){
            throw error
        }
        throw new ApplicationError("Something went wrong while fetching notes", 400)
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
        throw new ApplicationError("Something went wrong while fetching notes by category", 400)
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
        throw new ApplicationError("Something went wrong while creating note", 400)
    }
}

async deleteNote(userId, noteId) {
    try {
        let note = await NoteModel.findById(noteId);
        if (!note) {
            // return { status: false, message: "No note exist with this id" };
            throw new ApplicationError("No note exist with this id", 404)
        }
        if (note.userId == userId) {
            await NoteModel.findByIdAndDelete(noteId);
            return { status: true, message: "Note deleted successfully" };
        } else {
            // return {
            //     status: false,
            //     message: "You are not authorised to delete this note",
            // };
            throw new ApplicationError("You are not authorised to delete this note", 401)
        }
    } catch (error) {
        console.log(error);
        if(error instanceof ApplicationError){
            throw error
        }
        throw new ApplicationError("Something went wrong while deleting note", 400)
      
    }
  }

  async updateNote(userId, noteId, data) {
    try {
      let note = await NoteModel.findById(noteId);
      if (!note) {
        // return { status: false, message: "No note exist with this id" };
        throw new ApplicationError("No note exist with this id", 404)

      }
      if (note.userId == userId) {
        let result = await NoteModel.findByIdAndUpdate(noteId, data, {
          new: true,
        });
        return result;
      } else {
        // return {
        //   status: false,
        //   message: "You are not authorised to update this note",
        // };
        throw new ApplicationError("You are not authorised to update this note", 401)
      }
    } catch (error) {
        console.log(error);
        if(error instanceof ApplicationError){
            throw error
        }
        throw new ApplicationError("Something went wrong while updating note", 400)    }
  }

  async switchArchive(userId, noteId) {
    try {
      let note = await NoteModel.findById(noteId);
      if (!note) {
        // return { status: false, message: "No note exist with this id" };
        throw new ApplicationError("No note exist with this id", 404)
      }
      if (note.userId == userId) {
        note.isArchived = !note.isArchived;

        await note.save();
        // await NoteModel.updateOne(noteId, note);
        return `switched archive status to ${note.isArchived}`;
      } else {
        // return {
        //   status: false,
        //   message: "You are not authorised to update this note",
        // };
        throw new ApplicationError("You are not authorised to update this note", 401)
      }
    } catch (error) {
        console.log(error);
        if(error instanceof ApplicationError){
            throw error
        }
        throw new ApplicationError("Something went wrong while updating note", 400) 
    }
  }
}

