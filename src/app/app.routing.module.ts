import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';

import { ReadingProgressBarComponent } from './reading-progress-bar/reading-progress-bar.component';
import { LazyComponentsComponent } from './lazy-template/components/lazy-components.component';
import { LazyPicturesComponent } from './lazy-template/pictures/lazy-pictures.component';
import { LazyTemplatesComponent } from './lazy-template/lazy-template.component';
import { ControlValueAccessorComponent } from './control-value-accessor/control-value-accessor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reading-progress-bar', component: ReadingProgressBarComponent },
  { path: 'control-value-accessor', component: ControlValueAccessorComponent },
  {
    path: 'lazy-template',
    component: LazyTemplatesComponent,
    children: [
      {
        path: 'pictures',
        component: LazyPicturesComponent,
      },
      {
        path: 'components',
        component: LazyComponentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
