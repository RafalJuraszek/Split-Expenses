// >> passing-parameters
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { DatePicker } from "tns-core-modules/ui/date-picker";
import {ListPicker, SelectedIndexChangedEventData} from "@nativescript/core";

@Component({
    moduleId: module.id,
    templateUrl: "./modal-split.component.html",
    styleUrls: ["./modal-split.component.css"]
})
export class ModalSplitComponent implements OnInit {


    equalValues;
    howValues;
    private users = [];
    public selectedIndex = 1;
    public items: Array<string>;

    public onchange(args: SelectedIndexChangedEventData) {
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
    }

    public onopen() {
        console.log("Drop Down opened.");
    }

    public onclose() {
        console.log("Drop Down closed.");
    }

    constructor(private params: ModalDialogParams) {

        this.items = [];

        this.items.push('Split unequally');
        this.items.push('Split equally');


        this.users = params.context[0]
        this.equalValues = params.context[1]
		console.log(params.context[2])
		this.selectedIndex = params.context[2]==='unequally' ? 0 : 1;
        this.howValues = new Array<number>(this.users.length);
    }

    ngOnInit() {

    }


    public submit(user=null) {

		

        let type= '';
        if(this.selectedIndex===0) {
			let sum = 0;
			let equalsum = 0;
			for(let i=0;i<this.howValues.length;i++) {
				equalsum+=+this.equalValues[i];
				if(this.howValues[i]) {
					sum+=+this.howValues[i];
				}
				
			}
			if(equalsum!==sum) {
				alert("You have to split " +equalsum);
				return;
			}
			
            type='unequally';
            this.params.closeCallback([type, this.howValues]);
        }
        else {
            type='equally';
            this.params.closeCallback([type, this.equalValues]);
        }


    }
}
