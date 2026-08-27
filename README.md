# 🔮 Mystic Oracle

Một website bói toán AI bằng tiếng Việt, lấy cảm hứng từ không khí fantasy huyền bí nguyên bản: quả cầu pha lê, Tarot Major Arcana tự thiết kế và các chuyển cảnh cinematic. Dự án không dùng bất kỳ nhân vật, logo hay tài sản có bản quyền nào của Harry Potter.

## Tính năng

- Luồng hoàn chỉnh: trang chào → hồ sơ định mệnh → chọn nghi thức → kết quả AI.
- Hồ sơ chỉ giữ trong React state của tab hiện tại; không có database, đăng nhập, lịch sử hay lưu trữ thông tin cá nhân.
- Quả cầu ma thuật có loading state, chống bấm lặp trong lúc gọi API và thông điệp suy ngẫm an toàn.
- Tarot 22 lá Major Arcana với biểu tượng/original CSS design, rút ngẫu nhiên JavaScript, trạng thái xuôi/ngược và lật bài 3D.
- API route server-side gọi Gemini REST API. Khóa không bao giờ được gửi xuống trình duyệt.
- Responsive, có hỗ trợ `prefers-reduced-motion`.

## Cài đặt

Yêu cầu Node.js 20.9 trở lên.

```bash
npm install
cp .env.example .env.local
```

Mở `.env.local` và thêm khóa Gemini của bạn:

```env
GEMINI_API_KEY=your_api_key_here
```

## Chạy local

```bash
npm run dev
```

Sau đó mở [http://localhost:3000](http://localhost:3000).

## Kiểm tra và build

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Deploy Vercel

1. Đẩy repository lên GitHub/GitLab/Bitbucket và import nó trong Vercel.
2. Trong **Project Settings → Environment Variables**, thêm `GEMINI_API_KEY` cho môi trường Production (và Preview nếu muốn).
3. Deploy. Vercel tự nhận diện Next.js và chạy `npm run build`.

> Không commit `.env.local` hay bất kỳ khóa API nào. Nếu API Gemini chưa được cấu hình hoặc không phản hồi, giao diện sẽ hiển thị lỗi thân thiện thay vì tiết lộ chi tiết kỹ thuật.
