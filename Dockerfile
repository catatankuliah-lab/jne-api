FROM node:18

# Install libvips dan tools build untuk sharp
RUN apt-get update && apt-get install -y \
    libvips-dev \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /usr/src/app

# Salin dependencies
COPY package*.json ./

# Install dependencies (termasuk sharp)
RUN npm install

# Salin semua file project
COPY . .

# Jalankan di port sesuai ENV
EXPOSE 3006

# Jalankan aplikasi
CMD ["npm", "start"]
