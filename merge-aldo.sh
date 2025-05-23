#!/bin/bash

# Ambil waktu sekarang dalam format: "Senin 2025-05-13 14:30:00"
datetime=$(date +"%A %Y-%m-%d %H:%M:%S")

# Checkout ke branch aldo
git checkout aldo

# Add dan commit
git add .
git commit -m "Commit otomatis pada $datetime"

# Push ke origin aldo
git push origin aldo

# Pindah ke dev dan merge
git checkout dev
git pull origin dev
git merge aldo
git push origin dev

# Balik lagi ke aldo dan update dari dev
git checkout aldo
git pull origin dev

echo "✅ Commit dan merge selesai! [$datetime]"
