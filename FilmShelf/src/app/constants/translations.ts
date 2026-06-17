import { AppLanguage } from '../services/language.service';

export const TRANSLATIONS: Record<AppLanguage, Record<string, string>> = {
  'en-US': {
    // navbar
    'navbar.title': 'FilmShelf',
    'navbar.notifications.heading': 'Notifications',
    'navbar.notifications.clearAll': 'Clear all',
    'navbar.nav.popular': 'Popular',
    'navbar.nav.movies': 'Movies',
    'navbar.nav.forYou': 'For You',
    'navbar.nav.login': 'Login',
    'navbar.nav.register': 'Register',
    'navbar.nav.watchlist': 'Watchlist',
    'navbar.dropdown.yourWatchlist': 'Your watchlist',
    'navbar.dropdown.yourLists': 'Your lists',
    'navbar.dropdown.yourReviews': 'Your reviews',
    'navbar.dropdown.logout': 'Logout',

    // login
    'login.heading': 'Login',
    'login.label.email': 'Email',
    'login.label.password': 'Password',
    'login.link.forgotPassword': 'Forgot Password?',
    'login.button.submit': 'Login',

    // register
    'register.heading': 'Register',
    'register.label.personName': 'Person Name',
    'register.label.email': 'Email',
    'register.label.password': 'Password',
    'register.label.confirmPassword': 'Confirm Password',
    'register.button.submit': 'Register',

    // forgot password
    'forgotPassword.heading': 'Forgot Password',
    'forgotPassword.label.email': 'Email',
    'forgotPassword.button.submit': 'Send email',

    // reset password
    'resetPassword.heading': 'Reset Password',
    'resetPassword.label.email': 'Email',
    'resetPassword.label.newPassword': 'New Password',
    'resetPassword.button.submit': 'Reset Password',

    // movies
    'movies.heading': 'Movies',

    // movie details
    'movieDetails.label.genres': 'Genres:',
    'movieDetails.label.overview': 'Overview:',
    'movieDetails.label.releaseDate': 'Release Date:',
    'movieDetails.label.runtime': 'Runtime:',
    'movieDetails.label.director': 'Director:',
    'movieDetails.label.averageRating': 'Average Rating:',
    'movieDetails.rating.outOf': '/ 10',
    'movieDetails.watchlist.inWatchlist': 'In watchlist',
    'movieDetails.watchlist.add': 'Add to Watchlist',
    'movieDetails.list.addToList': 'Add to List',
    'movieDetails.list.createNew': 'Create new list',
    'movieDetails.cast.heading': 'Cast',
    'movieDetails.runtime': '{hours} hours {minutes} minutes',

    // actor details
    'actorDetails.label.biography': 'Biography:',
    'actorDetails.button.readMore': 'Read More',
    'actorDetails.button.showLess': 'Show Less',
    'actorDetails.label.birthDate': 'Birth Date:',
    'actorDetails.movies.heading': 'Movies {name} stars in',

    // popular movies
    'popularMovies.heading': 'Popular Movies',

    // watchlist
    'watchlist.lastAdded': 'Last Added:',
    'watchlist.sortBy.placeholder': 'Sort by...',
    'watchlist.sortBy.title': 'Title',
    'watchlist.sortBy.rating': 'Rating',

    // custom list details
    'customListDetails.lastAdded': 'Last Added:',
    'customListDetails.button.editTitle': 'Edit Title',
    'customListDetails.button.save': 'Save',
    'customListDetails.button.cancel': 'Cancel',

    // custom lists
    'customLists.heading': 'Your Lists',
    'customLists.button.createList': 'Create List',

    // create list
    'createList.heading': 'Create New Watchlist',
    'createList.label.title': 'New Watchlist Title',
    'createList.input.placeholder': 'Enter list title',
    'createList.button.submit': 'Add List',

    // search bar
    'searchBar.placeholder': 'Search movies...',

    // recommendation feed — method labels & descriptions
    'recommendationFeed.method.claude.label': 'Claude (AI reasoning)',
    'recommendationFeed.method.claude.description': 'Claude-based with per-movie reasoning',
    'recommendationFeed.method.ml.label': 'Matrix Factorization (ML.NET)',
    'recommendationFeed.method.ml.description': 'Matrix factorization model',
    'recommendationFeed.method.content.label': 'Content-based',
    'recommendationFeed.method.content.description': 'Genres, director and actors similarity',
    'recommendationFeed.method.userCf.label': 'User Collaborative Filtering',
    'recommendationFeed.method.userCf.description': 'Pearson correlation between users',
    'recommendationFeed.method.embedding.label': 'Azure Embeddings',
    'recommendationFeed.method.embedding.description': 'Azure OpenAI embeddings + Azure AI Search vector similarity',
    'recommendationFeed.method.gpt.label': 'GPT (OpenAI)',
    'recommendationFeed.method.gpt.description': 'GPT-based with per-movie reasoning',
    'recommendationFeed.error.grid': 'Failed to load recommendations. Please try a different method.',
    'recommendationFeed.error.detailed': 'Failed to load detailed recommendations. Please try again.',
    'recommendationFeed.heading': 'Movies recommended for you',
    'recommendationFeed.view.grid': 'Grid',
    'recommendationFeed.view.detailed': 'Detailed',
    'recommendationFeed.method.label': 'Method:',
    'recommendationFeed.status.loading': 'Loading recommendations...',
    'recommendationFeed.status.noGrid': 'No recommendations available for this method.',
    'recommendationFeed.status.noDetailed': 'No detailed recommendations available.',
    'recommendationFeed.score.title': 'Recommendation score',

    // recommended movies
    'recommendedMovies.heading': 'Movies recommended for you',

    // reviews
    'reviews.heading': 'Reviews',
    'reviews.button.addReview': 'Add Review',
    'reviews.message.loginRequired': 'Please log in to leave a review.',
    'reviews.message.alreadyReviewed': 'You have already reviewed this movie',
    'reviews.form.label.content': 'Review Content:',
    'reviews.form.placeholder.content': 'Write your review here...',
    'reviews.form.label.rating': 'Rating:',
    'reviews.form.button.submit': 'Submit Review',
    'reviews.empty': 'No reviews yet',

    // user reviews
    'userReviews.heading': 'My Reviews',
    'userReviews.sortBy.label': 'Sort by:',
    'userReviews.sortBy.movieTitle': 'Movie Title',
    'userReviews.sortBy.userRating': 'User Rating',
    'userReviews.sortBy.dateReviewed': 'Date Reviewed',
    'userReviews.label.dateReviewed': 'Date Reviewed:',
    'userReviews.label.review': 'Review:',
    'userReviews.label.rating': 'Rating ({rating}/10):',
    'userReviews.button.edit': 'Edit Review',
    'userReviews.button.delete': 'Delete Review',
    'userReviews.edit.label.rating': 'Rating:',
    'userReviews.edit.button.save': 'Save',
    'userReviews.edit.button.cancel': 'Cancel',

    // review
    'review.button.edit': 'Edit',
    'review.edit.placeholder': 'Edit your review',
    'review.edit.button.save': 'Save',
    'review.edit.button.cancel': 'Cancel',
    'review.reply.button': 'Reply',
    'review.responses.hide': 'Hide Responses',
    'review.responses.show': 'Show Responses ({count})',
    'review.responses.heading': 'Responses',
    'review.reply.label': 'Reply:',
    'review.reply.placeholder': 'Write your reply here...',
    'review.reply.button.submit': 'Submit Reply',

    // notification
    'notification.respondedTo': 'responded to your review on',
    'notification.trending': "Check out today's top trending films!",

    // pagination
    'pagination.button.previous': 'Previous',
    'pagination.button.next': 'Next',

    // movie content tabs
    'movieContent.tab.movie': 'Movie',
    'movieContent.tab.reviews': 'Reviews',

    // actor card
    'actor.role.as': 'as',

    // movie card
    'movie.role.prefix': 'Role:',

    // app-level toast notifications
    'app.notification.respondedTo': 'responded to your review on',
    'app.movieNotification.heading': 'New Movie Recommendations',
    'app.movieNotification.rating': 'Rating:',
    'app.movieNotification.releaseDate': 'Release Date:',

    // validation errors
    'errors.personNameRequired': "Person Name can't be blank",
    'errors.emailRequired': "Email can't be blank",
    'errors.emailInvalid': 'Email should be in a proper email address format',
    'errors.passwordRequired': "Password can't be blank",
    'errors.confirmPasswordRequired': "Confirm Password can't be blank",
    'errors.passwordMismatch': 'Password and confirm password do not match',

    // confirm dialogs
    'confirm.deleteList': 'Are you sure you want to delete this list?',
    'confirm.deleteReview': 'Are you sure you want to delete this review?',
    'confirm.deleteResponse': 'Are you sure you want to delete this response?',
    'confirm.deleteMovieFromList': 'Are you sure you want to delete this movie from list?',
  },

  'uk-UA': {
    // navbar
    'navbar.title': 'FilmShelf',
    'navbar.notifications.heading': 'Сповіщення',
    'navbar.notifications.clearAll': 'Очистити все',
    'navbar.nav.popular': 'Популярне',
    'navbar.nav.movies': 'Фільми',
    'navbar.nav.forYou': 'Для вас',
    'navbar.nav.login': 'Увійти',
    'navbar.nav.register': 'Реєстрація',
    'navbar.nav.watchlist': 'Список перегляду',
    'navbar.dropdown.yourWatchlist': 'Ваш список перегляду',
    'navbar.dropdown.yourLists': 'Ваші списки',
    'navbar.dropdown.yourReviews': 'Ваші рецензії',
    'navbar.dropdown.logout': 'Вийти',

    // login
    'login.heading': 'Вхід',
    'login.label.email': 'Електронна пошта',
    'login.label.password': 'Пароль',
    'login.link.forgotPassword': 'Забули пароль?',
    'login.button.submit': 'Увійти',

    // register
    'register.heading': 'Реєстрація',
    'register.label.personName': "Ім'я",
    'register.label.email': 'Електронна пошта',
    'register.label.password': 'Пароль',
    'register.label.confirmPassword': 'Підтвердити пароль',
    'register.button.submit': 'Зареєструватися',

    // forgot password
    'forgotPassword.heading': 'Забули пароль',
    'forgotPassword.label.email': 'Електронна пошта',
    'forgotPassword.button.submit': 'Надіслати лист',

    // reset password
    'resetPassword.heading': 'Скинути пароль',
    'resetPassword.label.email': 'Електронна пошта',
    'resetPassword.label.newPassword': 'Новий пароль',
    'resetPassword.button.submit': 'Скинути пароль',

    // movies
    'movies.heading': 'Фільми',

    // movie details
    'movieDetails.label.genres': 'Жанри:',
    'movieDetails.label.overview': 'Опис:',
    'movieDetails.label.releaseDate': 'Дата виходу:',
    'movieDetails.label.runtime': 'Тривалість:',
    'movieDetails.label.director': 'Режисер:',
    'movieDetails.label.averageRating': 'Середня оцінка:',
    'movieDetails.rating.outOf': '/ 10',
    'movieDetails.watchlist.inWatchlist': 'У списку перегляду',
    'movieDetails.watchlist.add': 'Додати до списку перегляду',
    'movieDetails.list.addToList': 'Додати до списку',
    'movieDetails.list.createNew': 'Створити новий список',
    'movieDetails.cast.heading': 'Акторський склад',
    'movieDetails.runtime': '{hours} год {minutes} хв',

    // actor details
    'actorDetails.label.biography': 'Біографія:',
    'actorDetails.button.readMore': 'Читати більше',
    'actorDetails.button.showLess': 'Приховати',
    'actorDetails.label.birthDate': 'Дата народження:',
    'actorDetails.movies.heading': 'Фільми за участю {name}',

    // popular movies
    'popularMovies.heading': 'Популярні фільми',

    // watchlist
    'watchlist.lastAdded': 'Останнє додано:',
    'watchlist.sortBy.placeholder': 'Сортувати за...',
    'watchlist.sortBy.title': 'Назва',
    'watchlist.sortBy.rating': 'Рейтинг',

    // custom list details
    'customListDetails.lastAdded': 'Останнє додано:',
    'customListDetails.button.editTitle': 'Редагувати назву',
    'customListDetails.button.save': 'Зберегти',
    'customListDetails.button.cancel': 'Скасувати',

    // custom lists
    'customLists.heading': 'Ваші списки',
    'customLists.button.createList': 'Створити список',

    // create list
    'createList.heading': 'Створити новий список',
    'createList.label.title': 'Назва нового списку',
    'createList.input.placeholder': 'Введіть назву списку',
    'createList.button.submit': 'Додати список',

    // search bar
    'searchBar.placeholder': 'Пошук фільмів...',

    // recommendation feed — method labels & descriptions
    'recommendationFeed.method.claude.label': 'Claude (AI-аналіз)',
    'recommendationFeed.method.claude.description': 'Claude з обґрунтуванням для кожного фільму',
    'recommendationFeed.method.ml.label': 'Матрична факторизація (ML.NET)',
    'recommendationFeed.method.ml.description': 'Модель матричної факторизації',
    'recommendationFeed.method.content.label': 'На основі контенту',
    'recommendationFeed.method.content.description': 'Схожість за жанрами, режисером та акторами',
    'recommendationFeed.method.userCf.label': 'Колаборативна фільтрація',
    'recommendationFeed.method.userCf.description': 'Кореляція Пірсона між користувачами',
    'recommendationFeed.method.embedding.label': 'Azure Embeddings',
    'recommendationFeed.method.embedding.description': 'Azure OpenAI embeddings + векторна схожість Azure AI Search',
    'recommendationFeed.method.gpt.label': 'GPT (OpenAI)',
    'recommendationFeed.method.gpt.description': 'GPT з обґрунтуванням для кожного фільму',
    'recommendationFeed.error.grid': 'Не вдалося завантажити рекомендації. Спробуйте інший метод.',
    'recommendationFeed.error.detailed': 'Не вдалося завантажити детальні рекомендації. Спробуйте ще раз.',

    // recommendation feed
    'recommendationFeed.heading': 'Рекомендовані фільми для вас',
    'recommendationFeed.view.grid': 'Сітка',
    'recommendationFeed.view.detailed': 'Детально',
    'recommendationFeed.method.label': 'Метод:',
    'recommendationFeed.status.loading': 'Завантаження рекомендацій...',
    'recommendationFeed.status.noGrid': 'Немає рекомендацій для цього методу.',
    'recommendationFeed.status.noDetailed': 'Немає детальних рекомендацій.',
    'recommendationFeed.score.title': 'Оцінка рекомендації',

    // recommended movies
    'recommendedMovies.heading': 'Рекомендовані фільми для вас',

    // reviews
    'reviews.heading': 'Рецензії',
    'reviews.button.addReview': 'Додати рецензію',
    'reviews.message.loginRequired': 'Будь ласка, увійдіть, щоб залишити рецензію.',
    'reviews.message.alreadyReviewed': 'Ви вже залишили рецензію на цей фільм',
    'reviews.form.label.content': 'Текст рецензії:',
    'reviews.form.placeholder.content': 'Напишіть вашу рецензію тут...',
    'reviews.form.label.rating': 'Оцінка:',
    'reviews.form.button.submit': 'Надіслати рецензію',
    'reviews.empty': 'Рецензій ще немає',

    // user reviews
    'userReviews.heading': 'Мої рецензії',
    'userReviews.sortBy.label': 'Сортувати за:',
    'userReviews.sortBy.movieTitle': 'Назва фільму',
    'userReviews.sortBy.userRating': 'Оцінка користувача',
    'userReviews.sortBy.dateReviewed': 'Дата рецензії',
    'userReviews.label.dateReviewed': 'Дата рецензії:',
    'userReviews.label.review': 'Рецензія:',
    'userReviews.label.rating': 'Оцінка ({rating}/10):',
    'userReviews.button.edit': 'Редагувати рецензію',
    'userReviews.button.delete': 'Видалити рецензію',
    'userReviews.edit.label.rating': 'Оцінка:',
    'userReviews.edit.button.save': 'Зберегти',
    'userReviews.edit.button.cancel': 'Скасувати',

    // review
    'review.button.edit': 'Редагувати',
    'review.edit.placeholder': 'Редагуйте вашу рецензію',
    'review.edit.button.save': 'Зберегти',
    'review.edit.button.cancel': 'Скасувати',
    'review.reply.button': 'Відповісти',
    'review.responses.hide': 'Приховати відповіді',
    'review.responses.show': 'Показати відповіді ({count})',
    'review.responses.heading': 'Відповіді',
    'review.reply.label': 'Відповідь:',
    'review.reply.placeholder': 'Напишіть вашу відповідь тут...',
    'review.reply.button.submit': 'Надіслати відповідь',

    // notification
    'notification.respondedTo': 'відповів(-ла) на вашу рецензію до',
    'notification.trending': 'Перегляньте найкращі трендові фільми сьогодні!',

    // pagination
    'pagination.button.previous': 'Назад',
    'pagination.button.next': 'Далі',

    // movie content tabs
    'movieContent.tab.movie': 'Фільм',
    'movieContent.tab.reviews': 'Рецензії',

    // actor card
    'actor.role.as': 'у ролі',

    // movie card
    'movie.role.prefix': 'Роль:',

    // app-level toast notifications
    'app.notification.respondedTo': 'відповів(-ла) на вашу рецензію до',
    'app.movieNotification.heading': 'Нові рекомендації фільмів',
    'app.movieNotification.rating': 'Оцінка:',
    'app.movieNotification.releaseDate': 'Дата виходу:',

    // validation errors
    'errors.personNameRequired': "Ім'я не може бути порожнім",
    'errors.emailRequired': 'Електронна пошта не може бути порожньою',
    'errors.emailInvalid': 'Електронна пошта має бути у правильному форматі',
    'errors.passwordRequired': 'Пароль не може бути порожнім',
    'errors.confirmPasswordRequired': 'Підтвердження пароля не може бути порожнім',
    'errors.passwordMismatch': 'Паролі не збігаються',

    // confirm dialogs
    'confirm.deleteList': 'Ви впевнені, що хочете видалити цей список?',
    'confirm.deleteReview': 'Ви впевнені, що хочете видалити цю рецензію?',
    'confirm.deleteResponse': 'Ви впевнені, що хочете видалити цю відповідь?',
    'confirm.deleteMovieFromList': 'Ви впевнені, що хочете видалити цей фільм зі списку?',
  },
};
