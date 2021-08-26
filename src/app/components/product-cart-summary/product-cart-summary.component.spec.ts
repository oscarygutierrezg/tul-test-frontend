import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCartSummaryComponent } from './product-cart-summary.component';

describe('ProductProductCartSummaryComponent', () => {
  let component: ProductCartSummaryComponent;
  let fixture: ComponentFixture<ProductCartSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCartSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
