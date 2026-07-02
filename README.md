# Vashisth Goswami — Resume Website

A clean, responsive single-page resume site (static HTML/CSS), designed to be
hosted for free on **GitHub Pages**.

## Files
- `index.html` — the page (hero, about, skills, experience, projects, education)
- `styles.css` — all styling (dark theme, gradient accents, responsive)

## Preview locally
Just open `index.html` in a browser, or run a tiny server:
```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy to GitHub Pages
```bash
# from this folder
git init -b main
git add -A
git commit -m "Resume website"
gh repo create vashisth-resume --public --source=. --push
```
Then on GitHub: **Settings → Pages → Source: Deploy from a branch → main → /(root)**.
Your site will be live at:
```
https://vashisth-g-sudo.github.io/vashisth-resume/
```

## To personalize
- Update the ShopFront **Live demo** link if you redeploy the ECS project.
