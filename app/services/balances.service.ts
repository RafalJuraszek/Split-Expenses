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

            this.updateInterestedList(payer, debtor, quota);


        } else {
            if (!payer.balance) {
                payer.balance = new BalanceModel(quota, false, []);
            }
            else{
                this.changeQuota(true, payer.balance, quota);
            }
            if (!debtor.balance) {
                debtor.balance = new BalanceModel(quota, true, []);
            }
            else{
                this.changeQuota(false, debtor.balance, quota);
            }
            this.updateInterestedList(payer, debtor, quota);

        }
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

            payer.balance.interestedList.push({quota:quota, inDebt:true, user: debtor});
            debtor.balance.interestedList.push({quota:quota, inDebt: false, user :payer});

        }
    }

    removeBalance(clickedPerson ) {
        if (clickedPerson !== undefined) {

            const index = this.users.indexOf(clickedPerson)
            this.users[index].balance = undefined;

            for(let user of this.users) {
                if(user.balance) {
                    let interestedList = user.balance.interestedList
                    const el = interestedList.find((el) => {
                        return el.user === clickedPerson
                    })
                    if(el!==-1) {
                        const index = interestedList.indexOf(el)
                        //const quota = interestedList[index].inDebt ? interestedList[index].quota *(-1) : interestedList[index].quota;

                        user.balance.quota-=interestedList[index].quota;
                        if(user.balance.quota < 0)
                        {
                            user.balance.quota = (-1) * user.balance.quota;
                            user.balance.inDebt = !user.balance.inDebt;

                        }
                        interestedList.splice(index, 1)
                        if(user.balance.interestedList.length===0)
                        {
                            user.balance = undefined;
                        }

                    }
                }

            }

            clickedPerson = undefined
        }
    }

}
