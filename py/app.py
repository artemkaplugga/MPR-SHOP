from flask import Flask, request, redirect, session, send_from_directory, jsonify
import os
import sqlite3
from datetime import timedelta

app = Flask(__name__)
app.secret_key = 'secret123'
app.permanent_session_lifetime = timedelta(days=30)

DB_NAME = os.path.join(os.path.dirname(__file__), '../users.db')

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

# Главная страница
@app.route('/')
def home():
    return send_from_directory('..', 'index.html')

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

    # Проверка обязательных полей и согласия с условиями
    if not all([name, surname, phone, email, city, password, confirm_password, agree_terms]):
        return 'Заполните все обязательные поля и согласитесь с условиями.<a href="registration.html">Назад</a>'

    if password != confirm_password:
        return 'Пароли не совпадают.<a href="registration.html">Назад</a>'

    if len(password) < 6:
        return 'Пароль должен быть не менее 6 символов.<a href="registration.html">Назад</a>'

    # Добавляем пользователя в БД
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

# Отдача статических файлов
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('..', filename)

# Инициализация базы



def init_db():
    if not os.path.exists(DB_NAME):
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
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
        conn.commit()
        conn.close()

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5500)