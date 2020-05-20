import { LoginComponent } from "./login/login.component";
import { ListComponent } from "./list/list.component";
import {ModalComponent} from "~/modal/modal.component";
import {ModalViewComponent} from "~/modal/modal-view";
import {ExpensesComponent} from "~/expenses/expenses.component";

export const routes = [
    { path: "", component: ExpensesComponent },
    { path: "list", component: ListComponent },
    { path: "modal", component: ModalComponent},
    {path: "expenses", component: ExpensesComponent}
];

export const navigatableComponents = [
    LoginComponent,
    ListComponent,
    ModalComponent,
    ModalViewComponent,
    ExpensesComponent
];
