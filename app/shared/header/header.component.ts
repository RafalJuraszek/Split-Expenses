import {Component, Input} from "@angular/core";
import {ModalDialogService} from "nativescript-angular/modal-dialog";

@Component({
    selector: "header-app",
    moduleId: module.id,
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
    @Input() title = 'Default'
    name;

}
