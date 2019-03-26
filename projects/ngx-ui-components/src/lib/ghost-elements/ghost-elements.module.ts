import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

const ngxDeclarations = [];

@NgModule({
  declarations: [...ngxDeclarations],
  imports: [CommonModule, SharedModule],
  exports: [...ngxDeclarations],
})
export class GhostElementsModule {}
