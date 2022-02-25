import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class NumericParam implements PipeTransform<string, number> {
  transform(value: string): number {
    if (typeof value === 'undefined') {
      return undefined;
    }
    const intVal = Number(value);
    if (isNaN(intVal)) {
      throw new BadRequestException('Validation failed, ?id must be a number.');
    }
    return intVal;
  }
}
