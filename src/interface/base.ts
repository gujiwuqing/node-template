import { ApiProperty } from '@midwayjs/swagger';

export class BaseListDTO {
  @ApiProperty({ description: '页码' })
  pageNo?: number;

  @ApiProperty({ description: '页数' })
  pageSize?: number;
}
