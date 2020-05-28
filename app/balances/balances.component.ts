import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {BalanceModel} from "~/model/balance.model";
import {BalancesService} from "~/services/balances.service";

@Component({
    selector: "app-balances",
    templateUrl: "./balances.component.html",
    styleUrls: ["./balances.component.css"]
})
export class BalancesComponent implements OnInit {

    balancesList: BalanceModel[] = []
    clickedPerson: BalanceModel = undefined;

    constructor(private router: Router, private balancesService: BalancesService) {

    }

    ngOnInit(): void {
        this.balancesList = this.balancesService.getBalances();
    }

    clickToRemove(event) {
        this.clickedPerson = event;
    }

    remove() {
        if (this.clickedPerson !== undefined) {
            const index = this.balancesList.indexOf(this.clickedPerson)
            this.balancesList.splice(index, 1)


            for(let balance of this.balancesList) {
                let interestedList = balance.interestedList
                const el = interestedList.find((el) => {
                    return el.user === this.clickedPerson.user
                })
                const index = interestedList.indexOf(el)
                interestedList.splice(index, 1)

            }

            this.clickedPerson = undefined
        }
    }


}
