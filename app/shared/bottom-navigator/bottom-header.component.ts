import { Component } from "@angular/core";
import {Router} from "@angular/router";


@Component({
    selector: "bottom-header-app",
    templateUrl: "./bottom-header.component.html",
    styleUrls: ["./bottom-header.component.css"],
})
export class BottomHeaderComponent {

    constructor(private router: Router) {

    }

}
