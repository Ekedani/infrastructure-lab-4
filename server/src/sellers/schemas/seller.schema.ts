import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Seller {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({
    required: true,
    enum: ['male', 'female'],
  })
  gender: string;
}

export const SellerSchema = SchemaFactory.createForClass(Seller).set('toJSON', {
  versionKey: false,
});
