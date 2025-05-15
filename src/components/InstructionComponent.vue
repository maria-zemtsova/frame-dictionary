<template>
  <section class="instruction">
    <h2 class="instruction__title">КАК ПОЛЬЗОВАТЬСЯ ?</h2>
    <ul class="instruction__list">
      <li class="instruction__item">
        <div class="instruction__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
            <path
              d="M160 64c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.8 1.6l-96 64C-.5 111.2-4.4 131 5.4 145.8s29.7 18.7 44.4 8.9L96 123.8 96 416l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0 96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-352z"
            />
          </svg>
        </div>
        <div class="instruction__description">
          <h3>Найдите фрейм</h3>
          <p>
            Выберите нужный фрейм из списка на главной странице или введите ключевое слово в строку
            поиска в верхней части сайта (например, «Экономическая сфера»)
          </p>
        </div>
      </li>
      <li class="instruction__item">
        <div class="instruction__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M142.9 96c-21.5 0-42.2 8.5-57.4 23.8L54.6 150.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L40.2 74.5C67.5 47.3 104.4 32 142.9 32C223 32 288 97 288 177.1c0 38.5-15.3 75.4-42.5 102.6L109.3 416 288 416c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9L200.2 234.5c15.2-15.2 23.8-35.9 23.8-57.4c0-44.8-36.3-81.1-81.1-81.1z"
            />
          </svg>
        </div>
        <div class="instruction__description">
          <h3>Изучите словарную статью</h3>
          <p>
            Переключайтесь между разделами фрейма с помощью вкладок. <br />
            Читайте описания и выбирайте подходящие ситуации.
          </p>
        </div>
      </li>
      <li class="instruction__item">
        <div class="instruction__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
            <path
              d="M0 64C0 46.3 14.3 32 32 32l240 0c13.2 0 25 8.1 29.8 20.4s1.5 26.3-8.2 35.2L162.3 208l21.7 0c75.1 0 136 60.9 136 136s-60.9 136-136 136l-78.6 0C63 480 24.2 456 5.3 418.1l-1.9-3.8c-7.9-15.8-1.5-35 14.3-42.9s35-1.5 42.9 14.3l1.9 3.8c8.1 16.3 24.8 26.5 42.9 26.5l78.6 0c39.8 0 72-32.2 72-72s-32.2-72-72-72L80 272c-13.2 0-25-8.1-29.8-20.4s-1.5-26.3 8.2-35.2L189.7 96 32 96C14.3 96 0 81.7 0 64z"
            />
          </svg>
        </div>
        <div class="instruction__description">
          <h3>Узнайте подробности</h3>
          <p>
            Нажмите на <span class="highlight">выделенное</span> слово, чтобы увидеть значение
            слова, примеры использования и перевод на английский.
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.instruction {
  margin-top: 60px;
  &__title {
    padding-bottom: 60px;
    font-family: 'Inter', serif;
    font-weight: bold;
    width: 100%;
    margin: 0 auto;
    text-align: center;
    text-transform: uppercase;
    line-height: 120%;
    font-weight: bold;
    background: linear-gradient(160deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
  }

  &__list {
    list-style: none;
    padding: 0;
  }

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 60px;
    margin-bottom: 30px;
  }

  &__icon {
    background-color: #42b983;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
  }

  &__icon svg {
    width: 60%;
    height: 60%;
    fill: white;
  }

  &__description {
    width: 800px;
    color: #2c3e50;
  }

  &__description h3 {
    text-transform: uppercase;
    font-weight: bold;
    font-family: 'Inter', serif;
  }

  &__description p {
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
  }
}

.highlight {
  padding: 5px;
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #42b983, #647eff);
}
</style>
