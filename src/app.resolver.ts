import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { AuthGuard } from './auth/auth.guard';
import { User } from './user/entities/user.entity';
import * as jwt from 'jsonwebtoken';
import { JwtGuard } from './auth/jwt.guard';
import { RoleGuard, Roles } from './auth/role.guard';

@Resolver()
export class AppResolver {

    @Query(() => String)
    @UseGuards(AuthGuard)
    login(
        @Args({name: "email", type: () => String}) email: string,
        @Args({name: "password", type: () => String}) password: string,
        @Context("user") user: User
    ): string{
        let payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        return jwt.sign(payload, "key", {expiresIn: "60s"}); 
    }

    // Query examples for admin and normal user with jwt
    @Query(() => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.ADMIN))
    securedDataForAdmin(@Context("user") user: User): any{
        return "data to admin user" + JSON.stringify(user);
    }

    @Query(() => String)
    @UseGuards(JwtGuard, new RoleGuard(Roles.NORMAL_USER))
    securedDataForNormaUser(@Context("user") user: User): any{
        return "data to normal user" + JSON.stringify(user);
    }
}
