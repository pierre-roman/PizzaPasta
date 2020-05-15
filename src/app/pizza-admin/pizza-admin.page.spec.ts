import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PizzaAdminPage } from './pizza-admin.page';

describe('PizzaAdminPage', () => {
  let component: PizzaAdminPage;
  let fixture: ComponentFixture<PizzaAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PizzaAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PizzaAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
