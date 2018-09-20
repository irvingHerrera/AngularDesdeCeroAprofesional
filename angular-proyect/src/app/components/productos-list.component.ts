import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';

@Component({
    selector: 'productos-list',
    templateUrl: '../views/productos-list.html',
    providers: [ProductoService]
})


export class ProductosListComponent{
    public titulo: string;
    public productos: Producto[];
    public confirmado;
    
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _productoService: ProductoService
    ){
        this.titulo = 'Listado de Productos';
        this.confirmado = null;
    }

    ngOnInit(): void {
        console.log("Productos-list.component.ts cargado");
        this.getProducto();
    }

    getProducto(){
        this._productoService.getProductos().subscribe(result => {
            console.log("data", result);
            this.productos = result;
            console.log("data", this.productos);
          }, error => {
                console.log(<any>error);
          });
    }

    borrarConfirm(id){
        this.confirmado = id;
    }

    cancelarConfirm(){
        this.confirmado = null;
    }

    onDeleteProducto(id){
        this._productoService.deleteProducto(id).subscribe(result => {
            console.log("data", result);
            this.getProducto();
          }, error => {
                console.log(<any>error);
          });
    }

}