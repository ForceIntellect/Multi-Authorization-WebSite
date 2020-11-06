import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POAuthorizationDetailComponent } from './poauthorization-detail.component';

describe('POAuthorizationDetailComponent', () => {
  let component: POAuthorizationDetailComponent;
  let fixture: ComponentFixture<POAuthorizationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POAuthorizationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POAuthorizationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
