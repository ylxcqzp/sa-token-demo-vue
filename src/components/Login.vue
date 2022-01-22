<template>
    <div>
        <input type="text" v-model="loginForm.username" placeholder="用户名"/>
        <input type="text" v-model="loginForm.password" placeholder="密码"/>
        <button @click="login">登录</button>
    </div>
</template>

<script>
    import {userLogin} from "@/api";

    export default {
        name: 'login',
        data () {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                userToken: ''
            };
        },

        methods: {
            login () {
                if (this.loginForm.username === '' || this.loginForm.password === '') {
                    alert('账号或密码不能为空');
                } else {
                    let form = {
                        username: this.loginForm.username,
                        password: this.$Secret.md5Encode(this.loginForm.password)
                    }
                    userLogin(form).then(res => {
                        if (res.code !== 200) {
                            this.$message.error(res.message);
                            return false;
                        }
                        this.$message.success("登录成功！");
                        this.userToken = res.data;
                        // 将用户token保存到vuex中
                        this.$store.commit('changeLogin',{ Authorization: this.userToken })
                        this.$router.push('/home');
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }
    };
</script>
