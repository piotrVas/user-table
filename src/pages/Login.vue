<template>
	<div class="wrap-login">
		<div class="cover">
			<div class="login-image cover-image"></div>
			<div class="cover-bg"></div>
		</div>
		<div class="login-window">
			<div class="login-header">
				<h1>Login User Table</h1>
			</div>
			<div class="login-content">
				<form method="POST" class="margin-bottom-0">
					<div class="form-group m-b-20">
						<input v-model="user.username" v-validate="{required:true, regex: /^[a-zA-Z]+$/, min: 3, max: 20}" id="username" class="input form-control" type="text" name="username"  placeholder="Username">
						<span>{{ errors.first('username') }}<i v-if="errors.first('username')"> (latin letters only)</i></span>
					</div>
					<div class="form-group m-b-20">
						<vue-password name="password" v-validate="{required:true, regex:/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/}" id="password"
							:disableStrength="true"
							v-model="user.password"
							classes="input form-control"
							:user-inputs="[user.username]"
							placeholder="Password">
						</vue-password>
						<span>{{ errors.first('password') }}<i v-if="errors.first('password')"> (latin letters only, e.g: "aA!@#$%^&*123"; and not less 8 charts)</i></span>
					</div>
					<div class="login-buttons">
						<button type="button" @click="onSubmit" class="btn btn-dark btn-block btn-lg" :disabled="reload"><span v-if="!reload" class="title-btn">Sign me in</span><i v-else class="fa fa-spinner fa-pulse"></i></button>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
    import {VuePassword} from 'vue-password';
    import sha256  from 'sha256';

	export default{
        components: {
            VuePassword
        },
		computed:{
            reload(){
                return this.$store.getters.reload;
			}
		},
		data(){
			return{
				user: {
					username: '',
					password: ''
				}
			}
		},
		methods: {
            onSubmit(){
                this.$validator.validate().then((result)=>{
                    if(!result){
                        this.$store.dispatch('setError','Not valid form');
                    }
                    else {
                       this.$store.dispatch('getReload',true);
                       const User = {
                           username: this.user.username,
                           password: sha256(this.user.password)
                       }
                       this.checkOrCreateUserInLocalOrDB(User);
                    }
                })
            },
			checkOrCreateUserInLocalOrDB(obj){
				this.$store.dispatch('clearError');
				this.handleAccessToDB(obj,this.$router)
			},
            async handleAccessToDB(obj,route){
              obj.route = route;
              await this.$store.dispatch('checkUserInDB', obj);
            }
		}
	}

</script>
<style>
	.login-image{
		background: url('../assets/login-bg.jpg') no-repeat center center;
		background-size: cover;
	}
	.wrap-login{
		position: static;
		height: 100%;
	}
	.cover{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 100%;
	}
	.cover-bg{
		background: rgba(0,0,0,.5);
	}
	.cover-image, .cover-bg{
		width: 100%;
		height: 100vh;
		position: fixed;
	}
	.login-window{
		color: #ccc;
		width: 400px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border-radius: 4px;
	}
	.login-header{
		width: 400px;
		padding: 0 20px;
	}
	.login-header h1{
		color: #fff;
	}
	@media(max-width: 767px){
		.login-window{
			width: 100%;
			position: relative;
			top: 50%;
			left: 0;
			right: 0;
			bottom: 0;
			transform: translate(0%,-50%);
			margin: 0 auto;
			padding: 20px;
		}
		.login-header{
			width: 100%;
		}
		.login-header h1{
			font-size: 30px;
		}
	}
</style>