import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/errors/servicos/notification.service';
import { Supermercado } from '../modelos/supermercado';
import { SupermercadoService } from '../servicos/supermercado.service';


@Component({
  selector: 'app-supermercado-formulario',
  templateUrl: './supermercado-formulario.component.html',
  styleUrls: ['./supermercado-formulario.component.scss'],
})
export class SupermercadoFormularioComponent implements OnInit {

  supermercadoForm: FormGroup;
  idSupermercado: number;
  supermercado = {};

  constructor(
    private fb: FormBuilder,
    private notificaoServico: NotificationService,
    private supermercadoService: SupermercadoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idSupermercado = this.route.snapshot.params.idSupermercado;
    if (this.idSupermercado) {
        this.supermercadoService.getSupermercadoById(this.idSupermercado)
            .subscribe( supermercado => {
                this.updateItemForm(supermercado);
            },
            erro => {
              this.notificaoServico.notify({severity: 'error', summary: 'Erro',
              detail: 'Não foi possível efetuar a operação. Tente novamente'});
            }
        );
    }

    this.supermercadoForm = this.fb.group({
      id: undefined,
      nome: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      cnpj: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      descricao: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      cep: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      endereco: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      taxaDeEntregaEmReais: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      tempoDeEntregaMinimoEmMinutos: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
      tempoDeEntregaMaximoEmMinutos: new FormControl(undefined, Validators.compose([Validators.required, Validators.maxLength(50)])),
    });
  }

  onSubmit(supermercado: Supermercado): void {
    this.supermercadoService.salva(supermercado)
      .subscribe(
        () => {
          this.supermercadoForm.reset();
          this.notificaoServico.notify({severity: 'info', summary: 'Sucesso', detail: 'Operação efetuada com sucesso!'});
        },
        erro => {
          this.notificaoServico.notify({severity: 'error', summary: 'Erro',
          detail: 'Não foi possível efetuar a operação. Tente novamente'});
        }
      );
  }

  formInvalid(): boolean {
    return !this.supermercadoForm.valid;
  }

  private updateItemForm(supermercado: Supermercado): void {
    this.supermercadoForm.patchValue({
        tempoDeEntregaMaximoEmMinutos: supermercado.tempoDeEntregaMaximoEmMinutos,
        tempoDeEntregaMinimoEmMinutos: supermercado.tempoDeEntregaMinimoEmMinutos,
        taxaDeEntregaEmReais: supermercado.taxaDeEntregaEmReais,
        endereco: supermercado.endereco,
        cep: supermercado.cep,
        descricao: supermercado.descricao,
        cnpj: supermercado.cnpj,
        nome: supermercado.nome,
        id: supermercado.id
    });
  }

}
