# MedBooking - Ứng dụng đặt lịch khám bệnh

Ứng dụng ReactJS cho phép người dùng xem danh sách bác sĩ, đặt lịch khám và quản lý lịch đã đặt.

## Tính năng

- Xem danh sách bác sĩ với bộ lọc theo chuyên khoa
- Xem thông tin chi tiết của bác sĩ
- Đặt lịch khám theo ngày và giờ có sẵn
- Đăng nhập để quản lý lịch khám
- Xem và hủy lịch khám đã đặt

## Công nghệ sử dụng

- **ReactJS**: Thư viện UI
- **Vite**: Công cụ build
- **React Router v6**: Điều hướng
- **Context API + useReducer**: Quản lý trạng thái
- **Axios**: Gọi API
- **Tailwind CSS**: Framework CSS

## Cấu trúc dự án

```
src/
├── api/                  # Tầng gọi API
│   ├── appointment.js    # API đặt lịch và quản lý lịch khám
│   ├── doctor.js         # API danh sách bác sĩ
│   └── index.js          # Cấu hình Axios
├── components/           # Presentational Components
│   ├── DoctorCard.jsx    # Card hiển thị thông tin bác sĩ
│   ├── BookingForm.jsx   # Form đặt lịch
│   ├── TimeSlotPicker.jsx # Component chọn giờ khám
│   ├── Navbar.jsx        # Thanh điều hướng
│   └── NotFound.jsx      # Trang 404
├── containers/           # Container Components
│   ├── DoctorList.jsx    # Danh sách bác sĩ
│   ├── DoctorDetail.jsx  # Chi tiết bác sĩ
│   ├── AppointmentList.jsx # Lịch sử đặt lịch
│   └── Login.jsx         # Trang đăng nhập
├── context/              # Context API
│   ├── BookingContext.js # Context & reducer cho bác sĩ/lịch khám
│   └── AuthContext.js    # Context cho đăng nhập
├── routes/               # Routing
│   ├── index.js          # Cấu hình route
│   └── ProtectedRoute.jsx # Route bảo vệ cần đăng nhập
├── styles/               # CSS
│   └── tailwind.css      # Tailwind CSS
├── App.jsx               # Component gốc
└── main.jsx              # Entry point
```

## Cài đặt

1. Clone dự án:
```bash
git clone <repository-url>
cd med-booking
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại [http://localhost:5173](http://localhost:5173).

## Các routes

- `/`: Trang chủ (danh sách bác sĩ)
- `/doctors`: Danh sách bác sĩ
- `/doctors/:id`: Chi tiết bác sĩ và form đặt lịch
- `/appointments`: Lịch sử đặt lịch (cần đăng nhập)
- `/login`: Trang đăng nhập

## Thông tin đăng nhập demo

- Email: user@example.com
- Mật khẩu: password

## Chuyển từ API giả lập sang API thật

Dự án hiện đang sử dụng API giả lập. Để chuyển sang API thật:

1. Cập nhật `baseURL` trong `src/api/index.js` để trỏ đến API thật:
```javascript
const api = axios.create({
  baseURL: 'https://your-api-endpoint.com/api',
  // ...
});
```

2. Cập nhật biến `USE_REAL_API` trong các file `src/api/doctor.js` và `src/api/appointment.js` thành `true`:
```javascript
const USE_REAL_API = true;
```

## Cấu trúc dữ liệu

### Bác sĩ
```javascript
{
  id: 1,
  name: "Dr. Nguyễn Văn A",
  specialty: "Nội khoa",
  hospital: "Bệnh viện Trung ương",
  experience: "10 năm",
  image: "https://example.com/image.jpg",
  rating: 4.8,
  availableSlots: [
    { date: "2025-05-25", slots: ["09:00", "10:00", "14:00", "15:00"] },
    { date: "2025-05-26", slots: ["09:00", "11:00", "13:00", "16:00"] }
  ]
}
```

### Lịch khám
```javascript
{
  id: 1,
  doctorId: 1,
  doctorName: "Dr. Nguyễn Văn A",
  patientName: "Nguyễn Văn X",
  date: "2025-05-25",
  time: "09:00",
  status: "confirmed", // 'confirmed', 'pending', 'cancelled', 'completed'
  speciality: "Nội khoa",
  symptoms: "Đau đầu, sốt nhẹ",
  createdAt: "2025-05-18T10:30:00Z"
}
```

## Giấy phép

