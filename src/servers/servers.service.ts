import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import CreateServerDto from './dto/create-server.dto';
import UpdateServerDto from './dto/update-server.dto';

@Injectable()
export class ServersService {
  constructor(private db: PrismaService) {}

  private async validateMACAndNickname(
    mac_address?: string,
    nickname?: string,
    exludeId?: number,
  ) {
    if (mac_address) {
      const existingServerWithMac = await this.db.server.findFirst({
        where: {
          mac_address: mac_address,
          NOT: exludeId ? { id: exludeId } : undefined,
        },
      });
      if (existingServerWithMac) {
        throw new BadRequestException(
          'A server with the same MAC address already exists.',
        );
      }
    }
    if (nickname) {
      const existingServerWithNickname = await this.db.server.findFirst({
        where: {
          nickname: nickname,
          NOT: exludeId ? { id: exludeId } : undefined,
        },
      });
      if (existingServerWithNickname) {
        throw new BadRequestException(
          'A server with the same nickname already exists.',
        );
      }
    }
  }

  async findAll() {
    return await this.db.server.findMany();
  }

  async findOne(id: number) {
    const server = await this.db.server.findUnique({
      where: { id },
    });
    if (!server) {
      throw new NotFoundException(`${id} azonosítójú szerver nem található.`);
    }

    return server;
  }

  async create(server: CreateServerDto) {
    await this.validateMACAndNickname(server.mac_address, server.nickname);

    return await this.db.server.create({
      data: {
        ...server,
        memory_gb: Number(server.memory_gb),
        storage_gb: Number(server.storage_gb),
      },
    });
  }

  async update(id: number, server: UpdateServerDto) {
    await this.findOne(id);
    await this.validateMACAndNickname(server.mac_address, server.nickname, id);

    return await this.db.server.update({
      where: { id },
      data: {
        ...server,
        memory_gb: Number(server.memory_gb),
        storage_gb: Number(server.storage_gb),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.db.server.delete({
      where: { id },
    });
  }
}
