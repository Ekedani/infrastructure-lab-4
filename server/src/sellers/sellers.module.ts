import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerSchema } from './schemas/seller.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
  ],
  controllers: [SellersController],
  providers: [SellersService],
})
export class SellersModule {}
