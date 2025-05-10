-- Eliminar tablas si existen (en orden inverso)
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- Tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role_id INTEGER REFERENCES roles(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de eventos
CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date TIMESTAMP NOT NULL,
    location VARCHAR(200) NOT NULL,
    organizer VARCHAR(150) NOT NULL,
    capacity INTEGER NOT NULL CHECK (capacity > 0),
    available_seats INTEGER NOT NULL CHECK (available_seats >= 0 AND available_seats <= capacity)
);

-- Tabla de reservas (bookings)
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id INTEGER NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled')),
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, event_id)
);

-- Insertar roles
INSERT INTO roles (name, description) VALUES
    ('admin', 'Administrador con acceso total'),
    ('user', 'Usuario registrado')
ON CONFLICT (name) DO NOTHING;

-- Insertar usuarios
INSERT INTO users (name, email, password, role_id) VALUES
    ('Steven Santana', 'alice@example.com', 'hashed_password_1', 1),
    ('Yesica Peña', 'bob@example.com', 'hashed_password_2', 2),
    ('Charlie Bean', 'charlie@example.com', 'hashed_password_3', 2)
ON CONFLICT (email) DO NOTHING;

-- Insertar eventos
INSERT INTO events (name, description, event_date, location, organizer, capacity, available_seats) VALUES
    ('Conferencia Tech 2025', 'Evento de tecnología para desarrolladores', '2025-06-15 10:00:00', 'Auditorio Bogotá', 'TechWorld', 100, 98),
    ('Feria de Emprendimiento', 'Exposición de startups y emprendedores', '2025-07-20 09:00:00', 'Centro de Convenciones Medellín', 'Innovators Inc.', 200, 200)
ON CONFLICT DO NOTHING;

-- Insertar reservas
INSERT INTO bookings (user_id, event_id, status) VALUES
    (2, 1, 'confirmed'),
    (3, 2, 'confirmed')
ON CONFLICT DO NOTHING;