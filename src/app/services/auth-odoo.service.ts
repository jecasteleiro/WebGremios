import { Injectable } from '@angular/core';
import * as odoo_xmlrpc from 'odoo-xmlrpc'
import { UsuarioModel } from '../models/usuario.model'


let connected: boolean=false;

@Injectable({
  providedIn: 'root'
})
export class AuthOdooService {

  odooClient: odoo_xmlrpc;
  username:string ="";
  password:string ="";

  constructor() {

    const host = '127.0.0.1'
    const port= 8069;
    const db = 'demo';

    this.odooClient = new odoo_xmlrpc({
      url: 'http://' + host,
      port: port,
      db: db,
      username: this.username,
      password: this.password,
    });

  }

  login(usuario:UsuarioModel){

    this.odooClient.username = usuario.username;
    this.odooClient.password = usuario.password;

    this.odooClient.connect(function (err){
      if (err) {
        console.error("Login Failed");
        console.error(err);
        connected = false;
        return console.log("Fail")
      } else {
        console.log("Login Success");
        connected = true;
      }
    });
  }

  isConnected():boolean{
    return connected;
  }
}
