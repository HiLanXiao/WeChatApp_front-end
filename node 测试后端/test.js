var express = require("express");
var fs = require("fs");
var path = require("path");
var cors = require("cors");
var history = require('connect-history-api-fallback');
let response = {};
let dataJson = {};
let jsonPath;
const sleep = (seconds, callback) => {
  setTimeout(callback, seconds);
};

// const read = () => {
//   fs.readFileSync(__dirname + "/" + jsonPath, "utf8", function(err, data) {
//     dataJson = JSON.parse(data);
//     console.log("hello", dataJson)
//   });
// };

const read = () => {
  try {
    dataJson = JSON.parse(fs.readFileSync(__dirname + "/" + jsonPath, "utf8"))
  } catch (e) {
    sleep(100, read)
  }
};

// body-parser是单独安装的
var bodyParser = require("body-parser");

var app = express();

// 解决跨域
app.use(cors());

app.set("port", process.env.PORT || 3000);

// parse application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// 解决vue history模式的影响
app.use(history());

// parse application/json
app.use(bodyParser.json());

// 视图的路由
app.use(express.static(path.join(__dirname, "dist")));

// static中间件
app.use(express.static(__dirname + "/public"));

// // 响应初次访问
// app.get('/', function (req, res) {
//     res.sendfile('./public/pages/login.html');
// });

// // 响应登录页面
// app.post('/login', function (req, res) {
//     var userName = req.body.userName;
//     var password = req.body.password;
//     var response = {
//         "url": "http://localhost:3000/pages/homePage.html",
//         "key": "xiaoge"
//     };
//     if (userName == 'admin' && password == 'xiaogezhenshuai') {
//         res.end(JSON.stringify(response));
//     }
// })

// 响应topo页面
app.get("/topo", function(req, res) {
  try {
    jsonPath = "test.json";
    read();
    if (req.query.updatingNumber != dataJson.textObject.updatingNumber) {
      response = {
        status: 1,
        message: "The data has changed",
        data: dataJson
      };
    } else {
      response = {
        status: 0,
        message: "The data hasn't changed",
        data: {}
      };
    }
    res.end(JSON.stringify(response));
    dataJson = null;
    jsonPath = null;
    response = null;
  } catch (e) {
    console.log(e)
    sleep(100, read);
    if (req.query.updatingNumber != dataJson.textObject.updatingNumber) {
      response = {
        status: 1,
        message: "The data has changed",
        data: dataJson
      };
    } else {
      response = {
        status: 0,
        message: "The data hasn't changed",
        data: {}
      };
    }
    res.end(JSON.stringify(response));
    dataJson = null;
    jsonPath = null;
    response = null;
  }
});

// 响应ItemizedStatistics页面
app.get("/itemizedStatistics", function(req, res) {
  try {
    jsonPath = "statisticTest.json";
    read();
    console.log(JSON.stringify(dataJson))
    res.end(JSON.stringify(dataJson));
    dataJson = null;
    jsonPath = null;
    response = null;
  } catch (e) {
    console.log(e)
    sleep(100, read);
    console.log(JSON.stringify(dataJson))
    res.end(JSON.stringify(dataJson));
    dataJson = null;
    jsonPath = null;
    response = null;
  }
});

// 响应OverallStatistics/requestData查询
app.get("/overallStatistics/requestData", function(req, res) {
  try {
    jsonPath = "actualTest.json";
    read();
    response = {
      status: 1,
      message: "Operation Success",
      data: {
        xAxisData: dataJson.optionOne.xAxis.data,
        dataChecked: dataJson.optionOne.legend.dataChecked,
        seriesChecked: dataJson.optionOne.seriesChecked
      }
    };
    res.end(JSON.stringify(response));
    dataJson = null;
    jsonPath = null;
    response = null;
  } catch (e) {
    console.log(e)
    sleep(100, read);
    response = {
      status: 1,
      message: "Operation Success",
      data: {
        xAxisData: dataJson.optionOne.xAxis.data,
        dataChecked: dataJson.optionOne.legend.dataChecked,
        seriesChecked: dataJson.optionOne.seriesChecked
      }
    };
    res.end(JSON.stringify(response));
    dataJson = null;
    jsonPath = null;
    response = null;
  }
});

// 响应OverallStatistics/queryLatest查询
app.get("/overallStatistics/queryLatest", function(req, res) {
  let updatingNumber,
    xAxisData = [],
    legendData = [],
    seriesData = [];
  try {
    jsonPath = "actualTest.json";
    read();
    response = {
      status: 1,
      message: "Operation Success",
      data: {
        xAxisData: dataJson.optionOne.xAxis.data,
        dataChecked: dataJson.optionOne.legend.dataChecked,
        seriesChecked: dataJson.optionOne.seriesChecked
      }
    };
    if (
        req.query.updatingNumber === dataJson.updatingNumber &&
        !req.query.whetherFirst
    ) {
      response = {
        status: 0,
        message: "The data hasn't changed",
        data: {}
      };
    } else {
      updatingNumber = dataJson.updatingNumber;
      xAxisData = dataJson.optionOne.xAxis.data;
      legendData = req.query.queryArray;
      legendData.forEach(item => {
        dataJson.optionOne.legend.dataSelected.forEach((itemSelected, index) => {
          if (itemSelected === item) {
            seriesData.push(dataJson.optionOne.seriesSelected[index]);
          }
        });
      });
      response = {
        status: 1,
        message: "The data has changed",
        data: {
          updatingNumber: updatingNumber,
          xAxisData: xAxisData,
          legendData: legendData,
          seriesData: seriesData,
          whetherFirst: 0
        }
      };
    }
    res.end(JSON.stringify(response));
    dataJson = null;
    jsonPath = null;
    response = null;
  } catch (e) {
    console.log(e)
    sleep(100, read);
    response = {
      status: 1,
      message: "Operation Success",
      data: {
        xAxisData: dataJson.optionOne.xAxis.data,
        dataChecked: dataJson.optionOne.legend.dataChecked,
        seriesChecked: dataJson.optionOne.seriesChecked
      }
    };
    if (
        req.query.updatingNumber === dataJson.updatingNumber &&
        !req.query.whetherFirst
    ) {
      response = {
        status: 0,
        message: "The data hasn't changed",
        data: {}
      };
    } else {
      updatingNumber = dataJson.updatingNumber;
      xAxisData = dataJson.optionOne.xAxis.data;
      legendData = req.query.queryArray;
      legendData.forEach(item => {
        dataJson.optionOne.legend.dataSelected.forEach((itemSelected, index) => {
          if (itemSelected === item) {
            seriesData.push(dataJson.optionOne.seriesSelected[index]);
          }
        });
      });
      response = {
        status: 1,
        message: "The data has changed",
        data: {
          updatingNumber: updatingNumber,
          xAxisData: xAxisData,
          legendData: legendData,
          seriesData: seriesData,
          whetherFirst: 0
        }
      };
    }
    res.end(JSON.stringify(response));
    dataJson = null;
    jsonPath = null;
    response = null;
  }
});

// app.get('/about', function (req, res) {
//     res.render('about', {
//         // 调用了自定义模块的方法
//         fortune: fortune.getFortune()
//     });
// });

/*
// 404 catch-all 处理器（中间件）
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

// 500 错误处理器（中间件）
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});
*/

// 设置好端口并文字提示
app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
