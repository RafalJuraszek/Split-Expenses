import { Component } from "@angular/core";
import {Router} from "@angular/router";
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
