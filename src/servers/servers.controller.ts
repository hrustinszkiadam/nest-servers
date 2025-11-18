import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ServersService } from './servers.service';
import CreateServerDto from './dto/create-server.dto';
import UpdateServerDto from './dto/update-server.dto';

@Controller('servers')
export class ServersController {
  constructor(private serversService: ServersService) {}

  @Get()
  async findAll() {
    return await this.serversService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.serversService.findOne(id);
  }

  @Post()
  async create(@Body() server: CreateServerDto) {
    return await this.serversService.create(server);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() server: UpdateServerDto,
  ) {
    return await this.serversService.update(id, server);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.serversService.remove(id);
  }
}
