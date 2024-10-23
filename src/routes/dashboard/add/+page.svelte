<script lang="ts">
    let [name, quantity, note, laboratory, locker, shelf] = ['', undefined, '', '', '', undefined, undefined];
    let isValid: boolean = false;

    function goBack(){ window.history.back(); }

    function validateFields() {
        isValid = name.trim() !== '' &&
            Number.isInteger(parseInt(quantity)) && parseInt(quantity) > 0
            && laboratory.trim() !== ''
            && Number.isInteger(parseInt(locker)) && parseInt(locker) > 0
            && Number.isInteger(parseInt(shelf)) && parseInt(shelf) > 0;
    }

    async function addObject(event) {
        const updatedData = { name, quantity, note, laboratory, locker, shelf };

        validateFields();
        if(!isValid){ return; }

        try{
            const response = await fetch('/api/modifyObject/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

        const result = await response.json();

        if(response.ok){ window.location.href = '/dashboard'; }
        else{ console.error('Error: ' + result.message); }
      }
      catch(error){ console.error('Error while adding object:', error); }
  }
</script>



<h1 id="title"> ADD AN OBJECT </h1>

<div class="main-container center-flex">
  <form class="center-flex column" on:submit={addObject}>
      <input type="text" placeholder="Name" on:input={validateFields} bind:value={name} required>
      <input type="number" placeholder="Quantity" on:input={validateFields} bind:value={quantity} required min="1">
      <textarea placeholder="Note" on:input={validateFields} bind:value={note}></textarea>
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