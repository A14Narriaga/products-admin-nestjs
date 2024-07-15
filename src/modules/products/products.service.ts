import {
	Injectable,
	InternalServerErrorException,
	NotFoundException
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { CreateProductDto, PaginationDto, UpdateProductDto } from "./dto"
import { Product } from "./entities"

interface MongoErrorResponse {
	index: number
	code: number
	errmsg: string
	keyPattern: unknown
	keyValue: unknown
}

@Injectable()
export class ProductsService {
	constructor(
		@InjectModel(Product.name) private productModel: Model<Product>,
		private jwtService: JwtService
	) {}
	async create(createProductDto: CreateProductDto) {
		try {
			const newProduct = new this.productModel(createProductDto)
			await newProduct.save()
			return newProduct
		} catch (error: unknown) {
			const _error = error as MongoErrorResponse
			throw new InternalServerErrorException(`Please contact to support`)
		}
	}

	async findAll(paginationDto: PaginationDto) {
		try {
			const { limit = 3, offset = 0 } = paginationDto
			const productsPromise = this.productModel
				.find()
				.limit(limit)
				.skip(offset)
				.sort({
					name: 1
				})
				.exec()
			const totalPromise = this.productModel.countDocuments().exec()
			const [products, total] = await Promise.all([
				productsPromise,
				totalPromise
			])
			return { products, total }
		} catch (error) {
			const _error = error as MongoErrorResponse
			throw new InternalServerErrorException(`Please contact support`)
		}
	}

	async findOne(id: string) {
		try {
			const product = await this.productModel.findById(id).exec()
			if (!product) {
				throw new NotFoundException(`Product with ID ${id} not found`)
			}
			return product
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error
			}
			throw new InternalServerErrorException(`Please contact support`)
		}
	}

	async update(id: string, updateProductDto: UpdateProductDto) {
		try {
			const updatedProduct = await this.productModel
				.findByIdAndUpdate(id, updateProductDto, { new: true })
				.exec()
			if (!updatedProduct) {
				throw new NotFoundException(`Product with ID ${id} not found`)
			}
			return updatedProduct
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error
			}
			throw new InternalServerErrorException(`Please contact support`)
		}
	}

	async remove(id: string) {
		try {
			const deletedProduct = await this.productModel
				.findByIdAndDelete(id)
				.exec()
			if (!deletedProduct) {
				throw new NotFoundException(`Product with ID ${id} not found`)
			}
			return deletedProduct
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw error
			}
			throw new InternalServerErrorException(`Please contact support`)
		}
	}
}
