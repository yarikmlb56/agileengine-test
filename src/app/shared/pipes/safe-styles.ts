import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({name: 'safeStyle'})
export class SafeStylePipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }
  transform(value: string) {
    return this.sanitized.bypassSecurityTrustStyle(value);
  }
}
