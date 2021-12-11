var jqueryScript = document.createElement("script");
jqueryScript.src = "//libs.baidu.com/jquery/1.8.3/jquery.min.js";
jqueryScript.type = "text/javascript";
document.head.appendChild(jqueryScript);

const max = 4, min = 0;

const getList = () => document.querySelectorAll(".js-calendar-graph-svg .ContributionCalendar-day");

/** 获取我的信息 */
async function getMyInfo() {
  console.log(getList());
  const getItemProp = (prop) => document.querySelector(`[itemprop='${prop}']`).innerText;
  return {
    name: getItemProp("name"),
    additionalName: getItemProp("additionalName"),
    worksFor: getItemProp("worksFor"),
    homeLocation: getItemProp("homeLocation"),
    url: getItemProp("url"),
    avatar: document.querySelector(".avatar-user").getAttribute("src"),
    list: Array.from(getList()).map(item => item.getAttribute("data-level")),
  };
}

/** 随机生成绿格子 */
async function set(list) {
  Array.from(getList()).forEach((item, index) => {
    item.setAttribute("data-level", list[index]);
  });
}

const actions = {
  getMyInfo,
  set,
};


chrome.extension.onMessage.addListener(async (req, _, send) => {
  if (actions[req.action]) {
    send({
      status: true,
      value: await actions[req.action](req.value),
    });
    return;
  }
  send({ status: false });
});
