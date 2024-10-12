<script lang="ts">
  import { page } from '$app/stores';
  const slug = $page.params.edit

  $: console.log($page.params.edit);

</script>

<h1>Slug: {slug}</h1>