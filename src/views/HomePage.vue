<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import IntroComponent from '@/components/IntroComponent.vue'
import FrameList from '@/components/FrameList.vue'
import InstructionComponent from '@/components/InstructionComponent.vue'
import TeamComponent from '@/components/TeamComponent.vue'
import FAQList from '@/components/FAQList.vue'
</script>

<template>
  <IntroComponent />
  <InstructionComponent />
  <FrameList />
  <TeamComponent />
  <FAQList />
</template>
