import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import { ModalViewComponent } from "../shared/modal-view/modal-view";
import {UserService} from "~/user.service";
import {BalancesService} from "~/services/balances.service";
import {Router} from "@angular/router";


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

    public users =  [];
    public pickedUsers = [undefined, undefined];
    public pickedNumber = 1;

    @ViewChild('howmuch', {static: false}) howmuch: ElementRef;

    constructor(private modalService: ModalDialogService, private vcRef: ViewContainerRef, private userService: UserService
                , private balanceService: BalancesService, private router: Router) {

    }

    ngOnInit(): void {
        this.users = this.userService.getUsers();
    }

    userClicked(pickedNumber) {
        this.pickedNumber = pickedNumber
        this.createModelView().then(data => {

            this.pickedUsers[data[1]] = data[0];
        });
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

    save() {
        if(!this.pickedUsers[0] || !this.pickedUsers[1] || this.pickedUsers[0]===this.pickedUsers[1] ) {
            alert('You have to pick two different users!')
        }
        else {
            let value = this.howmuch.nativeElement.text;
            if(value==='') {
                this.howmuch.nativeElement.focus();

            }
            else {
                value = +value;
                if (isNaN(value)) {
                    alert('Pick the number!');

                }
                else {

                    this.balanceService.settleUp(this.pickedUsers[0], this.pickedUsers[1], value);
                    this.router.navigateByUrl('expenses')

                }
            }

        }

    }


}
