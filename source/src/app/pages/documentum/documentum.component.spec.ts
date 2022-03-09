import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng';
import { ToastService } from '../../core/services/toast.service';

import { DocumentumComponent } from './documentum.component';

describe('DocumentumComponent', () => {
  let component: DocumentumComponent;
  let fixture: ComponentFixture<DocumentumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocumentumComponent],
      imports: [HttpClientTestingModule],
      providers: [
        ToastService,
        MessageService,
        FormBuilder]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
