import {NgModule} from "@angular/core";
import {DndComponent} from "./dnd.component";
import {CampaignComponent} from "./campaign/campaign.component";
import {CreateCampaignComponent} from "./create-campaign/create-campaign.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {AppComponent} from "../../app.component";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTimepickerModule} from "mat-timepicker";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {RouterModule} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatIconModule} from "@angular/material/icon";
import {DndService} from "../../services/dnd.service";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SnackbarService} from "../../services/snackbar.service";


@NgModule({
    imports: [
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatOptionModule,
        MatSelectModule,
        CommonModule,
        MatButtonModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatTimepickerModule,
        MatInputModule,
        MatListModule,
        MatSidenavModule,
        RouterModule,
        MatIconModule,
        MatProgressBarModule,
    ],
  declarations: [
    DndComponent,
    CampaignComponent,
    CreateCampaignComponent
  ],
  providers: [
    UserService,
    DndService,
    SnackbarService
  ]
})
export class DndModule { }
