import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IOption, IProduct, IServerProduct } from './app.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public orderForm: any;
  public taxOptions: IOption[] = [
    {viewValue: 'No Tax', value: 'no_tax'},
    {viewValue: 'Value Added Tax', value: 'vat'},
  ]
  public dataSource: IProduct[] = [];
  public displayedColumns: string[] = [];
  public isDisplayCostBreakDown: boolean = false;
  public paymentOptions: IOption[] = [
    {value: 'pay_now', viewValue: 'Pay Now'},
    {value: 'pay_later', viewValue: 'Pay Later'},
  ];
  public paymentMethods: IOption[] = [
    {value: 'cash', viewValue: 'Cash'},
    {value: 'credit_card', viewValue: 'Credit Card'},
  ];
  public selectedPaymentOption = 'pay_now';
  public selectedPaymentMethod = 'cash';
  public payedAmount = 0;
  public selectedDate = new Date();
  public productOptions: IProduct[] = [];

  constructor(private http: HttpClient) {}

  get notesLength() { return this.orderForm.get('notes').value.length; }

  public ngOnInit(): void {
    this.orderForm = new FormGroup({
      supplierName: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      invoiceNumber: new FormControl('', Validators.required),
      notes: new FormControl('', Validators.maxLength(200)),
    });
    this.displayedColumns = ['name', 'qty', 'cost', 'tax'];
    this.http.get<IServerProduct[]>('/api/products').subscribe((res: IServerProduct[]) => {
      res.forEach((option: IServerProduct) => {
        this.productOptions.push({
          qty: 0,
          tax: 'no_tax',
          expandRow: false,
          id: option.id,
          cost: option.cost,
          name: option.name,
        });
      });
    });
  }

  public appendItemToDataSource(option: IProduct) {
    this.dataSource.push(option);
  }

  public deleteRow(option: IProduct) {
    const index = this.dataSource.indexOf(option);
    if (index > -1) { 
      this.dataSource.splice(index, 1);
    }
    if (!this.dataSource.length) {

    }
  }

  public getTotalCost(option: IProduct): number {
    return option.cost * option.qty;
  }

  public getTotalTaxAmount(option: IProduct): number {
    return (option.tax === 'vat' ? option.cost * option.qty * .15 : 0);
  }

  public getTotalAmount(): number {
    let sum = 0;
    this.dataSource.forEach((item: IProduct) => {
      sum += this.getTotalCost(item);
    });
    return sum;
  }

  public getCommulativeTaxAmount(): number {
    let sum = 0;
    this.dataSource.forEach((item: IProduct) => {
      sum += this.getTotalTaxAmount(item);
    });
    return sum;
  }

  public isOrderButtonDisabled(): boolean {
    return this.orderForm.valid && this.dataSource.length &&
      ((this.selectedPaymentOption === 'pay_now' && this.payedAmount > 0) || this.selectedPaymentOption === 'pay_later');
  }
}
