import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {Grocery} from "~/shared/grocery/grocery.model";
import {ExpenseModel} from "~/model/expense.model";
import {UserService} from "~/user.service";


@Component({
    selector: "app-expenses",
    templateUrl: "./expenses.component.html",
    styleUrls: ["./expenses.component.css"],
})
export class ExpensesComponent {

    //expensesList: Array<ExpenseModel> = [];
    private user;


    constructor(private router: Router, private userService: UserService) {
            this.user = this.userService.getUsers()[0];


            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,140.90, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            // this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
    }

    settleUp() {
        this.router.navigate(["/settleUp"])
    }
    balances() {
        console.log(this.user.expenses)
        this.router.navigateByUrl('/balances');
    }

    addExpense() {
        this.router.navigateByUrl('/addExpense');
    }

}
