import { BaseListDTO } from './base';
import { Rule, RuleType } from '@midwayjs/validate';
export interface FileSearchDTO extends BaseListDTO {
  name?: string;
}

export class FileDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  url: string;
}
