import {Injectable} from "@angular/core";
import {UserService} from "~/user.service";
import {BalancesService} from "~/services/balances.service";
import {ExpenseModel} from "~/model/expense.model";

@Injectable()
export class ExpenseService {

    users = []


    constructor(private userService: UserService, private balanceService: BalancesService) {

        this.users = userService.getUsers();

    }

    addExpense(quotasList, howMuch, forWhat, payer) {
        const expenses = [];
        for(let i=0; i<quotasList.length;i++) {
            if(quotasList[i]) {
                if(this.users[i] !== payer) {
                    this.balanceService.addBalance(payer, this.users[i], +quotasList[i]);
                    this.users[i].expenses.push(new ExpenseModel(payer, forWhat, +quotasList[i], howMuch, new Date()));
                }
                else {
                    this.users[i].expenses.push(new ExpenseModel(payer, forWhat, howMuch-(+quotasList[i]), howMuch, new Date()));
                    console.log(this.users[i].expenses)
                }


            }
        }



    }
}
