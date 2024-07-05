<template>
  <div class="header">
    <div class="l-6">
      <div class="header_nav">
        <RouterLink class="header_nav_link" to="/admin/home">Trang chủ</RouterLink>
      </div>
    </div>
    <div class="l-6">
      <ul class="header_nav--right">
        <li class="header_item--right">
          <div href="" class="header_item_link--right"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scope>
.header {
  display: flex;
  font-size: 1.6em;
  height: 60px;
  background-color: var(--dashboard-color-background);
}

.header_nav {
  height: 100%;
  display: flex;
  align-items: center;
}

.header_nav_link {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 10px;
  font-size: 18px;
  text-decoration: none;
  color: var(--white-color);
}

.header_nav_link:hover {
  color: var(--text-color);
  background-color: var(--unacctive-color);
}

.header_nav_link.active {
  color: var(--white-color);
  background-color: var(--acctive-color);
}

.header_imgOfUser:hover .header_customOfUser {
  display: block;
}

.header_nav--right {
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: row-reverse;
}

.header_item_link--right {
  display: flex;
  align-items: center;
  padding: 0 10px;
}

.header_imgOfUser {
  position: relative;
}

.header_imgOfUser img {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.header_customOfUser {
  display: none;
  position: absolute;
  right: 0px;
  bottom: -78px;
  width: 140px;
}

.header_customOfUser::before {
  position: absolute;
  content: '';
  border-width: 10px 10px;
  border-style: solid;
  border-color: transparent transparent var(--one-primary-color) transparent;
  right: 10px;
  top: -19px;
}

.header_customOfUser_item_link {
  text-decoration: none;
  background-color: var(--one-primary-color);
  color: var(--white-color);
  display: block;
  padding: 10px;
}

.header_customOfUser_item_link:hover {
  background-color: var(--hover-color);
}
</style>
