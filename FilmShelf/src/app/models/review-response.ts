export class ReviewResponse {
  id: number;
  reviewId: number;
  content: string;
  createdAt: Date;
  userId: number;
  userName: string;

  constructor(
    id: number,
    reviewId: number,
    content: string,
    createdAt: Date,
    userId: number,
    userName: string
  ) {
    this.id = id;
    this.reviewId = reviewId;
    this.content = content;
    this.createdAt = createdAt;
    this.userId = userId;
    this.userName = userName;
  }
}
