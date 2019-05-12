import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { Rating, StarRaterComponent } from './star-rater.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  template: '<ngx-ui-star-rater [formControl]="rating" [ratings]="ratings"></ngx-ui-star-rater>',
})
class TestHostComponent {
  @ViewChild(StarRaterComponent)
  public starRaterComponent: StarRaterComponent;

  public rating: FormControl = new FormControl({ value: null, disabled: false });

  public ratings: Rating[] = [
    {
      text: 'must GTFO ASAP',
      color: '#ff3722',
    },
    {
      text: 'meh',
      color: '#ff8622',
    },
    {
      text: "it's ok",
      color: '#ffce00',
    },
    {
      text: "I'd be sad if a black hole ate it",
      color: '#73cf11',
    },
    {
      text: '10/10 would write review on Amazon',
      color: '#00b67a',
    },
  ];
}

describe('StarRaterComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let testHostComponent: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StarRaterComponent, TestHostComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent.starRaterComponent).toBeTruthy();
  });

  it('should set the star rating based on the formControl value', () => {
    testHostComponent.rating.patchValue(3);
    hostFixture.detectChanges();
    expect(testHostComponent.starRaterComponent._value).toEqual(3);
    const compiled = hostFixture.debugElement.nativeElement;
  });

  it('should set disabled class when formControl is disabled', () => {
    testHostComponent.rating.disable();
    hostFixture.detectChanges();
    const compiled = hostFixture.debugElement.nativeElement;
    const stars = compiled.querySelector('ngx-ui-star-rater .stars');
    expect(stars.classList.contains('disabled')).toBe(true);
  });

  it('should remove disabled class when formControl is enabled', () => {
    testHostComponent.rating.disable();
    hostFixture.detectChanges();
    const compiled = hostFixture.debugElement.nativeElement;
    const stars = compiled.querySelector('ngx-ui-star-rater .stars');
    expect(stars.classList.contains('disabled')).toBe(true);
    testHostComponent.rating.enable();
    hostFixture.detectChanges();
    expect(stars.classList.contains('disabled')).toBe(false);
  });

  it('should not call touch or change events when disabled', () => {
    testHostComponent.rating.patchValue(3);
    testHostComponent.rating.disable();
    hostFixture.detectChanges();
    const compiled = hostFixture.debugElement.nativeElement;
    const star1 = compiled.querySelector('ngx-ui-star-rater .stars .star');
    star1.dispatchEvent(new Event('click'));
    hostFixture.detectChanges();
    expect(testHostComponent.rating.value).toBe(3);
  });

  it('should call touched when star selected', () => {
    const compiled = hostFixture.debugElement.nativeElement;
    let star1 = compiled.querySelector('ngx-ui-star-rater .stars .star');
    star1.dispatchEvent(new Event('click'));
    hostFixture.detectChanges();
    expect(compiled.querySelector('ngx-ui-star-rater').classList.contains('ng-touched')).toBe(true);
  });

  it('should call change with rating value when star selected', () => {
    const compiled = hostFixture.debugElement.nativeElement;
    const star3 = compiled.querySelectorAll('ngx-ui-star-rater .stars .star')[2];
    star3.dispatchEvent(new Event('click'));
    hostFixture.detectChanges();
    expect(testHostComponent.rating.value).toBe(3);
  });
});
