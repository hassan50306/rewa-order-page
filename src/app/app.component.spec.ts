import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatCardModule, 
        MatSelectModule,
        MatDividerModule,
        MatTableModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatSlideToggleModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        NoopAnimationsModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize the order form', () => {
    expect(component.orderForm.get('supplierName')).toBeInstanceOf(FormControl);
    expect(component.orderForm.get('location')).toBeInstanceOf(FormControl);
    expect(component.orderForm.get('invoiceNumber')).toBeInstanceOf(FormControl);
    expect(component.orderForm.get('notes')).toBeInstanceOf(FormControl);
  });

  it('should append an item to the data source', () => {
    const option = { id: 1, name: 'Iphone 1', cost: 10, qty: 1, tax: 'no_tax', expandRow: false };
    component.appendItemToDataSource(option);
    expect(component.dataSource.length).toBe(1);
    expect(component.dataSource[0]).toEqual(option);
  });

  it('should delete a row from the data source', () => {
    const option = { id: 1, name: 'Iphone 1', cost: 10, qty: 1, tax: 'no_tax', expandRow: false };
    component.dataSource = [option];
    component.deleteRow(option);
    expect(component.dataSource.length).toBe(0);
  });

  it('should check if the order button is disabled', () => {
    component.orderForm.setErrors({ invalid: true });
    expect(component.isOrderButtonDisabled()).toBe(false);

    component.dataSource.length = 0;
    expect(component.isOrderButtonDisabled()).toBe(false);

    component.selectedPaymentOption = 'pay_now';
    component.payedAmount = 0;
    expect(component.isOrderButtonDisabled()).toBe(false);

    component.selectedPaymentOption = 'pay_now';
    component.payedAmount = 10;
    component.dataSource.push({ id: 1, name: 'Iphone 1', cost: 10, qty: 1, tax: 'no_tax', expandRow: false });
    component.orderForm.get('supplierName').setValue('test1');
    component.orderForm.get('location').setValue('testLocation');
    component.orderForm.get('invoiceNumber').setValue('123fb');
    component.orderForm.get('notes').setValue('some sample notes');
    expect(component.isOrderButtonDisabled()).toBe(true);
  });

});
