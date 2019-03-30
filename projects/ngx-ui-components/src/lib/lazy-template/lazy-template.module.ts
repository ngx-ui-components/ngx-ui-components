import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyTemplateComponent } from './lazy-template.component';

const ngxDeclarations = [LazyTemplateComponent];

@NgModule({
  declarations: [...ngxDeclarations],
  imports: [CommonModule],
  exports: [...ngxDeclarations],
})
export class LazyTemplateModule {}
