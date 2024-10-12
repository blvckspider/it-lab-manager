<script>
    function goBack(){ window.history.back(); }
</script>

<h1 id="title"> ADD AN OBJECT </h1>

<div class="center-flex">
    <form class="center-flex column">

        <input type="text" placeholder="Name">
        <input type="text" placeholder="Quantity">
        <input type="text" placeholder="Location">

        <div class="controls row">
            <button on:click={goBack}> Discard </button>
            <button> Save </button>
        </div>

    </form>
</div>




<style>

    #title{width: 100%; text-align: center; margin: 25px 0;}

    form{width: 50vw;}

    input, button{
        width: 100%;
        margin: 10px 0;
        padding: 10px 15px;
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

    @media screen and (max-width: 800px){
        form{width: 70vw;}
    }

    @media screen and (max-width: 400px){
        form{width: 90vw;}
    }


</style>