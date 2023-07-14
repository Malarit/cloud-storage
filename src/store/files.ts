import { makeAutoObservable } from "mobx";

export type modals = "new folder" | "upload file" | "upload folder";

class Files {
  activeModal: modals | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setActiveModal(modal: modals) {
    this.activeModal = modal;
  }

  removeActiveModals() {
    this.activeModal = null;
  }
}

export default new Files();
