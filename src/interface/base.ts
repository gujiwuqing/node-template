import { ApiProperty } from '@midwayjs/swagger';

export class BaseListDTO {
  @ApiProperty({ description: '页码', example: 1 })
  pageNo?: number;

  @ApiProperty({ description: '页数', example: 10 })
  pageSize?: number;
}
