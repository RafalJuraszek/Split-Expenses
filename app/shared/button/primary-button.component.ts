import {Component, Input} from "@angular/core";

@Component({
    selector: "primary-button",
    templateUrl: "./primary-button.component.html",
    styleUrls: ["./primary-button.component.css"],
})
export class PrimaryButtonComponent {
    @Input() backgroundColor = "#A93F55"
    @Input() value: string = "add";
    @Input() blocked: boolean = false;


}
