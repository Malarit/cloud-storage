import { makeAutoObservable } from "mobx";
import { get } from "../services/requests";

class Account {
  userId: number | undefined = -1;

  constructor() {
    makeAutoObservable(this);
  }

  setUserId(userId: number | undefined) {
    this.userId = userId;
  }

  removeUserId() {
    this.userId = undefined;
  }

  async requestUserId() {
    const user = await get.itsMe();
    this.setUserId(user.userId);
  }
}

export default new Account();
