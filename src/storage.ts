import { useStorage } from "@vueuse/core";
import { preferZhuyin, t } from "./i18n";
import type { TriesMeta } from './logic'


export const initialized = useStorage('handle-initialized', false)

