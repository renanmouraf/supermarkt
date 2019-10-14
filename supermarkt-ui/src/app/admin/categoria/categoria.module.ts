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

import { CategoriaFormularioComponent } from './categoria-formulario/categoria-formulario.component';
import { CategoriaGradeComponent } from './categoria-grade/categoria-grade.component';
import { CategoriaBuscaComponent } from './categoria-busca/categoria-busca.component';
import { CategoriaService } from './categoria.service';

import { CategoriaRoutingModule } from './categoria-routing.module';

@NgModule({
  declarations: [
    CategoriaFormularioComponent,
    CategoriaGradeComponent,
    CategoriaBuscaComponent
  ],
  imports: [
    MessagesModule,
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
    CategoriaRoutingModule
  ],
  providers: [CategoriaService, ConfirmationService]
})
export class CategoriaModule { }
