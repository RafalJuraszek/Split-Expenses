// >> passing-parameters
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-view.html",
    styleUrls: ["./modal-view.component.css"]
})
export class ModalViewComponent implements OnInit {


    @ViewChild("datepicker", { read: ElementRef, static: true }) datePickerElement: ElementRef;
    private users = [];
    private pickedNumber

    constructor(private params: ModalDialogParams) {

        this.users = params.context[0]
        this.pickedNumber = params.context[1]
    }

    ngOnInit() {
        // let datePicker: DatePicker = <DatePicker>this.datePickerElement.nativeElement;
        // datePicker.year = this.currentdate.getFullYear();
        // datePicker.month = this.currentdate.getMonth() + 1;
        // datePicker.day = this.currentdate.getDate();
        // datePicker.minDate = new Date(1975, 0, 29);
        // datePicker.maxDate = new Date(2045, 4, 12);


    }

    public submit(user) {


        console.log(user);
        this.params.closeCallback([user, this.pickedNumber]);
    }
}
// << passing-parameters
