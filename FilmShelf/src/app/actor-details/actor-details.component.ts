import { Component, OnInit } from '@angular/core';
import { ActorDetailsResponse } from '../models/actor-details-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../services/actor.service';
import { CommonModule } from '@angular/common';
import { MovieComponent } from "../movie/movie.component";
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule, MovieComponent],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.css'
})
export class ActorDetailsComponent implements OnInit {
  actorDetails: ActorDetailsResponse | null = null;
  formattedBio: string = '';
  movieWatchlistStatus: { [movieId: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute, 
    private actorService: ActorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      this.actorService.findActor(id).subscribe({
        next: (response: ActorDetailsResponse) => {
          this.actorDetails = response;
          this.formattedBio = this.actorDetails.bio.replace(/\n/g, '<br>');

          if (this.actorDetails.movies) {
            this.movieWatchlistStatus = checkMoviesInWatchlist(
              this.actorDetails.movies.map(movie => movie.id)
            );
          }
        }
      });
    });
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
