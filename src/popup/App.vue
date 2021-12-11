<template>
  <div class="user-layout">
    <div class="sidebar">
      <div class="profile">
        <img class="avatar" :src="user.avatar" />
        <span class="name">{{ user.name }}</span>
        <span class="additionalName">{{ user.additionalName }}</span>
        <span class="worksFor">{{ user.worksFor }}</span>
        <span class="homeLocation">{{ user.homeLocation }}</span>
        <span class="url">{{ user.url }}</span>
      </div>

      <div class="action">
        <el-row>
          <el-button type="success" @click="randomlyGenerated"
            >随机生成绿格子</el-button
          >
        </el-row>
        <el-row>
          <el-button @click="reset">恢复默认</el-button>
        </el-row>

        <!--
        <el-row>
          <el-button>随机生成绿格子</el-button>
        </el-row>
        <el-row>
          <el-button>随机生成绿格子</el-button>
        </el-row> -->
      </div>
    </div>

    <div class="panel">
      <el-card>
        <el-row type="flex" justify="space-between" align="center">
          <el-col :span="16">
            <el-slider v-model="range" range show-stops :min="0" :max="4">
            </el-slider>
          </el-col>
          <el-col :span="6">
            <el-button @click="generated"
              >根据范围生成({{ range[0] }}-{{ range[1] }})</el-button
            >
          </el-col>
        </el-row>

        <el-row type="flex" justify="space-between" align="center">
          <el-col :span="16">
            <el-input v-model="fillStr"></el-input>
          </el-col>
          <el-col :span="6" style="display: flex; align-items: center">
            <el-button @click="generatedStr">生成文字</el-button>
          </el-col>
        </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { printStr } from "../utils/generated";
import { sendMessage } from "../utils/message";
import { randomNum } from "../utils/random";

export default {
  name: "App",
  data() {
    return {
      user: {},
      fillStr: "",
      range: [1, 4],
      state: {
        isLoading: false,
      },
    };
  },
  created() {
    this.getMyInfo();
  },
  methods: {
    /**
     * 获取单据数据
     */
    async getMyInfo() {
      const result = await sendMessage("getMyInfo");
      console.log(result);
      this.user = result.value;
      if (!this.$ls.get(`${this.user.additionalName}-list`))
        this.$ls.set(
          `${this.user.additionalName}-list`,
          result.value.list,
          24 * 60 * 60 * 1000
        );
    },
    reset() {
      sendMessage("set", this.$ls.get(`${this.user.additionalName}-list`));
    },
    randomlyGenerated() {
      sendMessage(
        "set",
        this.user.list.map(() => randomNum(0, 4))
      );
    },
    generated() {
      sendMessage(
        "set",
        this.user.list.map(() => randomNum(...this.range))
      );
    },
    generatedStr() {
      sendMessage("set", printStr({ fillStr: this.fillStr }));
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  width: 800px;
  height: 600px;
  overflow: hidden;
}

.el-row {
  width: 100%;

  &:not(:first-child) {
    margin-top: 14px;
  }
}

.el-button {
  width: 100%;
}

.user-layout {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;

  .sidebar {
    padding: 10px;
    background-color: #efefef40;
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .profile {
      display: flex;
      align-items: center;
      flex-direction: column;
      font-size: 16px;

      & .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }

      & .name {
        margin-top: 10px;
        font-size: 1.2em;
        font-weight: bold;
      }
      & .additionalName,
      & .worksFor,
      & .homeLocation,
      & .url {
        margin-top: 4px;
        color: #999;
        font-size: 0.8em;
      }
    }

    & .action {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  & .panel {
    padding: 10px;
    flex: 1;
    background-color: #fff;
    overflow: auto;
  }
}
</style>
