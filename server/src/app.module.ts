import { Module } from '@nestjs/common';
import { ViewersModule } from './viewers/viewers.module';
import { TicketsModule } from './tickets/tickets.module';
import { SellersModule } from './sellers/sellers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    ViewersModule,
    TicketsModule,
    SellersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
