import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto'
import { GLOBAL } from '../service/global'
import { NgForm } from '@angular/forms';

@Component({
    selector: 'producto-add',
    templateUrl: '../views/producto-add.html',
    providers: [ProductoService]
})

export class ProductoAddComponent{
    public titulo:string;
    public producto: Producto;
    public filesToUpload;
    public resultUpload;
    public nombreImagen:string;


    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
        ){
        this.titulo = "Crear un nuevo producto";
        this.producto = new Producto(0, '', '', 0, '');
    }

    ngOnInit(): void {
        console.log("producto-add component cargado");
    }

    onSubmit(form: NgForm){
        console.log(this.producto);
        
        if(this.filesToUpload && this.filesToUpload.length >= 1){

            this._productoService.makeFileRequest(GLOBAL.url+"producto/UploadFile", [], this.filesToUpload)
            .then((result) => {
                console.log(<any>result);
                this.resultUpload = result;
                this.nombreImagen = this.resultUpload.nombreArchivo;
                this.saveProducto(form);
            }, (error) => {
                console.log(error);
            });       
        }else{
            this.saveProducto(form);
        }
    }

    saveProducto(form: NgForm){
        console.log("imagen", this.producto);
        this.producto.imagen = this.nombreImagen;
        this._productoService.addProducto(this.producto).subscribe(res => {
            console.log("resultado", res);
            this.producto = new Producto(0, '', '', 0, '');
            form.resetForm();
            this._router.navigate(['/productos']);
        }
            , error => {console.log("error: ", error);});
    }

    fileChangeEvent(fileInput: any){
       this.filesToUpload = <Array<File>>fileInput.target.files;
       console.log("", this.filesToUpload);
    }
}