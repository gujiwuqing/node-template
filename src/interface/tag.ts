import { BaseListDTO } from './base';
import { Rule, RuleType } from '@midwayjs/validate';

export interface TagSearchDTO extends BaseListDTO {
  name?: string;
}

export class TagDTO {
  @Rule(RuleType.string().required())
  name: string;
}
