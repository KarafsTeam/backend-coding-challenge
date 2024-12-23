import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('App')
@Controller('/')
export class AppController {
  @Get('health')
  checkHealth(@Res() res: Response) {
    res.status(HttpStatus.OK).json({ status: 'ok' });
  }
}
