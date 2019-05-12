import { ReadingProgressBarDirective } from './reading-progress-bar.directive';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { ScrollService } from '../shared/scroll.service';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div class="progression" ngxUiReadingProgressBar></div>
  `,
})
class TestTemplateComponent {}

describe('ReadingProgressBarDirective', () => {
  let fixture: ComponentFixture<TestTemplateComponent>, debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadingProgressBarDirective, TestTemplateComponent],
      providers: [ScrollService],
    });
    fixture = TestBed.createComponent(TestTemplateComponent);
    debugElement = fixture.debugElement;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    const directive = debugElement.query(By.directive(ReadingProgressBarDirective));
    expect(directive).toBeTruthy();
  });
});
