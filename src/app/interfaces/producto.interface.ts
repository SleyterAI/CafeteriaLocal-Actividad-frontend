import {Categoria} from './categoria.interface'

export interface Producto {
  id?:number;
  nombre:string;
  descripcion:string;
  precio:number;
  stock:number;
  imageUrl:string;
  activo:boolean;
  categoria: Categoria;
}

export interface ProductoRequest {
  id?:number;
  nombre:string;
  descripcion:string;
  precio:number;
  stock:number;
  imageUrl:string;
  activo:boolean;
  categoria: {
    id: number;
  };
}
