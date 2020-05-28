import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
    selector: "app-balance-item",
    templateUrl: "./balance-item.component.html",
    styleUrls: ["./balance-item.component.css"]
})
export class BalanceItemComponent implements OnInit {

    @Input() input;
    @Input() selected;
    @Output() handleRemove = new EventEmitter<string>();
    clicked = false;


    constructor() {

    }
    ngOnInit(): void {
        console.log(this.input.interestedList)
    }

    click() {
        this.clicked = !this.clicked;
    }
    clickToRemove() {
        this.handleRemove.emit(this.input);
    }

}
