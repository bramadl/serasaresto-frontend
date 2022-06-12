<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { ref } from "vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits<{
  (e: "close"): void;
  (e: "update:note", value: string): void;
}>();

const note = ref<string>("");
const onSetNote = () => {
  emits("update:note", note.value);
  emits("close");
};
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="$emit('close')" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="flex items-center justify-center font-semibold text-xl text-white bg-green h-12"
              >
                Catatan
              </DialogTitle>

              <div class="p-4">
                <textarea
                  v-model="note"
                  class="block w-full h-40 resize-y outline-none focus:outline-none border border-icon placeholder-icon text-sm text-primary p-4 rounded"
                  placeholder="Tulis tambahan anda..."
                />

                <div class="mt-4 flex items-center justify-end gap-4">
                  <button
                    class="block border border-green text-sm text-green font-medium w-[100px] h-10 rounded-lg"
                    @click="$emit('close')"
                  >
                    Batal
                  </button>
                  <button
                    class="block border border-green bg-green text-sm text-white font-medium w-[100px] h-10 rounded-lg"
                    @click="onSetNote"
                  >
                    OK
                  </button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
