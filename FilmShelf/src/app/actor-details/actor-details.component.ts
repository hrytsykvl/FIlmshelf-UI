import { Component, OnInit, effect } from '@angular/core';
import { ActorDetailsResponse } from '../models/actor-details-response';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../services/actor.service';
import { CommonModule } from '@angular/common';
import { MovieComponent } from "../movie/movie.component";
import { checkMoviesInWatchlist } from '../helpers/watchlist-helper';
import { LanguageService } from '../services/language.service';
import { TranslatePipe } from '../pipes/translate.pipe';

@Component({
  selector: 'app-actor-details',
  standalone: true,
  imports: [CommonModule, MovieComponent, TranslatePipe],
  templateUrl: './actor-details.component.html',
  styleUrl: './actor-details.component.scss'
})
export class ActorDetailsComponent implements OnInit {
  actorDetails: ActorDetailsResponse | null = null;
  firstParagraph = '';
  remainingParagraphs = '';
  movieWatchlistStatus: { [movieId: number]: boolean } = {};
  isCollapsed = true;
  private actorId!: number;

  constructor(
    private route: ActivatedRoute, 
    private actorService: ActorService,
    private router: Router,
    private languageService: LanguageService
  ) {
    effect(() => {
      const _ = this.languageService.language();
      if (this.actorId) {
        this.loadActorDetails(this.actorId);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.actorId = Number(params.get('id'));
      this.loadActorDetails(this.actorId);
    });
  }

  private loadActorDetails(id: number): void {
    this.actorService.findActor(id, this.languageService.language()).subscribe({
      next: (response: ActorDetailsResponse) => {
        this.actorDetails = response;
        const formattedBio = this.actorDetails.bio.replace(/\n/g, '<br>');
        const paragraphs = formattedBio.split('<br><br>');
        this.firstParagraph = paragraphs[0];
        this.remainingParagraphs = paragraphs.slice(1).join('<br><br>');

        if (this.actorDetails.movies) {
          this.movieWatchlistStatus = checkMoviesInWatchlist(
            this.actorDetails.movies.map(movie => movie.id)
          );
        }
      }
    });
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onMovieClick(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}
