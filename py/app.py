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

# Отдача статических файлов
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('..', filename)

if __name__ == '__main__':
    init_db()
    app.run(debug=True, port=5500)