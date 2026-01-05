<script>
  export let search = "";
</script>

<header class="app-header">
  <h1 class="app-title">Notes App</h1>

  <input
    type="text"
    class="search-input"
    placeholder="Search notes..."
    bind:value={search}
  />
</header>
