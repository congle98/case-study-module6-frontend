import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsOrderComponent } from './views-order.component';

describe('ViewsOrderComponent', () => {
  let component: ViewsOrderComponent;
  let fixture: ComponentFixture<ViewsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
