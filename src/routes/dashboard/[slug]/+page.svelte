<script lang="ts">
  export let slug: string;
  export let data: any;

  console.log(slug);
  console.log(data);
  
</script>

<h1>Slug: {slug}</h1>

{#if data}
  <p>Data from database: {JSON.stringify(data)}</p>
{:else}
  <p>No data found for this slug.</p>
{/if}