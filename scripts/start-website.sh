#!/usr/bin/env bash
# Start Emergent marketing website (CRA) on LAN.
# Usage: bash scripts/start-website.sh [port]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FRONTEND="$ROOT/frontend"
PORT="${1:-3010}"
LAN_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
SIGNFLOW_URL="${REACT_APP_SIGNFLOW_URL:-http://${LAN_IP:-127.0.0.1}:4001}"

cd "$FRONTEND"

if [[ ! -d node_modules ]]; then
  echo "Installing dependencies…"
  npm install --legacy-peer-deps
fi

fuser -k "${PORT}/tcp" 2>/dev/null || true
sleep 0.5

export HOST=0.0.0.0
export PORT="$PORT"
export REACT_APP_SIGNFLOW_URL="$SIGNFLOW_URL"
export BROWSER=none

nohup npm start > /tmp/website-dev-${PORT}.log 2>&1 &
sleep 45

CODE="$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:${PORT}/" || echo '000')"

echo ""
echo "Touch2Sign marketing website — HTTP ${CODE}"
echo "  Local:    http://127.0.0.1:${PORT}/"
echo "  LAN:      http://${LAN_IP:-127.0.0.1}:${PORT}/"
echo "  Pricing:  http://${LAN_IP:-127.0.0.1}:${PORT}/pricing"
echo "  Signflow: ${SIGNFLOW_URL} (signup/checkout target)"
echo "  Log:      /tmp/website-dev-${PORT}.log"
