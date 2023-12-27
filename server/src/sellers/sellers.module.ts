import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './schemas/seller.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
