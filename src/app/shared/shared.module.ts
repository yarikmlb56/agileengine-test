import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AuthService, ImageHttpService } from './services';
import { SafeStylePipe } from './pipes';

@NgModule({
  declarations: [
    SafeStylePipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    SafeStylePipe
  ],
  providers: [
    AuthService,
    ImageHttpService,
  ],
})
export class SharedModule {
}
