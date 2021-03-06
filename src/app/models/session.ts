import { User } from '../models/user';

export class Session {
  login: boolean;
  user: User;

  constructor() {
    this.login = false;
    this.user = new User();
  }

  reset(): Session {
    this.login = false;
    this.user = new User();
    return this;
  }
}
