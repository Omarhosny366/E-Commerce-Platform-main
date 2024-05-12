// UserSingleton.ts

import { User } from './schemas/user.schema';

export class UserSingleton {
  private static instance: UserSingleton;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): UserSingleton {
    if (!UserSingleton.instance) {
      UserSingleton.instance = new UserSingleton();
    }
    return UserSingleton.instance;
  }

  public setCurrentUser(user: User): void {
    this.currentUser = user;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}
