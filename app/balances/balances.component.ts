import {Component} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: "app-balances",
    templateUrl: "./balances.component.html",
    styleUrls: ["./balances.component.css"]
})
export class BalancesComponent {

    balancesList: string[] = []
    clickedPerson = '';
    constructor(private router: Router) {
        this.balancesList.push("Rafal", 'ola', 'ela', 'kasia', 'ania')
    }
    clickToRemove(event) {
        this.clickedPerson = event;
    }

    remove() {
        if(this.clickedPerson !== '') {
           const index = this.balancesList.indexOf(this.clickedPerson)
            this.balancesList.splice(index, 1)
            this.clickedPerson = ''
        }
    }



}
