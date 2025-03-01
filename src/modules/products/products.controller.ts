import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards
} from "@nestjs/common"

import { AuthGuard } from "../auth/guards"
import { CreateProductDto, PaginationDto, UpdateProductDto } from "./dto"
import { ProductsService } from "./products.service"

@Controller("products")
@UseGuards(AuthGuard)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto)
	}

	@Get()
	findAll(@Query() paginationDto: PaginationDto) {
		return this.productsService.findAll(paginationDto)
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.productsService.findOne(id)
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(id, updateProductDto)
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.productsService.remove(id)
	}
}
