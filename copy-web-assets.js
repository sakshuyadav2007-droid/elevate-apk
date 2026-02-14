const fs = require('fs');
const path = require('path');

const root = process.cwd();
const webDir = path.join(root, 'www');

const filesToCopy = ['index.html', 'style.css', 'script.js'];
const optionalDirs = ['assets', 'images', 'img', 'fonts'];

if (!fs.existsSync(webDir)) {
  fs.mkdirSync(webDir, { recursive: true });
}

for (const file of filesToCopy) {
  const from = path.join(root, file);
  const to = path.join(webDir, file);
  if (fs.existsSync(from)) {
    fs.copyFileSync(from, to);
    console.log(`Copied ${file}`);
  }
}

for (const dir of optionalDirs) {
  const from = path.join(root, dir);
  const to = path.join(webDir, dir);
  if (fs.existsSync(from) && fs.statSync(from).isDirectory()) {
    fs.cpSync(from, to, { recursive: true, force: true });
    console.log(`Copied ${dir}/`);
  }
}

console.log('Web assets are ready in ./www');
