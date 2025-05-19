#!/bin/bash

# Ambil waktu sekarang dalam format: "Senin 2025-05-13 14:30:00"
datetime=$(date +"%A %Y-%m-%d %H:%M:%S")

# Checkout ke branch nana
git checkout nana

# Add dan commit
git add .
git commit -m "Commit otomatis pada $datetime"

# Push ke origin nana
git push origin nana

# Pindah ke dev dan merge
git checkout dev
git pull origin dev
git merge nana
git push origin dev

# Balik lagi ke nana dan update dari dev
git checkout nana
git pull origin dev

echo "✅ Commit dan merge selesai! [$datetime]"
