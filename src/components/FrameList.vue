<script setup lang="ts">
import { ref } from 'vue'

interface frameItem {
  id: number
  path: string
  title: string
}

const frameItems = ref<frameItem[]>([
  { id: 1, path: '/src/assets/frames/work.svg', title: 'Профессиональная деятельность' },
  { id: 2, path: '/src/assets/frames/trade.svg', title: 'Сфера услуг' },
  { id: 3, path: '/src/assets/frames/policy.svg', title: 'Политическая сфера' },
  { id: 4, path: '/src/assets/frames/map.svg', title: 'Посещение' },
  { id: 5, path: '/src/assets/frames/emotions.svg', title: 'Эмоциональное взаимодействие' },
  { id: 6, path: '/src/assets/frames/communication.svg', title: 'Общение' },
  { id: 7, path: '/src/assets/frames/approval.svg', title: 'Одобрение' },
  { id: 8, path: '/src/assets/frames/ban.svg', title: 'Разрешение и запрет' },
  { id: 9, path: '/src/assets/frames/economy.svg', title: 'Экономическая сфера' },
  {
    id: 10,
    path: '/src/assets/frames/negative.svg',
    title: 'Негативное физическое и психическое воздействие',
  },
  {
    id: 11,
    path: '/src/assets/frames/hand-holding-heart.svg',
    title: 'Помощь и поддержка',
  },
  { id: 12, path: '/src/assets/frames/gift.svg', title: 'Предоставление,наделение, дарение' },
  { id: 13, path: '/src/assets/frames/conflict.svg', title: 'Конфликт' },
  { id: 14, path: '/src/assets/frames/love.svg', title: 'Любовные отношения' },
  { id: 15, path: '/src/assets/frames/law.svg', title: 'Нарушение закона и наказание' },
  { id: 16, path: '/src/assets/frames/cooperation.svg', title: 'Сотрудничество' },
  { id: 17, path: '/src/assets/frames/school.svg', title: 'Образование и воспитание' },
  { id: 18, path: '/src/assets/frames/compulsion.svg', title: 'Принуждение' },
  { id: 19, path: '/src/assets/frames/family.svg', title: 'Семья и забота' },
  { id: 20, path: '/src/assets/frames/.svg', title: 'Профессиональная деятельность' },
  { id: 21, path: '/src/assets/frames/.svg', title: 'Профессиональная деятельность' },
  { id: 22, path: '/src/assets/frames/.svg', title: 'Профессиональная деятельность' },
  { id: 23, path: '/src/assets/frames/.svg', title: 'Профессиональная деятельность' },
  { id: 24, path: '/src/assets/frames/.svg', title: 'Профессиональная деятельность' },
])
</script>

<template>
  <section class="frames">
    <div>
      <h2 class="frames__title">список фреймов</h2>
      <p class="frames__description">Выберете фрейм, который хотите изучать</p>
    </div>
    <ul class="frames__list">
      <li class="frames__item" v-for="item in frameItems" :key="item.id">
        <a class="frames__link" href="#">
          <img class="frames__icon" :src="item.path" :alt="item.title" :title="item.title" />
        </a>
      </li>
    </ul>
  </section>
</template>

<style lang="scss">
.frames {
  display: flex;
  gap: 61px;
  justify-content: center;
  align-items: center;
  margin-top: 70px;

  div {
    text-align: center;
  }

  &__title {
    font-weight: bold;
    font-size: 36px;
    font-family: 'Inter', serif;
    background: linear-gradient(45deg, #42b983, #647eff);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    text-transform: uppercase;
  }

  &__description {
    font-family: 'Roboto';
    font-size: 20px;
    color: #95a5a6;
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    gap: 25px;
    list-style: none;
    padding: 0;
  }

  &__item {
    width: 100px;
    height: 100px;
    background-color: #f5f5f5;
    border-radius: 10px;
  }

  &__link {
    display: flex;
    justify-content: center; /* Горизонтальное центрирование */
    align-items: center; /* Вертикальное центрирование */
    width: 100%; /* Занимает всю ширину родителя */
    height: 100%;
  }

  &__icon {
    max-width: 100%; /* Чтобы изображение не выходило за границы */
    max-height: 100%;
  }
}
</style>
