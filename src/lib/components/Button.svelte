<script>
  export let active = true;
  export let rounded = false;
</script>

<button on:click class:active class:rounded class="btn" {...$$restProps}>
  <slot></slot>
</button>

<style lang="scss">
  @import "../../assets/css/theme.scss";

  .btn {
    background: $background;
    color: white;
    font-weight: 500;
    font-size: 1.1rem;

    border: none;
    padding: 1rem 2rem;
    cursor: pointer;

    &.active {
      background: $accent;
    }

    &.rounded {
      border-radius: $border-rad;
    }
  }
</style>
