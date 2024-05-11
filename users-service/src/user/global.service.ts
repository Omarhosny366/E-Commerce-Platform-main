import { Injectable } from '@nestjs/common';

@Injectable()
export class GlobalService {
  private globalUser: any = null;

  setGlobalUser(user: any) {
    this.globalUser = user;
  }

  getGlobalUser() {
    return this.globalUser;
  }
}
