import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowToken, windowProvider } from './window';

@NgModule({
  declarations: [],
  providers: [{ provide: WindowToken, useFactory: windowProvider }],
  imports: [CommonModule],
})
export class SharedModule {}
