#!/usr/bin/env bash
set -u
base_url="${1:-http://localhost:3000}"
questions=(
  "What skills does Princely have?"
  "What projects has Princely built?"
  "What is Princely currently doing?"
  "Does Princely have AI experience?"
  "Tell me about his education."
  "What certifications does he have?"
  "Why should I hire Princely?"
  "What is the capital of France?"
  "Tell me a joke."
  "What is Princely's favorite color?"
)
for question in "${questions[@]}"; do
  printf '\nQUESTION: %s\n' "$question"
  curl -sS --max-time 75 -X POST "$base_url/api/ask-princely" \
    -H 'Content-Type: application/json' \
    --data "$(printf '{\"message\":%s}' "$(printf '%s' "$question" | python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))')")"
  printf '\n'
done
