export class User {
  uid: string;
  name: string;

  constructor(uid?: string, name?: string) {
    this.uid = (uid) ? uid : '';
    this.name = (name) ? name : '';
  }

  deserialize() {
    return Object.assign({}, this);
  }
}
