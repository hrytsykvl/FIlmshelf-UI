import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UpdateReviewRequest } from '../models/update-review-request';
import { CONFIRM_MESSAGES } from '../constants/messages';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, TranslatePipe],
  templateUrl: './user-reviews.component.html',
  styleUrl: './user-reviews.component.scss',
})
export class UserReviewsComponent implements OnInit {
  reviews: Review[] = [];
  editingReview: Review | null = null;
  stars = Array(10).fill(0);
  currentSort: string = 'date';

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentSort = params['sort'] || 'date';
      this.loadUserReviews();
    });
  }

  loadUserReviews(): void {
    this.reviewService.retrieveReviewsForUser().subscribe((reviews) => {
      this.reviews = reviews;
      this.sortReviews(this.currentSort);
    });
  }

  toggleEditReviewForm(review: Review): void {
    this.editingReview = { ...review };
  }

  setEditRating(rating: number): void {
    if (this.editingReview) {
      this.editingReview.rating = rating;
    }
  }

  cancelEdit(): void {
    this.editingReview = null;
  }

  updateReview(): void {
    if (!this.editingReview) return;

    const updateRequest = new UpdateReviewRequest(
      this.editingReview.content,
      this.editingReview.rating
    );

    this.reviewService
      .updateReview(this.editingReview.id, updateRequest)
      .subscribe(() => {
        this.loadUserReviews();
        this.editingReview = null;
      });
  }

  deleteReview(reviewId: number): void {
    if (confirm(this.languageService.translate('confirm.deleteReview'))) {
      this.reviewService.deleteReview(reviewId).subscribe(() => {
        this.reviews = this.reviews.filter((review) => review.id !== reviewId);
      });
    }
  }

  onSortChange(event: Event): void {
    const criteria = (event.target as HTMLSelectElement).value;
    this.currentSort = criteria;
    this.sortReviews(criteria);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { sort: criteria },
      queryParamsHandling: 'merge',
    });
  }

  sortReviews(criteria: string): void {
    switch (criteria) {
      case 'title':
        this.reviews.sort((a, b) => a.movieTitle.localeCompare(b.movieTitle));
        break;
      case 'rating':
        this.reviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'date':
        this.reviews.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        break;
      default:
        break;
    }
  }
}
