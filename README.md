# Next.js Auth Boilerplate with Google Sign-In and Pizza Orders Dashboard

## Overview

This project is a Next.js application that provides user authentication with Google Sign-In and credentials-based login/signup. After authentication, users are redirected to a dashboard with a personalized welcome message. The app also includes a "Pizza Orders" page displaying a responsive table of mock pizza orders with status badges.

## Features

- Google OAuth and credentials-based authentication using NextAuth.js
- Login and signup pages
- Dashboard page showing "Hello, [User's Google Name]!"
- Pizza Orders page with a responsive table of mock orders
- Navigation header with links to Dashboard and Pizza Orders
- Logout functionality
- Responsive design with Tailwind CSS
- Loading states and error handling for authentication flows

## Project Structure

- `src/app/` - Next.js app directory with pages and layouts
  - `dashboard/page.tsx` - Dashboard page after login
  - `pizza-orders/page.tsx` - Pizza Orders page with mock data table
  - `login/page.tsx` - Login page
  - `signup/page.tsx` - Signup page
  - `layout.tsx` - Root layout wrapping app with session provider and header
- `src/components/ui/` - UI components including Header, LogoutButton, Table, Badge, etc.
- `src/auth.ts` - NextAuth.js configuration with Google and credentials providers
- `src/dbConfig.ts` - Database connection setup
- `src/model/userModel.ts` - Mongoose user model
- `src/lib/` - Utility functions and mock data

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- MongoDB instance (local or cloud) for user data storage
- Google OAuth credentials (Client ID and Client Secret)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nextjs-auth-boilerplate
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Configure environment variables:

Create a `.env.local` file in the root directory with the following variables:

```env
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
MONGODB_URI=your-mongodb-connection-string
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Navigate to `/signup` or `/login` to create an account or sign in.
- After successful login, you will be redirected to the Dashboard page.
- Use the navigation links in the header to switch between Dashboard and Pizza Orders pages.
- The Pizza Orders page displays a table of mock orders with status badges.
- Use the Logout button in the header to sign out.

## Notes

- The Pizza Orders data is hardcoded mock data; no backend database is used for orders.
- The header is hidden on the login and signup pages for a cleaner UI.
- The app uses NextAuth.js for authentication and session management.
- Tailwind CSS is used for styling and responsiveness.

## Testing

- Verify login and signup flows with Google and credentials.
- Confirm the dashboard displays the correct user name.
- Check the Pizza Orders table for correct data and responsive layout.
- Test navigation links and logout functionality.
- Test on different screen sizes for responsiveness.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
