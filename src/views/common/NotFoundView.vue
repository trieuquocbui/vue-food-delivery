<template>
  <div class="body-notfound">
    <div class="section-notfound">
      <h1 class="display-1">404</h1>
      <p class="fs-3"><span class="text-danger">Lỗi!</span> Không tìm thấy trang</p>
      <p class="lead">Trang bạn đang tìm kiếm không tồn tại.</p>
      <router-link to="/login" class="btn-success">Trở về trang chủ</router-link>
    </div>
  </div>
</template>

<style scoped>
.body-notfound {
  height: 100%;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}
.section-notfound {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  flex-direction: column;
}
.display-1 {
  font-size: 6rem;
  font-weight: bold;
}
.fs-3 {
  font-size: 1.5rem;
}
.text-danger {
  color: red;
}
.lead {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
.btn-success {
  background-color: var(--unacctive-color);
  color: white;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 0.25rem;
  margin-top: 1rem;
}
.btn-success:hover {
  background-color: var(--acctive-color);
}
</style>
