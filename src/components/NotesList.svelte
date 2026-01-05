<script>
  import { createEventDispatcher } from "svelte";
  export let notes = [];
  export let allTags = [];
  export let selectedTag = "All";

  const dispatch = createEventDispatcher();
</script>

<div class="list-card">
  <div class="list-header">
    <h2 class="section-title">Your notes</h2>
    <span class="note-count">{notes.length} notes</span>
  </div>

  <div class="tag-filter">
    <button
      class="tag-pill {selectedTag === 'All' ? 'tag-pill-active' : ''}"
      on:click={() => selectedTag = "All"}
    >
      All
    </button>

    {#each allTags as tag}
      <button
        class="tag-pill {selectedTag === tag ? 'tag-pill-active' : ''}"
        on:click={() => selectedTag = tag}
      >
        {tag}
      </button>
    {/each}
  </div>

  {#if notes.length === 0}
    <p class="empty-text">No notes yet. Start by creating one!</p>
  {:else}
    <ul class="notes-list">
      {#each notes as note}
        <li class="note-item">
          <div>
            <h3 class="note-title">{note.title}</h3>
            {#if note.content}
              <p class="note-content">
                {note.content.length > 200
                  ? note.content.slice(0, 200) + "..."
                  : note.content}
              </p>
            {/if}
          </div>

          <div class="note-footer">
            <div class="note-tags">
              {#each note.tags || [] as tag}
                <span class="note-tag">{tag}</span>
              {/each}
            </div>

            <div class="note-actions">
              <button
                class="btn btn-small"
                on:click={() => dispatch("edit", note)}
              >
                Edit
              </button>
              <button
                class="btn btn-small btn-danger"
                on:click={() => dispatch("delete", note.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</div>