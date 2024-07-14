<template>
  <div class="footer">
    <div class="row-offset-20 footer_body">
      <div class="col-offset-20 l-6 footer_body_about">
        <h1 class="footer_title">Giới Thiệu</h1>
        <p>
          Chào mừng bạn đến với trang web đọc báo độc đáo của chúng tôi! Khám phá những câu chuyện
          đa dạng và sâu sắc từ mọi ngóc ngách của thế giới. Tận hưởng trải nghiệm đọc báo chất
          lượng, đồng hành cùng chúng tôi trên hành trình khám phá kiến thức và niềm đam mê hàng
          ngày!
        </p>
      </div>
      <div class="col-offset-20 l-3 footer_body_contact">
        <h1 class="footer_title">Thông tin</h1>
        <ul class="list_contact">
          <li class="item_contact"><a href="">Chính sách</a></li>
          <li class="item_contact"><a href="">Điều khoản</a></li>
          <li class="item_contact"><a href="">Trợ giúp</a></li>
          <li class="item_contact"><a href="">Fanpage</a></li>
        </ul>
      </div>
      <div class="col-offset-20 l-3 footer_body_contact">
        <h1 class="footer_title">Liên hệ</h1>
        <div class="footer_body_contact_box">
          <div class="footer_body_contact_infor">
            Địa chỉ: 315, Trường Chinh, Phường Khương Mai, Quận Thanh Xuân, Hà Nội, Việt Nam
          </div>
          <div class="footer_body_contact_infor">SĐT: (+84) 356 208 031</div>
          <div class="footer_body_contact_infor">todai.easylife@gmail.com</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.footer {
  font-size: 1.4em;
  bottom: 0;
  width: -webkit-fill-available;
  padding: 0 100px;
  z-index: 10;
  background-color: var(--white-background-color);
}

.footer_body {
  padding: 30px 0;
}

.footer_title {
  font-size: 1.6em;
  text-transform: uppercase;
  font-weight: 500;
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.footer_body_about p {
  line-height: 20px;
  text-align: justify;
}

.footer_body_contact_infor:not(:last-child) {
  margin-bottom: 20px;
  line-height: 20px;
}

.list_contact {
}

.item_contact {
  margin-bottom: 20px;
}

.item_contact a {
  text-decoration: none;
  color: var(--text-color);
}

.item_contact a:hover {
  text-decoration: underline;
}
</style>
