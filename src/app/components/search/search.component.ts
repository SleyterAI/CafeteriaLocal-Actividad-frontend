import { Component, inject, signal, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'search-component',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  private categoriaService = inject(CategoriaService);

  categorias = signal<Categoria[]>([]);

  ngOnInit() {
    this.getAllCategoria();
  }

  private getAllCategoria(): void {
    this.categoriaService.getAllCategoria().subscribe({
      next: (categorias) => {
        this.categorias.set(categorias);
      },

      error: (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    });
  }
}
