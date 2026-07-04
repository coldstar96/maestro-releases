#!/bin/sh
set -eu

REPO="coldstar96/maestro-releases"
ZIP_URL="https://github.com/$REPO/releases/latest/download/Maestro-arm64.zip"
APP="/Applications/Maestro.app"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

[ "$(uname -s)" = Darwin ] || { echo "maestro: macOS only" >&2; exit 1; }
[ "$(uname -m)" = arm64 ] || { echo "maestro: this build is Apple Silicon (arm64) only" >&2; exit 1; }

if pgrep -xq Maestro 2>/dev/null; then
  echo "Maestro is running — quit it first, then re-run this installer." >&2
  exit 1
fi

echo "Downloading Maestro…"
curl -fL --progress-bar "$ZIP_URL" -o "$TMP/maestro.zip"
ditto -xk "$TMP/maestro.zip" "$TMP/extract"
[ -d "$TMP/extract/Maestro.app" ] || { echo "maestro: unexpected archive layout" >&2; exit 1; }

rm -rf "$APP"
ditto "$TMP/extract/Maestro.app" "$APP"
xattr -dr com.apple.quarantine "$APP" 2>/dev/null || true
echo "Installed $APP"

if ln -sf "$APP/Contents/Resources/bin/maestro" /usr/local/bin/maestro 2>/dev/null; then
  echo "CLI linked: /usr/local/bin/maestro"
else
  echo "For the maestro CLI in your own terminals, run:"
  echo "  sudo ln -sf $APP/Contents/Resources/bin/maestro /usr/local/bin/maestro"
fi

open "$APP"
