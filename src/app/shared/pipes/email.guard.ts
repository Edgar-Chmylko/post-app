import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'hideEmailDomain'
})

export class hideEmailDomainPipe implements PipeTransform {
  transform(value: string) {
    const [prefix, domain] = value.split('@');

    const maskedDomain = '*'.repeat(domain.length);

    return `${prefix}@${maskedDomain}`
  }
}