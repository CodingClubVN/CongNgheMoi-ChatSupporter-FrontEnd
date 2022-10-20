import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarListUserComponent } from './sidebar-list-user.component';

describe('SidebarListUserComponent', () => {
  let component: SidebarListUserComponent;
  let fixture: ComponentFixture<SidebarListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarListUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
