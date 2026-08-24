<script lang="ts" setup>
import {
  colorblind,
  inputMode,
  meta,
  spMode,
  useCheckAssist,
  useNoHint,
  useNumberTone as useNumberToneRaw,
  useStrictMode,
} from "~/storage";
import { useNumberTone } from "~/state";
import { locale, t } from "~/i18n";

defineProps<{
  lite?: boolean;
}>();
</script>

<template>
  <div flex="~ col">
    <div flex="~ justify-center wrap">
      <div square-btn m2>
        <button
          :class="locale === 'hans' ? 'text-primary' : 'op80'"
          @click="locale = 'hans'"
        >
          简体
        </button>
        <div w-1px h-4 border="r base" />
        <button
          :class="locale === 'hant' ? 'text-primary' : 'op80'"
          @click="locale = 'hant'"
        >
          繁體
        </button>
      </div>
      <button
        square-btn
        m2
        :class="colorblind ? 'text-primary' : 'op80'"
        @click="colorblind = !colorblind"
      >
        {{ t("colorblind-mode") }}
        <div v-if="colorblind" square-btn-mark></div>
      </button>
    </div>
    <div flex="~ justify-center wrap">
      <div square-btn m2>
        <button
          :class="inputMode === 'py' ? 'text-primary' : 'op80'"
          @click="inputMode = 'py'"
        >
          {{ t("pinyin") }}
        </button>
        <div w-1px h-4 border="r base"></div>
        <button
          :class="inputMode === 'zy' ? 'text-primary' : 'op80'"
          @click="inputMode = 'zy'"
        >
          {{ t("zhuyin") }}
        </button>
        <div w-1px h-4 border="r base"></div>
        <button
          :class="inputMode === 'sp' ? 'text-primary' : 'op80'"
          @click="inputMode = 'sp'"
        >
          {{ t("shuangpin") }}
        </button>
      </div>
      <div square-btn m2>
        <button
          :class="!useNumberTone ? 'text-primary' : 'op80'"
          @click="useNumberToneRaw = false"
        >
          {{ t("tone-symbol") }}
        </button>
        <div w-1px h-4 border="r base"></div>
        <button
          :class="useNumberTone ? 'text-primary' : 'op80'"
          @click="useNumberToneRaw = true"
        >
          {{ t("tone-number") }}
        </button>
      </div>
    </div>
    <!-- v-if="inputMode === 'sp'" -->
    <div v-if="inputMode === 'sp'" flex="~ justify-center">
      <div square-btn m2>
        <button
          :class="spMode === 'sougou' ? 'text-primary' : 'op80'"
          @click="spMode = 'sougou'"
        >
          {{ t("shuangpin-sougou") }}
        </button>
        <div w-1px h-4 border="r base"></div>
        <button
          :class="spMode === 'xiaohe' ? 'text-primary' : 'op80'"
          @click="spMode = 'xiaohe'"
        >
          {{ t("shuangpin-xiaohe") }}
        </button>
      </div>
    </div>
    <!-- v-if="!lite" -->
    <div v-if="!lite" flex="~ justify-center wrap">
      <button
        square-btn
        m2
        :class="useNoHint ? 'text-primary' : 'op80'"
        @click="useNoHint = !useNoHint"
      >
        {{ t("hard-mode") }}
        <div v-if="useNoHint" square-btn-mark></div>
      </button>
      <button
        square-btn
        m2
        :class="useCheckAssist ? 'text-primary' : 'op80'"
        @click="useCheckAssist = !useCheckAssist"
      >
        {{ t("check-assist") }}
        <div v-if="useCheckAssist" square-btn-mark></div>
      </button>
      <button
        square-btn
        m2
        :class="useStrictMode ? 'text-primary' : 'op80'"
        @click="useStrictMode = !useStrictMode"
      >
        {{ t("strict-mode") }}
        <div v-if="useStrictMode" square-btn-mark></div>
      </button>
    </div>
  </div>
</template>
