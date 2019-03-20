import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReadingProgressBarDirective } from './reading-progress-bar.directive';

const ngxDeclarations = [ReadingProgressBarDirective];

@NgModule({
  declarations: [...ngxDeclarations],
  imports: [CommonModule],
  exports: [...ngxDeclarations],
})
export class ReadingProgressBarModule {}
