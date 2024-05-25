import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSingleton } from './payment/userSingleton';
import { CartSingleton } from './payment/cartSingleton';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'UserSingleton', 
      useFactory: () => UserSingleton.getInstance(),
    },
    {
      provide: 'CartSingleton', 
      useFactory: () => CartSingleton.getInstance(),
    },
  ],
})
export class AppModule {}
