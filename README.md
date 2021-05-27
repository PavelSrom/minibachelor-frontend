This is a progressive web application developed as a Mini Bachelor project for the top-up degree in Web Development at Copenhagen Business Academy. The application demo is available [here](https://relaxed-jang-84f197.netlify.app/).

## Features

- Built with React in TypeScript
- The app can be installable to your desktop without having to open a browser window
- Static typing with [TypeScript](https://www.typescriptlang.org/)
- Usage of Google's Material Design with [Material UI](https://material-ui.com/)
- Server state management with [React Query](https://react-query.tanstack.com/)
- Handling forms with [Formik](https://formik.org/) and [Yup](https://www.npmjs.com/package/yup)
- Rapid UI building with [Tailwind CSS](https://tailwindcss.com/)

## Project folder structure

- `api` - functions that directly interact with the API
- `components` - independent "chunks" of UI for easier maintenance and development
- `contexts` - any custom global or local contexts for various purposes
- `hoc` - higher-order components for various purposes
- `hooks` - custom, reusable API and synchronous hooks
- `pages` - application pages
- `styleguide` - custom, small, atomic units of UI
- `types` - TypeScript type definitions
- `utils` - utility functionality and data

## Getting started

- Clone the repository via opening a terminal and typing `git clone {repo url}`
- Install all project dependencies via `npm install`
- Run `npm start` to start a local server
