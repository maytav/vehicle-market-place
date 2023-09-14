import {Component} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {CarsState} from '@app/cars/stores/cars.state';
import {Car} from '@app/cars/models';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent {
  imageUrl = 'https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Mega-Menu-Vehicles-Model-3.png'

  @Select(CarsState.item)
  car$: Observable<Car>;
  price = 200000;

  manufacturer = '';
  loanAmount: number = 0;
  loanDuration: number = 1;
  interestRate = 0.14;

  formatLabel(value: any) {
    return value.toLocaleString()
  }

  calculateTotalPayments(): number[] {
    let remainingForInterest = this.loanAmount;
    let totalPayments: number[] = [];
    for (let i = 0; i < this.loanDuration; i++) {
      const monthlyPaymentExcludingInterest = this.loanAmount / this.loanDuration;
      const monthlyInterestPayment = remainingForInterest * this.interestRate;
      const totalMonthlyPayment = monthlyPaymentExcludingInterest + monthlyInterestPayment;
      totalPayments.push(totalMonthlyPayment);
      remainingForInterest -= monthlyPaymentExcludingInterest;
    }
    return totalPayments;
  }


  /*  calculateMonthlyPayment(): number {
      const monthlyInterestRate = this.interestRate;


      const principalPayment = this.loanAmount / this.loanDuration;
      const interestPayment = this.loanAmount * monthlyInterestRate;
      return principalPayment + interestPayment;
    }*/


  calculateAveragePaymentEqualPrincipal(): number {
    return this.calculateTotalPayment() / this.loanDuration
  }


  calculateTotalPayment(): number {
    return this.calculateTotalPayments().reduce((sum, payment) => sum + payment, 0)
  }
}
