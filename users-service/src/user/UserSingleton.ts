import { User } from './schemas/user.schema';

export class UserSingleton {
  private static instance: UserSingleton;
  private currentUser: User | null = null;
  private lastSetTime: number | null = null;
  private resetTimer: NodeJS.Timeout | null = null;
  private readonly resetInterval: number = 60 * 60 * 1000; 

  private constructor() {}

  public static getInstance(): UserSingleton {
    if (!UserSingleton.instance) {
      UserSingleton.instance = new UserSingleton();
    }
    return UserSingleton.instance;
  }

  public setCurrentUser(user: User): void {
    this.currentUser = user;
    this.lastSetTime = Date.now();
    this.startResetTimer();
  }

  public getCurrentUser(): User | null {
    if (this.lastSetTime && Date.now() - this.lastSetTime > this.resetInterval) {
      this.reset();
    }
    return this.currentUser;
  }

  private reset(): void {
    this.currentUser = null;
    this.lastSetTime = null;
    // Stop the reset timer
    this.stopResetTimer();
  }

  private startResetTimer(): void {
    this.stopResetTimer(); // Make sure to stop any existing timer
    this.resetTimer = setTimeout(() => this.reset(), this.resetInterval);
  }

  private stopResetTimer(): void {
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
  }
}
