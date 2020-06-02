import { Injectable } from "@angular/core";
import {BalanceModel} from "~/model/balance.model";
import {ExpenseModel} from "~/model/expense.model";

@Injectable()
export class UserService {

    users: Array<{name: string, picturePath: string, balance : BalanceModel, expenses: Array<ExpenseModel>}> = [];
    constructor() {

        this.users.push({name: 'Rafal', picturePath: 'rafal.jpg', balance : null, expenses: []}, {name: 'Agata', picturePath: 'agata.jpg', balance : null, expenses : []}, {name: 'Ola', picturePath: 'ola.jpg', balance : null, expenses : []}
        , {name: 'Ala', picturePath: 'aleksandra.jpg', balance : null, expenses : []});

        const firstBalance = new BalanceModel(100, false, [{quota:100, inDebt: true, user : this.users[1]}]);
        const secondBalance= new BalanceModel(43, false, [{quota:100, inDebt: true, user : this.users[1]}, {quota: 57, inDebt: false, user: this.users[3]}]);
        const thirdBalance= new BalanceModel( 57, false, [{quota: 57, inDebt: true, user: this.users[2]}]);
        const fourthBalance= new BalanceModel(200, true, [{quota: 100, inDebt: false, user : this.users[0]}, {quota: 100, inDebt: false, user: this.users[2]}]);
        this.users[0].balance = firstBalance;
        this.users[1].balance = fourthBalance;
        this.users[2].balance = secondBalance;
        this.users[3].balance = thirdBalance;

    }

    getUsers() {
        return this.users
    }


}
