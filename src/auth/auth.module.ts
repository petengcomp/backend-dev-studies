import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { JwtGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

@Module({
    imports: [UserModule],
    providers: [AuthGuard, JwtGuard],
})
export class AuthModule {}
