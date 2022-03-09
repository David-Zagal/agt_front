import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService, Toast } from 'primeng';
import { MenuDataService } from '../../core/services/menu-data.service';
import { RouteStateService } from '../../core/services/route-state.service';
import { ToastService } from '../../core/services/toast.service';
import { UserDataService } from '../../core/services/user-data.service';
import { OpcMenuService } from '../services/opc-menu.service';

import { ListadoComponent } from './listado.component';

describe('ListadoComponent', () => {
  let component: ListadoComponent;
  let fixture: ComponentFixture<ListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, HttpClientModule],
      declarations: [ListadoComponent],
      providers: [
        ConfirmationService,
        FormBuilder,
        ToastService,
        MessageService,
        OpcMenuService,
        MenuDataService,
        UserDataService
        ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
