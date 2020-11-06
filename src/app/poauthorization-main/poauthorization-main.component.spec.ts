import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POAuthorizationMainComponent } from './poauthorization-main.component';

describe('POAuthorizationMainComponent', () => {
  let component: POAuthorizationMainComponent;
  let fixture: ComponentFixture<POAuthorizationMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POAuthorizationMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POAuthorizationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
