import mongoose from "mongoose";
import SharedNoteSchema from "./sharedNotes.schema.js";
import NoteRepository from "../notes/notes.model.js";
import ApplicationError from "../../middlewares/applicationError.js";

let SharedNoteModel = mongoose.model("sharednote", SharedNoteSchema);
export default class SharedNoteRepository {
  constructor() {
    this.notesRepository = new NoteRepository();
  }

  async createSharedNote(data) {
    try {
      // ownerId, sharedId, noteId, permission
      let response = await this.notesRepository.getNoteById(
        data.noteId,
        data.ownerId
      );

      if (!response) {
        // return {
        //   status: false,
        //   message: "Note not found",
        // };
        throw new ApplicationError("Note access not found", 404);
      }
      
      let shared = await SharedNoteModel.findOne({
        noteId: data.noteId,
        sharedWith: data.sharedWith,
      });
      
      if (shared) {
        // return {
        //   status: false,
        //   message: "user already has access to this note",
        // };
        throw new ApplicationError("user already has access to this note", 409);
      }

      let note = response.note;
      if (note.userId == data.ownerId) {
        let sharedNote = new SharedNoteModel(data);
        await sharedNote.save();
        return sharedNote;
      } else {
        // return {
        //   status: false,
        //   message: "You are not authorised to access this note",
        // };
         throw new ApplicationError("You are not authorised to access this note", 403)
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw new ApplicationError(
        "Something went wrong while creating notes",
        400
      );
    }
  }

  async getSharedNoteToMe(userId) {
    try {
      let objUserId = new mongoose.Types.ObjectId(userId);
      let notes = await SharedNoteModel.aggregate([
        {
          $match: {
            sharedWith: objUserId,
          },
        },
        {
          $lookup: {
            from: "notes",
            localField: "noteId",
            foreignField: "_id",
            as: "notes",
          },
        },
        {
          $project: {
            notes: 1,
            _id: 0,
            permission:1,
            sharedAccessId: `$_id`
          },
        },
      ]);
      return notes;
    } catch (error) {
      console.log(error)
      throw new ApplicationError(
        "Something went wrong while fetching notes",
        400
      );
    }
  }

  // async getNoteById(id, userId) {
  async updateSharedNote(userId, noteId, data) {
    try {
      let shared = await SharedNoteModel.findOne({
        noteId,
        sharedWith: userId,
      });
      if (!shared) {
        // return {
        //   status: false,
        //   message:
        //     "Either you have no access to note or else noteId dosent exist",
        // };
        throw new ApplicationError("Either you have no access to note or else noteId dosent exist", 404);
      }
      if (shared.permission == "edit") {
        let note = await this.notesRepository.updateNote(
          shared.ownerId.toString(),
          noteId,
          data
        );
        return note;
      } else {
        // return {
        //   status: false,
        //   message: "You only have read only access to this note",
        // };
        throw new ApplicationError("You only have read only access to this note", 401);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw new ApplicationError(
        "Something went wrong while updating notes access",
        400
      );
    }
  }

  async removeSharedAccess(userId, id) {
    try {
      let shared = await SharedNoteModel.findOne({ _id: id, ownerId: userId });
      if (!shared) {
        // return {
        //   status: false,
        //   message:
        //     "Either you have no access to note or else noteId dosent exist",
        // };
        throw new ApplicationError("Either you have no access to note or else noteId dosent exist", 404);
      }

      await SharedNoteModel.findByIdAndDelete(id);
      return { status: true, message: "Access removed successfully" };
    } catch (error) {
      cconsole.log(error);
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw new ApplicationError(
        "Something went wrong while removing notes access",
        400
      );
    }
  }

  async updateAccess(userId, id, permission) {
    try {
      let shared = await SharedNoteModel.findOne({ _id: id, ownerId: userId });
      if (!shared) {
        // return {
        //   status: false,
        //   message:
        //     "Either you have no access to note or else noteId dosent exist",
        // };
        throw new ApplicationError("Either you have no access to note or else noteId dosent exist", 404);

      }
      shared.permission = permission;

      await shared.save();
      return { status: true, message: `updated the access to ${permission}` };
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        throw error;
      }
      throw new ApplicationError(
        "Something went wrong while updating notes access",
        400
      );
    }
  }
}