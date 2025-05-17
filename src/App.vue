<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HeaderMain from './components/HeaderMain.vue'
import IntroComponent from './components/IntroComponent.vue'
import FrameList from './components/FrameList.vue'
import InstructionComponent from './components/InstructionComponent.vue'
import TeamComponent from '../src/components/TeamComponent.vue'
</script>

<template>
  <HeaderMain />

  <IntroComponent />
  <InstructionComponent />
  <FrameList />
  <TeamComponent />
</template>

<style scoped></style>
