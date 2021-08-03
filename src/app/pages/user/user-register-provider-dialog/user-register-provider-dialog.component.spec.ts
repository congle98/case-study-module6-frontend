import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterProviderDialogComponent } from './user-register-provider-dialog.component';

describe('UserRegisterProviderDialogComponent', () => {
  let component: UserRegisterProviderDialogComponent;
  let fixture: ComponentFixture<UserRegisterProviderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegisterProviderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterProviderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
