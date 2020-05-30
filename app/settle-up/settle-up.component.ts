import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import {Component, OnInit, ViewContainerRef} from "@angular/core";
import { ModalViewComponent } from "../shared/modal-view/modal-view";
import {UserService} from "~/user.service";


const millisecondsInADay = 24 * 60 * 60 * 1000;
const dayDiff = (firstDate, secondDate) =>
    Math.round((secondDate - firstDate) / millisecondsInADay);

@Component({
    moduleId: module.id,
    providers: [ModalDialogService],
    templateUrl: "./settle-up.component.html",
    styleUrls: ['./settle-up.component.css']
})
export class SettleUpComponent implements OnInit {

    public startDate: Date;
    public endDate: Date;
    public selectedDate: Date;
    public days: number;
    public users =  [];
    public pickedUsers = [undefined, undefined];
    public pickedNumber = 1;



    constructor(private modalService: ModalDialogService, private vcRef: ViewContainerRef, private userService: UserService) {
        this.resetDates();
    }

    ngOnInit(): void {
        this.users = this.userService.getUsers();
    }

    userClicked(pickedNumber) {
        this.pickedNumber = pickedNumber
        this.createModelView().then(data => {

            console.log(data[0], data[1]);
            this.pickedUsers[data[1]] = data[0];
        });
    }

    getStartDate() {
        this.createModelView().then(result => {
            if (this.validate(result)) {
                this.startDate = result;
            }
        }).catch(error => this.handleError(error));
    }

    getEndDate() {
        this.createModelView().then(result => {
            if (this.validate(result)) {
                this.endDate = result;
            }
        }).catch(error => this.handleError(error));
    }

    // >> returning-result
    getDate() {
        this.createModelView().then(result => {
            if (this.validate(result)) {
                this.selectedDate = result;
            }
        }).catch(error => this.handleError(error));
    }

    private createModelView(): Promise<any> {
        const tmpUsers = [...this.users];
        if(this.pickedNumber == 0)
        {
            if(this.pickedUsers[0])
            {
                console.log(this.pickedUsers[0])
                const index = this.users.indexOf(this.pickedUsers[0])
                tmpUsers.splice(index, 1);
            }
        }
        else {
            if(this.pickedUsers[1])
            {
                console.log(this.pickedUsers[1])
                const index = this.users.indexOf(this.pickedUsers[1])
                console.log(index, '  ')
                tmpUsers.splice(index, 1);
            }
        }

        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: [tmpUsers, this.pickedNumber],
            fullscreen: false,
        };

        // showModal returns a promise with the received parameters from the settle-up page
        return this.modalService.showModal(ModalViewComponent, options);
    }
    // << returning-result

    countDays() {
        if (this.startDate.getTime() > this.endDate.getTime()) {
            alert("Enter correct end date");
        } else {
            this.days = dayDiff(this.startDate, this.endDate);
        }
    }

    private resetDates() {
        this.startDate = new Date("2015-12-12");
        this.endDate = new Date();
        this.selectedDate = new Date();
        this.days = dayDiff(this.startDate, this.endDate);
    }

    private validate(result: any) {
        return !!result;
    }

    private handleError(error: any) {
        this.resetDates();
        alert("Please try again!");
        console.dir(error);
    }
}
