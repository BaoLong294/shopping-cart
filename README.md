# Shopping Cart

## Introduction

This is a mock shopping cart application, built as the largest and final project of the React section in The Odin Project curriculum. The app lets users browse products fetched from the FakeStore API, adjust quantities, add items to a cart, and manage that cart (increase/decrease quantity, remove items), with cart data persisted across page reloads via `localStorage`.

## Initial Project Goals

- Apply React Router to build a multi-page application with nested routes and a shared layout (a fixed Navbar).
- Practice lifting state up to manage cart state shared between pages that aren't directly related (Shop and Cart).
- Get hands-on experience fetching data from a real API (FakeStore API) and handling loading/error states.
- Practice testing with Vitest and React Testing Library following TDD (Red - Green - Refactor).
- Apply CSS Modules and responsive CSS Grid without media queries.
- Get familiar with persisting client-side data using `localStorage`.

## Technologies Used

- React (function components, hooks: `useState`, `useEffect`)
- React Router (nested routes, `Outlet` + context, `NavLink`, `Navigate`)
- Vite
- Vitest + React Testing Library + `@testing-library/user-event`
- CSS Modules
- ESLint + Prettier
- FakeStore API
- Git & GitHub

## Completed Features

- Navigation across 3 pages (Home, Shop, Cart) via a fixed Navbar, with active-page state indication.
- A Home page introducing the app, with a quick link to the Shop page.
- A Shop page that fetches real product data from the FakeStore API and displays it as a responsive card grid (automatically adjusting the number of columns based on screen size using CSS Grid).
- Each product's quantity can be adjusted by typing directly or using increment/decrement buttons, with a minimum quantity of 1.
- Adding products to the cart, with quantities merged if the product already exists in the cart.
- A badge on the Navbar showing the total item count in the cart, updating in real time.
- A Cart page listing added products, allowing quantity adjustments or removal per item, with an automatically calculated total price.
- A dedicated empty-cart state with a message and a button linking back to the Shop page.
- Cart data persisted to `localStorage`, surviving page reloads.
- A test suite covering the core behavior of each component (Navbar/routing, Home, ProductCard, Shop, Cart, CartItem).

## Skills Demonstrated

- **Advanced React Router**: nested routes, a shared layout route using `Outlet`, passing data/functions down to child routes via `Outlet` context and reading it back with `useOutletContext`, programmatic redirection with `<Navigate>`.
- **State management & lifting state up**: placing cart state in the closest common parent (`App`), passing props/callback functions down through multiple component layers.
- **React Hooks**: `useState` with a lazy initializer to read initial data from `localStorage` without causing a visual flash on page load; `useEffect` to sync state with `localStorage` and to fetch data on mount.
- **Asynchronous data fetching**: calling a real API, handling loading/error states, transforming JSON data.
- **Testing**: writing tests following TDD with Vitest and React Testing Library; testing navigation behavior with `createMemoryRouter`; mocking functions with `vi.fn()`; mocking `fetch` so tests don't depend on a real network; using `findBy*` to test asynchronous interactions; preferring role/text queries over class/id selectors to keep tests aligned with real user experience.
- **CSS Modules & responsive layout**: styling on a per-component basis to avoid class name conflicts; using CSS Grid (`auto-fill` + `minmax`) to build a responsive layout without media queries; handling subtle Flexbox issues such as the default `min-height: auto` behavior of flex items affecting `aspect-ratio`.
- **Systematic debugging**: reading error messages from the console/test runner to identify root causes, using DevTools (Elements, Computed, Application/Local Storage) to verify hypotheses before fixing code.
- **Standard workflow practices**: Conventional Commits, running lint/format/test before every commit, a basic Git flow (clone, commit, push).

## Lessons Learned

- **Biggest challenge**: The hardest part was getting child components (like `Shop` and `Cart`) to work correctly in a test environment, since they depend on `useOutletContext()` — a mechanism that only works when the component actually sits inside a valid parent-child route structure. Rendering that component alone, or wrapping it only in a plain `<MemoryRouter>`, always resulted in the context being `undefined` and the component crashing immediately.
- **How I solved it**: The solution was to create a "fake parent" route used only for testing, whose sole job is to render `<Outlet context={...}>` with mock data/functions, then declare the component under test as its child (`children`) via `createMemoryRouter`. This correctly simulates the component's real position in the app's route tree, without depending on the entire real route configuration.
- **General takeaway**: This project helped me understand what it really takes to build a complete Single Page Application (SPA) with React — not just writing isolated components, but tying multiple pieces of knowledge together: multi-page navigation with React Router, managing and sharing state across components that aren't directly related, writing tests to ensure the app behaves as expected, and organizing styles with CSS Modules to keep the codebase clean and scalable.

## Credits/Attribution

- **Product data & images**: [FakeStore API](https://fakestoreapi.com/) — product data and images used for demo/learning purposes.
- **Fonts**: [Newsreader](https://fonts.google.com/specimen/Newsreader) and [Figtree](https://fonts.google.com/specimen/Figtree), from Google Fonts.

## Contact

- GitHub: [@BaoLong294](https://github.com/BaoLong294)
- Email: longbao2904@gmail.com
- LinkedIn: [Long Bảo](https://www.linkedin.com/in/long-b%E1%BA%A3o-a9226a377/)
