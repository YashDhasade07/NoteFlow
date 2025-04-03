import SharedNoteRepository from "./sharedNotes.model.js";

export default class SharedNoteControler {
  constructor() {
    this.sharedNoteRepository = new SharedNoteRepository();
  }

  async createSharedNoteControler(req, res, next) {
    try {
      //let ownerId, sharedWith, noteId, permission;
      let data = req.body;
      let ownerId = req.user.userId;
      let result = await this.sharedNoteRepository.createSharedNote(ownerId,data);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    }
  }

  // async getNoteByIdController(req, res, next) {
  //   try {
  //     console.log('hii')
  //     let { id } = req.params;
  //     let { userId } = req.user;
  //     let result = await this.notesRepository.getNoteById(id, userId);
  //     if (result.note) {
  //       res.status(200).json(result.note);
  //     } else {
  //       res.status(400).json(result);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async getNoteByCategoryController(req, res, next) {
  //   try {
  //       console.log('hii');
  //     let { category } = req.params;
  //     let { userId } = req.user;
  //     let result = await this.notesRepository.getNoteByCategory(category.toString(), userId);
  //       res.status(400).json(result);
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async createNotesController(req, res, next) {
  //   try {
  //     let { userId } = req.user;
  //     let { title, content, categories } = req.body;

  //     let note = await this.notesRepository.createNote(
  //       userId,
  //       title,
  //       content,
  //       categories
  //     );
  //     res.status(200).json(note);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async deleteNotesController(req, res, next) {
  //   try {
  //     let { userId } = req.user;
  //     let notesId = req.params.id;

  //     let result = await this.notesRepository.deleteNote(userId, notesId);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // async updateNoteController(req, res, next) {
  //   try {
  //     let { userId } = req.user;
  //     let notesId = req.params.id;
  //     let data = req.body;
  //     let result = await this.notesRepository.updateNote(userId, notesId, data);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  
  // async switchArchiveController(req, res, next) {
  //   try {
  //     let { userId } = req.user;
  //     let notesId = req.params.id;
  //   //   let data = req.body;
  //     let result = await this.notesRepository.switchArchive(userId, notesId);
  //     res.status(200).json(result);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
// userId:{type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
//     title: {type: String, required: true,},
//     content: {type: String},
//     isArchived: {type: Boolean, default: false},
//     categories: [{type: String}],
//     createdAt: {type: Date, default : Date.now()},
//     updatedAt: {type: Date, default : Date.now() ,}
