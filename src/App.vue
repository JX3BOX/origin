<template>
    <div id="app">
        <Header client="origin" :overlayEnable="true"></Header>
        <!-- <bg /> -->
        <div class="p-container">
            <div class="m-main">
                <div class="m-primary">
                    <live />
                    <slider />
                    <event />
                    <box />

                    <div class="m-center">
                        <joke />
                        <transaction />
                        
                        <team />
                        
                        
                        <guide />
                        <!-- TODO:剑三直播 -->

                        <face />
                        <newpost />

                        <!-- TODO:表情 -->
                    </div>

                    <div class="m-left">
                        <daily />
                        <jx3code />
                        <gamenews />
                        <servers />
                        <!-- <feedback v-if="!isMobile"/> -->
                        <!-- <price /> -->
                        <!-- TODO:账号同步工具 -->
                        <!-- TODO:APP下载 -->
                    </div>

                    <div class="m-right">
                        <notice />
                        <gossip />
                        <!-- <recommend /> -->
                        <!-- <cjrank /> -->
                        <macrorank />
                        <!-- <jx3datrank /> -->
                        <collectionrank />
                        <examrank />
                        <wikirank />
                        <contact />
                        <feedback v-if="isMobile"/>
                    </div>

                    <Footer></Footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import Bg from "@/components/bg/Bg.vue";
import box from "@/components/box.vue";
import notice from "@/components/notice.vue";
import gossip from "@/components/gossip.vue";
import slider from "@/components/slider.vue";
import event from "@/components/event.vue";
import live from "@/components/live.vue";
import contact from "@/components/contact.vue";
// import activity from "@/components/activity.vue";

import daily from "@/components/daily.vue";
import jx3code from "@/components/jx3code.vue";
import gamenews from "@/components/gamenews.vue";
import servers from "@/components/servers.vue";
import feedback from "@/components/feedback.vue";
import price from "@/components/price.vue";

import macrorank from "@/components/rank_macro.vue";
import jx3datrank from "@/components/rank_jx3dat.vue";
import examrank from "@/components/rank_exam.vue";
import wikirank from "@/components/rank_knowledges.vue";
import cjrank from "@/components/rank_achievements.vue";
import collectionrank from "@/components/rank_collections.vue";
import namespacerank from "@/components/rank_namespaces.vue";
import recommend from "@/components/recommend.vue";

import newpost from "@/components/newpost.vue";
import team from "@/components/team.vue";
import guide from "@/components/guide.vue";
import joke from "@/components/joke.vue";
import face from "@/components/face.vue";
import transaction from "@/components/transaction.vue";

import User from "@jx3box/jx3box-common/js/user";
import { getProfile } from "@/service/user";
import { getConfig } from "@/service/setting.js";
export default {
    name: "App",
    props: [],
    data: function () {
        return {
            isMobile : window.innerWidth < 768
        };
    },
    computed: {},
    methods: {},
    components: {
        // bg: Bg,
        box,
        notice,
        gossip,
        slider,
        event,
        live,
        contact,

        daily,
        jx3code,
        gamenews,
        servers,
        // feedback,
        // price,

        // cjrank,
        macrorank,
        // jx3datrank,
        wikirank,
        collectionrank,
        examrank,
        // namespacerank,
        // recommend,

        newpost,
        team,
        guide,
        joke,
        face,
        transaction,
    },
    created: function () {
        if (User.isLogin()) {
            getProfile().then((data) => {
                if (data) {
                    this.$store.state.server = data.jx3_server;
                }
            });
        }

        getConfig().then((res) => {
            let data = res.data.data;
            let _data = {};
            if (data) {
                data.forEach((item) => {
                    _data[item.key] = item.val;
                });
            }
            this.$store.state.config = _data;
        });

        if (
            location.hostname != "localhost" &&
            location.hostname != "origin.jx3box.com"
        ) {
            location.href = "https://origin.jx3box.com/origin";
        }
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
