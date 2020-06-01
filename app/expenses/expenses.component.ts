import { Component } from "@angular/core";
import {Router} from "@angular/router";
import {Grocery} from "~/shared/grocery/grocery.model";
import {ExpenseModel} from "~/model/expense.model";


@Component({
    selector: "app-expenses",
    templateUrl: "./expenses.component.html",
    styleUrls: ["./expenses.component.css"],
})
export class ExpensesComponent {

    expensesList: Array<ExpenseModel> = [];
    private user = 'Andrzej'

    constructor(private router: Router) {
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,140.90, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
            this.expensesList.push(new ExpenseModel('Rafal','Pizza',25,55, '02.05.2020'))
    }

    settleUp() {
        this.router.navigate(["/settleUp"])
    }
    balances() {
        this.router.navigateByUrl('/balances');
    }

    addExpense() {
        this.router.navigateByUrl('/addExpense');
    }

}
