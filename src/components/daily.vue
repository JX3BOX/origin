<template>
    <div class="m-daily m-sideblock">
        <div class="m-daily-header m-sideblock-header">
            <div class="u-time">{{ year }}年{{ month }}月{{ date }}日</div>
            <img class="u-wechat" src="../assets/img/right/qrcode.png" alt="" />
            <div class="u-list">
                <span class="u-weibo u-item">
                    <img svg-inline src="../assets/img/weibo.svg" />
                    <em>官方微博：</em>
                    <a href="https://weibo.com/jx3box" target="_blank"
                        ><b>JX3BOX魔盒</b></a
                    >
                </span>
                <span class="u-weixin u-item">
                    <img svg-inline src="../assets/img/wechat.svg" />
                    <em>微信公众号：</em>
                    <b>JX3BOX</b>
                </span>
            </div>
        </div>
        <div class="m-daily-content">
            <table>
                <thead>
                    <tr>
                        <th>活动</th>
                        <th>区服</th>
                        <th>项目</th>
                    </tr>
                </thead>
                <tbody><tr><td colspan="3">
                    <div class="u-placeholder">
                        <p>❤️ 江湖又见，不负初心</p>
                        <p>魔盒怀旧服交流群1：<a href="https://jq.qq.com/?_wv=1027&k=mONxoPba" target="_blank">590349918</a></p>
                        <p>魔盒怀旧服交流群2：<a href="https://jq.qq.com/?_wv=1027&k=lBwsZ1aM" target="_blank">1061529946</a></p>
                    </div>
                </td></tr></tbody>
                <!-- <tbody>
                    <tr v-for="(item, i) in daily" :key="i">
                        <td>{{ item.type }}</td>
                        <td>{{ item.zone }}</td>
                        <td>{{ item.name }}</td>
                    </tr>
                    <tr>
                        <td>美人图</td>
                        <td>
                            <el-select
                                v-model="server"
                                placeholder="区服"
                                size="mini"
                                class="u-select-meirentu"
                            >
                                <el-option
                                    v-for="item in servers"
                                    :key="item"
                                    :label="item"
                                    :value="item"
                                >
                                </el-option>
                            </el-select>
                        </td>
                        <td>
                            <el-tooltip
                                class="item"
                                effect="dark"
                                :content="meirentu && meirentu.desc || '无'"
                                placement="bottom"
                            >
                                <div>{{
                                    meirentu && meirentu.name || "今日暂无画像"
                                }}</div>
                            </el-tooltip>
                        </td>
                    </tr>
                </tbody> -->
            </table>
        </div>
    </div>
</template>

<script>
import { getDaily } from "@/service/spider";
import { getMeirentu } from "@/service/spider";
import servers from "@jx3box/jx3box-data/data/server/server_cn.json";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "daily",
    props: [],
    data: function() {
        return {
            year: "",
            month: "",
            date: "",

            daily: [],

            meirentu: "",
            servers,
            server: "",
        };
    },
    computed: {
        default_server: function() {
            return this.$store.state.server;
        },
    },
    methods: {
        initDate: function() {
            let dt = new Date();
            this.year = dt.getFullYear();
            this.month = dt.getMonth() + 1;
            this.date = dt.getDate();
        },
        loadDaily: function() {
            let dt = new Date();
            let hour = dt.getHours();
            let q;
            if (hour > 0 && hour < 9) {
                q = ~~((Date.now() - 86400000) / 1000);
            } else {
                q = ~~(Date.now() / 1000);
            }

            getDaily(q).then((res) => {
                let list = res.data.data;
                list.forEach((item) => {
                    if (item.taskType == "大战") {
                        this.daily.push({
                            type: "大战",
                            zone: "全服",
                            name: item.activityName.slice(3, -1),
                        });
                    } else {
                        this.daily.push({
                            type: "战场",
                            zone: "全服",
                            name: item.activityName.slice(3),
                        });
                    }
                });
            });
        },
        loadMeirentu: function() {
            getMeirentu(this.server).then((res) => {
                this.meirentu = res.data.data;
            });
        },
    },
    mounted: function() {
        this.server = this.default_server;
        this.initDate();
        // this.loadDaily();
        // this.loadMeirentu();
    },
    // watch: {
    //     server: function(val) {
    //         val && this.loadMeirentu();
    //     },
    // },
};
</script>

<style lang="less">
@import "../assets/css/daily.less";
</style>
