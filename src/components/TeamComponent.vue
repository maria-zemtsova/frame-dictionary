<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import axios from 'axios'
import 'vue3-carousel/dist/carousel.css'

interface TeamMember {
  id: number
  image: string
  role: string
  name: string
}

const teamMembers = ref<TeamMember[]>([])

const fetchTeamMembers = async () => {
  try {
    const { data } = await axios.get<{ members: TeamMember[] }>('/api/teamMembers.json')
    teamMembers.value = data.members
  } catch (error) {
    console.error('Error loading team members:', error)
  }
}

onMounted(() => {
  fetchTeamMembers()
})
</script>

<template>
  <div class="team">
    <Carousel :items-to-show="5" :wrap-around="true" :autoplay="3000" :transition="500">
      <Slide v-for="member in teamMembers" :key="member.id">
        <div class="team__item">
          <img :src="member.image" :alt="member.role" class="team__photo" />
          <div class="team__name">
            {{ member.name }}
          </div>
          <div class="team__role">
            {{ member.role }}
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style lang="scss">
.carousel__slide {
  margin-left: 50px;
}
.team {
  width: 100%;
  margin: 0 auto;
  padding: 20px;

  &__item {
    text-align: center;
    padding: 50px;
  }

  &__photo {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin: 0 auto 20px;
  }

  &__role {
    font-size: 1.2em;
    color: #333;
    font-weight: 500;
  }
}
</style>
