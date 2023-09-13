import { makeAutoObservable } from "mobx";
import { oneUploadingFile } from "../components/OneUploadingFile";
import Cloud from "../components/Cloud";

type cloud = React.ComponentProps<typeof Cloud>;
type files = cloud["files"];
type uploadFilesType = oneUploadingFile & { controller?: AbortController };

export type modals =
  | "new folder"
  | "upload file"
  | "upload folder"
  | "delete"
  | "delete trash"
  | "update name"
  | "recover"
  | "download";

class Files {
  activeModal: modals | null = null;
  activeFile: NonNullable<files>[number] | null = null;
  uploadFiles: uploadFilesType[] = [];
  folderPath: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setActiveModal(modal: modals) {
    this.activeModal = modal;
  }

  removeActiveModals() {
    this.activeModal = null;
  }

  setActiveFile(id: NonNullable<files>[number]) {
    this.activeFile = id;
  }

  removeActiveFile() {
    this.activeFile = null;
  }

  setUploadFile(file: uploadFilesType) {
    this.uploadFiles.push(file);
    return this.uploadFiles.length - 1;
  }

  updateProgressUploadFile(index: number, value: number) {
    this.uploadFiles[index] = { ...this.uploadFiles[index], value };
  }

  removeUploadFile(index: number) {
    this.uploadFiles[index].controller?.abort();
    this.uploadFiles.splice(index, 1);
  }

  addFolderPath(id: number) {
    this.folderPath.push(id);
  }

  removeLastFolderPath() {
    this.folderPath.pop();
  }

  getLastFolderPath() {
    return this.folderPath[this.folderPath.length - 1];
  }
}

export default new Files();
