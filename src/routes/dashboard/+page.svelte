<script lang="ts">
    import editIcon from '$lib/assets/icons/edit.svg';
    import binIcon from '$lib/assets/icons/bin.svg';
    export let data: any;
    console.log(data);
</script>

 
<h1 id="title"> DASHBOARD </h1>

<div class="table-container column">

    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Position</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {#each data.data as user}
                <tr>
                    <td class="product-id"> { user.id } </td>
                    <td class="product-name" > { user.name } </td>
                    <td> <span> Quantity: </span> { user.quantity } </td>
                    <td> <span> Position: </span> { user.position } </td>
                    <td class="actions-cell center-flex row">
                        <div class="container center-flex">
                            <button class="button center-grid"> <img src={editIcon} alt=""> </button>
                            <button class="button center-grid"> <img src={binIcon} alt=""> </button>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

</div>


<style>

    #title{width: 100%; text-align: center; margin: 25px 0;}

    table{margin: 25px;}
    table th, table td{min-height: 100%;}

    thead{
        width: 100%;
        text-align: left;
        background-color: var(--black-olive);
    }
    thead th{margin: 5px; padding: 5px; color: var(--almond);}
    
    tbody td{padding: 5px; background-color: var(--axolotl);}
    td span{display: none;}

    .actions-cell{display: table-cell; flex-wrap: wrap; gap: 5px 15px;}
    .actions-cell button{
        width: 35px; height: 35px;
        min-width: max-content;
        padding: 2px;
        transition: .25s;
    }
    .actions-cell button:hover{scale: 1.1; transition: .25s;}



    @media screen and (max-width: 470px){
        .table-container{align-items: center;}
        tbody tr{width: 90vw; display: flex; flex-direction: column; margin-bottom: 10px;}
        thead{display: none;}
        tbody tr{position: relative; padding: 10px; border-radius: 7px; background-color: var(--axolotl);}
        .actions-cell{
            position: absolute;
            background: none;
            top: 5px; right: 0;
        }
        .product-id{display: none;}
        td{display: flex;}
        td span{display: block; margin-right: 5px;}
        .product-name{font-weight: bold;}
    }



</style>