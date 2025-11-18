import {
  IsAlphanumeric,
  IsIP,
  IsMACAddress,
  IsOptional,
  IsPositive,
} from 'class-validator';

export default class CreateServerDto {
  @IsIP(undefined)
  ip_address: string;

  @IsMACAddress()
  mac_address: string;

  @IsPositive()
  memory_gb: number;

  @IsPositive()
  storage_gb: number;

  @IsOptional()
  @IsAlphanumeric(undefined)
  nickname?: string;
}
