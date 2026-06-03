# 🍱 Food Waste Sharing Platform

A full-stack solution connecting food donors with community receivers, reducing food waste through intelligent token-based matching.

## ✨ Features

- **Dual Role System** - Users act as donors or receivers (or both)
- **Smart Donation Posts** - Add food with quantity, expiry date, pickup location & Google Maps integration
- **Token Priority (FIFO)** - Fair claiming system based on request order
- **Auto-escalation** - Next receiver automatically notified if pickup isn't completed within time limit
- **Secure Authentication** - OAuth 2.0 with JWT tokens
- **Real-time Status** - Donation expiry and claim tracking

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Google Maps API
- **Backend**: Spring Boot, Spring Security, JWT
- **Database**: MySQL
- **Deployment**: Docker

## 🚀 Quick Start

### Prerequisites
- Java 17+, Node.js 16+, MySQL 8+

### Setup
```bash
# Clone repo
git clone https://github.com/DishaDua786/Food-Waste-Sharing.git

# Configure MySQL (update application.properties)
# Run backend
cd Backend/foodwastesharing
./mvnw spring-boot:run

# Run frontend
cd Frontend/food-waste-sharing-frontend
npm install && npm start
