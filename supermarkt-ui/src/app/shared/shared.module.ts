import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ErrorsModule } from '../errors/errors.module';
import { NotificationService } from '../errors/servicos/notification.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ErrorsModule
  ],
  providers: [
    NotificationService,
  ],
})
export class SharedModule { }
