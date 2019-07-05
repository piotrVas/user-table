<template>
	<div class="wrap-login">
		<div class="cover">
			<div class="cover-image"></div>
			<div class="cover-bg"></div>
		</div>
		<div class="login-window">
			<div class="login-header">
				<h1>Login User Table</h1>
			</div>
			<div class="login-content">
				<form method="POST" class="margin-bottom-0">
					<div class="form-group m-b-20">
						<input v-model="user.username" v-validate="{required:true, regex: /^[a-zA-Z]+$/, min: 4, max: 20}" id="username" class="input form-control" type="text" name="username"  placeholder="Username">
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
            onSubmit(e){
                e.preventDefault();
                this.$validator.validate().then((result)=>{
                    if(!result){
                        this.store.dispatch('setError','Not valid form');
                    }
                    else {
                       this.$store.dispatch('getReload',true);
                       const User = {
                           username: this.user.username,
                           password: this.user.password
                       }
                       User.password = sha256(User.password);
                       this.checkOrCreateUserInLocal(User);
                    }
                })
            },
            checkOrCreateUserInLocal(obj){
                this.$store.dispatch('clearError');
                let localUser;
                if(localStorage[obj.username]){
                    localUser = JSON.parse(localStorage[obj.username]);
                    if(obj.username === localUser.username && obj.password === localUser.password){
                        this.checkLocalUserInDB(obj);
                        this.setDelayAndRoute(true);
                    }
                    else if(obj.username === localUser.username && obj.password !== localUser.password){
                        (async ()=>{
                          let result = await this.checkLocalUserInDB(obj);
                          this.setDelayAndRoute(result);
                        })();
                    }
                }
                else{
                    this.$store.dispatch('checkUserInDB',obj).then(res=>{
                        if(res === true){
                            this.createUserLocal(obj);
                            this.setDelayAndRoute(true);
                        }
                        else{
                            this.createUserLocal(obj);
                            this.$store.dispatch('createUser', obj).then(()=>this.setDelayAndRoute(true));
                        }
                    });
                    return true
                }
            },
            createUserLocal(obj){
                localStorage[obj.username] = JSON.stringify(obj);
            },
            async checkLocalUserInDB(obj){
                let res = await this.$store.dispatch('checkUserInDB',obj).then(res=>{
                    if(res === false){
                        this.$store.dispatch('createUser', obj);
                        return true
                    }
                    else{
                        return false
                    }
                });
                return res;
            },
            setDelayAndRoute(bool){
              this.$store.dispatch('getReload', true)
              if(bool) {
                setTimeout(() => {
                  this.$router.push('/home');
                  this.$store.dispatch('getReload', false);
                }, 2000);
              }
              else{
                this.$store.dispatch('getReload', false);
              }
            }
		}
	}

</script>
<style>
	.cover-image{
		background: url('../assets/login-bg.jpg') no-repeat center center;
		background-size: cover;
	}
	.wrap-login, .cover{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
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
		margin: 168px 0 0 -200px;
		position: absolute;
		top: 0;
		left: 50%;
		border-radius: 4px;
	}
	.login-header{
		width: 400px;
		padding: 0 20px;
		margin: 0;
		top: 0;
		left: 0;
		right: 0;
		position: relative;
	}
	.login-header h1{
		color: #fff;
	}
	@media(max-width: 767px){
		.login-window{
			width: 100%;
			position: relative;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			transform: translate(0%,50%);
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