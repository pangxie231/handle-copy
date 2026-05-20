<script lang="ts" setup>
import { ref } from 'vue';
import CharBlock from './CharBlock.vue';
import WordBlocks from './WordBlocks.vue';

// 组件设计
// 题目state
// 所有的答案state

// 输入后填入输入框，点击确定时进行验证

const words = ref('海纳百川')

const answers = ref<string[]>([])

const inputAnswer = ref('')
const confirmAnswer = ()=> {
  answers.value.push(inputAnswer.value)
  inputAnswer.value = ''
}
</script>

<template>
  <div py-8>
    <div flex flex-col items-center>
      <!-- <WordBlocks :words="words" :revealed="true" /> -->
      <WordBlocks v-for="w in answers" :key="w" :word="w" :revealed="true" />


      <div mt-4 flex flex-col items-center>
        <WordBlocks :word="inputAnswer" />
        <input v-model="inputAnswer" mt-4 b b-solid b-hex-f5f5f6 w86 p-4 text-center name="answer" type="text" placeholder="输入四字词语..." />
        <button @click="confirmAnswer" :class="inputAnswer.length >= 4 ? 'bg-ok' : ''" px-5 py-2 text-hex-fff rounded-2px mt-6 bg-gray>确 定</button>
        <div mt-6 flex justify-center gap-2 text-gray>
          <button>提示</button>
          <button>速查表</button>
        </div>
      </div>
    </div>
  </div>
</template>