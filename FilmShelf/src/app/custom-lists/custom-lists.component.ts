import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  DEFAULT_WATCHLIST_ID_KEY
} from '../constants/constants';
import { CommonModule } from '@angular/common';
import { CustomListComponent } from '../custom-list/custom-list.component';
import { WatchlistService } from '../services/watchlist.service';
import { updateWatchlistStore } from '../helpers/watchlist-helper';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-custom-lists',
  standalone: true,
  imports: [CommonModule, CustomListComponent, RouterLink, TranslatePipe],
  templateUrl: './custom-lists.component.html',
  styleUrl: './custom-lists.component.scss',
})
export class CustomListsComponent implements OnInit {
  firstMoviePoster: string = '';
  userLists: {
    watchlistId: number;
    title: string;
    movieIds: number[];
  }[] = [];

  constructor(
    private watchlistService: WatchlistService
  ) {}

  ngOnInit(): void {
    const defaultWatchlistId = JSON.parse(
      localStorage.getItem(DEFAULT_WATCHLIST_ID_KEY)!
    );

    this.watchlistService.checkWatchlistsMovies().subscribe({
      next: (response) => {
        this.userLists = response.filter(
          (list: { watchlistId: number }) =>
            list.watchlistId !== defaultWatchlistId
        );
      },
    });
  }

  onDeleteWatchlist(watchlistId: number): void {
    this.watchlistService.deleteWatchlist(watchlistId).subscribe({
      next: () => {
        this.userLists = this.userLists.filter(
          (list) => list.watchlistId !== watchlistId
        );
        updateWatchlistStore(watchlistId, null, true);
      },
    });
  }
}
