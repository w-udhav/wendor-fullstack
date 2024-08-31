# Wendor

## Overview
This project is a full-stack web application designed to provide a seamless shopping experience. It features both a frontend and a backend, handling everything from product display and shopping cart management to admin operations like product management and order tracking. The project is built with modern web development technologies, ensuring a responsive, efficient, and secure application.
Wendor allows users to:

- **Search and Browse Products:** Find products based on their search and preferences.
- **Buy Products:** Choose different products, add them to the cart and confirm the purchase.
- **Manage Account and keep track of purchases:** View and manage the orders and manage the profile.

Wendor allows admins to:

- **Add Products:** Add products to the database including fields such as name, category, company and price.
- **Add products to inventory:** Choose different products, add them to the inventory which will be reflected on the shoppers page.
- **Manage Account and keep track of sales:** View and manage the sales and manage the admin profile.

## Shopper Page Key Features

- **Home Page:** Search for products and view them categorized for easy navigation.
- **Products Listing:** Browse products page based on the selected category or search.
- **Review Cart:** Add items you want to buy in the cart, review the cart and complete the order.
- **Login/Signup:** Simple authentication with minimal fields.
- **Forget/Reset password:** Forgot the password? You will receive a reset password link. You can navigate and reset the password.
- **My Orders:** List review all the order for the logged-in user.

## Setup Instructions

### Prerequisites

- Node.js and npm installed
- PostgreSQL installed and running

### Tech Stack

- **Frontend:**
  - ReactJS
  - Typescript
  - TailwindCSS
  - Vite

- **Backend:**
  - Node.Js
  - Express
  - JavaScript
  - PostgreSQL
  - Sequelize ORM

  
## Live Link

- **Shopper UI:** [Wendor Shop](https://wendor-fullstack-client.vercel.app/)
- **Backend (API):** [Wendor API](https://wendor-server.prathammehta.xyz/)


### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/w-udhav/wendor-fullstack.git
   cd wendor-fullstack
   ```

## Installation Steps

1. **Install Node Modules:**
    - Navigate to the `wendor-frontend` folder and install the dependencies:
      ```sh
      cd client
      npm install
      ```
    - Navigate to the `wendor-backend` folder and install the dependencies:
      ```sh
      cd ../server
      npm install
      ```
    - Navigate to the `wendor-admin` folder and install the dependencies:
      ```sh
      cd ../admin-panel
      npm install
      ```

2. **Setup Environment Variables:**
    - In the `server` folder, create a file named `.env` and add all the environment variables as specified in `.env.sample`.

3. **Configure Frontend Base URL:**
    - Navigate to the `server/src/utils` and `wendor-admin/src/utils` folder and update the `axiosInstance` file with the correct base URL:
      ```js
        // your api url
      export const baseURL = "http://localhost:8080/api/v1";
      ```

4. **Start the Backend:**
    - In the `server` folder, run the following command to start the backend server:
      ```sh
      npm run dev
      ```

5. **Start the Frontend:**
    - In the `client` folder, run the following command to start the frontend development server:
      ```sh
      npm run dev
      ```
      
5. **Start the Admin Panel:**
    - In the `admin-panel` folder, run the following command to start the frontend development server:
      ```sh
      npm run dev
      ```
