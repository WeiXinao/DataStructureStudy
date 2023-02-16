/**
 * 解析歌词字符串
 * 得到一个歌词对象的数组
 * 歌词对象的格式：
 * { time: 开始时间, words: 歌词内容 }
 */
function parseLrc() {
    var lines = lrc.split('\n');
    var result = [];
    for (var i = 0; i < lines.length; i++) {
        var str = lines[i];
        var parts = str.split(']');
        var timeStr = parts[0].substring(1); 
        obj = {
            time: parseTimeStr(timeStr),
            words: parts[1]
        }   
        result.push(obj);
    }
    return result;
}

/**
 * 将一个时间字符串解析为数字（秒）
 * @param {String} timeStr 时间字符串 
 * @returns 时间数值
 */
function parseTimeStr(timeStr) { 
    var parts = timeStr.split(':');
    /* 注意：这里的parts[1]前面要多加一个 "+" 号，即+parts[1]，表示将字符串转化为数字 */
    return +parts[0] * 60 + +parts[1];
}

var lrcData = parseLrc();

// 获取需要的 dom
var doms = {
    audio: document.querySelector('audio'),
    ul: document.querySelector('.container ul'),
    container: document.querySelector('.container'),
};

/**
 * 计算出，在当前播放器播放到第几秒的情况下
 * lrcData数组中，应该高亮显示的歌词下标
 * 如果没有任何一句歌词需要显示，则得到 -1
 * @returns 应该高亮显示的歌词下标
 */
function findIndex() {
    // 播放器当前时间
    var currTime = doms.audio.currentTime;
    for (var i = 0; i < lrcData.length; i++) {
        if (lrcData[i].time > currTime) 
            return i - 1;  
    }  
    // 找遍了都没找到，（说明播放到最后一句）
    return lrcData.length - 1;
}

// 界面
/**
 * 创建歌词元素 li
 */
function createLrcElements() {
    var frag = document.createDocumentFragment(); // 文档片段
    for (var i = 0; i < lrcData.length; i++) {
        var li = document.createElement('li');
        li.textContent = lrcData[i].words;
        frag.appendChild(li); // 改动了 dom 树
    }
    doms.ul.appendChild(frag);
}

createLrcElements();

// 容器高度
var containerHeight = doms.container.clientHeight;
// 每个 li 的高度
var liHeight = doms.ul.children[0].clientHeight;
// 最大偏移量
var maxOffset = doms.ul.clientHeight - containerHeight;

/**
 * 设置 ul 元素的偏移量
 */
function setOffset() {
    var index = findIndex();
    var offset = liHeight * index + liHeight / 2 - containerHeight / 2;
    if (offset < 0) {
        offset = 0;
    }
    if (offset > maxOffset) {
        offset = maxOffset;
    }
    doms.ul.style.transform = `translateY(-${offset}px)`

    /* 去掉之前的 active 样式 */
    var active = doms.ul.querySelector('.active');
    if (active) {
        active.classList.remove('active')
    }

    var li = doms.ul.children[index];
    if (li) {
        li.classList.add('active');
    }
}

doms.audio.addEventListener('timeupdate', setOffset);