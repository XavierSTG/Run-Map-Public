import {NgModule} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
    MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatTabsModule,
    MatStepperModule, MatRadioModule, MatSelectModule, MatSlideToggleModule
} from "@angular/material";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatStepperModule,
        MatRadioModule,
        MatTooltipModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonModule
    ],
    exports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatStepperModule,
        MatRadioModule,
        MatTooltipModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonModule
    ],
})
export class CustomMaterialModule { }