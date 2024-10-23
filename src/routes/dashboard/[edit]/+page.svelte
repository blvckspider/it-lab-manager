<script lang="ts">
  export let data;
  const object = data.results[0];
  let [name, quantity, note, laboratory, locker, shelf] = [object.name, object.quantity, object.note, object.laboratory, object.locker, object.shelf];
  let isValid: boolean = false;

  function goBack(){ window.history.back(); }

  function validateFields() {
    isValid = name.trim() !== '' &&
      Number.isInteger(parseInt(quantity)) && parseInt(quantity) > 0
      && laboratory.trim() !== ''
      && Number.isInteger(parseInt(locker)) && parseInt(locker) > 0
      && Number.isInteger(parseInt(shelf)) && parseInt(shelf) > 0;
  }

  async function editObject(){
    const updatedData = {
      id: object.id,
      name: object.name,
      note: object.note,
      quantity: object.quantity,
      laboratory: object.laboratory,
      locker: object.locker,
      shelf: object.shelf
    };

    validateFields();
    if(!isValid){ return; }

    try {
      const response = await fetch('/api/modifyObject/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });

      const result = await response.json();

      if(response.ok){ window.location.href = '/dashboard'; }
      else{ alert('Error: ' + result.message); }
    }
    catch(error){ console.error('Error while editing object:', error); }
  }
</script>

<h1 id="title"> EDIT OBJECT </h1>

<div class="main-container center-flex">
  <form class="center-flex column" on:submit={editObject}>
    <input type="text" placeholder="Name" on:input={validateFields} bind:value={object.name} required>
    <input type="number" placeholder="Quantity" on:input={validateFields} bind:value={object.quantity} required>
    <textarea placeholder="Note" on:input={validateFields} bind:value={object.note}></textarea>
    <input type="text" placeholder="Laboratory" on:input={validateFields} bind:value={laboratory} required>
    <input type="number" placeholder="Locker" on:input={validateFields} bind:value={locker} required>
    <input type="number" placeholder="Shelf" on:input={validateFields} bind:value={shelf} required>

    <div class="controls row">
      <button type="button" on:click={goBack}> Discard </button>
      <button type="submit" class:disabled={!isValid}> Save </button>
    </div>
  </form>
</div>



<style>

  #title{width: 100%; height: 100px; text-align: center; padding: 25px 0;}
  .main-container{height: calc(90vh - 100px);}

  form{width: 50vw;}
  input, textarea, button{
    width: 100%;
    max-width: 100%; max-height: 200px;
    margin: 10px 0;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 10px;
    color: var(--almond);
    background: var(--black-olive);
    transition: .25s;
  }

  .controls{width: 100%; gap: 10px;}
  .controls button{flex: 1;}
  .controls button:hover{transition: .25s;}
  .controls button:hover:first-child{background: var(--spicy-mix);}
  .controls button:hover:last-child{background: var(--axolotl);}
  .controls button.disabled{background: none;}
  .controls button.disabled:hover{background: none; cursor: not-allowed;}

  @media screen and (max-width: 800px){
    form{width: 70vw;}
  }

  @media screen and (max-width: 400px){
    form{width: 90vw;}
  }
</style>