# StudyPortal - Unblocked Games Hub

A clean, modern, and high-performance portal for unblocked school games.

## 🚀 Hosting on GitHub Pages (Read Carefully!)

GitHub Pages is a **static** host. It cannot run the source code (`.tsx` files) directly. You **MUST** build the project before it will work.

### Option 1: The Easy Way (Recommended)
Instead of GitHub Pages, use **[Vercel](https://vercel.com)** or **[Netlify](https://netlify.com)**.
1. Connect your GitHub account.
2. Select this repository.
3. Click **Deploy**.
They will automatically build the code and host it for you. **No 404 errors!**

### Option 2: Using GitHub Actions (Automatic Build)
If you want to stay on GitHub Pages, you need an automated build process:
1. Go to your GitHub Repository **Settings**.
2. Click **Pages** on the left sidebar.
3. Under **Build and deployment** > **Source**, change it to **GitHub Actions**.
4. Click the link to "Configure a static site" or use a "Vite" template.
5. GitHub will now build your code every time you push, and the 404 errors will disappear.

## 🛠️ Features
- **Stealth Mode**: Disguise the site as Google Classroom with one click.
- **Panic Key**: Instantly redirect to a safe site (default is ` ` ` backtick).
- **Custom Themes**: Choose from Emerald, Ruby, Sapphire, and more.
- **Performance Modes**: Optimize for low-end school Chromebooks.

## 📦 Local Development
1. `npm install`
2. `npm run dev`

## 📄 License
For educational purposes only.
