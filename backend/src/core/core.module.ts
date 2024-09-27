import { Global, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { configuration } from 'src/config/configuration'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ load: [configuration] }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                global: true,
                secret: configService.getOrThrow<string>('jwt.secret')
            })
        })
    ],
    providers: [],
    controllers: [],
    exports: [ConfigModule, JwtModule]
})
export class CoreModule {}
