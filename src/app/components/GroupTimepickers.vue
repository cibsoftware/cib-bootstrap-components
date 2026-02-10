<!--

    Copyright CIB software GmbH and/or licensed to CIB software GmbH
    under one or more contributor license agreements. See the NOTICE file
    distributed with this work for additional information regarding copyright
    ownership. CIB software licenses this file to you under the Apache License,
    Version 2.0; you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

-->
<template>
  <div class="about">
    <h1>Timepickers</h1>
  </div>
  <div>
    <h2>Basic Timepicker with fixed width</h2>
    <BFormTimepicker v-model="basicTime" style="width: 250px" />
    <p class="mt-2">Selected time: {{ basicTime || 'None' }}</p>

    &nbsp;

    <h2>Timepicker with prepend slot</h2>
    <BFormTimepicker v-model="prependTime">
      <template #prepend>
        <span class="input-group-text">🕐</span>
      </template>
    </BFormTimepicker>
    <p class="mt-2">Selected time: {{ prependTime || 'None' }}</p>

    &nbsp;

    <h2>Timepicker with append slot</h2>
    <BFormTimepicker v-model="appendTime">
      <template #append>
        <button class="btn btn-outline-secondary" @click="appendTime = null">Clear</button>
      </template>
    </BFormTimepicker>
    <p class="mt-2">Selected time: {{ appendTime || 'None' }}</p>

    &nbsp;

    <h2>Small Timepicker</h2>
    <BFormTimepicker v-model="smallTime" size="sm" />
    <p class="mt-2">Selected time: {{ smallTime || 'None' }}</p>

    &nbsp;

    <h2>Large Timepicker</h2>
    <BFormTimepicker v-model="largeTime" size="lg" />
    <p class="mt-2">Selected time: {{ largeTime || 'None' }}</p>

    &nbsp;

    <h2>Timepicker with initial value</h2>
    <BFormTimepicker v-model="initialTime" />
    <p class="mt-2">Selected time: {{ initialTime || 'None' }}</p>

    &nbsp;

    <h2>Timepicker with custom input class</h2>
    <BFormTimepicker v-model="customTime" input-class="border-success" />
    <p class="mt-2">Selected time: {{ customTime || 'None' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BFormTimepicker from '@/components/BFormTimepicker.vue'

const basicTime = ref(null)
const prependTime = ref(null)
const appendTime = ref(null)
const smallTime = ref(null)
const largeTime = ref(null)
const initialTime = ref('14:30')
const customTime = ref(null)
</script>
