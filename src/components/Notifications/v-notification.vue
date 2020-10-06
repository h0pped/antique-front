<template>
  <div class="v-notification">
    <transition-group name="v-transition-animate" class="messages_list">
      <div
        class="v-notification_content"
        v-for="message in messages"
        :key="message.id"
      >
        <v-alert :type="message.type" dense  elevation="5">
          {{ message.name }}</v-alert
        >
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "vNotification",
  props: {
    messages: {
      type: Array,
      default: () => {
        return [];
      },
    },
    rightButton: {
      type: String,
      default: "",
    },
    leftButton: {
      type: String,
      default: "",
    },
    timeout: {
      type: Number,
      default: 3000,
    },
  },
  data() {
    return {};
  },
  methods: {
    hideNotification() {
      let vm = this;
      if (vm.messages.length) {
        setTimeout(() => {
          vm.messages.splice(vm.messages.length - 1, 1);
        }, vm.timeout);
      }
    },
  },
  watch: {
    messages() {
      this.hideNotification();
    },
  },
  mounted() {
    this.hideNotification();
  },
  computed: {},
};
</script>

<style scoped lang="scss">
.v-notification {
  position: fixed;
  top: 20px;
  right: 16px;
  z-index: 9999;
  &_content {
    padding: 16px;
    border-radius: 4px;
    color: white;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    margin-bottom: 16px;
  }
}
.v-transition-animate {
  &-enter {
    transform: translateX(120px);
    opacity: 0;
  }
  &-enter-active {
    transition: all 0.6s ease;
  }

  &-enter-to {
    opacity: 1;
  }
  &-leave {
    height: 50px;
    opacity: 1;
  }
  &-leave-active {
    transition: transform 0.6s ease, opacity 0.6s, height 0.6s 0.2s;
  }
  &-leave-to {
    height: 0;
    transform: translateX(120px);
    opacity: 0;
  }
  &-move {
    transition: transform 0.6s ease;
  }
}
</style>