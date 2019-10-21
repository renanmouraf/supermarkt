import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ToastModule } from 'primeng/toast';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { SupermercadoFormularioComponent } from './supermercado-formulario/supermercado-formulario.component';
import { SupermercadoGradeComponent } from './supermercado-grade/supermercado-grade.component';
import { SupermercadoBuscaComponent } from './supermercado-busca/supermercado-busca.component';

import { SupermercadoService } from './supermercado.service';
import { SupermercadoRoutingModule } from './supermercado-routing.module';


@NgModule({
  declarations: [
    SupermercadoFormularioComponent,
    SupermercadoGradeComponent,
    SupermercadoBuscaComponent
  ],
  imports: [
    MessagesModule,
    SupermercadoRoutingModule,
    MessageModule,
    RadioButtonModule,
    RouterModule,
    TableModule,
    TooltipModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputMaskModule,
    InputTextModule,
    CommonModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  providers: [SupermercadoService, ConfirmationService]
})
export class SupermercadoModule { }
