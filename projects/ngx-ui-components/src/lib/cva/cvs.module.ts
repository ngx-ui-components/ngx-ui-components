import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarRaterComponent } from './star-rater/star-rater.component';

const ngxDeclarations = [StarRaterComponent];

@NgModule({
  declarations: [...ngxDeclarations],
  imports: [CommonModule],
  exports: [...ngxDeclarations],
})
export class CvaModule {}
