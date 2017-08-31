<style scoped>

</style>

<template>
    <Row type="flex" justify="center" align="middle" style="min-height:600px;">
        <Card style="width: 520px;">
            <p slot="title">用户登录</p>
            <Form ref="formItem" :model="formItem" :rules="ruleItem" :label-width="80">
                <Form-item label="用户名" prop="username">
                    <Input autofocus type="text" v-model="formItem.username"></Input>
                </Form-item>
                <Form-item label="密码" prop="password">
                    <Input type="password" v-model="formItem.password"></Input>
                </Form-item>
                <Form-item>
                    <Button html-type="submit" type="primary" @click="handleSubmit('formItem')">登录</Button>
                </Form-item>
            </Form>
        </Card>
    </Row>
</div>

</template>
<script>
    import Auth from '../libs/auth';
    export default {
        data () {
            return {
                formItem: {
                    username: '',
                    password: ''
                },
                ruleItem: {
                    username: [
                        { required: true, message: '请填写用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' },
                        { type: 'string', min: 3, message: '密码长度不能小于3位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.login()
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },

            login() {
                var $this = this;
                this.$http.post(window.apiDomain+ '/api/login', this.formItem)
                    .then((response) => {
                        let ret = response.body;
                        if(ret.code !== 1000){
                            this.$Message.error(ret.message);
                            return;
                        }
                        var token = ret.data.token;

                        window.localStorage.setItem('token', token);
                        //获取用户基本信息
                        var headers = {Authorization: 'Bearer ' + token}
                        this.$http.get(window.apiDomain+ '/api/users/show',{headers:headers}).then((response) => {
                            let ret = response.body;
                            if(ret.code === 1000){
                                //设置登录状态
                                Auth.login(token, ret.data)
                                //提示登录信息
                                this.$Message.success({
                                    content:ret.message,
                                    onClose:function(){
                                        $this.$router.push({ path: "/" });
                                    }
                                 });
                            }
                        }, response => {
                            console.log(response);
                        });
                    }, response => {
                        console.log(response);
                    });
            }
        }
    }
</script>

