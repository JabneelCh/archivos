import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  public urlAPI: string = 'https://localhost:44338/api/';
  public KeyEncrypt: string = 'VHASD2022';
  public ivEncrypt: string = 'VHASD2022';
  public urlImages: string = 'assets/img/IMAGENES_MODULO_DE_VENTAS/';
  public UsuarioLogueado: Usuario = {};
  public familiaArticulo: string = 'TODAS';
  public lineaArticulo: string = 'TODAS';
  
  constructor() { 
    const usuarioLocal: any =  localStorage.getItem('usuario');
    this.UsuarioLogueado = JSON.parse(usuarioLocal);
  }
}
