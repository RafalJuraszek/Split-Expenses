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

    users = []


    constructor(private userService: UserService) {

        this.users = userService.getUsers();

    }


    settleUp(payer, receiver, quota) {
        const payerBalance = payer.balance;
        const receiverBalance = receiver.balance;
        console.log(payerBalance)
        if (payerBalance) {
            const rec = payerBalance.interestedList.find((el) => {
                return el.user === receiver
            })
            if (rec) {

                this.changeQuota(false, rec, quota);
                this.changeQuota(true, payerBalance, quota);
                this.changeQuota(false, receiverBalance, quota);
                const pay = receiverBalance.interestedList.find((el) => {
                    return el.user === payer
                });

                this.changeQuota(true, pay, quota);
                const index = receiverBalance.interestedList.indexOf(pay);
                const index2 = payerBalance.interestedList.indexOf(rec);

                if (rec.quota === 0) {
                    receiverBalance.interestedList.splice(index, 1);
                    payerBalance.interestedList.splice(index2, 1);
                }

                if (payerBalance.quota === 0 && payerBalance.interestedList.length === 0) {

                    payer.balance = undefined;

                }

                if (receiverBalance.quota === 0 && receiverBalance.interestedList.length === 0) {

                    receiver.balance = undefined;

                }

            }
        }

    }

    changeQuota(isPayer, balance, quota) {
        if (isPayer) {
            if (balance.inDebt) {
                balance.quota -= quota;
            } else {
                balance.quota += quota;
            }
        } else {
            if (balance.inDebt) {
                balance.quota += quota;
            } else {
                balance.quota -= quota;
            }
        }
        if (balance.quota < 0) {
            balance.quota *= -1;
            balance.inDebt = !balance.inDebt
        }

    }

    addBalance(payer, debtor, quota) {
        if (payer.balance && debtor.balance) {

            //console.log(payer.balance.interestedList, debtor.balance.interestedList);
            this.changeQuota(true, payer.balance, quota);
            this.changeQuota(false, debtor.balance, quota);

            const rec = payer.balance.interestedList.find((el) => {
                return el.user === debtor;
            })
            if (rec) {

                this.changeQuota(false, rec, quota);
                const pay = debtor.balance.interestedList.find((el) => {
                    return el.user === payer;
                })
                this.changeQuota(true, pay, quota);
            } else {

                payer.balance.interestedList.push({quota:quota, inDebt:true, user: debtor});
                debtor.balance.interestedList.push({quota:quota, inDebt: false, user :payer});

            }


        } else {
            if (!payer.balance) {
                payer.balance = new BalanceModel(quota, false, []);
            }
            if (!debtor.balance) {
                debtor.balance = new BalanceModel(quota, true, []);
            }


        }
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
