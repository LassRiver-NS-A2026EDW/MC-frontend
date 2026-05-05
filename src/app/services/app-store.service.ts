import { Injectable, signal, computed, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book, Review, User, Loan, AppView } from '../models/models';
import { mockBooks, mockReviews, mockUsers, mockLoans } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class AppStore {
  // ─── State ──────────────────────────────────────────────
  readonly currentUser = signal<User | null>(null);
  readonly books = signal<Book[]>(mockBooks);
  readonly reviews = signal<Review[]>(mockReviews);
  readonly loans = signal<Loan[]>(mockLoans);
  readonly favorites = signal<string[]>([]);
  readonly searchQuery = signal('');
  readonly categoryFilter = signal('all');
  readonly languageFilter = signal('all');
  readonly ratingFilter = signal('all');
  readonly availabilityFilter = signal('all');
  readonly currentView = signal<AppView>('home');
  readonly selectedBook = signal<Book | null>(null);
  readonly sidebarCollapsed = signal(false);
  readonly theme = signal<'light' | 'dark'>('dark');
  private platformId = inject(PLATFORM_ID);

  // ─── Computed ───────────────────────────────────────────
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly isLibrarian = computed(() => this.currentUser()?.role === 'librarian');
  readonly isAdminOrLibrarian = computed(() => this.isAdmin() || this.isLibrarian());

  readonly filteredBooks = computed(() => {
    let list = this.books();
    const search = this.searchQuery().toLowerCase();
    const category = this.categoryFilter();
    const language = this.languageFilter();
    const rating = this.ratingFilter();
    const availability = this.availabilityFilter();

    if (search) {
      list = list.filter(
        (b) => b.title.toLowerCase().includes(search) || b.author.toLowerCase().includes(search),
      );
    }
    if (category !== 'all') list = list.filter((b) => b.category === category);
    if (language !== 'all') list = list.filter((b) => b.language === language);
    if (rating !== 'all') list = list.filter((b) => b.rating >= Number(rating));
    if (availability !== 'all')
      list = list.filter((b) => (availability === 'available' ? b.available : !b.available));
    return list;
  });

  readonly favoriteBooks = computed(() => {
    const favIds = this.favorites();
    return this.books().filter((b) => favIds.includes(b.id));
  });

  readonly userReviews = computed(() => {
    const user = this.currentUser();
    if (!user) return [];
    return this.reviews().filter((r) => r.userId === user.id);
  });

  readonly flaggedReviews = computed(() => this.reviews().filter((r) => r.flagged));

  readonly stats = computed(() => {
    const allBooks = this.books();
    return {
      totalBooks: allBooks.length,
      availableBooks: allBooks.filter((b) => b.available).length,
      categories: new Set(allBooks.map((b) => b.category)).size,
      avgRating: (allBooks.reduce((acc, b) => acc + b.rating, 0) / allBooks.length).toFixed(1),
      totalUsers: mockUsers.length,
      totalLoans: this.loans().length,
      activeLoans: this.loans().filter((l) => l.status === 'active').length,
      overdueLoans: this.loans().filter((l) => l.status === 'overdue').length,
    };
  });

  // ─── Auth ───────────────────────────────────────────────
  login(email: string, _password: string): boolean {
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      this.currentUser.set(user);
      this.currentView.set('home');
      return true;
    }
    return false;
  }

  register(name: string, email: string, _password: string): boolean {
    if (mockUsers.find((u) => u.email === email)) return false;
    const newUser: User = { id: `u${Date.now()}`, name, email, role: 'user' };
    mockUsers.push(newUser);
    this.currentUser.set(newUser);
    this.currentView.set('home');
    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    this.currentView.set('home');
  }

  updateProfile(updates: Partial<User>): void {
    const user = this.currentUser();
    if (user) this.currentUser.set({ ...user, ...updates });
  }

  // ─── Navigation ─────────────────────────────────────────
  navigate(view: AppView): void {
    this.currentView.set(view);
  }

  selectBook(book: Book | null): void {
    this.selectedBook.set(book);
  }

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  setCategoryFilter(category: string): void {
    this.categoryFilter.set(category);
  }

  setLanguageFilter(language: string): void {
    this.languageFilter.set(language);
  }

  setRatingFilter(rating: string): void {
    this.ratingFilter.set(rating);
  }

  setAvailabilityFilter(availability: string): void {
    this.availabilityFilter.set(availability);
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }

  toggleTheme(): void {
    this.theme.update((t) => (t === 'light' ? 'dark' : 'light'));
    if (isPlatformBrowser(this.platformId)) {
      if (this.theme() === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }

  // ─── Favorites ──────────────────────────────────────────
  toggleFavorite(bookId: string): void {
    this.favorites.update((favs) =>
      favs.includes(bookId) ? favs.filter((id) => id !== bookId) : [...favs, bookId],
    );
  }

  isFavorite(bookId: string): boolean {
    return this.favorites().includes(bookId);
  }

  // ─── Reviews ────────────────────────────────────────────
  addReview(review: Omit<Review, 'id' | 'date'>): void {
    const newReview: Review = {
      ...review,
      id: `r${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      flagged: false,
    };
    this.reviews.update((r) => [...r, newReview]);
    this.books.update((books) =>
      books.map((b) => (b.id === review.bookId ? { ...b, reviewCount: b.reviewCount + 1 } : b)),
    );
  }

  deleteReview(reviewId: string): void {
    const review = this.reviews().find((r) => r.id === reviewId);
    if (review) {
      this.reviews.update((r) => r.filter((rev) => rev.id !== reviewId));
      this.books.update((books) =>
        books.map((b) =>
          b.id === review.bookId ? { ...b, reviewCount: Math.max(0, b.reviewCount - 1) } : b,
        ),
      );
    }
  }

  flagReview(reviewId: string, reason: string): void {
    this.reviews.update((r) =>
      r.map((rev) => (rev.id === reviewId ? { ...rev, flagged: true, flagReason: reason } : rev)),
    );
  }

  unflagReview(reviewId: string): void {
    this.reviews.update((r) =>
      r.map((rev) =>
        rev.id === reviewId ? { ...rev, flagged: false, flagReason: undefined } : rev,
      ),
    );
  }

  // ─── Books (Admin) ──────────────────────────────────────
  addBook(book: Omit<Book, 'id'>): void {
    const newBook: Book = { ...book, id: `b${Date.now()}` };
    this.books.update((b) => [...b, newBook]);
  }

  updateBook(bookId: string, updates: Partial<Book>): void {
    this.books.update((books) => books.map((b) => (b.id === bookId ? { ...b, ...updates } : b)));
  }

  deleteBook(bookId: string): void {
    this.books.update((b) => b.filter((book) => book.id !== bookId));
  }

  // ─── Loans ──────────────────────────────────────────────
  addLoan(loan: Omit<Loan, 'id'>): void {
    const newLoan: Loan = { ...loan, id: `l${Date.now()}` };
    this.loans.update((l) => [...l, newLoan]);
    this.updateBook(loan.bookId, { available: false });
  }

  updateLoan(loanId: string, updates: Partial<Loan>): void {
    this.loans.update((loans) => loans.map((l) => (l.id === loanId ? { ...l, ...updates } : l)));
    if (updates.status === 'returned') {
      const loan = this.loans().find((l) => l.id === loanId);
      if (loan) this.updateBook(loan.bookId, { available: true });
    }
  }
}
