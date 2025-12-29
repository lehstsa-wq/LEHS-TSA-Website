# Little Elm High School TSA Website

This is the official website codebase for the Little Elm High School Technology Student Association. It is built using React, Vite, and Tailwind CSS.

## Prerequisites

Before you begin, ensure you have **Node.js** installed on your computer.
1. Go to [nodejs.org](https://nodejs.org/).
2. Download the **LTS** version.
3. Install it.
4. **Restart VS Code** after installation.

## How to Run Locally

1. **Open the Terminal** in VS Code:
   - Click `Terminal` > `New Terminal` in the top menu.
   - Or press `Ctrl` + `~` (tilde).

2. **Install Dependencies** (do this once):
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```

4. **View the Website**:
   - Hold `Ctrl` (or `Cmd` on Mac) and click the link shown in the terminal (usually `http://localhost:5173`).

## Project Structure

- `pages`: Individual pages (Home, About, Events, etc.).
- `components`: Reusable components (Navbar, Footer).
- `App.tsx`: Main application router.

## Customization

- **Colors**: Update the configuration in `index.html` (Tailwind script) to change the `accent-blue` or `dark-bg` colors.
- **Content**: Edit the text inside the files in `pages`.
- **Images**: Replace SVG placeholders with `<img>` tags pointing to real assets.
