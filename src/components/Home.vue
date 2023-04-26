<template>
    <div>
        <div>{{title}}</div>
        <el-row>
            <el-button @click="logout" type="success" plain>退出</el-button>
        </el-row>
    </div>
</template>

<script>
    import {userLogout} from "@/api";

    export default {
        name: "home",
        data() {
            return {
                title: '主页',
                test: 'hhhhhhh'
            }
        },
        methods: {
            logout() {
                userLogout().then(res => {
                    if (res.code === 200) {
                        this.$message({
                            message: '已退出登录！',
                            type: 'success'
                        });
                        this.$router.push('/login');
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
        }
    }
</script>

<style scoped>

</style>
