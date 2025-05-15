<script setup lang="ts"></script>

<template>
  <section class="intro">
    <h1 class="intro__title">
      ЭЛЕКТРОННЫЙ ФРЕЙМОВЫЙ <br />
      <span>СЛОВАРЬ</span> <br />
      СОЦИАЛЬНЫХ ВЗАИМОДЕЙСТВИЙ
    </h1>
    <div class="intro__description">
      Разрабатываемый проект предлагает новый лексикографический продукт для представления
      семантической области социального взаимодействия и «социальной» лексики русского языка.
      <br />
      Наша цель — создать удобный цифровой ресурс, который будет применятся в различных сферах: от
      лингвистических исследований до преподавания, но основное применение словаря — изучение
      русского языка как иностранного, русской этнокультуры.
    </div>
  </section>
</template>

<style lang="scss">
.intro {
  font-family: 'Inter', serif;
  &__title {
    font-weight: bold;
    width: 1000px;
    margin: 0 auto;
    text-align: center;
    text-transform: uppercase;
    line-height: 120%;
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
    text-align: center;
    padding-top: 30px;
    padding-left: 100px;
    padding-right: 100px;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7)),
      url(../assets/intro-bg.png);
    max-width: 100%;
    min-height: 200px;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }
}
</style>
