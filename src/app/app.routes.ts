import type { Routes } from "@angular/router"
import { PqrFormComponent } from "./components/pqr-form/pqr-form.component"
import { PqrListComponent } from "./components/pqr-list/pqr-list.component"
import { AdminPanelComponent } from "./components/admin-panel/admin-panel.component"
import { AuthGuard } from "./guards/auth.guard"

export const routes: Routes = [
  { path: "", redirectTo: "/submit", pathMatch: "full" },
  { path: "submit", component: PqrFormComponent },
  { path: "list", component: PqrListComponent },
  { path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard] },
]

