import { Module } from '@nestjs/common';
import { ViewersModule } from './viewers/viewers.module';
import { TicketsModule } from './tickets/tickets.module';
import { SellersModule } from './sellers/sellers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viewer } from './viewers/entities/viewer.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Ticket } from './tickets/entities/ticket.entity';
import { Order } from './tickets/entities/order.entity';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [Viewer, Ticket, Order],
        namingStrategy: new SnakeNamingStrategy(),
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
