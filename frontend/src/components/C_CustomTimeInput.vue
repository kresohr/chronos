<template>
  <div class="custom-time-input">
    <div class="custom-time-input--wrapper">
      <button
        type="button"
        class="custom-time-input__button custom-time-input__button--increment"
        @click="handleTimeChange('hours', 'increment')"
      >
        <fa-icon color="#f1f1f1" :icon="['fas', 'plus']" />
      </button>
      <input
        id="hour-input"
        type="number"
        v-model="selectedHour"
        placeholder="H"
        max="23"
        @input="handleTimeChange('hours')"
      />
      <button
        type="button"
        class="custom-time-input__button custom-time-input__button--decrement"
        @click="handleTimeChange('hours', 'decrement')"
      >
        <fa-icon color="#f1f1f1" :icon="['fas', 'minus']" />
      </button>
      <label for="hour-input">Hrs</label>
    </div>

    <div class="custom-time-input--wrapper">
      <button
        type="button"
        class="custom-time-input__button custom-time-input__button--increment"
        @click="handleTimeChange('minutes', 'increment')"
      >
        <fa-icon color="#f1f1f1" :icon="['fas', 'plus']" />
      </button>
      <input
        id="minute-input"
        type="number"
        v-model="selectedMinutes"
        placeholder="M"
        max="60"
        @input="handleTimeChange('minutes')"
      />
      <button
        type="button"
        class="custom-time-input__button custom-time-input__button--decrement"
        @click="handleTimeChange('minutes', 'decrement')"
      >
        <fa-icon color="#f1f1f1" :icon="['fas', 'minus']" />
      </button>
      <label for="minute-input">Min</label>
    </div>
  </div>
  <p class="custom-time-input__info">
    Total time to be logged: <strong> {{ selectedHour }} hours </strong> and
    <strong>{{
      selectedMinutes != 1 ? `${selectedMinutes} minutes` : `${selectedMinutes} minute`
    }}</strong>
  </p>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedHour = ref(8)
const selectedMinutes = ref(0)

const handleTimeChange = (
  selectedTime: 'hours' | 'minutes',
  action?: 'increment' | 'decrement',
) => {
  const limits = {
    hours: { min: 0, max: 23 },
    minutes: { min: 0, max: 59 },
  }

  const timeReference = selectedTime === 'hours' ? selectedHour : selectedMinutes
  const { min, max } = limits[selectedTime]

  if (action === 'increment' && timeReference.value < max) {
    timeReference.value++
  }

  if (action === 'decrement' && timeReference.value > min) {
    timeReference.value--
  }

  if (!timeReference.value || timeReference.value < min) {
    timeReference.value = min
  } else if (timeReference.value > max) {
    timeReference.value = max
  }
}
</script>
[]

<style scoped lang="scss">
.custom-time-input {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-small);

  &--wrapper {
    display: flex;
    flex-direction: column;
  }

  &__button {
    padding: var(--spacing-xsmall);
    border: 1px solid var(--border-color);
    transition: 0.2s background-color ease-in-out;
    background-color: var(--p-button-primary-background);

    cursor: pointer;
    &--increment {
      border-top-left-radius: var(--spacing-xsmall);
      border-top-right-radius: var(--spacing-xsmall);
    }
    &--decrement {
      border-bottom-left-radius: var(--spacing-xsmall);
      border-bottom-right-radius: var(--spacing-xsmall);
    }

    &:hover {
      background-color: var(--p-button-primary-hover-background);
    }
  }

  &__info {
    margin-block: var(--spacing-small);
    font-style: italic;
  }
}

input {
  padding: 8px;
  width: 40px;
  text-align: center;
  border: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
