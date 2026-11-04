# EmpreenderTHZ Truco Pro — Android

Truco Paulista em duplas contra a IA, empacotado como app Android com [Capacitor](https://capacitorjs.com). Funciona 100% offline.

## Como obter o APK

Cada envio para a branch `main` dispara o workflow **Build APK Android** (aba *Actions*). Ao terminar, o APK aparece em:

- **Releases** do repositório (mais fácil de baixar pelo celular), ou
- **Actions → execução → Artifacts**.

Arquivos gerados:

| Arquivo | Uso |
|---|---|
| `TrucoPro-debug.apk` | Instalação direta para teste (sempre gerado) |
| `TrucoPro.apk` | Versão assinada para distribuição (gerada quando a chave está configurada) |
| `TrucoPro.aab` | Pacote para enviar à Google Play |

> O APK de debug é assinado com uma chave temporária a cada build: para atualizar, desinstale o anterior. A versão assinada (`TrucoPro.apk`) atualiza por cima normalmente.

## Ativar a versão assinada

Em *Settings → Secrets and variables → Actions → New repository secret*, crie:

| Secret | Valor |
|---|---|
| `KEYSTORE_BASE64` | conteúdo do keystore em Base64 (`base64 -w0 truco-pro-release.keystore`) |
| `KEYSTORE_PASSWORD` | senha do keystore |
| `KEY_ALIAS` | `trucopro` |
| `KEY_PASSWORD` | senha da chave (igual à do keystore) |

Guarde o arquivo `.keystore` e a senha em local seguro: sem eles não é possível publicar atualizações na Google Play. **Nunca** coloque o keystore no repositório.

## Estrutura

- `www/index.html` — o jogo (HTML/CSS/JS, sem dependências)
- `resources/` — ícone e splash (gerados para todas as densidades no build)
- `capacitor.config.json` — id do app `com.empreenderthz.truco`
- `scripts/patch-android.js` — orientação retrato e versão automática
- `.github/workflows/android.yml` — compilação na nuvem

## Compilar localmente (opcional)

Requer Node 20+, JDK 21 e Android SDK.

```bash
npm install
npx cap add android
npm run android:assets
node scripts/patch-android.js
npx cap sync android
cd android && ./gradlew assembleDebug
```

## Recursos do app

- Botão *Voltar* do Android fecha diálogos e pede confirmação antes de sair
- Preferências (IA, som, cor da mesa) salvas no aparelho
- Layout com áreas seguras (entalhe/barra de gestos) e toque otimizado
