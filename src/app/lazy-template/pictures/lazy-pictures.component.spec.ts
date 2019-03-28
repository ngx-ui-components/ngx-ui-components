import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTemplateComponent } from './lazy-pictures.component';

describe('LazyTemplateComponent', () => {
  let component: LazyTemplateComponent;
  let fixture: ComponentFixture<LazyTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LazyTemplateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
