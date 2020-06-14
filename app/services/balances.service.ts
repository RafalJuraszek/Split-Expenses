import {Injectable} from "@angular/core";
import {BalanceModel} from "~/model/balance.model";
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


        let rec = payerBalance.interestedList.find((el) => {
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

        } else {
            rec = {
                quota: quota,
                inDebt: true,
                user: receiver
            }
            const pay = {
                quota: quota,
                inDebt: false,
                user: payer

            }
            payerBalance.interestedList.push(rec)
            receiverBalance.interestedList.push(pay)
            this.changeQuota(true, payerBalance, quota);
            this.changeQuota(false, receiverBalance, quota);
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


        this.changeQuota(true, payer.balance, quota);
        this.changeQuota(false, debtor.balance, quota);

        this.updateInterestedList(payer, debtor, quota);


    }

    updateInterestedList(payer, debtor, quota) {
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

            payer.balance.interestedList.push({quota: quota, inDebt: true, user: debtor});
            debtor.balance.interestedList.push({quota: quota, inDebt: false, user: payer});

        }
    }

    removeBalance(clickedPerson) {
        if (clickedPerson !== undefined) {

            const index = this.users.indexOf(clickedPerson)

            this.users[index].balance.interestedList = [];
            this.users[index].balance.quota = 0;

            for (let user of this.users) {

                let interestedList = user.balance.interestedList
                const el = interestedList.find((el) => {
                    return el.user === clickedPerson
                })

                if (el) {
                    const index = interestedList.indexOf(el)


                    user.balance.quota -= interestedList[index].quota;

                    if (user.balance.quota < 0) {
                        user.balance.quota = (-1) * user.balance.quota;
                        user.balance.inDebt = !user.balance.inDebt;

                    }

                    interestedList.splice(index, 1)


                }

            }

        }
    }

}
