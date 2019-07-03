<template>
    <div class="wrap-home">
        <div class="login-cover">
            <div class="login-cover-image"></div>
            <div class="login-cover-bg home-cover-bg"></div>
        </div>
        <div class="wrap-content">
            <h1>Home Page</h1>
            <table class="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Username</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto1111</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>

</script>

<style>
    .home-cover-bg{
        background: url('../assets/home-bg.jpg') no-repeat center center;
    }
    .wrap-content{
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>