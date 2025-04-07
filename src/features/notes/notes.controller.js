import NoteRepository from "./notes.model.js";
import ApplicationError from "../../middlewares/applicationError.js";
export default class NotesControler {
  constructor() {
    this.notesRepository = new NoteRepository();
  }

  async getNotesControler(req, res, next) {
    try {
      // console.log('hii')
      let { email } = req.user;
      let notes = await this.notesRepository.getNotes(email);
      res.status(200).json(notes);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next(
        new ApplicationError("Something went wrong while fetching notes", 400)
      );
    }
  }

  async getNoteByIdController(req, res, next) {
    try {
      console.log("hii");
      let { id } = req.params;
      let { userId } = req.user;
      let result = await this.notesRepository.getNoteById(id, userId);
      if (result.note) {
        res.status(200).json(result.note);
      } else {
        res.status(400).json(result);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while fetching notes",
        400
      ));
    }
  }

  async getNoteByCategoryController(req, res, next) {
    try {
      let { category } = req.params;
      let { userId } = req.user;
      let result = await this.notesRepository.getNoteByCategory(
        category.toString(),
        userId
      );
      res.status(400).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while fetching notes",
        400
      ));
    }
  }

  async createNotesController(req, res, next) {
    try {
      let { userId } = req.user;
      let { title, content, categories } = req.body;

      let note = await this.notesRepository.createNote(
        userId,
        title,
        content,
        categories
      );
      res.status(200).json(note);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while creating the note",
        400
      ));
    }
  }

  async deleteNotesController(req, res, next) {
    try {
      let { userId } = req.user;
      let notesId = req.params.id;

      let result = await this.notesRepository.deleteNote(userId, notesId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while deleting the note",
        400
      ));
    }
  }

  async updateNoteController(req, res, next) {
    try {
      let { userId } = req.user;
      let notesId = req.params.id;
      let data = req.body;
      let result = await this.notesRepository.updateNote(userId, notesId, data);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while updating the note",
        400
      ));
    }
  }

  async switchArchiveController(req, res, next) {
    try {
      let { userId } = req.user;
      let notesId = req.params.id;
      //   let data = req.body;
      let result = await this.notesRepository.switchArchive(userId, notesId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while updating notes",
        400
      ));
    }
  }
}
