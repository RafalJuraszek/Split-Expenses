import { Component, OnInit } from "@angular/core";
import {User} from "~/shared/user/user.model";
import {UserService} from "~/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";


@Component({
    selector: "gr-login",
    providers: [UserService],
    moduleId: module.id,
    styleUrls: ["./login.component.css"],
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit{
    user: User;
    isLoggingIn = true;

    constructor(private router: Router, private userService: UserService, private page: Page) {
        this.user = new User();
        this.user.email = "rafal";
        this.user.password = "elo";
    }

    submit() {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    login() {

    }

    signUp() {

    }

    toggleDisplay() {
        this.isLoggingIn = !this.isLoggingIn;
    }

    ngOnInit(): void {
        this.page.actionBarHidden = true;
    }
}
