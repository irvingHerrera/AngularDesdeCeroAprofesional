import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent{
    public titulo: string;

    constructor(){
        this.titulo = 'Web App de Productos con Angular 4';
    }

    ngOnInit(): void {
        console.log("se a cargado el componente home");
    }
}