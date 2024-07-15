import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Product {
	_id?: string

	@Prop({ required: true })
	name!: string

	@Prop({ required: true })
	price!: number

	@Prop({ required: true })
	stock!: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
