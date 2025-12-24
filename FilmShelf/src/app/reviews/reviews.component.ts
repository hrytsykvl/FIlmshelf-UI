import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import { Review } from '../models/review';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../review/review.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TOKEN_KEY } from '../constants/constants';
import { getUserIdFromToken } from '../helpers/auth-helper';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, ReviewComponent, ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  showReviewForm: boolean = false;
  reviewForm: FormGroup;
  stars = Array(10).fill(0);
  movieId!: number;
  userId: number | null = null;
  hasReviewed = false;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private jwtHelper: JwtHelperService
  ) {
    this.reviewForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(1000)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  ngOnInit(): void {
    this.userId = getUserIdFromToken(this.jwtHelper);

    this.route.parent?.paramMap.subscribe((params) => {
      this.movieId = Number(params.get('id'));

      this.reviewService
        .retrieveReviewsForMovie(this.movieId)
        .subscribe((reviews) => {
          this.reviews = reviews;

          this.hasReviewed = this.reviews.some((r) => r.userId === this.userId);
        });
    });
  }

  toggleReviewForm(): void {
    this.showReviewForm = !this.showReviewForm;
  }

  setRating(rating: number): void {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  submitReview(): void {
    if (this.reviewForm.valid) {
      const newReview = this.reviewForm.value;
      newReview.movieId = this.movieId;
      this.reviewService.addReview(newReview).subscribe((review) => {
        this.reviews.push(review);
        this.toggleReviewForm();
        this.reviewForm.reset();
        this.hasReviewed = true;
      });
    }
  }

  isUserReview(review: Review): boolean {
    return review.userId === this.userId;
  }

  deleteReview(reviewId: number): void {
    if (confirm('Are you sure you want to delete this review?')) {
      this.reviewService.deleteReview(reviewId).subscribe(() => {
        this.reviews = this.reviews.filter((r) => r.id !== reviewId);
        this.hasReviewed = false;
      });
    }
  }
}
