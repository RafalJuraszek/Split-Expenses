import {Injectable} from "@angular/core";
import {UserService} from "~/user.service";
import {BalancesService} from "~/services/balances.service";

@Injectable()
export class ExpenseService {

    users = []


    constructor(private userService: UserService, private balanceService: BalancesService) {

        this.users = userService.getUsers();

    }

    addExpense(quotasList, howMuch, forWhat, payer) {

        for(let i=0; i<quotasList.length;i++) {
            if(quotasList[i]) {
                if(this.users[i] !== payer) {
                    this.balanceService.addBalance(payer, this.users[i], +quotasList[i]);
                }
            }
        }

    }
}
