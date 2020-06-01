import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {ModalDialogOptions, ModalDialogService} from "nativescript-angular/modal-dialog";
import {UserService} from "~/user.service";
import {ModalViewComponent} from "~/shared/modal-view/modal-view";

@Component({
    selector: "app-add-expense",
    templateUrl: "./add-expense.component.html",
    styleUrls: ["./add-expense.component.css"],
})
export class AddExpenseComponent implements OnInit {

    users = [];
    pickedUser;

    constructor(private modalService: ModalDialogService, private vcRef: ViewContainerRef, private userService: UserService) {

    }

    ngOnInit(): void {
        this.users = this.userService.getUsers();
    }

    whoPaid() {

        this.createModelView().then(data => {

            this.pickedUser = data[0];
            console.log(this.pickedUser)
        });
    }

    private createModelView(): Promise<any> {


        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: [this.users, undefined],
            fullscreen: false,
        };
        return this.modalService.showModal(ModalViewComponent, options);
    }

}
