import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BalanceModel} from "~/model/balance.model";
import {BalancesService} from "~/services/balances.service";
import {UserService} from "~/user.service";

@Component({
    selector: "app-balances",
    templateUrl: "./balances.component.html",
    styleUrls: ["./balances.component.css"]
})
export class BalancesComponent implements OnInit {

    usersList = []
    clickedPerson = undefined;

    constructor(private router: Router, private userService: UserService) {

    }

    ngOnInit(): void {
        this.usersList = this.userService.getUsers();
    }

    clickToRemove(event) {
        this.clickedPerson = event;
    }

     remove() {
        console.log(this.clickedPerson)
        if (this.clickedPerson !== undefined) {
            const index = this.usersList.indexOf(this.clickedPerson)
            // this.usersList.splice(index, 1)
            this.usersList[index].balance = undefined;

            for(let user of this.usersList) {
                if(user.balance) {
                    let interestedList = user.balance.interestedList
                    const el = interestedList.find((el) => {
                        return el.user === this.clickedPerson
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

            this.clickedPerson = undefined
        }
     }


}
