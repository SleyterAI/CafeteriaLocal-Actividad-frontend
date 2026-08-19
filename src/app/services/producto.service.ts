import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoRequest } from '../interfaces/producto.interface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/productos`;

  getAllProduct(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductsByCategoria(nombreCategoria: string): Observable<Producto[]> {
    const params = new HttpParams()
    .set('nombreCategoria', nombreCategoria);

    return this.http.get<Producto[]>(this.apiUrl,{params});
  }

    /*getProductsByCategoria(nombreCategoria: string): Observable<Producto[]> {
    return this.http.get<Producto[]>(
      `${this.apiUrl}?nombreCategoria=${encodeURIComponent(nombreCategoria)}`
    );
  }*/

  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  createProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }

  updateProducto(id: number, producto: ProductoRequest): Observable<ProductoRequest> {
    return this.http.put<ProductoRequest>(`${this.apiUrl}/${id}`, producto);
  }

  /*deleteProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }*/

  cambiarActivo(id: number, activo: boolean): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/activo`, { activo });
  }

}
