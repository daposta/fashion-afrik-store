import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersListingComponent } from './customers-listing.component';

describe('CustomersListingComponent', () => {
  let component: CustomersListingComponent;
  let fixture: ComponentFixture<CustomersListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
