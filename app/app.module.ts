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
import {ModalViewComponent} from "~/shared/modal-view/modal-view";
import {HeaderComponent} from "~/shared/header/header.component";
import {PrimaryButtonComponent} from "~/shared/button/primary-button.component";
import {ExpensesComponent} from "~/expenses/expenses.component";
import {ListComponent} from "~/list/list.component";
import {SettleUpComponent} from "~/settle-up/settle-up.component";
import {LoginComponent} from "~/login/login.component";
import {BottomHeaderComponent} from "~/shared/bottom-navigator/bottom-header.component";
import {registerElement} from "nativescript-angular/element-registry";
import {BalancesComponent} from "~/balances/balances.component";
import {BalanceItemComponent} from "~/balances/balance-item/balance-item.component";
import {BalancesService} from "~/services/balances.service";
import {AddExpenseComponent} from "~/add-expense/add-expense.component";


registerElement("My-Shape", () => require("./shared/MyShape").MyShape);
const routes = [
    { path: "", component: ExpensesComponent },
    { path: "list", component: ListComponent },
    { path: "settleUp", component: SettleUpComponent},
    { path: "balances", component: BalancesComponent},
    {path: "expenses", component: ExpensesComponent},
    {path: "addExpense", component: AddExpenseComponent}
];

const navigatableComponents = [
    LoginComponent,
    ListComponent,
    SettleUpComponent,
    ModalViewComponent,
    ExpensesComponent,
    BalancesComponent,
    AddExpenseComponent
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
        ...navigatableComponents,
        BalanceItemComponent
    ],
    providers: [UserService, BalancesService],
    bootstrap: [AppComponent],
    entryComponents: [ModalViewComponent]
})
export class AppModule {
}
