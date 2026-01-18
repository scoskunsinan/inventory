# Inventory Management System (IMS)

Detta projekt är ett webbaserat lagerhanteringssystem byggt med **Node.js**, **Express** och **PostgreSQL**. Systemet stödjer hantering av både **produkter** och **leverantörer** med relationer via SQL (foreign keys) och JOIN-queries. API:et kan testas med exempelvis **Bruno**.

---

## 📌 Funktioner

- Skapa, läsa, uppdatera och ta bort produkter (CRUD)
- Skapa, läsa, uppdatera och ta bort leverantörer (CRUD)
- Koppla produkter till leverantörer (SQL-relation)
- Visa leverantörsinformation via JOIN
- Visa antal produkter per leverantör
- Hämta alla produkter för en specifik leverantör

---

## 🛠 Tekniker som används

- Node.js
- Express.js
- PostgreSQL

- Bruno (för API-testning)

---

## 📁 Projektstruktur

inventory-system
│
├── server.js
├── db.js
├── routes
│ ├── products.js
│ └── suppliers.js
├── .env
├── package.json
└── README.md


---

## ⚙ Installation

### 1. Installera beroenden

```bash
npm install

CREATE DATABASE postgres;
3. Skapa tabeller
Suppliers

CREATE TABLE suppliers (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL
);
Products (med relation)

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  category TEXT NOT NULL,
  supplier_id INTEGER REFERENCES suppliers(id) ON DELETE SET NULL
);
4. Skapa .env-fil

Skapa en .env fil i projektets rotmapp:
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=postgres
DB_PORT=5432
PORT=3001

Starta servern
Med Node
node server.js

Med Nodemon
npm run dev

När servern är igång visas:

Server running on port 3000
API Endpoints
Hämta alla produkter (inklusive leverantörsinformation)

GET /products
GET /products/:id
Skapa ny produkt
POST /products
{
  "name": "Laptop",
  "quantity": 10,
  "price": 12999,
  "category": "Electronics",
  "supplier_id": 1
}
Uppdatera produkt

PUT /products/:id
Ta bort produkt

DELETE /products/:id

Suppliers
Hämta alla leverantörer

GET /suppliers

Hämta specifik leverantör + antal produkter

GET /suppliers/:id

Returnerar leverantörsinformation samt product_count.

Skapa ny leverantör

POST /suppliers

{
  "name": "Tech AB",
  "contact_person": "Anna Svensson",
  "email": "anna@techab.se",
  "phone": "0701234567",
  "country": "Sweden"
}

Uppdatera leverantör

PUT /suppliers/:id


Ta bort leverantör

DELETE /suppliers/:id

Hämta alla produkter från leverantör

GET /suppliers/:id/products

🧪 Testning med Bruno

Starta servern

Öppna Bruno

Skapa nya requests

Använd bas-URL:

http://localhost:3001


Testa alla endpoints:

Products CRUD

Suppliers CRUD

JOIN endpoints

