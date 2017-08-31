<style scoped>
    .pagination {
        margin-top: 20px;
        float: right;
    }
</style>
<template>
    <Row>
        <Card>
            <Form ref="formSearch" :model="formSearch" :rules="ruleSearch" label-position="right" :label-width="120" inline>
                <Form-item label="用户ID" prop="uid">
                    <Input v-model="formSearch.uid"></Input>
                </Form-item>
                <Form-item label="用户名" prop="username">
                    <Input v-model="formSearch.username"></Input>
                </Form-item>
                <Form-item label="访问地址" prop="url">
                    <Input style="width:300px;" v-model="formSearch.url"></Input>
                </Form-item>
                <Form-item label="响应状态" prop="code">
                    <Input v-model="formSearch.code"></Input>
                </Form-item>
                <Form-item label="日期控件" prop="">
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
        <Table :columns="columns" :data="data"></Table>
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
                    url: '',
                    code: '',
                    dateStart: '',
                    dateEnd: ''
                },
                ruleSearch: {
                    uid: [],
                    username: [],
                    url: [],
                    code: [],
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
                        key: 'uid'
                    },
                    {
                        title: '用户IP',
                        key: 'ip'
                    },
                    {
                        title: '访问地址',
                        width: 300,
                        key: 'url'
                    },
                    {
                        title: '访问类型',
                        key: 'method'
                    },
                    {
                        title: '访问时间',
                        key: 'created_at'
                    },
                    {
                        title: '浏览器类型',
                        key: 'browser'
                    },
                    {
                        title: '响应状态',
                        key: 'code'
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
                data: [],
            }
        },
        mounted: function () {
            this.getData()
        },
        methods: {
            getData (search) {
                this.current = 1;
                this.$http.get(window.apiDomain+ '/api/access_records?page='+this.current, {params: search}).then(response => {
                     //console.log(response);
                     let ret = response.body
                     let accessRecords = ret.data

                     this.total = accessRecords.total
                     this.current = accessRecords.current_page
                     this.data = accessRecords.data

                }, response => {
                    console.log('error callback');
                    console.log(response);
                });
            },
            show (index) {
                this.$Modal.info({
                    title: '用户信息',
                    content: `
                        用户ID：${this.data[index].uid}<br>
                        用户名：${this.data[index].username}<br>
                        用户IP：${this.data[index].ip}<br>
                        访问地址：${this.data[index].url}<br>
                        访问时间：${this.data[index].created_at}
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
                        this.$Message.success('提交成功!');
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
