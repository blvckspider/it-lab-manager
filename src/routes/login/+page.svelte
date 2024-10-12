<script lang="ts">
    import userIcon from '$lib/assets/icons/user.svg';
    import lockIcon from '$lib/assets/icons/lock.svg';

    let [username, password, errorMessage] = ['', '', ''];

    const handleLogin = async (event: Event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        errorMessage = response.ok ? '' : data.error || 'Login failed';

        if(response.ok){
            console.log('Login successful!', data);
            window.location.href = '/dashboard';
        }
    };

</script>

<main id="main" class="column">
    <form class="center-flex column" on:submit={handleLogin}>
        <div class="username center-flex row">
            <img src={userIcon} alt="user icon">
            <input 
                type="text" 
                placeholder="Username" 
                bind:value={username}
                required>
        </div>

        <div class="password center-flex row">
            <img src={lockIcon} alt="lock icon">
            <input 
                type="password" 
                placeholder="Password" 
                bind:value={password}
                required>
        </div>

        {#if errorMessage}
        <p class="error-message">{ errorMessage }</p>
        {/if}

        <button type="submit"> LOGIN </button>
    </form>
</main>

<style>
    form { width: 250px; }
    
    form > div, button {
        width: 100%; height: 45px;
        margin: 10px;
        padding: 10px 15px;
        border-radius: 10px;
        background-color: var(--black-olive);
    }

    img { width: 20px; height: 20px; }
    input { width: 80%; margin: 5px 10px; color: var(--almond); }

    button { background: var(--almond); font-size: 15px; font-weight: 500; }
    button:hover { background: var(--almond-hover); }

    .error-message {
        color: red;
        font-size: 14px;
        text-align: center;
    }
</style>
