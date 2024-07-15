import { Module } from "@nestjs/common"

import { ConfigModule } from "./config"
import { AuthModule, ProductsModule } from "./modules"
import { SharedModule } from "./shared"

@Module({
	imports: [ConfigModule, SharedModule, AuthModule, ProductsModule],
	controllers: [],
	providers: []
})
export class AppModule {}
