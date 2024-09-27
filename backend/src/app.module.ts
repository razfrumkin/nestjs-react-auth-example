import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth/auth.guard'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { CoreModule } from './core/core.module'

@Module({
    imports: [CoreModule, AuthModule, UserModule],
    providers: [{ provide: APP_GUARD, useClass: AuthGuard }],
    controllers: [],
    exports: []
})
export class AppModule {}
