import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { NotificationService } from './errors/servicos/notification.service';
import { Usuario } from './login/modelos/usuario';
import { AutenticacaoService } from './login/servicos/autenticacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService]
})
export class AppComponent implements OnInit {
  title = 'supermarkt-ui';
  user: Usuario;
  showMenu = true;

  notification: string;
  showNotification: boolean;

  constructor(private router: Router,
              private messageService: MessageService,
              private autenticacaoService: AutenticacaoService,
              private notificationService: NotificationService,
              ) {}

  ngOnInit(): void {
    this.autenticacaoService.currentUser.subscribe(user => this.user = user);
    this.notificationService
            .notification$
            .subscribe(message => {
              this.messageService.add({severity: 'error', summary: 'Erro', detail: message});
              this.notification = message;
              this.showNotification = true;
            });
  }

  logout(): void {
    this.autenticacaoService.logout();
    this.router.navigate(['']);
  }

}
