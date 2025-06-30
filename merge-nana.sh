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

# Pindah ke main dan merge
git checkout main
git pull origin main
git merge nana
git push origin main

# Balik lagi ke nana dan update dari main
git checkout nana
git pull origin main

echo "✅ Commit dan merge selesai! [$datetime]"
