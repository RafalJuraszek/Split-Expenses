import { LoginComponent } from "./login/login.component";
import { ListComponent } from "./list/list.component";
import {SettleUpComponent} from "~/settle-up/settle-up.component";
import {ModalViewComponent} from "~/shared/modal-view/modal-view";
import {ExpensesComponent} from "~/expenses/expenses.component";

export const routes = [
    { path: "", component: ExpensesComponent },
    { path: "list", component: ListComponent },
    { path: "modal", component: SettleUpComponent},
    {path: "expenses", component: ExpensesComponent}
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent,
    SettleUpComponent,
    ModalViewComponent,
    ExpensesComponent
];
