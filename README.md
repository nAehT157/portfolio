# Portfolio cá nhân

Trang giới thiệu bản thân một trang, viết bằng HTML, CSS và JavaScript thuần. Không framework, không bundler, không thư viện ngoài.

- Trang công khai: https://nAehT157.github.io/portfolio/
- Mã nguồn: https://github.com/nAehT157/portfolio

## Công nghệ

| Phần | Cách làm |
|---|---|
| Giao diện | HTML semantic, CSS biến (custom properties), BEM nhẹ |
| Tương tác | JavaScript thuần: menu mobile, active nav, đổi theme, đổi ngôn ngữ |
| Song ngữ | Tiếng Việt trong `index.html`, tiếng Anh trong `js/i18n.js` |
| Deploy | GitHub Pages, nhánh `main`, thư mục gốc |

## Chạy ở máy

Cần Node.js (đã kiểm tra với Node 24). Tại thư mục project:

```powershell
npx serve .
```

Mở `http://localhost:3000`. Có thể mở thẳng `index.html` bằng trình duyệt vì trang không dùng ES module; chỉ khi cần kiểm tra đường dẫn tương đối giống lúc deploy mới cần server.

## Cấu trúc

```text
index.html            nội dung tiếng Việt và toàn bộ markup
css/base.css          biến màu, reset, typography
css/layout.css        header, nav, hero, tiêu đề section, menu mobile
css/sections.css      about, skills, projects, contact, footer
css/components.css    button, icon button, hiệu ứng hiện dần
js/theme.js           đổi giao diện sáng/tối
js/i18n.js            bản dịch tiếng Anh
js/main.js            menu, active nav, reveal, năm footer
assets/images/        ảnh đại diện và ảnh project
```

Quy ước chi tiết nằm trong `CONTEXT.md`.

## Chỉnh nội dung

### Đổi thông tin cá nhân

Tìm và thay trong `index.html`:

- `Nguyễn Văn A` — tên hiển thị ở logo, hero, footer, thẻ `title`, `meta author`.
- `NA` — chữ viết tắt trong logo và khung ảnh đại diện.
- `24110157@student.hcmute.edu.vn` — email ở phần giới thiệu và liên hệ.
- `https://github.com/nAehT157` — link GitHub ở cả ba project và phần liên hệ.
- Thông tin trong `dl.facts`: trường, vị trí, định hướng.

Sau khi đổi tên, cập nhật thêm bản tiếng Anh ở hai chỗ: `js/i18n.js` (khóa `meta.title`, `meta.description`) và thẻ `<html lang="vi">` không cần đổi.

### Thêm ảnh đại diện

Thay khối `.portrait` trong `index.html` bằng ảnh thật, giữ nguyên class để CSS áp dụng:

```html
<div class="portrait">
  <img src="./assets/images/avatar.jpg" alt="Ảnh đại diện của Nguyễn Văn A" width="400" height="400">
</div>
```

Thêm vào `css/components.css`:

```css
.portrait img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
```

### Thay ảnh project

Mỗi project đang dùng khung gradient với số thứ tự. Thay phần tử bên trong `.project-card__media`:

```html
<div class="project-card__media">
  <img src="./assets/images/du-an-1.png" alt="Ảnh chụp màn hình website đặt phòng" width="1280" height="720" loading="lazy">
</div>
```

Ảnh sẽ được cắt vừa khung 16:9. Nên nén ảnh dưới 300 KB mỗi file.

### Thêm nút tải CV

Đặt file vào `assets/cv.pdf`, sau đó thêm vào `.hero__actions` trong `index.html`:

```html
<a class="button button--ghost" href="./assets/cv.pdf" download>Tải CV (PDF)</a>
```

Nhớ thêm bản dịch tiếng Anh nếu muốn nút đổi ngôn ngữ: gắn `data-i18n="hero.ctaCv"` và thêm khóa `"hero.ctaCv": "Download CV (PDF)"` vào `js/i18n.js`.

### Thêm LinkedIn

Trong `.contact__list`, thêm một `li` theo mẫu hai mục đang có, rồi thêm khóa dịch `contact.linkedinLabel` nếu cần.

## Kiểm tra trước khi deploy

Chạy `npx serve .` rồi kiểm tra:

- [ ] 360px, 768px, 1280px không tràn ngang, không chồng chữ.
- [ ] Chuyển VI/EN: chữ dài của tiếng Anh không làm vỡ nút và thẻ.
- [ ] Chuyển sáng/tối: chữ và nền đủ tương phản, màu thanh trình duyệt đổi theo.
- [ ] Chỉ dùng bàn phím: tab qua skip link, nav, các nút, link; viền focus nhìn thấy.
- [ ] Menu mobile mở/đóng bằng nút, bằng phím Escape và khi bấm một mục.
- [ ] Tắt JavaScript: vẫn đọc được nội dung tiếng Việt và điều hướng bằng anchor.
- [ ] Bật "giảm chuyển động" trong hệ điều hành: không còn hiệu ứng trượt.
- [ ] DevTools Lighthouse: Performance, Accessibility, Best Practices, SEO ≥ 90.
- [ ] Console không có lỗi 404.

## Deploy lên GitHub Pages

Repo đã bật Pages từ nhánh `main`, thư mục `/ (root)`. Mỗi lần push lên `main`, GitHub tự build lại sau khoảng một phút.

Nếu cần bật lại hoặc làm mới:

```powershell
gh api --method POST "repos/nAehT157/portfolio/pages" -f "source[branch]=main" -f "source[path]=/"
```

Hoặc vào **Settings → Pages → Build and deployment**, chọn `Deploy from a branch`, nhánh `main`, thư mục `/ (root)`.

Mọi đường dẫn trong trang phải là tương đối (`./css/...`) để chạy đúng dưới `https://<user>.github.io/portfolio/`.

## Giới hạn đã biết

- Bản tiếng Anh được render bằng JavaScript, công cụ tìm kiếm chủ yếu index bản tiếng Việt. Muốn SEO tiếng Anh thật cần tách trang `/en/`.
- Liên hệ dùng `mailto:`; trang tĩnh không tự gửi form. Muốn form gửi mail cần dịch vụ như Formspree hoặc Web3Forms.
- Phiên bản 1 không có test tự động. Kiểm tra bằng checklist ở trên và Lighthouse.
- Nội dung đang là mẫu: tên, email, project và ảnh cần thay trước khi dùng để ứng tuyển.
