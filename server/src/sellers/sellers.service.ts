import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './schemas/seller.schema';
import { FindSellersDto } from './dto/find-sellers.dto';

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller.name) private readonly sellerModel: Model<Seller>,
  ) {}

  create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const seller = new this.sellerModel(createSellerDto);
    return seller.save();
  }

  findAll(findSellersDto: FindSellersDto): Promise<Seller[]> {
    return this.sellerModel
      .find({
        firstName: { $regex: findSellersDto.firstName || '', $options: 'i' },
        lastName: { $regex: findSellersDto.lastName || '', $options: 'i' },
        gender: { $regex: findSellersDto.gender || '', $options: 'i' },
      })
      .exec();
  }

  async findOne(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findById(id).exec();
    if (!seller) {
      throw new NotFoundException(`Seller #${id} not found`);
    }
    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.sellerModel
      .findOneAndUpdate({ _id: id }, { $set: updateSellerDto }, { new: true })
      .exec();
    if (!seller) {
      throw new NotFoundException(`Seller #${id} not found`);
    }
    return seller;
  }

  async remove(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findByIdAndDelete(id).exec();
    if (!seller) {
      throw new NotFoundException(`Seller #${id} not found`);
    }
    return seller.value;
  }

  async getImage(id: string) {
    const seller = await this.findOne(id);
    if (!seller.image) {
      throw new NotFoundException(`Image not found`);
    }
    return {
      path: seller.image,
      format: seller.imageFormat,
    };
  }

  async updateImage(id: string, image: Express.Multer.File) {
    const seller = await this.findOne(id);
    seller.image = image.filename;
    seller.imageFormat = image.mimetype;
    await this.sellerModel.updateOne({ _id: id }, seller).exec();
  }
}
