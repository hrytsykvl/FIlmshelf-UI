import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WatchlistService } from '../services/watchlist.service';
import { Router } from '@angular/router';
import { UpsertWatchlistRequest } from '../models/upsert-watchlist-request';
import { updateWatchlistStore } from '../helpers/watchlist-helper';

@Component({
  selector: 'app-create-list',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-list.component.html',
  styleUrl: './create-list.component.css',
})
export class CreateListComponent {
  newListForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private watchlistService: WatchlistService,
    private router: Router
  ) {
    this.newListForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  addNewList(): void {
    if (this.newListForm.valid) {
      const newWatchlist: UpsertWatchlistRequest = {
        title: this.newListForm.value.title,
      };

      this.watchlistService.createWatchlist(newWatchlist).subscribe({
        next: (watchlistId: number) => {
          updateWatchlistStore(watchlistId, newWatchlist.title);
          
          this.router.navigate(['/lists']);
        },
      });
    }
  }
}
