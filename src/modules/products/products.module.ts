import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { AuthModule } from "../auth"
import { Product, ProductSchema } from "./entities"
import { ProductsController } from "./products.controller"
import { ProductsService } from "./products.service"

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Product.name,
				schema: ProductSchema
			}
		]),
		AuthModule
	],
	controllers: [ProductsController],
	providers: [ProductsService]
})
export class ProductsModule {}
