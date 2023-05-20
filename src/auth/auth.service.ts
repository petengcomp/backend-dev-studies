import { HttpException, HttpStatus, Injectable, UseGuards } from '@nestjs/common';
import { JwtGuard } from './jwt.guard';
import { RoleGuard, Roles } from './role.guard';

@Injectable()
export class AuthService {

    @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
    adminLogged(){
        throw new HttpException("Logged as admin", HttpStatus.ACCEPTED);
    }

    @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
    userLogged(){
        throw new HttpException("Logged as normal user", HttpStatus.ACCEPTED);
    }
}
