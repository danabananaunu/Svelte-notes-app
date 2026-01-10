<script>
  import { createEventDispatcher } from "svelte";
  export let editingNote = null;

  const dispatch = createEventDispatcher();

  let title = "";
  let content = "";
  let tagsInput = "";
  let attachments = [];

  // reference to the file input element
  let fileInput;

  // update fields when editingNote changes
  $: if (editingNote) {
    title = editingNote.title || "";
    content = editingNote.content || "";
    tagsInput = (editingNote.tags || []).join(", ");
    attachments = editingNote.attachments || [];
  }

  function submit() {
    dispatch("save", {
      id: editingNote?.id,
      title: title.trim() || "Untitled",
      content: content.trim(),
      tags: tagsInput.split(",").map(t => t.trim()).filter(Boolean),
      attachments,
      createdAt: editingNote?.createdAt ?? new Date().toISOString()
    });

    // reset editor
    title = "";
    content = "";
    tagsInput = "";
    attachments = [];

    // clear file input
    if (fileInput) fileInput.value = "";
  }

  function handleFiles(e) {
    attachments = [...e.target.files].map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    }));
  }

  function cancel() {
    title = "";
    content = "";
    tagsInput = "";
    attachments = [];

    if (fileInput) fileInput.value = "";
    dispatch("cancel");
  }
</script>

<div class="editor-card">
  <h2 class="section-title">{editingNote ? "Edit note" : "New note"}</h2>

  <form on:submit|preventDefault={submit} class="editor-form">
    <label class="field">
      <span class="field-label">Title</span>
      <input class="field-input" bind:value={title} placeholder="Note title" />
    </label>

    <label class="field">
      <span class="field-label">Content</span>
      <textarea
        class="field-textarea"
        bind:value={content}
        placeholder="Write your note here..."
      ></textarea>
    </label>

    <label class="field">
      <span class="field-label">Tags</span>
      <input
        class="field-input"
        bind:value={tagsInput}
        placeholder="e.g. school, work"
      />
    </label>

    <label class="field">
      <span class="field-label">Attachments</span>

      <input
        bind:this={fileInput}         
        id="file-upload"
        type="file"
        multiple
        class="file-input-hidden"
        on:change={handleFiles}
      />

      <label for="file-upload" class="custom-file-button">
        Choose files
      </label>

      {#if attachments.length}
        <ul class="file-list">
          {#each attachments as file}
            <li>{file.name}</li>
          {/each}
        </ul>
      {/if}
    </label>

    <div class="editor-actions">
      {#if editingNote}
        <button type="button" class="btn btn-secondary" on:click={cancel}>
          Cancel
        </button>
      {/if}
      <button type="submit" class="btn btn-primary">
        Save
      </button>
    </div>
  </form>
</div>
