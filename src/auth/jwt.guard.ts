import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();
    const authorizationHeader = ctx.req.headers.authorization;

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
      try {
        const user = jwt.verify(token, 'key');
        ctx.user = user;
        return true;
      } catch (error) {
        throw new HttpException(
          'Invalid Token: ' + error.message,
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    return false;
  }
}

// To use authentication in resolvers, you have to insert @UseGuards(JwtGuard) decorator
