import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"

import { EnvConfig } from "../env"
const { dbPort, dbUsername, dbPassword, dbHost, dbName, appEnv } = EnvConfig()
const host = appEnv === "production" ? dbHost : `${dbHost}:${dbPort}`
const baseUrl = appEnv === "production" ? "mongodb+srv" : "mongodb"
const mongoUrl = `${baseUrl}://${dbUsername}:${dbPassword}@${host}`

@Module({
	imports: [
		MongooseModule.forRoot(mongoUrl, {
			dbName
		})
	]
})
export class MongodbModule {}
