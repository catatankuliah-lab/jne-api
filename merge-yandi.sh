#!/bin/bash

# Ambil waktu sekarang dalam format: "Senin 2025-05-13 14:30:00"
datetime=$(date +"%A %Y-%m-%d %H:%M:%S")

# Checkout ke branch dev-yandi
git checkout dev-yandi

# Add dan commit
git add .
git commit -m "Commit otomatis pada $datetime"

# Push ke origin dev-yandi
git push origin dev-yandi

# Pindah ke main dan merge
git checkout main
git pull origin main
git merge dev-yandi
git push origin main

# Balik lagi ke dev-yandi dan update dari dev
git checkout dev-yandi
git pull origin main

echo "✅ Commit dan merge selesai! [$datetime]"
