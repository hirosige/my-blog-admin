import * as moment from 'moment';
import { User } from '../models/user';

export class Comment {
  user: User;
  initial: string;
  content: string;
  date: number;
  key?: string;
  edit_flag?: boolean;

  constructor(user: User, content: string) {
    this.user = user;
    this.initial = user.name.slice(0, 1);
    this.content = content;
    this.date = +moment();
  }

  deserialize() {
    this.user = this.user.deserialize();
    return Object.assign({}, this);
  }

  setData(date: number, key: string): Comment {
    this.date = date;
    this.key = key;
    this.edit_flag = false;
    return this;
  }
}

