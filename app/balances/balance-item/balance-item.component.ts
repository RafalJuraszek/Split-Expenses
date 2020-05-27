import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
    selector: "app-balance-item",
    templateUrl: "./balance-item.component.html",
    styleUrls: ["./balance-item.component.css"]
})
export class BalanceItemComponent {

    @Input() input;
    @Input() selected;
    @Output() handleRemove = new EventEmitter<string>();
    clicked = false;

    list = ['ala','ola'];

    click() {
        this.clicked = !this.clicked;
    }
    clickToRemove() {
        this.handleRemove.emit(this.input);
    }

}
