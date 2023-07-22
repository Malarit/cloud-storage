import { makeAutoObservable } from "mobx";

export type screens = "cloud" | "trash" | "profile";

class Screens {
  activeScreen: screens = "cloud";

  constructor() {
    makeAutoObservable(this);
  }

  setActiveScreen(screen: screens) {
    this.activeScreen = screen;
  }
}

export default new Screens();
