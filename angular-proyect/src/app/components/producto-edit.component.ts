import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductoService } from '../service/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../service/global'
import { NgForm } from '@angular/forms';

@Component({
    selector: 'producto-edit',
    templateUrl : '../views/producto-add.html',
    providers: [ProductoService]
})

export class ProductoEditComponent{
    public titulo:string;
    public producto:Producto;
    public filesToUpload;
    public resultUpload;
    public isEdit;
    public nombreImagen:string;

    constructor(
        private _productoService: ProductoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.titulo = "Editar Producto";
        this.isEdit = true;
        this.getProducto();
    }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        
    }

    getProducto(){

        this._route.params.forEach((params: Params) => {
            let id = params['id'];  
            console.log("parametro id: ", id);
  
            this._productoService.getProducto(id).subscribe(result => {
              console.log("data", <Response>result);
              this.producto = result;
            }, error => {
                  console.log(<any>error);
            });
  
          });

    }

    onSubmit(form: NgForm){
        console.log(this.producto);
        
        if(this.filesToUpload && this.filesToUpload.length >= 1){

            this._productoService.makeFileRequest(GLOBAL.url+"producto/UploadFile", [], this.filesToUpload)
            .then((result) => {
                console.log(<any>result);
                this.resultUpload = result;
                this.nombreImagen = this.resultUpload.nombreArchivo;
                this.updateProducto(form);
            }, (error) => {
                console.log(error);
            });       
        }else{
            this.updateProducto(form);
        }
    }

    updateProducto(form: NgForm){
        console.log("imagen", this.producto);
        this.producto.imagen = this.nombreImagen;
        this._route.params.forEach((params: Params) => {
            let id = params['id'];  
        this._productoService.editProducto(id, this.producto).subscribe(res => {
            console.log("resultado", res);
            this.producto = new Producto(0, '', '', 0, '');
            form.resetForm();
            this._router.navigate(['/producto', id]);
        }
            , error => {console.log("error: ", error);});
    });
    }

    fileChangeEvent(fileInput: any){
       this.filesToUpload = <Array<File>>fileInput.target.files;
       console.log("", this.filesToUpload);
    }
}