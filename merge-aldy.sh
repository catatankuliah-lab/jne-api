#!/bin/bash

# Ambil waktu sekarang dalam format: "Senin 2025-05-13 14:30:00"
datetime=$(date +"%A %Y-%m-%d %H:%M:%S")

# Add dan commit
git add .
git commit -m "Commit otomatis pada $datetime"

# Push ke origin aldy
git push origin aldy

# Pindah ke main dan merge
git checkout main
git pull origin main
git merge aldy
git push origin main

# Balik lagi ke aldy dan update dari main
git checkout aldy
git pull origin main

echo "✅ Commit dan merge selesai! [$datetime]"
