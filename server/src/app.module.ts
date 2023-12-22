import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ViewersModule } from './viewers/viewers.module';
import { TicketsModule } from './tickets/tickets.module';
import { SellersModule } from './sellers/sellers.module';

@Module({
  imports: [ViewersModule, TicketsModule, SellersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
