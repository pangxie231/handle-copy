import { useDark } from "@vueuse/core";
import { ref } from "vue";

export const isDark = useDark()

export const answer = ref('声名鹊起')

const params = new URLSearchParams(window.location.search)

export const dayNo = ref()