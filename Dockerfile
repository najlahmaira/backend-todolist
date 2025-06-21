# Dockerfile

# Tahap 1: Pilih base image resmi Node.js. Versi 'slim' lebih kecil ukurannya.
FROM node:18-slim

# Tahap 2: Buat dan tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Tahap 3: Salin file package.json dan package-lock.json untuk menginstall dependensi
# Tanda * memastikan kedua file (jika ada) tersalin
COPY package*.json ./

# Tahap 4: Jalankan perintah npm install untuk mengunduh semua pustaka yang dibutuhkan
RUN npm install

# Tahap 5: Salin semua file kode aplikasi Anda ke dalam direktori kerja container
COPY . .

# Tahap 6: Beri tahu Docker bahwa container akan mengekspos port 8080 saat berjalan
EXPOSE 8080

# Tahap 7: Perintah default yang akan dijalankan saat container dimulai
CMD [ "node", "index.js" ]