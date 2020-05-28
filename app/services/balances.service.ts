import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Config} from "~/shared/config";
import {catchError} from "rxjs/operators";
import {ExpenseModel} from "~/model/expense.model";
import {BalanceModel} from "~/model/balance.model";
import {Observable, throwError} from "rxjs";
import {UserService} from "~/user.service";


@Injectable()
export class BalancesService {

    balances: BalanceModel[] = []


    constructor(private userService: UserService) {

        const users = userService.getUsers();

        this.balances.push(new BalanceModel(users[0], 100, false, [{quota:100, inDebt: true, user : users[1]}], 'rafal.jpg'));
        this.balances.push(new BalanceModel(users[2], 43, false, [{quota:100, inDebt: true, user : users[1]}, {quota: 57, inDebt: false, user: users[3]}], 'agata.jpg'));
        this.balances.push(new BalanceModel(users[3], 57, false, [{quota: 57, inDebt: true, user: users[2]}], 'aleksandra.jpg'))

        this.balances.push(new BalanceModel(users[1], 200, true, [{quota: 100, inDebt: false, user : users[0]}, {quota: 100, inDebt: false, user: users[2]}], 'ola.jpg'));
    }

    getBalances() {

        return this.balances
        // return this.http.get<any>(
        //     this.basicURL + 'balances.json',
        //     { headers: this.getCommonHeaders() }
        // ).pipe(
        //     catchError(this.handleErrors)
        // );
    }


    getCommonHeaders() {
        return {
            "Content-Type": "application/json"
        }
    }
    handleErrors(error: Response) {
        console.log(JSON.stringify(error));
        return throwError(error);
    }
}
