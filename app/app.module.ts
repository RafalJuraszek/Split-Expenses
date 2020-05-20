import {NgModule} from "@angular/core";
import {
    NativeScriptFormsModule,
    NativeScriptHttpClientModule,
    NativeScriptModule,
    NativeScriptRouterModule
} from "@nativescript/angular";
import {AppComponent} from "~/app.component";
import {UserService} from "~/user.service";
import {NativeScriptUIListViewModule} from "nativescript-ui-listview/angular";
import {ModalViewComponent} from "~/modal/modal-view";
import {HeaderComponent} from "~/shared/header/header.component";
import {PrimaryButtonComponent} from "~/shared/button/primary-button.component";
import {ExpensesComponent} from "~/expenses/expenses.component";
import {ListComponent} from "~/list/list.component";
import {ModalComponent} from "~/modal/modal.component";
import {LoginComponent} from "~/login/login.component";
import {BottomHeaderComponent} from "~/shared/bottom-navigator/bottom-header.component";

const routes = [
    { path: "", component: ExpensesComponent },
    { path: "list", component: ListComponent },
    { path: "settleUp", component: ModalComponent},
    {path: "expenses", component: ExpensesComponent}
];

const navigatableComponents = [
    LoginComponent,
    ListComponent,
    ModalComponent,
    ModalViewComponent,
    ExpensesComponent
];

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(routes),
        NativeScriptUIListViewModule
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        PrimaryButtonComponent,
        BottomHeaderComponent,
        ...navigatableComponents
    ],
    providers: [UserService],
    bootstrap: [AppComponent],
    entryComponents: [ModalViewComponent]
})
export class AppModule {
}
