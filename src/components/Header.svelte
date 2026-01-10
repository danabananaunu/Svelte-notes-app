<script>
  export let search = "";
</script>

<header class="app-header">

  <input
    type="text"
    class="search-input"
    placeholder="Search notes..."
    bind:value={search}
  />
</header>

