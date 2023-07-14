import { makeAutoObservable } from "mobx";

export type screens = "cloud" | "basket" | "profile";

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
