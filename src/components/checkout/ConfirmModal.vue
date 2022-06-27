<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();
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
                Konfirmasi Pembayaran
              </DialogTitle>

              <div class="p-4">
                <p>
                  Menu yang telah dipesan tidak dapat diubah. Lanjutkan
                  Pembayaran?
                </p>

                <div class="mt-4 flex items-center justify-end gap-4">
                  <button
                    class="block border border-green text-sm text-green font-medium w-[100px] h-10 rounded-lg"
                    @click="$emit('close')"
                  >
                    Batal
                  </button>
                  <button
                    class="block border border-green bg-green text-sm text-white font-medium w-[100px] h-10 rounded-lg"
                    @click="$emit('confirm')"
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
