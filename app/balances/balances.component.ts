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

    constructor(private router: Router, private userService: UserService, private balancesService: BalancesService) {

    }

    ngOnInit(): void {
        this.usersList = this.userService.getUsers();
    }

    clickToRemove(event) {
        this.clickedPerson = event;
    }

     remove() {
        this.balancesService.removeBalance(this.clickedPerson)

     }


}
