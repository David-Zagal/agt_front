import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService, Toast } from 'primeng';
import { MenuDataService } from '../../core/services/menu-data.service';
import { ToastService } from '../../core/services/toast.service';
import { UserDataService } from '../../core/services/user-data.service';
import { OpcMenuService } from '../services/opc-menu.service';

import { UsuariosComponent } from './usuarios.component';

describe('UsuariosComponent', () => {
  let component: UsuariosComponent;
  let fixture: ComponentFixture<UsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), FormsModule, HttpClientModule],
      declarations: [UsuariosComponent],
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
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});