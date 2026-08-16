"""
Portfolio contact API — Flask backend for kamoliddin's portfolio.

Receives contact form submissions, stores them to a local JSONL file,
and (optionally) sends an instant Telegram notification.

Deploy targets:
  - Render.com free tier (recommended: free HTTPS, required for GitHub Pages frontend)
  - Your own Ubuntu server via Gunicorn + systemd (same pattern as auditmobile)

Environment variables:
  TELEGRAM_BOT_TOKEN   token from @BotFather (optional)
  TELEGRAM_CHAT_ID     your chat id — message @userinfobot to get it (optional)
  ALLOWED_ORIGIN       CORS origin, default https://wisedev-io.github.io
"""

import json
import os
import re
import time
from datetime import datetime, timezone

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[os.environ.get("ALLOWED_ORIGIN", "https://wisedev-io.github.io")])

STORE = os.path.join(os.path.dirname(__file__), "contacts.jsonl")
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

# naive in-memory rate limit: max 5 submissions per IP per hour
_hits: dict[str, list[float]] = {}


def rate_limited(ip: str) -> bool:
    now = time.time()
    window = [t for t in _hits.get(ip, []) if now - t < 3600]
    _hits[ip] = window
    if len(window) >= 5:
        return True
    window.append(now)
    return False


def notify_telegram(name: str, email: str, message: str) -> None:
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")
    if not token or not chat_id:
        return
    text = f"\U0001F4E9 Portfolio contact\n\nFrom: {name}\nEmail: {email}\n\n{message}"
    try:
        requests.post(
            f"https://api.telegram.org/bot{token}/sendMessage",
            json={"chat_id": chat_id, "text": text[:4000]},
            timeout=10,
        )
    except requests.RequestException:
        pass  # never fail the user's submission because Telegram is down


@app.get("/api/health")
def health():
    return jsonify({"ok": True})


@app.post("/api/contact")
def contact():
    ip = request.headers.get("X-Forwarded-For", request.remote_addr or "?").split(",")[0].strip()
    if rate_limited(ip):
        return jsonify({"ok": False, "error": "rate_limited"}), 429

    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()[:120]
    email = str(data.get("email", "")).strip()[:200]
    message = str(data.get("message", "")).strip()[:4000]

    if not name or not message or not EMAIL_RE.match(email):
        return jsonify({"ok": False, "error": "invalid_input"}), 400

    record = {
        "ts": datetime.now(timezone.utc).isoformat(),
        "ip": ip,
        "name": name,
        "email": email,
        "message": message,
    }
    with open(STORE, "a", encoding="utf-8") as f:
        f.write(json.dumps(record, ensure_ascii=False) + "\n")

    notify_telegram(name, email, message)
    return jsonify({"ok": True})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))
