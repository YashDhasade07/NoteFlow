import mongoose from "mongoose";
import SharedNoteSchema from "./sharedNotes.schema.js";
import NoteRepository from "../notes/notes.model.js";

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
        return {
          status: false,
          message: "Note not found",
        };
      }

      let note = response.note;
      if (note.userId == data.ownerId) {
        let sharedNote = new SharedNoteModel(data);
        await sharedNote.save();
        return sharedNote;
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

  async getSharedNoteToMe(userId) {
    try {
      console.log(userId);
      let objUserId = new mongoose.Types.ObjectId(userId)
      let notes = await SharedNoteModel.aggregate([
        {
          $match: {
            sharedWith : objUserId
          },
        },{
          $lookup:{
            from: "notes",
            localField: "noteId",
            foreignField: "_id",
            as: "notes"
          }
        },{
          $project:{
            notes: 1,
            _id :0
          }
        }
        
      ]);
      return notes;
    } catch (error) {
      console.log(error);
    }
  }
  
  // async getNoteById(id, userId) {
    async updateSharedNote(userId, noteId, data) {
      try {
        let shared = await SharedNoteModel.findOne({noteId,sharedWith:userId});
        if (!shared) {
          return { status: false, message: "Either you have no access to note or noteId dosent exist" };
        }
        console.log('shared: ', shared);
        if (shared.permission == 'edit') {
          console.log('hii');
          let note = await this.notesRepository.updateNote(shared.ownerId.toString(),noteId,data)
          return note;
        } else {
          return {
            status: false,
            message: "You only have read only access to this note",
          };
        }
      } catch (error) {
        console.log(error);
      }
    }
  //   try {
  //     let note = await NoteModel.findById(id);
  //     if (!note) {
  //       return { status: false, message: "No note exist with this id" };
  //     }
  //     if (note.userId == userId) {
  //       await NoteModel.findByIdAndDelete(id);
  //       return { status: true, note };
  //     } else {
  //       return {
  //         status: false,
  //         message: "You are not authorised to access this note",
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getNoteByCategory(category, userId) {
  //   let objectUserId = new mongoose.Types.ObjectId(userId);
  //   try {
  //     let notes = await NoteModel.aggregate([
  //       {
  //         $match: {
  //           userId: objectUserId,
  //           categories: { $in: [category] },
  //           isArchived: false,
  //         },
  //       },
  //     ]);
  //   //   console.log(notes);
  //     return notes;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deleteNote(userId, noteId) {
  //   try {
  //     let note = await NoteModel.findById(noteId);
  //     if (!note) {
  //       return { status: false, message: "No note exist with this id" };
  //     }
  //     if (note.userId == userId) {
  //       await NoteModel.findByIdAndDelete(noteId);
  //       return { status: true, message: "Note deleted successfully" };
  //     } else {
  //       return {
  //         status: false,
  //         message: "You are not authorised to delete this note",
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  // async switchArchive(userId, noteId) {
  //   try {
  //     let note = await NoteModel.findById(noteId);
  //     if (!note) {
  //       return { status: false, message: "No note exist with this id" };
  //     }
  //     if (note.userId == userId) {
  //       note.isArchived = !note.isArchived;

  //       await note.save();
  //       // await NoteModel.updateOne(noteId, note);
  //       return "switched archive status";
  //     } else {
  //       return {
  //         status: false,
  //         message: "You are not authorised to update this note",
  //       };
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
// }

//     userId:{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
//     title: {type: String, required: true,},
//     content: {type: String},
//     isArchived: {type: Boolean, default: false},
//     categories: [{type: String}],
//     createdAt: {type: Date, default : Date.now()},
//     updatedAt: {type: Date, default : Date.now() ,}
