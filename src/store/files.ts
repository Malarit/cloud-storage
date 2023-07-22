import { makeAutoObservable } from "mobx";

export type modals =
  | "new folder"
  | "upload file"
  | "upload folder"
  | "delete"
  | "update name"
  | "recover";

class Files {
  activeModal: modals | null = null;
  activeFileId: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveModal(modal: modals) {
    this.activeModal = modal;
  }

  removeActiveModals() {
    this.activeModal = null;
  }

  setActiveFileId(id: number) {
    this.activeFileId = id;
  }

  removeActiveFileId() {
    this.activeFileId = null;
  }
}

export default new Files();
