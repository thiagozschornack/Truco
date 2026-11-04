// Ajustes do projeto Android gerado pelo Capacitor:
// - orientação retrato fixa
// - versionCode/versionName a partir do número do build (CI)
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'android');
const manifestPath = path.join(root, 'app', 'src', 'main', 'AndroidManifest.xml');
const gradlePath = path.join(root, 'app', 'build.gradle');

let manifest = fs.readFileSync(manifestPath, 'utf8');
if (!manifest.includes('android:screenOrientation')) {
  manifest = manifest.replace(
    /<activity\b/,
    '<activity\n            android:screenOrientation="portrait"'
  );
  fs.writeFileSync(manifestPath, manifest);
  console.log('Manifesto: orientação retrato aplicada.');
}

const build = parseInt(process.env.BUILD_NUMBER || '1', 10);
const versionName = process.env.VERSION_NAME || `1.0.${build}`;
let gradle = fs.readFileSync(gradlePath, 'utf8');
gradle = gradle
  .replace(/versionCode\s+\d+/, `versionCode ${build}`)
  .replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);
fs.writeFileSync(gradlePath, gradle);
console.log(`Versão: ${versionName} (code ${build}).`);
