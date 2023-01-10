import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  
  constructor(
    private readonly configService: ConfigService
  ){}
  
  use(req: any, res: any, next: () => void) {
    
    const key = req.body.key;
    const secretKey = this.configService.get<string>("API_KEY");
    
    if(!key){
      throw new HttpException("Request requires an API key", HttpStatus.FORBIDDEN);
    }

    if(key !== secretKey){
      throw new HttpException("Invalid API key", HttpStatus.FORBIDDEN);
    }
    
    next();
  }
}
