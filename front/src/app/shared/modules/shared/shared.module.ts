import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

//Modulos
import { InputValidatorModule } from '../../components/input-validator/input-validator.module';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [NavbarComponent, SpinnerComponent],
  imports: [
    CommonModule,
    CardModule,
    PanelModule,
    ButtonModule,
    MessagesModule,
    SidebarModule,
    TableModule,
    ProgressSpinnerModule,
    CascadeSelectModule,
    InputTextModule,
    InputNumberModule,
    InputValidatorModule,
    TooltipModule,
  ],
  exports: [
    CardModule,
    PanelModule,
    ButtonModule,
    MessagesModule,
    NavbarComponent,
    SidebarModule,
    TableModule,
    SpinnerComponent,
    ProgressSpinnerModule,
    CascadeSelectModule,
    InputTextModule,
    InputNumberModule,
    InputValidatorModule,
    TooltipModule,
  ],
})
export class SharedModule {}
