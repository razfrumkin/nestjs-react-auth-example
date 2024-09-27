import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { AuthInterceptor } from './auth/auth.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const reflector = app.get(Reflector)
    const configService = app.get(ConfigService)

    app.useGlobalInterceptors(
        new AuthInterceptor(),
        new ClassSerializerInterceptor(reflector)
    )
    app.useGlobalPipes(new ValidationPipe())

    const port = configService.getOrThrow<number>('port')
    await app.listen(port)
}

bootstrap()
