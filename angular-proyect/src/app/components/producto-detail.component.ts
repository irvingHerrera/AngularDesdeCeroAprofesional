import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';

@Component({
    selector: 'producto-detail',
    templateUrl: '../views/producto-detail.html',
    providers: [ProductoService]
})

export class ProductoDetailComponent{
    public producto: Producto;

    constructor(
        private _productoService: ProductoService,
        private _router: ActivatedRoute,
        private _route: Router
    ){

    }

    ngOnInit(): void {
        console.log("producto.detail cargado");
        this.getProducto();
            
    }

    getProducto(){
        this._router.params.forEach((params: Params) => {
          let id = params['id'];  
          console.log("parametro id: ", id);

          this._productoService.getProducto(id).subscribe(result => {
            console.log("data", <Response>result);
            this.producto = result;
          }, error => {
                console.log(<any>error);
          });

        });

        /*this._productoService.getProductos(id).subscribe(result => {
            console.log("data", result);
          }, error => {
                console.log(<any>error);
          });*/
        
    }
}
