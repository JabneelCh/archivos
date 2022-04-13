import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Cliente } from 'src/app/Models/Cliente';
import { Subdistribuidor } from 'src/app/Models/Subdistribuidor';
import { Usuario } from 'src/app/Models/Usuario';
import { GlobalsService } from 'src/app/Services/globals.service';
import { DialogView } from '../notificacion/dialogView';


@Component({
  selector: 'app-descuentos-solicitudes',
  templateUrl: './descuentos-solicitudes.component.html',
  styleUrls: ['./descuentos-solicitudes.component.css']
})
export class DescuentosSolicitudesComponent implements OnInit {

  clienteControl = new FormControl();
  Clientes: Array<Cliente> = [];
  usuarioVHA: Usuario = {};
  solicitudesRevision: Array<Subdistribuidor> = [];

  constructor(private http: HttpClient, private globalService: GlobalsService, private dialog: MatDialog) { 
    this.usuarioVHA = this.globalService.UsuarioLogueado;
  }

  ngOnInit(): void {
    
  }

  buscarClientes(): void {
    if (typeof this.clienteControl.value === 'string') {
      if (this.clienteControl.value.length >= 3) {
        setTimeout(() => {
          this.http.get<Array<Cliente>>(this.globalService.urlAPI + `Cte/ClientesSubdistribuidores?buscar=${this.clienteControl.value}` , {
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + this.usuarioVHA.token
            })
          }).subscribe({
            next: response => {
              this.Clientes = response;
            }, 
            error: err => {
              this.dialog.open(DialogView, {
                width: '300px',
                data: {titulo: 'Error', mensaje: 'Ocurrio un error al obtener los clientes'}
              })
            }
          })
        }, 500);
      }
    }
  }

  seleccionarCliente(): void {
    this.http.get<Array<Subdistribuidor>>(this.globalService.urlAPI + `Subdistribuidor/SubdistribuidorClienteAgenteEstatus?Cliente=${this.clienteControl.value}&Estatus=REVISION`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.usuarioVHA.token
      })
    }).subscribe({
      next: data => {
        this.solicitudesRevision = data;
      }, 
      error: err => {
        this.dialog.open(DialogView, {
          width: '300px',
          data: {titulo: 'Error', mensaje: 'Ocurrio un error al obtener las solicitudes del cliente ' + this.clienteControl.value}
        })
      }
    })
  }


}
