<script lang="ts">
    import editIcon from '$lib/assets/icons/edit.svg';
    import binIcon from '$lib/assets/icons/bin.svg';
    import searchIcon from '$lib/assets/icons/search.svg';
    export let data: any;

    let searchBar: boolean = false;
    let searchQuery: string = '';
    let filteredData = data.data;

    function showSearchBar(){ searchBar = !searchBar; }

    function filterData() {
        if(searchQuery.trim() === ''){ filteredData = data.data; }
        else {
            filteredData = data.data.filter(object =>
                object.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                object.id.toString().includes(searchQuery) ||
                object.laboratory.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ('locker ' + object.locker).toString().includes(searchQuery.toLowerCase()) ||
                ('shelf ' + object.shelf).toString().includes(searchQuery.toLowerCase()) ||
                object.note.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    }

    async function deleteObject(id){
        try{
            const response = await fetch('/api/modifyObject/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: id })
            });

            const result = await response.json();

            if(response.ok){ window.location.reload(); }
            else{ console.error('Error: ' + result.message); }
        }
        catch(error){ console.error('Error while deleting object:', error); }
    }

</script>

 
<h1 id="title"> DASHBOARD </h1>
<div class="search-container center-flex">
    {#if searchBar}
        <input type="text" placeholder="Search..." bind:value={searchQuery} on:input={filterData}>
    {/if}
    <button class="search" on:click={showSearchBar}> <img src={searchIcon} alt=""> </button>
</div>

<div class="table-container column">

    {#if data.data.length == 0}
        <p class="empty-advice"> Il laboratorio è vuoto. <br> Inserisci gli oggetti per gestirli. </p>
    {/if}

    {#if data.data.length != 0}
        <table>
            <thead>
                <tr>
                    <th> ID </th>
                    <th> Name </th>
                    <th> Quantity </th>
                    <th> Note </th>
                    <th> Laboratory </th>
                    <th> Locker </th>
                    <th> Shelf </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {#each filteredData as object}
                    <tr>
                        <td class="product-id"> { object.id } </td>
                        <td class="product-name"> { object.name } </td>
                        <td class="product-quantity"> <span> Quantity: </span> { object.quantity } </td>
                        <td> <span> Note: </span> {@html object.note.replace(/;/g, '<br>') } </td>
                        <td> <span> Laboratory: </span> { object.laboratory } </td>
                        <td class="product-locker"> <span> locker: </span> { object.locker } </td>
                        <td class="product-shelf"> <span> Shelf: </span> { object.shelf } </td>
                        <td class="actions-cell center-flex row">
                            <div class="container center-flex">
                                <button class="button center-flex"> <a href={`/dashboard/${object.id}`}> <img src={editIcon} alt="edit"> </a> </button>
                                <button class="button center-flex" on:click={() => deleteObject(object.id)}> <img src={binIcon} alt="delete"> </button>
                            </div>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

</div>

<button class="floating center-flex">
    <a href="/dashboard/add"> + </a>
</button>


<style>

    #title{width: 100%; height: 100px; text-align: center; padding: 25px 0;}

    .search-container input{
        width: 80%; height: 45px;
        padding: 10px 20px;
        color: var(--almond);
        border-radius: 25px;
        background: var(--black-olive);
    }
    button.search{width: 30px; height: 30px; position: absolute; top: 35px; right: 25px; transition: .25s;}
    button.search:hover{scale: 1.1; transition: .25s;}
    
    .empty-advice{text-align: center;}

    table{margin: 25px;}
    table th, table td{min-height: 100%;}

    thead{width: 100%; text-align: left; background-color: var(--black-olive);}
    thead th{margin: 5px; padding: 5px; color: var(--almond);}
    
    tbody td{padding: 5px; background-color: var(--axolotl);}
    td span{display: none;}

    .actions-cell{display: table-cell; flex-wrap: wrap; gap: 5px 15px;}
    .actions-cell button, .actions-cell a{
        width: 35px; height: 35px;
        min-width: max-content;
        padding: 2px;
        transition: .25s;
    }
    .actions-cell button:hover{scale: 1.1; transition: .25s;}

    .product-id, .product-quantity, .product-locker, .product-shelf{
        text-align: center;
    }


    @media screen and (max-width: 625px){
        .table-container{align-items: center;}
        tbody tr{width: 90vw; display: flex; flex-direction: column; margin-bottom: 10px;}
        thead{display: none;}
        tbody tr{position: relative; padding: 10px; border-radius: 7px; background-color: var(--axolotl);}
        .actions-cell{position: absolute; top: 5px; right: 0; background: none;}
        .product-id{display: none;}
        td{display: flex;}
        td span{display: block; margin-right: 5px;}
        .product-name{font-weight: bold;}
    }

    @media screen and (max-width: 350px){
        #title{text-align: left; padding-left: 25px;}
    }

    button.floating{
        width: 45px; height: 45px;
        position: fixed;
        right: 20px; bottom: 20px;
        padding: 10px;
        background: var(--axolotl);
        border-radius: 50%;
        font-size: 35px;
        box-shadow: 0px 0px 20px 0px var(--black-olive);
        transition: .25s;
    }
    button.floating:hover{scale: 1.1; transition: .25s;}

</style>