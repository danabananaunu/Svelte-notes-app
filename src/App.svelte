<script>
  import Header from "./components/Header.svelte";
  import NoteEditor from "./components/NoteEditor.svelte";
  import NotesList from "./components/NotesList.svelte";
  import { useLocalStorage } from "./lib/useLocalStorage.js";

  const notesStore = useLocalStorage("notes", []);
  let notes = [];
  notesStore.subscribe(v => notes = v);

  let search = "";
  let selectedTag = "All";
  let editingNote = null;

  function saveNote(note) {
    if (note.id) {
      notes = notes.map(n => n.id === note.id ? note : n);
    } else {
      notes = [...notes, { ...note, id: Date.now() }];
    }
    notesStore.set(notes);
    editingNote = null;
  }

  function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    notesStore.set(notes);
    if (editingNote?.id === id) editingNote = null;
  }

  function startEdit(note) {
    editingNote = note;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  $: allTags = [...new Set(notes.flatMap(n => n.tags || []))];

  $: filteredNotes = notes.filter(note => {
    const text = `${note.title} ${note.content}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    if (selectedTag === "All") return matchesSearch;
    return matchesSearch && note.tags?.includes(selectedTag);
  });
</script>

<div class="app-root">
  <Header bind:search />

  <main class="main-layout">
    <section class="editor-section">
      <NoteEditor
        {editingNote}
        on:save={e => saveNote(e.detail)}
        on:cancel={() => editingNote = null}
      />
    </section>

    <section class="list-section">
      <NotesList
        notes={filteredNotes}
        {allTags}
        bind:selectedTag
        on:edit={e => startEdit(e.detail)}
        on:delete={e => deleteNote(e.detail)}
      />
    </section>
  </main>
</div>