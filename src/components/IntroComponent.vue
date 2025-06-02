<script setup lang="ts"></script>

<template>
  <section class="intro">
    <h1 class="intro__title">
      ЭЛЕКТРОННЫЙ ФРЕЙМОВЫЙ <br />
      <span>СЛОВАРЬ</span> <br />
      СОЦИАЛЬНЫХ ВЗАИМОДЕЙСТВИЙ
    </h1>
    <div class="intro__description">
      <p>
        Разрабатываемый проект предлагает новый лексикографический продукт для представления
        семантической области социального взаимодействия и «социальной» лексики русского языка.
        <br />
        Наша цель — создать удобный цифровой ресурс, который будет применятся в различных сферах: от
        лингвистических исследований до преподавания, но основное применение словаря — изучение
        русского языка как иностранного, русской этнокультуры.
      </p>
      <img src="/src/assets/image_2025-06-02_14-19-57.png" alt="Логотип ТГУ" />
    </div>
  </section>
</template>

<style lang="scss">
.intro {
  font-family: 'Inter', serif;
  &__title {
    font-weight: bold;
    // width: 1000px;
    margin: 0 auto;
    text-align: center;
    text-transform: uppercase;
    line-height: 120%;
    font-size: 60px;
    color: #2c3e50;
  }

  &__title span {
    font-weight: bold;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  &__description {
    margin-top: 60px;
    display: flex;
    justify-content: center;
    gap: 80px;
    padding-top: 50px;
    padding-bottom: 60px;
    padding-left: 100px;
    padding-right: 100px;
    // background-image:
    //   linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.7)), url(../assets/bg.png);
    max-width: 100%;
    min-height: 200px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }
  &__description p {
    width: 600px;
  }
}
</style>
