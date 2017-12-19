import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductTypeComponent } from './new-product-type.component';

describe('NewProductTypeComponent', () => {
  let component: NewProductTypeComponent;
  let fixture: ComponentFixture<NewProductTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewProductTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
