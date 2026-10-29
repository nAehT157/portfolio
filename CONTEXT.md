# CONTEXT — Portfolio cá nhân

File này ghi phạm vi và quy ước riêng của project, dùng cùng bộ file trong `../context/`.
Khi có mâu thuẫn, file này được ưu tiên hơn bộ quy tắc chung.

## 1. Mục tiêu và phạm vi

- Trang một trang giới thiệu bản thân: hero, giới thiệu, kỹ năng, dự án, liên hệ, footer.
- Song ngữ Việt–Anh, giao diện tối mặc định, có nút chuyển sáng.
- Deploy công khai bằng GitHub Pages, không cần backend.

Ngoài phạm vi phiên bản 1: blog, form gửi mail thật, CMS, analytics, trang riêng cho từng project, đa ngôn ngữ khác ngoài Việt–Anh.

## 2. Stack và ràng buộc

- HTML, CSS, JavaScript thuần. Không framework, không bundler, không CDN, không font tải từ mạng.
- Phải mở được bằng `file://`: không dùng ES module, không `fetch` dữ liệu, không phụ thuộc server.
- Node chỉ dùng để chạy server tĩnh khi kiểm tra, không phải dependency của trang.
- Không thêm thư viện, không đổi cấu trúc thư mục khi chưa hỏi.

## 3. Cấu trúc

```text
index.html            nội dung tiếng Việt, toàn bộ markup
css/base.css          biến màu, reset, typography, tiện ích
css/layout.css        header, nav, hero, tiêu đề section, breakpoint menu
css/sections.css      about, skills, projects, contact, footer, nhãn công nghệ
css/components.css    button, badge phụ, icon button, hiệu ứng hiện dần
js/theme.js           đọc và đổi giao diện, chạy sớm trong <head>
js/i18n.js            bản dịch tiếng Anh và nút chuyển ngôn ngữ
js/main.js            menu mobile, mục đang xem, reveal, năm footer
assets/images/        avatar và ảnh project (chưa có ảnh thật)
```

## 4. Quy ước code

- Tên biến, hàm, class, id viết tiếng Anh; comment tiếng Việt và chỉ ghi chỗ dễ nhầm.
- CSS đặt tên kiểu BEM nhẹ (`block__element--modifier`), toàn bộ màu lấy từ biến trong `base.css`, không hardcode màu trong file khác.
- Mỗi file tối đa 300 dòng; vượt thì tách theo trách nhiệm, không nén code.
- JavaScript dùng IIFE + `"use strict"`, không tạo biến toàn cục, không dùng thư viện.
- Breakpoint: `820px` cho menu mobile, `860px` cho bố cục about/contact, `900px` cho hero hai cột.

## 5. Tính năng đã loại bỏ

- Tính năng song ngữ (Việt–Anh) đã được loại bỏ để tập trung vào việc tối ưu trình bày nội dung dự án và dễ dàng cập nhật sau này.

## 6. Giao diện sáng/tối

- Theme đặt bằng `data-theme="dark|light"` trên `<html>`, mặc định `dark`.
- Màu khai báo bằng biến CSS; thêm component mới phải dùng biến, kiểm tra contrast ở cả hai theme.
- Lựa chọn lưu ở `localStorage` khóa `portfolio-theme`; `js/theme.js` chạy trong `<head>` để tránh nháy màu.

## 6. Giao diện sáng/tối

- Theme đặt bằng `data-theme="dark|light"` trên `<html>`, mặc định `dark`.
- Màu khai báo bằng biến CSS; thêm component mới phải dùng biến, kiểm tra contrast ở cả hai theme.
- Lựa chọn lưu ở `localStorage` khóa `portfolio-theme`; `js/theme.js` chạy trong `<head>` để tránh nháy màu.

## 7. Nội dung cần thay trước khi công khai

- [x] Tên hiển thị, chữ viết tắt logo/avatar.
- [x] Email liên hệ.
- [ ] Link GitHub, thêm LinkedIn nếu có.
- [ ] Ảnh đại diện thật (đã quyết định bỏ qua/giữ khung NA).
- [ ] **Ba dự án:**
  - Tên dự án, giới thiệu chi tiết và công nghệ sử dụng.
  - **Cập nhật bố cục:** 1 ảnh lớn bên trái + 2 ảnh nhỏ bên phải (không cuộn).
  - Thay ảnh thật cho dự án.
  - Link repo/demo thật.
- [ ] File `assets/cv.pdf` và nút tải CV (chưa có).
- [ ] Trường, vị trí, năm học (cần cập nhật theo thông tin thực).

## 8. Kiểm tra và deploy

- Chạy local: `npx serve .` rồi mở `http://localhost:3000`.
- Trước khi push: kiểm tra 360/768/1280px, cả hai ngôn ngữ, chỉ dùng bàn phím, tắt JavaScript, giảm chuyển động, Lighthouse ≥ 90.
- Deploy: GitHub Pages, nhánh `main`, thư mục gốc. Mọi đường dẫn phải tương đối (`./...`) để chạy đúng dưới thư mục con.
- Phiên bản 1 không có test tự động vì không có framework; bù bằng checklist thủ công trong `README.md`. Nếu bổ sung test sau này, dùng Vitest cho phần logic i18n.

## 9. Git

- `main` luôn ở trạng thái chạy được; việc mới làm trên `feature/<ten-ngan>`.
- Commit tiếng Việt, dòng tiêu đề ≤ 50 ký tự, bắt đầu bằng động từ mệnh lệnh.
- Phát hành gắn tag `v1.0.0`.

## 10. Tài liệu hệ thống

### 10.1 Product Requirements Document (PRD)
- **Overview:** Portfolio SPA tối giản, tốc độ cao, tối ưu Accessibility.
- **Goal:** Định vị thương hiệu cá nhân, hỗ trợ ứng tuyển.
- **Features:** Hero, giới thiệu, kỹ năng, dự án, liên hệ, toggle Theme/Language, Mobile-friendly.

### 10.2 Technical Requirements
- **Stack:** HTML5, CSS3, Vanilla JS. Không CDN/Thư viện.
- **Deployment:** GitHub Pages (main branch).
- **Standards:** Lighthouse ≥ 95, BEM, tuân thủ `../context/coding-rules.md`.

### 10.3 App Flow
Luồng chính: Landing -> Nav (About/Skills/Projects/Contact) -> Action (Link/Toggle).

### 10.4 Design Brief
- **Colors:** Palette tối (mặc định) và sáng, quản lý bằng CSS Variables.
- **Components:** Button, Card, Badge, Reveal animation (tắt khi reduce-motion).

### 10.5 Implementation Plan
- **Phase 1 (Done):** v1.0.x - Cấu trúc cơ bản.
- **Phase 2 (Active):** v1.1 - Thay nội dung thực tế (ảnh, dự án, CV).
- **Phase 3:** v1.2 - Tối ưu SEO, bổ sung Social link.

## Lịch sử

| Ngày | Thay đổi |
|---|---|
| 28/10/2026 | Tạo file: chốt phạm vi, stack, quy ước song ngữ, theme và deploy |
| 29/10/2026 | Bổ sung tài liệu hệ thống (PRD, Tech, Flow, Design, Plan) |
