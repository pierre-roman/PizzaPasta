import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IngredientAdminPage } from './ingredient-admin.page';

describe('IngredientAdminPage', () => {
  let component: IngredientAdminPage;
  let fixture: ComponentFixture<IngredientAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
