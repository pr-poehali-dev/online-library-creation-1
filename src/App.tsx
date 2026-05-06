import { useState } from "react";
import Icon from "@/components/ui/icon";

const BOOK_IMG_1 = "https://cdn.poehali.dev/projects/2370b9bb-34e3-4a95-9c9c-18c283b19844/files/25cba558-3b2f-4719-89fc-b61565aa4a76.jpg";
const BOOK_IMG_2 = "https://cdn.poehali.dev/projects/2370b9bb-34e3-4a95-9c9c-18c283b19844/files/8f46c3f1-94c6-4553-b17b-f99c6f90766d.jpg";
const BOOK_IMG_3 = "https://cdn.poehali.dev/projects/2370b9bb-34e3-4a95-9c9c-18c283b19844/files/20b3ee1a-c606-4881-8a21-9e63ed913916.jpg";

const BOOKS = [
  { id: 1, title: "Мастер и Маргарита", author: "Михаил Булгаков", genre: "Классика", year: 1967, rating: 4.9, pages: 480, img: BOOK_IMG_1, desc: "Роман о дьяволе, явившемся в советскую Москву, и о вечной любви." },
  { id: 2, title: "1984", author: "Джордж Оруэлл", genre: "Антиутопия", year: 1949, rating: 4.8, pages: 328, img: BOOK_IMG_2, desc: "Классика антиутопии о тотальном контроле и сопротивлении системе." },
  { id: 3, title: "Зелёная миля", author: "Стивен Кинг", genre: "Драма", year: 1996, rating: 4.7, pages: 400, img: BOOK_IMG_3, desc: "История о чуде и человечности в камере смертников." },
  { id: 4, title: "Преступление и наказание", author: "Фёдор Достоевский", genre: "Классика", year: 1866, rating: 4.8, pages: 574, img: BOOK_IMG_1, desc: "Психологический роман о вине, искуплении и нравственных муках." },
  { id: 5, title: "Дюна", author: "Фрэнк Герберт", genre: "Фантастика", year: 1965, rating: 4.7, pages: 688, img: BOOK_IMG_2, desc: "Эпическая сага о политике, религии и экологии далёкого будущего." },
  { id: 6, title: "Маленький принц", author: "Антуан де Сент-Экзюпери", genre: "Сказка", year: 1943, rating: 4.9, pages: 96, img: BOOK_IMG_3, desc: "Философская сказка о дружбе, любви и смысле жизни." },
  { id: 7, title: "Война и мир", author: "Лев Толстой", genre: "Классика", year: 1869, rating: 4.6, pages: 1274, img: BOOK_IMG_1, desc: "Грандиозная эпопея о судьбах людей в эпоху наполеоновских войн." },
  { id: 8, title: "Гарри Поттер и философский камень", author: "Дж. К. Роулинг", genre: "Фэнтези", year: 1997, rating: 4.8, pages: 309, img: BOOK_IMG_2, desc: "Начало волшебной истории о мальчике, выжившем благодаря любви." },
];

const AUTHORS = [
  { id: 1, name: "Михаил Булгаков", books: 12, genre: "Классика, Сатира", img: BOOK_IMG_1, bio: "Русский писатель, драматург и театральный режиссёр. Автор романа «Мастер и Маргарита»." },
  { id: 2, name: "Лев Толстой", books: 48, genre: "Классика, Философия", img: BOOK_IMG_2, bio: "Один из наиболее известных русских писателей и мыслителей, оказавший влияние на всю мировую литературу." },
  { id: 3, name: "Фёдор Достоевский", books: 31, genre: "Психология, Классика", img: BOOK_IMG_3, bio: "Великий русский писатель-реалист, философ, гуманист. Мастер психологического романа." },
  { id: 4, name: "Стивен Кинг", books: 65, genre: "Ужасы, Драма", img: BOOK_IMG_1, bio: "Американский писатель, работающий в жанрах ужасов, триллера, фантастики. «Король ужасов»." },
  { id: 5, name: "Дж. К. Роулинг", books: 14, genre: "Фэнтези, Детектив", img: BOOK_IMG_2, bio: "Британская писательница, автор серии романов о Гарри Поттере, ставшей мировым феноменом." },
  { id: 6, name: "Фрэнк Герберт", books: 23, genre: "Научная фантастика", img: BOOK_IMG_3, bio: "Американский фантаст, создатель культовой саги «Дюна» — одного из самых продаваемых фантастических романов." },
];

const GENRES = ["Все", "Классика", "Фантастика", "Антиутопия", "Драма", "Фэнтези", "Сказка"];

type Page = "home" | "catalog" | "favorites" | "authors" | "contacts";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("Все");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSent, setContactSent] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const filteredBooks = BOOKS.filter(b => {
    const matchGenre = activeGenre === "Все" || b.genre === activeGenre;
    const q = search.toLowerCase();
    const matchSearch = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.genre.toLowerCase().includes(q);
    return matchGenre && matchSearch;
  });

  const favoriteBooks = BOOKS.filter(b => favorites.includes(b.id));

  const navigate = (p: Page) => {
    setPage(p);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems: { label: string; key: Page; icon: string }[] = [
    { label: "Главная", key: "home", icon: "Home" },
    { label: "Каталог", key: "catalog", icon: "BookOpen" },
    { label: "Избранное", key: "favorites", icon: "Heart" },
    { label: "Авторы", key: "authors", icon: "Users" },
    { label: "Контакты", key: "contacts", icon: "Mail" },
  ];

  return (
    <div className="min-h-screen mesh-bg font-body">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button onClick={() => navigate("home")} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-orange">
              <Icon name="BookMarked" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-bold tracking-wide text-foreground group-hover:text-primary transition-colors">
              Book<span className="text-primary">Flow</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`nav-link text-sm font-medium transition-colors ${page === item.key ? "text-primary active" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
                {item.key === "favorites" && favorites.length > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileMenuOpen(v => !v)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl animate-fade-in">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                className={`flex items-center gap-3 w-full px-6 py-4 text-sm font-medium transition-colors border-b border-border/30 ${page === item.key ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"}`}
              >
                <Icon name={item.icon} size={18} />
                {item.label}
                {item.key === "favorites" && favorites.length > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-16">
        {/* ========== HOME ========== */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <section className="relative min-h-[92vh] flex items-center overflow-hidden">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
                <div className="absolute bottom-1/3 left-1/6 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
                <div className="animate-slide-up">
                  <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 text-foreground">
                    Читай.<br/>
                    <span className="text-primary text-glow">Открывай.</span><br/>
                    Вдохновляйся.
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-10">
                    BookFlow — твоя цифровая библиотека с умным поиском по тысячам книг. Найди следующую любимую книгу за секунды.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => navigate("catalog")}
                      className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-105 glow-orange"
                    >
                      Открыть каталог
                    </button>
                    <button
                      onClick={() => navigate("authors")}
                      className="px-8 py-4 border border-border hover:border-primary/50 text-foreground font-semibold rounded-xl transition-all duration-200 hover:bg-secondary"
                    >
                      Об авторах
                    </button>
                  </div>
                  <p className="mt-5 flex items-center gap-2 text-muted-foreground text-sm">
                    <Icon name="Sparkles" size={14} className="text-primary" />
                    Более 10 000 книг в коллекции
                  </p>


                </div>

                <div className="relative hidden lg:block">
                  <div className="grid grid-cols-3 gap-4 opacity-0 animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
                    {BOOKS.slice(0, 6).map((book, i) => (
                      <div
                        key={book.id}
                        className="card-hover cursor-pointer rounded-xl overflow-hidden aspect-[2/3] relative group"
                        style={{ marginTop: i % 2 === 1 ? "32px" : "0" }}
                        onClick={() => navigate("catalog")}
                      >
                        <img src={book.img} alt={book.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                          <div>
                            <div className="text-white text-xs font-semibold leading-tight">{book.title}</div>
                            <div className="text-white/70 text-xs">{book.author}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm flex items-center justify-center glow-orange">
                    <div className="text-center">
                      <div className="font-display text-4xl font-bold text-primary">★</div>
                      <div className="text-foreground text-sm font-semibold">4.8</div>
                      <div className="text-muted-foreground text-xs">Средний рейтинг</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* New books strip */}
            <section className="py-20 border-t border-border/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-end justify-between mb-10">
                  <div>
                    <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Новинки</div>
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground">Свежие поступления</h2>
                  </div>
                  <button onClick={() => navigate("catalog")} className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium">
                    Все книги <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-stagger">
                  {BOOKS.slice(0, 4).map(book => (
                    <BookCard key={book.id} book={book} isFav={favorites.includes(book.id)} onToggleFav={toggleFavorite} />
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="py-20 border-t border-border/50">
              <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
                <div className="p-12 rounded-3xl border border-primary/20 bg-primary/5 glow-orange relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
                  </div>
                  <div className="relative">
                    <Icon name="BookHeart" size={48} className="text-primary mx-auto mb-6" />
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">Добавляй в избранное</h2>
                    <p className="text-muted-foreground text-lg mb-8">Сохраняй понравившиеся книги, чтобы вернуться к ним в любой момент.</p>
                    <button onClick={() => navigate("catalog")} className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-105">
                      Начать просматривать
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========== CATALOG ========== */}
        {page === "catalog" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="mb-10 animate-slide-up">
              <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Библиотека</div>
              <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-6">Каталог книг</h1>

              <div className="relative max-w-xl mb-8">
                <Icon name="Search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Поиск по названию, автору или жанру..."
                  className="w-full pl-12 pr-4 py-4 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                />
                {search && (
                  <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {GENRES.map(g => (
                  <button key={g} onClick={() => setActiveGenre(g)} className={`genre-tag ${activeGenre === g ? "active" : ""}`}>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {filteredBooks.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="BookX" size={56} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display text-2xl text-foreground mb-2">Ничего не найдено</h3>
                <p className="text-muted-foreground">Попробуй изменить поисковый запрос или выбрать другой жанр</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-stagger">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} isFav={favorites.includes(book.id)} onToggleFav={toggleFavorite} />
                ))}
              </div>
            )}

            <div className="mt-8 text-muted-foreground text-sm">
              Показано: <span className="text-foreground font-medium">{filteredBooks.length}</span> из {BOOKS.length} книг
            </div>
          </div>
        )}

        {/* ========== FAVORITES ========== */}
        {page === "favorites" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-slide-up">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Коллекция</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-10">Избранное</h1>

            {favoriteBooks.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 rounded-full border-2 border-border flex items-center justify-center mx-auto mb-6">
                  <Icon name="Heart" size={40} className="text-muted-foreground" />
                </div>
                <h3 className="font-display text-3xl text-foreground mb-3">Список пока пуст</h3>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">Добавляй книги в избранное, нажимая на сердечко на обложке книги в каталоге.</p>
                <button onClick={() => navigate("catalog")} className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 animate-stagger">
                  {favoriteBooks.map(book => (
                    <BookCard key={book.id} book={book} isFav={true} onToggleFav={toggleFavorite} />
                  ))}
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="text-muted-foreground text-sm">
                    <span className="text-foreground font-medium">{favoriteBooks.length}</span> книг в избранном
                  </div>
                  <button
                    onClick={() => setFavorites([])}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Очистить всё
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* ========== AUTHORS ========== */}
        {page === "authors" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 animate-slide-up">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Авторы</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-10">Великие писатели</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-stagger">
              {AUTHORS.map(author => (
                <div key={author.id} className="card-hover group bg-card border border-border rounded-2xl overflow-hidden cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img src={author.img} alt={author.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                        <Icon name="BookOpen" size={12} />
                        {author.books} книг
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-bold text-foreground mb-1">{author.name}</h3>
                    <div className="text-primary text-xs font-medium mb-3">{author.genre}</div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{author.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========== CONTACTS ========== */}
        {page === "contacts" && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 animate-slide-up">
            <div className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">Связь</div>
            <h1 className="font-display text-5xl sm:text-6xl font-bold text-foreground mb-4">Напишите нам</h1>
            <p className="text-muted-foreground text-lg mb-12 max-w-lg">Есть вопросы, предложения или хочешь добавить книгу в каталог? Мы рады каждому сообщению.</p>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="bg-card border border-border rounded-2xl p-8">
                {contactSent ? (
                  <div className="text-center py-8 animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4 glow-orange">
                      <Icon name="CheckCircle" size={32} className="text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">Сообщение отправлено!</h3>
                    <p className="text-muted-foreground mb-6">Мы свяжемся с тобой в ближайшее время.</p>
                    <button onClick={() => { setContactSent(false); setContactForm({ name: "", email: "", message: "" }); }} className="text-primary hover:text-primary/80 transition-colors font-medium">
                      Отправить ещё одно
                    </button>
                  </div>
                ) : (
                  <form onSubmit={e => { e.preventDefault(); setContactSent(true); }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Ваше имя</label>
                      <input
                        value={contactForm.name}
                        onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))}
                        required
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        value={contactForm.email}
                        onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))}
                        required
                        type="email"
                        placeholder="ivan@email.com"
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Сообщение</label>
                      <textarea
                        value={contactForm.message}
                        onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                        required
                        rows={5}
                        placeholder="Напиши, что хочешь..."
                        className="w-full px-4 py-3 bg-secondary border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                      />
                    </div>
                    <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] glow-orange">
                      Отправить сообщение
                    </button>
                  </form>
                )}
              </div>

              <div className="space-y-6">
                {[
                  { icon: "Mail", title: "Email", value: "hello@bookflow.ru", sub: "Ответим в течение 24 часов" },
                  { icon: "MessageCircle", title: "Telegram", value: "@bookflow_ru", sub: "Быстрее всего — здесь" },
                  { icon: "Clock", title: "Режим работы", value: "Пн–Пт, 9:00–18:00", sub: "По московскому времени" },
                ].map(item => (
                  <div key={item.title} className="flex gap-5 p-6 bg-card border border-border rounded-2xl hover:border-primary/30 transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon name={item.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-1">{item.title}</div>
                      <div className="text-foreground font-semibold">{item.value}</div>
                      <div className="text-muted-foreground text-sm mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => navigate("home")} className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="BookMarked" size={14} className="text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Book<span className="text-primary">Flow</span>
            </span>
          </button>
          <div className="flex gap-6">
            {navItems.map(item => (
              <button key={item.key} onClick={() => navigate(item.key)} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-muted-foreground text-sm">© 2024 BookFlow</div>
        </div>
      </footer>
    </div>
  );
}

interface Book {
  id: number; title: string; author: string; genre: string;
  year: number; rating: number; pages: number; img: string; desc: string;
}

function BookCard({ book, isFav, onToggleFav }: { book: Book; isFav: boolean; onToggleFav: (id: number) => void }) {
  return (
    <div className="card-hover group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img src={book.img} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(book.id); }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 ${isFav ? "bg-red-500 scale-110" : "bg-black/30 hover:bg-black/50"}`}
        >
          <Icon name="Heart" size={14} className={isFav ? "text-white fill-white" : "text-white"} />
        </button>

        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-sm text-white text-xs font-medium">
            ★ {book.rating}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-white/80 text-xs leading-relaxed line-clamp-3">{book.desc}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="genre-tag mb-2 text-xs">{book.genre}</div>
        <h3 className="font-display text-lg font-bold text-foreground leading-tight mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-muted-foreground text-sm mb-1">{book.author}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
          <span className="flex items-center gap-1"><Icon name="FileText" size={11} />{book.pages} стр.</span>
          <span>{book.year}</span>
        </div>
      </div>
    </div>
  );
}