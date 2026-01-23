# Website Builder (DC Web Design)

A static marketing site for DC Web Design. The site highlights services, pricing, and includes a contact form powered by Formspree with client-side validation and spam protection.

## Features
- Responsive layout built on Bootstrap 4
- AOS (Animate On Scroll) section animations
- Formspree contact form with honeypot, validation states, and success/error messaging
- Consolidated assets (`assets/css/main.css` and `assets/js/main.js`)
- WebP image assets for performance

## Project Structure
```
assets/
  css/main.css
  font-awesome-4.7.0/
  images/
  js/main.js
index.html
license.txt
```

## Run Locally
Because this is a static site, you can open `index.html` directly in the browser. For best results (relative paths, caching, and local assets), use a simple static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact Form
The form posts to Formspree:
- Endpoint: `https://formspree.io/f/xdaajnaa`
- Honeypot field: `company` (hidden)

## Deployment
Upload the project files to your hosting provider (e.g., Namecheap). Keep the folder structure intact so asset paths resolve correctly.

## Notes
- AOS requires `data-aos` attributes in the HTML and the bundled CSS/JS in `assets/css/main.css` and `assets/js/main.js`.
- If you minify or change bundle names, update the references in `index.html`.

## License
See `license.txt`.
