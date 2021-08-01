import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderEditPriceComponent } from './provider-edit-price.component';

describe('ProviderEditPriceComponent', () => {
  let component: ProviderEditPriceComponent;
  let fixture: ComponentFixture<ProviderEditPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderEditPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderEditPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
