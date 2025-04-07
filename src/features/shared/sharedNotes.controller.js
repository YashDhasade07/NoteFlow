import SharedNoteRepository from "./sharedNotes.model.js";
import ApplicationError from "../../middlewares/applicationError.js";
export default class SharedNoteControler {
  constructor() {
    this.sharedNoteRepository = new SharedNoteRepository();
  }

  async createSharedNoteControler(req, res, next) {
    try {
      //let ownerId, sharedWith, noteId, permission;
      let data = req.body;
      let ownerId = req.user.userId;
      data = { ...data, ownerId };
      let result = await this.sharedNoteRepository.createSharedNote(data);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
              next(error);
            }
            next( new ApplicationError(
              "Something went wrong while creating notes access",
              400
            ));
    }
  }

  async getSharedNoteToMeController(req, res, next) {
    try {
      let { userId } = req.user;
      let result = await this.sharedNoteRepository.getSharedNoteToMe(userId);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while fetching notes access",
        400
      ));
    }
  }

  async updateSharedNote(req, res, next) {
    try {
      let { userId } = req.user;
      let notesId = req.params.id;
      let data = req.body;
      let result = await this.sharedNoteRepository.updateSharedNote(
        userId,
        notesId,
        data
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while updating notes access",
        400
      ));
    }
  }

  async removeSharedAccessController(req, res, next) {
    try {
      let { userId } = req.user;
      let accessId = req.params.id;

      let result = await this.sharedNoteRepository.removeSharedAccess(
        userId,
        accessId
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while deleting notes access",
        400
      ));
    }
  }

  async updateAccessController(req, res, next) {
    try {
      let { userId } = req.user;
      let accessId = req.params.id;
        let {permission} = req.body;
      let result = await this.sharedNoteRepository.updateAccess(userId, accessId,permission);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      if (error instanceof ApplicationError) {
        next(error);
      }
      next( new ApplicationError(
        "Something went wrong while updating notes access",
        400
      ));
    }
  }
}
