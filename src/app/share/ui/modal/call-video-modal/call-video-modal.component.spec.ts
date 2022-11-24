import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallVideoModalComponent } from './call-video-modal.component';

describe('CallVideoModalComponent', () => {
  let component: CallVideoModalComponent;
  let fixture: ComponentFixture<CallVideoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallVideoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallVideoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
