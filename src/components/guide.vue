<template>
    <div class="m-guide m-sideblock">
        <div class="m-guide-header m-sideblock-header">
            <i class="el-icon-discover"></i>
            <span class="u-title">门派指南</span>
            <a href="/bps" class="u-more" target="_blank" rel="noopener noreferrer" title="查看全部">
                <i class="el-icon-more"></i>
            </a>
        </div>
        <div class="m-guide-content m-guide-bps">
            <div class="u-guide-block u-guide-bps">
                <!-- 110级 - 全门派指南 -->
                <template v-if="menu_groups['guide-bps-kungfu-origin']">
                    <h5
                        class="u-title u-border-top-none"
                    >全门派指南</h5>
                    <div class="u-list">
                        <a
                            v-for="(menu, key) in menu_groups[
                                'guide-bps-kungfu-origin'
                            ].menus"
                            :key="key"
                            :href="menu.link"
                            target="_blank"
                            :style="{color:menu.color}"
                        >
                            <img :src="menu.icon | xfIcon" />
                            <template v-if="menu.color">
                                <b v-html="menu.label"></b>
                            </template>
                            <template v-else>
                                <span v-html="menu.label"></span>
                            </template>
                        </a>
                    </div>
                </template>
            </div>
            <div class="u-guide-block u-guide-rank">
                <h5 class="u-title u-border-top-none">
                    <a href="/bps/#/ladder" target="_blank">
                        <i class="el-icon-s-data"></i>
                        门派天梯
                    </a>
                </h5>
                <ul>
                    <li v-for="(item, i) in rank" :key="i">
                        <div
                            class="u-item"
                            :style="{
                            width: getRate(item.dps),
                            backgroundColor: xfcolor(item.xf),
                        }"
                            v-if="!~~item.icon"
                        >
                            <img :src="item.xf | xfNameIcon" class="u-pic" />
                            <span class="u-text">
                                {{ item.xf }}
                            </span>
                            <b class="u-dps">{{item.dps}}</b>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getMenuGroups } from "@/service/setting";
import { getSchoolRank } from "@/service/helper";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import xfmap from "@jx3box/jx3box-data/data/xf/xf.json";
export default {
    name: "guide",
    props: [],
    data: function () {
        return {
            menu_groups: {},
            data: [],
            v: "wuhuatianbao", //物华天宝
        };
    },
    computed: {
        maxBase: function () {
            let arr = [];
            this.rank.forEach((item) => {
                arr.push(item.dps);
            });
            return ~~Math.max(...arr);
        },
        rank : function (){
            let data = this.data
            data.sort((a,b) => {
                return ~~(b.dps) - ~~(a.dps)
            })
            return data
        }
    },
    methods: {
        xfcolor: function (val) {
            return xfmap[val]["color"];
        },
        getRate: function (val) {
            return ((val / this.maxBase) * 100).toFixed(2) + "%";
        },
    },
    mounted() {
        getMenuGroups({
            names: ["guide-bps-kungfu-origin"],
        }).then((res) => {
            let data = res.data;
            if (data.code === 200) {
                let output = {};
                for (let i in data.data.data) {
                    let group = data.data.data[i];
                    output[group.name] = group;
                }
                this.menu_groups = output;
            }
        });

        getSchoolRank(this.v).then((res) => {
            this.data = res.data?.data?.group?.items || [];
        });
    },
    filters: {
        xfIcon: function (val) {
            return __imgPath + "/image/xf/" + val + ".png";
        },
        xfNameIcon: function (val) {
            return __imgPath + "image/xf/" + xfmap[val]["id"] + ".png";
        },
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/guide.less";
</style>
