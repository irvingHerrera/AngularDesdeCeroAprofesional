import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { GLOBAL } from './global'
import { map } from 'rxjs/operators';

@Injectable() 
export class ProductoService{
    public url: string;
 
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getProductos():Observable<any>{
        return this._http.get(this.url+'producto');
    }

    addProducto(producto: Producto):Observable<any>{
        let json = JSON.stringify(producto);
        /*let params = 'json='+json;
        let headers = new Headers({'Content-Type':'application'})*/
        console.log("servicio", producto);
        return this._http.post(this.url+"producto", producto);
    }
    
    makeFileRequest(url: string, parmas: Array<string>, files: Array<File>){
        return new Promise((resolver, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for(var i = 0; i < files.length; i++){
                formData.append('uploads[]', files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
              if(xhr.readyState == 4){
                  if(xhr.status == 200){
                      resolver(JSON.parse(xhr.response));
                  }else{
                        reject(xhr.response);
                  }
              }
            };

            xhr.open("POST", url, true);
            xhr.send(formData);

        });
    }

    getProducto(id):Observable<any>{

        console.log("test", this._http.get(this.url+'producto/'+id));

        return this._http.get(this.url+'producto/'+id)
        .pipe(map(data => data))
    }

    editProducto(id, producto:Producto):Observable<any>{
        return this._http.put(this.url+"producto/"+id, producto);
    }

    deleteProducto(id):Observable<any>{
        return this._http.delete(this.url+"producto/"+id);
    }
}


