import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Autenticacao } from '../../login/autenticacao';
import { AutenticacaoService } from '../../services/autenticacao.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    itensAdmin: MenuItem[];
    itensSupermercado: MenuItem[];

    user: Autenticacao;

    constructor(private autenticacaoService: AutenticacaoService) {}

    ngOnInit(): void {
        this.autenticacaoService.currentUser.subscribe(user => {
                this.user = user;
                if (this.user) {
                    this.itensAdmin = [{
                        label: 'Administrador',
                        items: [
                            {label: 'Tipos de Pagamentos', icon: '',  routerLink: '/admin/tipos-pagamentos'},
                            {label: 'Supermercados', icon: '',  routerLink: '/admin/supermercados'}
                        ]
                    }];
                    this.itensSupermercado = [{
                        label: 'Supermercado',
                        items: [
                            {label: 'Pedidos', icon: '',  routerLink: '/supermercados/' +  this.user.targetId + '/pedidos/pendentes'},
                            {label: 'Estoque', icon: '',  routerLink: '/supermercados/' + this.user.targetId + '/estoque'}
                        ]
                    }];
                }
            });

    }

}
