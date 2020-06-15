import { Injectable } from "@angular/core";
import {BalanceModel} from "~/model/balance.model";
import {ExpenseModel} from "~/model/expense.model";

@Injectable()
export class UserService {

    users: Array<{name: string, picturePath: string, balance : BalanceModel, expenses: Array<ExpenseModel>}> = [];
    constructor() {



        this.users.push({name: 'Rafal', picturePath: 'rafal.jpg', balance : null, expenses: []}, {name: 'Agata', picturePath: 'agata.jpg', balance : null, expenses : []}, {name: 'Ola', picturePath: 'ola.jpg', balance : null, expenses : []}
        , {name: 'Ala', picturePath: 'aleksandra.jpg', balance : null, expenses : []});

        const mexpense1 = new ExpenseModel(this.users[0], 'impreza', 30, 45, new Date('05 28 2020'))
        const mexpense2 = new ExpenseModel(this.users[2], 'makaron', 12, 30, new Date('05 29 2020'))
        const mexpense3 = new ExpenseModel(this.users[1], 'pizza', 12, 20, new Date('06 14 2020'))

        const expense1 = new ExpenseModel(this.users[0], 'impreza', 15, 45, new Date('05 28 2020'))

        const expense2 = new ExpenseModel(this.users[2], 'makaron', 6, 30, new Date('05 29 2020'))

        const expense3 = new ExpenseModel(this.users[1], 'pizza', 3, 20, new Date('06 14 2020'))

        //rafals
        this.users[0].expenses.push( expense3,expense2, mexpense1 );

        //Agatas
        this.users[1].expenses.push(mexpense3,expense1);

        //Olas
        this.users[2].expenses.push( expense3, mexpense2,expense1 )

        //Alas
        this.users[2].expenses.push(expense3, expense2 )


        const rafalBalance = new BalanceModel(21, false, [{quota:12, inDebt: true, user : this.users[1]}, {quota:9, inDebt: true, user : this.users[2]}]);
        const agataBalance= new BalanceModel(6, true, [{quota: 12, inDebt: false, user : this.users[0]}, {quota: 3, inDebt: true, user : this.users[2]}, {quota: 3, inDebt: true, user : this.users[3]}]);
        const olaBalance= new BalanceModel(6, true, [{quota:9, inDebt: false, user : this.users[0]}, {quota: 3, inDebt: false, user: this.users[1]}, {quota: 6, inDebt: true, user: this.users[3]}]);
        const alaBalance= new BalanceModel( 9, true, [{quota: 6, inDebt: false, user: this.users[2]}, {quota: 3, inDebt: false, user: this.users[1]}]);

        this.users[0].balance = rafalBalance;
        this.users[1].balance = agataBalance;
        this.users[2].balance = olaBalance;
        this.users[3].balance = alaBalance;

    }

    getUsers() {
        return this.users
    }


}
