import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

export const GA_PROPERTY = new InjectionToken<string>('Ga property');
export { GaService } from './ga.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule],
})
export class GoogleAnalyticsModule {
  static forRoot(gaProperty: string): ModuleWithProviders {
    return {
      ngModule: GoogleAnalyticsModule,
      providers: [{ provide: GA_PROPERTY, useValue: gaProperty }],
    };
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: GoogleAnalyticsModule,
      providers: [{ provide: GA_PROPERTY, useValue: null }],
    };
  }
}
