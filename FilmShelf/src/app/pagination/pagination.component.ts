import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  currentPage = input<number>(1);
  totalPages = input<number>(0);
  pageChanged = output<number>();

  goToPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages()) {
      this.pageChanged.emit(pageNumber);
    }
  }

  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    const maxVisible = 3;

    const start = Math.max(1, this.currentPage() - Math.floor(maxVisible / 2));
    const end = Math.min(this.totalPages(), start + maxVisible - 1);

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }
}
