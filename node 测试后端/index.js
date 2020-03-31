let express = require("express");

// body-parser是单独安装的
let bodyParser = require("body-parser");

var app = express();
app.set("port", process.env.PORT || 3000);
// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
// parse application/json
app.use(bodyParser.json());

// 响应login查询
app.get("/login", function(req, res) {
  try {
    res.status(200).send({ sessionId: "test" });
  } catch (e) {
    console.log(e);
  }
});

// 响应square查询
app.get("/square", function(req, res) {
  try {
    res.status(200).json({
      data: [
        {
          cardId: 11,
          imageUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLwQEKO0zW4Fw7pjMzs0lI0ZWWj9xywQEeAKvOH4SheDVibo4Q1KC1kxicrSO0QHFrorT4zoHkONUVQ/132",
          nickName: "肖凌志",
          cardTime: "2019年12月3日",
          cardTitle: "腾讯测试开发实习",
          cardContent:
            "在腾讯签了一年半实习合同，每天加班到十一点，一周上七天班，我感觉很充实",
          cardSupportCount: 20,
          cardCommentCount: 30
        },
        {
          cardId: 12,
          imageUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epgnG5RAEBneYj28SDI1eyf67JCCYgkibwH0FF2cuJvgEicIlibzxWic6lBhUcmGTXzWDOG1CTJVMm8kA/132",
          nickName: "张澜潇",
          cardTime: "2019年12月3日",
          cardTitle: "2019网络技术国家级一等奖",
          cardContent: "队友给力，躺着躺着就拿奖了，我爱了",
          cardSupportCount: 20,
          cardCommentCount: 30
        },
        {
          cardId: 13,
          imageUrl:
            "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKPPFbkWCFlygnhkGRpk7IcLibE2mn88gq7gOo28qpcwZGiczoia3Jp4ibyhwCRD3bussBXB3weJBdKDg/132",
          nickName: "何睿",
          cardTime: "2019年12月3日",
          cardTitle: "2019微信小游戏开发赛国家级三等奖",
          cardContent: "大家快来玩我们开发的小游戏呀",
          cardSupportCount: 20,
          cardCommentCount: 30
        }
      ]
    });
  } catch (e) {
    console.log(e);
  }
});

// 响应information/savePersonalInfo请求
app.post("/information/savePersonalInfo", function(req, res) {
  try {
    console.log(...Object.keys(req.body));
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(e);
  }
});

// 响应information/getPersonalInfo请求
app.get("/information/getPersonalInfo", function(req, res) {
  try {
    res.status(200).json({
      data: {
        name: "张澜潇",
        telephone: "13541661319",
        email: "1256925921@qq.com",
        personalSite: "hilanxiao.top",
        personalGit: "2017221302019@std.uestc.edu.cn",
        introduction: "一只默默无闻的前端小菜鸡"
      }
    });
  } catch (e) {
    console.log(e);
  }
});

// 响应information/saveSchoolInfo请求
app.post("/information/saveSchoolInfo", function(req, res) {
  try {
    console.log(req.body);
    res.status(200).send({ status: "ok" });
  } catch (e) {
    console.log(e);
  }
});

// 响应information/getSchoolInfo请求
app.get("/information/getSchoolInfo", function(req, res) {
  try {
    res.status(200).json({
      data: {
        university: "电子科技大学",
        college: "信息与软件工程学院",
        major: "软件工程（互联网安全）",
        gradeIndex: 1,
        degreeIndex: 1
      }
    });
  } catch (e) {
    console.log(e);
  }
});

// 设置好端口并文字提示
app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
