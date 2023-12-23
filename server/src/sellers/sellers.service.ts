import { Injectable } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './schemas/seller.schema';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>,
  ) {}

  create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const seller = new this.sellerModel(createSellerDto);
    return seller.save();
  }

  findAll(): Promise<Seller[]> {
    return this.sellerModel.find().exec();
  }

  async findOne(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findById(id).exec();
    if (!seller) {
      throw new Error(`Seller #${id} not found`);
    }
    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.sellerModel
      .findOneAndUpdate({ _id: id }, { $set: updateSellerDto }, { new: true })
      .exec();
    if (!seller) {
      throw new Error(`Seller #${id} not found`);
    }
    return seller;
  }

  async remove(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findByIdAndDelete(id).exec();
    if (!seller) {
      throw new Error(`Seller #${id} not found`);
    }
    return seller.value;
  }
}
