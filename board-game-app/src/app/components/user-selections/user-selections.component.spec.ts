import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectionsComponent } from './user-selections.component';

describe('UserSelectionsComponent', () => {
  let component: UserSelectionsComponent;
  let fixture: ComponentFixture<UserSelectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSelectionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSelectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
