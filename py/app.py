from flask import Flask, request, redirect, session, send_from_directory, jsonify
import os
import sqlite3
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'secret123'
app.permanent_session_lifetime = timedelta(days=30)

DB_NAME = os.path.join(os.path.dirname(__file__), '../users.db')

# Инициализация базы данных
def init_db():
    if not os.path.exists(DB_NAME):
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        # Таблица пользователей
        c.execute('''
            CREATE TABLE users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                surname TEXT,
                phone TEXT,
                email TEXT UNIQUE NOT NULL,
                city TEXT,
                dob TEXT,
                password TEXT NOT NULL
            )
        ''')
        # Таблица отзывов
        c.execute('''
            CREATE TABLE reviews (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                comment TEXT NOT NULL,
                rating INTEGER,
                anonymous INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY(user_id) REFERENCES users(id)
            )
        ''')
        conn.commit()
        conn.close()

# Главная страница
@app.route('/')
def home():
    return send_from_directory('..', 'index.html')

# API для проверки пользователя
@app.route('/api/user')
def get_user():
    if 'user_id' in session:
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute('SELECT name, surname FROM users WHERE id = ?', (session['user_id'],))
        user = c.fetchone()
        conn.close()
        return jsonify(logged_in=True, name=user[0], surname=user[1])
    return jsonify(logged_in=False)

# Обработка логина
@app.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    remember = 'remember' in request.form

    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('SELECT id, name, surname FROM users WHERE email = ? AND password = ?', (email, password))
    user = c.fetchone()
    conn.close()

    if user:
        session.permanent = remember
        session['user_id'] = user[0]
        session['email'] = email
        return redirect('/')
    return 'Неверный email или пароль. <a href="/">Назад</a>'

# Выход
@app.route('/logout')
def logout():
    session.clear()
    return redirect('/')

# Регистрация нового пользователя
@app.route('/register', methods=['POST'])
def register():
    name = request.form.get('name')
    surname = request.form.get('surname')
    phone = request.form.get('phone')
    email = request.form.get('email')
    city = request.form.get('city')
    dob = request.form.get('dob')
    password = request.form.get('password')
    confirm_password = request.form.get('confirm-password')
    agree_terms = request.form.get('agree-terms')

    if not all([name, surname, phone, email, city, password, confirm_password, agree_terms]):
        return 'Заполните все обязательные поля и согласитесь с условиями.<a href="registration.html">Назад</a>'

    if password != confirm_password:
        return 'Пароли не совпадают.<a href="registration.html">Назад</a>'

    if len(password) < 6:
        return 'Пароль должен быть не менее 6 символов.<a href="registration.html">Назад</a>'

    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    try:
        c.execute('''
            INSERT INTO users (name, surname, phone, email, city, dob, password)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (name, surname, phone, email, city, dob, password))
        conn.commit()
    except sqlite3.IntegrityError:
        conn.close()
        return 'Пользователь с таким email уже существует.<a href="registration.html">Назад</a>'
    conn.close()

    return redirect('/')

# Добавление отзыва
@app.route('/add_review', methods=['POST'])
def add_review():
    if 'user_id' not in session:
        return jsonify({'status': 'error', 'message': 'Вы должны войти, чтобы оставить отзыв'}), 403

    user_id = session['user_id']
    comment = request.form.get('comment')
    rating = request.form.get('rating')
    anonymous = 1 if request.form.get('anonymous') == 'on' else 0

    if not comment or len(comment) < 5:
        return jsonify({'status': 'error', 'message': 'Комментарий слишком короткий'}), 400

    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    try:
        c.execute('''
            INSERT INTO reviews (user_id, comment, rating, anonymous)
            VALUES (?, ?, ?, ?)
        ''', (user_id, comment, rating, anonymous))
        conn.commit()
    except Exception as e:
        print("Ошибка при добавлении отзыва:", e)
        return jsonify({'status': 'error', 'message': f'Не удалось сохранить отзыв: {e}'}), 500
    finally:
        conn.close()

    return jsonify({'status': 'ok', 'message': 'Отзыв успешно добавлен'})

# Получение всех отзывов
@app.route('/api/reviews')
def get_reviews():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        SELECT r.comment, r.rating, u.name, r.anonymous 
        FROM reviews r
        LEFT JOIN users u ON r.user_id = u.id
        ORDER BY r.created_at DESC
    ''')
    rows = c.fetchall()
    conn.close()

    reviews = [
        {
            'comment': row[0],
            'rating': row[1],
            'name': row[2] if not row[3] else 'Аноним',
            'anonymous': row[3]
        }
        for row in rows
    ]

    return jsonify(reviews)

# Отдача статических файлов
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('..', filename)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5500)