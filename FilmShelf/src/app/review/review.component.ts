import { Component, input, output } from '@angular/core';
import { Review } from '../models/review';
import { CommonModule } from '@angular/common';
import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReviewService } from '../services/review.service';
import { ReviewResponseAddRequest } from '../models/review-response-add-request';
import { UpdateReviewRequest } from '../models/update-review-request';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, NgHeroiconsModule, ReactiveFormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  review = input.required<Review>();
  highlight = input<boolean>(false);
  isYourReview = input<boolean>(false);
  userId = input<number>();
  showReplyForm: boolean = false;
  showResponses: boolean = false;
  replyForm: FormGroup;
  editReviewForm: FormGroup;
  isEditing = false;
  onDelete = output<number>();

  constructor(private fb: FormBuilder, private reviewService: ReviewService) {
    this.replyForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(1000)]],
    });

    this.editReviewForm = this.fb.group({
      content: ['', [Validators.required, Validators.maxLength(1000)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  starsArray(rating: number): number[] {
    return Array(10)
      .fill(0)
      .map((_, i) => (i < rating ? 1 : 0));
  }

  toggleReplyForm() {
    this.showReplyForm = !this.showReplyForm;
  }

  toggleResponses() {
    this.showResponses = !this.showResponses;
  }

  submitReply() {
    if (this.replyForm.valid) {
      const request = new ReviewResponseAddRequest(
        this.replyForm.value.content
      );
      this.reviewService
        .addReviewResponse(this.review().id, request)
        .subscribe((reply) => {
          this.showReplyForm = false;
          this.review().responses.push(reply);
        });
    }
  }

  deleteReview() {
    this.onDelete.emit(this.review().id);
  }

  editReview() {
    this.isEditing = true;
    this.editReviewForm.setValue({
      content: this.review().content,
      rating: this.review().rating,
    });
  }

  saveReview() {
    if (this.editReviewForm.valid) {
      const request = new UpdateReviewRequest(
        this.editReviewForm.value.content,
        this.editReviewForm.value.rating
      );

      this.reviewService
        .updateReview(this.review().id, request)
        .subscribe(() => {
          this.review().content = request.content;
          this.review().rating = request.rating;
          this.isEditing = false;
        });
    }
  }

  isFormChanged(): boolean {
    return (
      this.editReviewForm.value.content !== this.review().content ||
      this.editReviewForm.value.rating !== this.review().rating
    );
  }

  setRating(rating: number) {
    this.editReviewForm.patchValue({ rating });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  deleteResponse(responseId: number) {
    if (confirm('Are you sure you want to delete this response?')) {
      this.reviewService.deleteReviewResponse(responseId).subscribe(() => {
        this.review().responses = this.review().responses.filter(
          (r) => r.id !== responseId
        );
      });
    }
  }
}
