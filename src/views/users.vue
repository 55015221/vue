<style scoped>
    .form-search {
        margin-bottom: 10px;
    }
    .pagination {
        margin-top: 20px;
        float: right;
    }
</style>
<template>
    <Row>
        <Card shadow class="form-search">
            <Form ref="formSearch" :model="formSearch" :rules="ruleSearch" label-position="right" :label-width="120" inline>
                <Form-item label="用户ID" prop="uid">
                    <Input v-model="formSearch.uid"></Input>
                </Form-item>
                <Form-item label="用户名" prop="username">
                    <Input v-model="formSearch.username"></Input>
                </Form-item>
                <Form-item label="注册时间" prop="">
                    <Row>
                        <Col span="11">
                            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.dateStart"></Date-picker>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <Date-picker type="date" placeholder="选择日期" v-model="formSearch.dateEnd"></Date-picker>
                        </Col>
                    </Row>
                </Form-item>
                <Button type="primary" icon="ios-search" @click="search('formSearch')">搜索</Button>
            </Form>
        </Card>
        <Table :columns="columns" :data="gridData"></Table>
        <Page class="pagination" :total="total" :current="current" :page-size="pageSize" @on-change="pageChange" show-elevator show-total></Page>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                formSearch: {
                    uid: '',
                    username: '',
                    dateStart: '',
                    dateEnd: ''
                },
                ruleSearch: {
                    uid: [],
                    username: [],
                    dateStart: [],
                    dateEnd: []
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
                        key: 'username'
                    },
                    {
                        title: '用户ID',
                        key: 'id'
                    },
                    {
                        title: '邮箱',
                        key: 'email'
                    },
                    {
                        title: '状态',
                        width: 300,
                        key: 'statusText'
                    },
                    {
                        title: '注册时间',
                        key: 'created_at'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                total: 0,
                current: 1,
                pageSize: 15,
                gridData: [],
            }
        },
        created: function () {
            this.getData()
        },
        mounted: function () {
        },
        methods: {
            getData (search) {
                this.current = 1;
                this.$http.get(window.apiDomain+ '/api/users?page='+this.current, {params: search}).then(response => {
                     let ret = response.body
                     if(1000 !== ret.code){
                        this.$Message.error(ret.message);
                     }

                     this.total = ret.data.total
                     this.current = ret.data.current_page
                     this.gridData = ret.data.data

                }, response => {
                    console.log('error callback');
                    console.log(response);
                });
            },
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `
                        用户ID：${this.data[index].id}<br>
                        用户名：${this.data[index].username}<br>
                        邮箱：${this.data[index].email}<br>
                        状态：${this.data[index].statusText}<br>
                        注册时间：${this.data[index].created_at}
                    `
                })
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            pageChange (index) {
                this.current = index
                this.getData()
            },
            search (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.getData(this.formSearch)
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
