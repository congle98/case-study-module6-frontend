import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderEditStatusComponent } from './provider-edit-status.component';

describe('ProviderEditStatusComponent', () => {
  let component: ProviderEditStatusComponent;
  let fixture: ComponentFixture<ProviderEditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderEditStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
