import { ref } from 'vue'

export const signal = ref(0)

export const useSignal = {
	trigger() {
		signal.value++
	}
}
