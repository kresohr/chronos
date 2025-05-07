<template>
  <div class="custom-time-input">
    <div class="custom-time-input--wrapper">
      <button type="button" class="custom-time-input__button custom-time-input__button--increment">
        <fa-icon color="#f1f1f1" :icon="['fas', 'plus']" />
      </button>
      <input
        id="hour-input"
        type="number"
        v-model="selectedHour"
        placeholder="H"
        max="23"
        @input="handleInputField"
      />
      <button type="button" class="custom-time-input__button custom-time-input__button--decrement">
        <fa-icon color="#f1f1f1" :icon="['fas', 'minus']" />
      </button>
      <label for="hour-input">Hrs</label>
    </div>

    <div class="custom-time-input--wrapper">
      <button type="button" class="custom-time-input__button custom-time-input__button--increment">
        <fa-icon color="#f1f1f1" :icon="['fas', 'plus']" />
      </button>
      <input
        id="minute-input"
        type="number"
        v-model="selectedMinutes"
        placeholder="M"
        max="60"
        @input="handleInputField"
      />
      <button type="button" class="custom-time-input__button custom-time-input__button--decrement">
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

/* Looks a little hacky but since I know it won't have more input fields than these two, I'll stick with it
 No need to separate this into generic function as it will hurt the readability of the code*/
const handleInputField = () => {
  if (!selectedHour.value) {
    selectedHour.value = 0
  }
  if (!selectedMinutes.value) {
    selectedMinutes.value = 0
  }
  if (selectedHour.value > 23) {
    selectedHour.value = 23
  }
  if (selectedMinutes.value > 59) {
    selectedMinutes.value = 59
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
