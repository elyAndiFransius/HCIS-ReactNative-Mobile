# API Documentation

## Endpoints
http://ihc.local/api/

### 1. Ping API
Cek apakah API aktif dan berjalan.

- **Endpoint**:  
  ```
  GET api/ping
  ```

#### Response:
```json
{
  "success": true,
  "message": "Welcome to the API RSBT",
  "data": {
    "app_name": "RSBT",
    "version": "1.0.0",
    "environment": "local",
    "server_time": "2025-09-08 03:10:00"
  
}
```

---

### 2. Request OTP Registrasi
Mengirimkan OTP ke email untuk registrasi user mobile.

- **Endpoint**:
  ```
  POST /auth/register/request-otp
  ```

#### **Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123"
}
```

#### **Response:**
```json
{
  "success": true,
  "message": "OTP terkirim ke email.",
  "data": null
}
```

---

### 3. **Verifikasi OTP Registrasi**
Memverifikasi OTP yang telah dikirim dan membuat akun user baru.

- **Endpoint**:
  ```
  POST /auth/register/verify-otp
  ```

#### **Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "name": "John Doe",
  "password": "password123"
}
```

#### **Response:**
```json
{
  "success": true,
  "message": "Registrasi berhasil.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "created_at": "2025-09-08T03:10:00.000000Z",
    "updated_at": "2025-09-08T03:10:00.000000Z"
  }
}
```

---

### 4. **Login**
Melakukan login dan mendapatkan **JWT Token**.

- **Endpoint**:
  ```
  POST /auth/login
  ```
#### **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### **Response:**
```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "jwt_token",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "user@example.com"
    }
  }
}
```

---

### 5. **Logout**
Mengakhiri sesi login dengan menghapus token.

- **Endpoint**:
  ```
  POST /auth/logout
  ```
- **Auth**: Bearer token

#### **Response:**
```json
{
  "success": true,
  "message": "Logout berhasil",
  "data": null
}
```

---

### 6. **Forgot Password (Lupa Password)**
Mengirimkan OTP untuk reset password.

- **Endpoint**:
  ```
  POST /auth/forgot-password
  ```

#### **Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### **Response:**
```json
{
  "success": true,
  "message": "OTP reset password terkirim ke email.",
  "data": null
}
```

---

### 7. **Reset Password**
Reset password menggunakan OTP yang telah dikirim.

- **Endpoint**:
  ```
  POST /auth/reset-password
  ```

#### **Request Body:**
```json
{
  "email": "user@example.com",
  "otp": "123456",
  "password": "newpassword123",
  "password_confirmation": "newpassword123"
}
```

#### **Response:**
```json
{
  "success": true,
  "message": "Password berhasil direset.",
  "data": null
}
```

---

### 8. **Change Password**
Mengubah password user yang sedang login.

- **Endpoint**:
  ```
  POST /auth/change-password
  ```
- **Auth** : Bearer token

#### **Request Body:**
```json
{
  "old_password": "oldpassword123",
  "new_password": "newpassword123",
  "new_password_confirmation": "newpassword123"
}
```

#### **Response:**
```json
{
  "success": true,
  "message": "Password berhasil diubah.",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

### 9. **Me**
Mengambil user yang sedang login saat ini

- **Endpoint**:
  ```
  GET /auth/me
  ```
- **Auth** : Bearer token

### **Response:**

``` json 
{
  "success" : true,
  "message" : "Berhasil mengambil user saat ini",
  "data" : {
    "id" : 1,
    "name" : "John Doe",
    "email" : "user@example.com"
  }
}
```

