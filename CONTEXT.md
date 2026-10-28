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

## 5. Cơ chế song ngữ

- Tiếng Việt là bản gốc trong `index.html`. Chuỗi cần dịch gắn một trong ba thuộc tính:
  - `data-i18n="key"` cho nội dung chữ;
  - `data-i18n-aria-label="key"` cho `aria-label`;
  - `data-i18n-content="key"` cho `content` của thẻ `meta`.
- Bản tiếng Anh nằm trong `TRANSLATIONS.en` của `js/i18n.js`. Thêm chuỗi mới phải thêm ở cả hai nơi, nếu thiếu khóa thì trang giữ nguyên tiếng Việt.
- Không đặt `data-i18n` lên phần tử có thẻ con, vì `textContent` sẽ xóa các thẻ đó.
- Lựa chọn lưu ở `localStorage` khóa `portfolio-language`; thẻ `<html lang>` đổi theo.
- Giới hạn đã biết: bản tiếng Anh render bằng JavaScript nên không được index như một trang riêng.

## 6. Giao diện sáng/tối

- Theme đặt bằng `data-theme="dark|light"` trên `<html>`, mặc định `dark`.
- Màu khai báo bằng biến CSS; thêm component mới phải dùng biến, kiểm tra contrast ở cả hai theme.
- Lựa chọn lưu ở `localStorage` khóa `portfolio-theme`; `js/theme.js` chạy trong `<head>` để tránh nháy màu.

## 7. Nội dung cần thay trước khi công khai

- [ ] Tên hiển thị, chữ viết tắt logo/avatar (đang là "Nguyễn Văn A" / "NA").
- [ ] Email liên hệ (đang dùng email sinh viên lấy từ `git config`).
- [ ] Link GitHub, thêm LinkedIn nếu có.
- [ ] Ảnh đại diện thật thay khung chữ "NA".
- [ ] Ba project: tên, mô tả, công nghệ, link repo/demo thật.
- [ ] Ảnh chụp project thay khung số 01/02/03.
- [ ] File `assets/cv.pdf` và nút tải CV nếu muốn dùng.
- [ ] Trường, vị trí, năm học đang là giả định từ email sinh viên.

## 8. Kiểm tra và deploy

- Chạy local: `npx serve .` rồi mở `http://localhost:3000`.
- Trước khi push: kiểm tra 360/768/1280px, cả hai ngôn ngữ, chỉ dùng bàn phím, tắt JavaScript, giảm chuyển động, Lighthouse ≥ 90.
- Deploy: GitHub Pages, nhánh `main`, thư mục gốc. Mọi đường dẫn phải tương đối (`./...`) để chạy đúng dưới thư mục con.
- Phiên bản 1 không có test tự động vì không có framework; bù bằng checklist thủ công trong `README.md`. Nếu bổ sung test sau này, dùng Vitest cho phần logic i18n.

## 9. Git

- `main` luôn ở trạng thái chạy được; việc mới làm trên `feature/<ten-ngan>`.
- Commit tiếng Việt, dòng tiêu đề ≤ 50 ký tự, bắt đầu bằng động từ mệnh lệnh.
- Phát hành gắn tag `v1.0.0`.

## Lịch sử

| Ngày | Thay đổi |
|---|---|
| 28/10/2026 | Tạo file: chốt phạm vi, stack, quy ước song ngữ, theme và deploy |
