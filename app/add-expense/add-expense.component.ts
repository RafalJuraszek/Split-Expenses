import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {ModalDialogOptions, ModalDialogService} from "nativescript-angular/modal-dialog";
import {UserService} from "~/user.service";
import {ModalViewComponent} from "~/shared/modal-view/modal-view";
import {ModalSplitComponent} from "~/shared/modal-split/modal-split.component";
import {ExpenseService} from "~/services/expense.service";
import {Router} from "@angular/router";

@Component({
    selector: "app-add-expense",
    templateUrl: "./add-expense.component.html",
    styleUrls: ["./add-expense.component.css"],
})
export class AddExpenseComponent implements OnInit {

    users = [];
    @ViewChild('howMuch', {static: false}) howMuch: ElementRef;
    @ViewChild('forWhat', {static: false}) forWhat: ElementRef;
    payer;
    howValues;
    type;
    blocked = true;

    constructor(private modalService: ModalDialogService, private vcRef: ViewContainerRef, private userService: UserService
                , private expenseService: ExpenseService, private router: Router) {

    }

    ngOnInit(): void {
        this.users = this.userService.getUsers();
        this.howValues = new Array<number>(this.users.length);
    }

    whoPaid() {

        this.createModelView(ModalViewComponent).then(data => {

            this.payer = data[0];

        });
    }

    howToSplit() {

            let equalValue = <number>this.howMuch.nativeElement.text / this.users.length;

            for (let i = 0; i < this.users.length; i++) {
                this.howValues[i] = equalValue;

            }

        this.createModelView(ModalSplitComponent).then(data => {
            this.type = data[0];
            let tmp = 0;
            for(let i=0;i<data[1].length;i++) {
                if(data[1][i]!=undefined)
                {
                    tmp += +data[1][i];
                }
            }

            this.howMuch.nativeElement.text = tmp;
            this.howValues = data[1]

        });
    }

    private createModelView(component): Promise<any> {


        const options: ModalDialogOptions = {
            viewContainerRef: this.vcRef,
            context: [this.users, this.howValues],
            fullscreen: false,
        };
        return this.modalService.showModal(component, options);
    }

    save() {

        if(!this.forWhat.nativeElement.text) {
            alert('You have to write for what!')
            return;
        }
        if(!this.howMuch.nativeElement.text) {
            alert('You have to pick how much!')
            return;
        }

        if(!this.payer) {
            alert('You have to choose the payer');
            return
        }


        let flag = true;
        for (let i = 0; i < this.users.length; i++) {
            if(this.howValues[i]!==undefined) {
                flag = false;
                break;
            }

        }
        if(flag) {
            alert('You have to choose the split method!')
            return
        }

        this.expenseService.addExpense(this.howValues, +this.howMuch.nativeElement.text, this.forWhat.nativeElement.text, this.payer);
        this.router.navigateByUrl('expenses');
    }

}
