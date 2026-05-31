class Queue {
    data = [];
    enqueue(x) {
        this.data.push(x);
    }
    dequeue() {
        return this.data.shift();
    }
    empty() {
        if (this.data.length === 0)
            return true;
        return false;
    }
}
const svgNs = "http://www.w3.org/2000/svg";
const circleRaidus = 24; //节点半径
//svg画布位置信息
const svgWidth = 500;
const svgHeight = 700;
const svgRadius = 150;
const cxCanvas = svgWidth / 2;
const cyCanvas = 50 + svgRadius;
//queue渲染位置
const lineUpx = 50;
const lineUpy = 480;
const queueWidth = 400;
const queueHeight = 50;
const rectWidth = 50;
const rectHeight = queueHeight;
//说明文本位置
const introduceX = 250;
const introduceY = 400;
//创建一个MatrixGraph，使nodes为默认值，cnt为nodes数量
function createMatrixGraph(cnt) {
    const nodes = [];
    for (let i = 0; i < cnt; i++)
        nodes.push({ x: 0, y: 0, label: `${i}`, status: "unvisited" });
    const matrix = [];
    for (let i = 0; i < cnt; i++) {
        const row = [];
        for (let j = 0; j < cnt; j++) {
            row.push(0);
        }
        matrix.push(row);
    }
    return {
        nodes,
        matrix,
        cnt,
    };
}
//将MatrixGraph的matrix设置为需要值
function setupMatrixGraph(matrix, graph) {
    getCricleLayout(graph, svgRadius, cxCanvas, cyCanvas);
    graph.matrix = matrix;
}
//将MatrixGraph的nodes的坐标按照圆形布局赋值
function getCricleLayout(graph, radius, cx, cy) {
    const n = graph.cnt;
    for (let i = 0; i < n; i++) {
        const angle = 2 * Math.PI * i / n;
        graph.nodes[i].x = cx + radius * Math.cos(angle);
        graph.nodes[i].y = cy + radius * Math.sin(angle);
    }
}
//在document中生成一个svg，画布大小由svgWidth和svgHeight决定
function createSVG() {
    const svg = document.createElementNS(svgNs, "svg");
    svg.setAttribute("width", `${svgWidth}`);
    svg.setAttribute("height", `${svgHeight}`);
    document.body.appendChild(svg);
}
//在svg中创建一个marker，并在其中写入箭头id=arrow
function createMarker() {
    const svg = document.querySelector("svg");
    if (!svg)
        return;
    const def = document.createElementNS(svgNs, "defs");
    const marker = document.createElementNS(svgNs, "marker");
    marker.setAttribute("id", "arrow");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "8");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "3");
    marker.setAttribute("markerHeight", "3");
    marker.setAttribute("orient", "auto");
    const path = document.createElementNS(svgNs, "path");
    path.setAttribute("d", "M 0 0 L 10 5 L 0 10 Z");
    path.setAttribute("fill", "black");
    marker.appendChild(path);
    svg.appendChild(def);
    def.appendChild(marker);
}
//在svg中创建一个组id=queueGroup其中有队列的lineUp与lineDown
function createQueueInSVG() {
    const svg = document.querySelector("svg");
    const queueGroup = document.createElementNS(svgNs, "g");
    const lineUp = document.createElementNS(svgNs, "line");
    const lineDown = document.createElementNS(svgNs, "line");
    //lineUp属性初始化
    lineUp.setAttribute("x1", `${lineUpx}`);
    lineUp.setAttribute("y1", `${lineUpy}`);
    lineUp.setAttribute("x2", `${lineUpx + queueWidth}`);
    lineUp.setAttribute("y2", `${lineUpy}`);
    lineUp.setAttribute("stroke", "black");
    lineUp.setAttribute("stroke-width", "4");
    //lineDown属性初始化
    lineDown.setAttribute("x1", `${lineUpx}`);
    lineDown.setAttribute("y1", `${lineUpy + queueHeight}`);
    lineDown.setAttribute("x2", `${lineUpx + queueWidth}`);
    lineDown.setAttribute("y2", `${lineUpy + queueHeight}`);
    lineDown.setAttribute("stroke", "black");
    lineDown.setAttribute("stroke-width", "4");
    //queueGroup属性初始化
    queueGroup.setAttribute("id", "queueGroup");
    queueGroup.appendChild(lineUp);
    queueGroup.appendChild(lineDown);
    svg?.appendChild(queueGroup);
}
function createIntroduceInSVG() {
    const svg = document.querySelector("svg");
    const introduce = document.createElementNS(svgNs, "text");
    introduce.setAttribute("x", `${introduceX}`);
    introduce.setAttribute("y", `${introduceY}`);
    introduce.setAttribute("font-size", "30");
    introduce.setAttribute("font-family", "Arial");
    introduce.setAttribute("text-anchor", "middle");
    introduce.setAttribute("id", "introduce");
    introduce.textContent = ``;
    svg?.appendChild(introduce);
}
//将MatrixGraph渲染到svg中节点id为对应节点下标，线段号为发出节点号-指向节点号
function applyMatrixGraph(graph) {
    const svg = document.querySelector("svg");
    if (!svg)
        return;
    //画线
    for (let i = 0; i < graph.cnt; i++) {
        for (let j = 0; j < graph.cnt; j++) {
            if (graph.matrix[i][j] === 1) {
                const line = document.createElementNS(svgNs, "line");
                let x1 = graph.nodes[i].x;
                let y1 = graph.nodes[i].y;
                let x2 = graph.nodes[j].x;
                let y2 = graph.nodes[j].y;
                let hypotenuse = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                let x3 = x2 + circleRaidus * (x1 - x2) / hypotenuse;
                let y3 = y2 + circleRaidus * (y1 - y2) / hypotenuse;
                line.setAttribute("x1", `${x1}`);
                line.setAttribute("y1", `${y1}`);
                line.setAttribute("x2", `${x3}`);
                line.setAttribute("y2", `${y3}`);
                line.setAttribute("stroke", "black");
                line.setAttribute("stroke-width", "4");
                line.setAttribute("marker-end", "url(#arrow)");
                line.setAttribute("id", `${i}-${j}`);
                svg.appendChild(line);
            }
        }
    }
    for (let i = 0; i < graph.cnt; i++) {
        //节点
        const node = document.createElementNS(svgNs, "circle");
        node.setAttribute("cx", `${graph.nodes[i]?.x}`);
        node.setAttribute("cy", `${graph.nodes[i]?.y}`);
        node.setAttribute("r", `${circleRaidus}`);
        node.setAttribute("id", `${i}`);
        node.classList.add("node");
        //文本
        const label = document.createElementNS(svgNs, "text");
        label.setAttribute("x", `${graph.nodes[i]?.x}`);
        label.setAttribute("y", `${graph.nodes[i]?.y}`);
        label.setAttribute("font-size", "20");
        label.setAttribute("font-family", "Arial");
        label.setAttribute("text-anchor", "middle");
        label.textContent = `${i}`;
        //绘制
        svg.appendChild(node);
        svg.appendChild(label);
    }
}
//type bfsStep = {action:"enqueue",nodeId:number}|{action:"dequeue",nodeId:number}|{action:"visit",nodeId:number}|{action:"check",nodeId:number,}
//用于将step快速的加入stepQueue
function bfsStepPush(stepQueue, action, nodeId) {
    //if(stepQueue === null) return ;
    stepQueue.push({ action, nodeId });
}
//完成bfs所有步骤并且存到stepQueu中
function bfsMatrixGraph(graph, stepQueue) {
    const visited = new Array(graph.cnt).fill(false);
    const queue = new Queue();
    bfsStepPush(stepQueue, "visit", 0);
    visited[0] = true;
    bfsStepPush(stepQueue, "enqueue", 0);
    queue.enqueue(0);
    while (queue.empty() === false) {
        const u = queue.dequeue();
        if (u === undefined)
            continue;
        bfsStepPush(stepQueue, "dequeue", u);
        bfsStepPush(stepQueue, "check", u);
        for (let i = 0; i < graph.cnt; i++) {
            if (graph.matrix[u][i] === 1 && visited[i] === false) {
                bfsStepPush(stepQueue, "visit", i);
                visited[i] = true;
                bfsStepPush(stepQueue, "enqueue", i);
                queue.enqueue(i);
            }
        }
    }
}
//执行stepQueue的下一步
function applyBfsStep(stepQueue, stepIndex) {
    const svg = document.querySelector("svg");
    const node = svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}`);
    const nodes = svg?.querySelectorAll("rect");
    const texts = svg?.getElementById("queueGroup")?.querySelectorAll("text");
    const introduce = svg?.getElementById("introduce");
    if (stepIndex >= stepQueue.length) {
        introduce.textContent = "算法结束";
        return stepQueue.length;
    }
    switch (stepQueue[stepIndex]?.action) {
        case "enqueue":
            introduce.textContent = `节点${stepQueue[stepIndex]?.nodeId}入队`;
            let x = lineUpx + queueWidth - (nodes.length + 1) * rectWidth;
            let y = lineUpy;
            const rect = document.createElementNS(svgNs, "rect");
            rect.setAttribute("x", `${x}`);
            rect.setAttribute("y", `${y}`);
            rect.setAttribute("width", `${rectWidth}`);
            rect.setAttribute("height", `${rectHeight}`);
            rect.setAttribute("stroke", "black");
            rect.setAttribute("fill", "none");
            rect.setAttribute("stroke-width", "4");
            rect.setAttribute("id", `${stepQueue[stepIndex]?.nodeId}_rect`);
            const text = document.createElementNS(svgNs, "text");
            text.setAttribute("x", `${x + rectWidth / 2}`);
            text.setAttribute("y", `${y + rectHeight / 2}`);
            text.setAttribute("font-size", "20");
            text.setAttribute("font-family", "Arial");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("id", `${stepQueue[stepIndex]?.nodeId}_id`);
            text.textContent = `${stepQueue[stepIndex]?.nodeId}`;
            document.getElementById("queueGroup").appendChild(rect);
            document.getElementById("queueGroup").appendChild(text);
            break;
        case "dequeue":
            introduce.textContent = `节点${stepQueue[stepIndex]?.nodeId}出队`;
            node?.classList.remove("current");
            node?.classList.add("visited");
            nodes?.forEach((el) => {
                if (Number(el.getAttribute("x")) + rectWidth < lineUpx + queueWidth)
                    el.setAttribute("x", `${Number(el.getAttribute("x")) + rectWidth}`);
                else
                    el.remove();
            });
            texts?.forEach((el) => {
                if (Number(el.getAttribute("x")) + rectWidth < lineUpx + queueWidth)
                    el.setAttribute("x", `${Number(el.getAttribute("x")) + rectWidth}`);
                else
                    el.remove();
            });
            break;
        case "check":
            introduce.textContent = `检查节点${stepQueue[stepIndex]?.nodeId}的相邻并且未被访问的节点`;
            break;
        case "visit":
            introduce.textContent = `访问节点${stepQueue[stepIndex]?.nodeId}`;
            node?.classList.remove("unvisited");
            node?.classList.add("current");
            break;
        default:
            break;
    }
    return stepIndex + 1;
}
function reverseBfsStepstepQueue(stepQueue, stepIndex) {
    if (stepIndex <= 0)
        return 0;
    stepIndex -= 1;
    const svg = document.querySelector("svg");
    const node = svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}`);
    const nodes = svg?.querySelectorAll("rect");
    const texts = svg?.getElementById("queueGroup")?.querySelectorAll("text");
    const introduce = svg?.getElementById("introduce");
    switch (stepQueue[stepIndex]?.action) {
        case "enqueue":
            //队列回退
            svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}_rect`)?.remove();
            svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}_id`)?.remove();
            break;
        case "dequeue":
            //队列回退
            nodes?.forEach((el) => { el.setAttribute("x", `${Number(el.getAttribute("x")) - rectWidth}`); });
            texts?.forEach((el) => { el.setAttribute("x", `${Number(el.getAttribute("x")) - rectWidth}`); });
            const rect = document.createElementNS(svgNs, "rect");
            rect.setAttribute("x", `${lineUpx + queueWidth - rectWidth}`);
            rect.setAttribute("y", `${lineUpy}`);
            rect.setAttribute("width", `${rectWidth}`);
            rect.setAttribute("height", `${rectHeight}`);
            rect.setAttribute("stroke", "black");
            rect.setAttribute("fill", "none");
            rect.setAttribute("stroke-width", "4");
            rect.setAttribute("id", `${stepQueue[stepIndex]?.nodeId}_rect`);
            const text = document.createElementNS(svgNs, "text");
            text.setAttribute("x", `${lineUpx + queueWidth - rectWidth + rectWidth / 2}`);
            text.setAttribute("y", `${lineUpy + rectHeight / 2}`);
            text.setAttribute("font-size", "20");
            text.setAttribute("font-family", "Arial");
            text.setAttribute("text-anchor", "middle");
            text.setAttribute("id", `${stepQueue[stepIndex]?.nodeId}_id`);
            text.textContent = `${stepQueue[stepIndex]?.nodeId}`;
            document.getElementById("queueGroup").appendChild(rect);
            document.getElementById("queueGroup").appendChild(text);
            //节点状态回退
            node?.classList.remove("visited");
            node?.classList.add("current");
            break;
        case "check":
            break;
        case "visit":
            //节点状态回退
            node?.classList.remove("current");
            node?.classList.add("unvisited");
            break;
        default:
            break;
    }
    //说明文本回退
    if (stepIndex - 1 < 0)
        introduce.textContent = "";
    else
        switch (stepQueue[stepIndex - 1]?.action) {
            case "enqueue":
                introduce.textContent = `节点${stepQueue[stepIndex - 1]?.nodeId}入队`;
                break;
            case "dequeue":
                introduce.textContent = `节点${stepQueue[stepIndex - 1]?.nodeId}出队`;
                break;
            case "check":
                introduce.textContent = `检查节点${stepQueue[stepIndex - 1]?.nodeId}的相邻并且未被访问的节点`;
                break;
            case "visit":
                introduce.textContent = `访问节点${stepQueue[stepIndex - 1]?.nodeId}`;
                break;
            default:
                break;
        }
    return stepIndex;
}
//延迟一段时间
function wait(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms); });
}
//执行stepQueue中剩余的所有步骤
async function applyAllBfsStep(stepQueue, stepIndex, ms) {
    const svg = document.querySelector("svg");
    const introduce = svg?.getElementById("introduce");
    while (stepIndex < stepQueue.length) {
        stepIndex = applyBfsStep(stepQueue, stepIndex);
        await wait(ms);
    }
    if (stepIndex >= stepQueue.length) {
        introduce.textContent = "算法结束";
    }
    return stepQueue.length;
}
function addBntListenerBfsMatrixGraph() {
    const bntNext = document.getElementById("btn-next");
    const bntAll = document.getElementById("btn-all");
    const bntLast = document.getElementById("btn-last");
    bntNext?.addEventListener("click", () => { stepIndex = applyBfsStep(stepQueue, stepIndex); });
    bntAll?.addEventListener("click", async () => { stepIndex = await applyAllBfsStep(stepQueue, stepIndex, ms); });
    bntLast?.addEventListener("click", () => { stepIndex = reverseBfsStepstepQueue(stepQueue, stepIndex); });
}
const matrix1 = [
    [0, 1, 1, 0, 0],
    [1, 0, 1, 1, 0],
    [1, 1, 0, 0, 1],
    [0, 1, 0, 0, 1],
    [0, 0, 1, 1, 0]
];
let matrixGraph = createMatrixGraph(5);
// const matrix1:number[][] = [
//  [0,1,1,1,0,0,0,0],
//  [1,0,1,0,1,0,0,1],
//  [1,1,0,0,1,1,1,1],
//  [1,0,0,0,1,0,0,1],
//  [0,1,1,1,0,0,1,1],
//  [0,0,1,0,0,0,0,0],
//  [0,0,1,0,1,0,0,0],
//  [0,1,1,1,1,0,0,0]
// ];
// let matrixGraph : MatrixGraph = createMatrixGraph(8);
setupMatrixGraph(matrix1, matrixGraph);
createSVG();
createMarker();
applyMatrixGraph(matrixGraph);
createQueueInSVG();
createIntroduceInSVG();
const stepQueue = [];
bfsMatrixGraph(matrixGraph, stepQueue);
let stepIndex = 0;
let ms = 1000;
// document.getElementById("btn-next")!.addEventListener("click", () => {
//   stepIndex = applyBfsStep(stepQueue, stepIndex);
// });
addBntListenerBfsMatrixGraph();
export {};
//# sourceMappingURL=ts.js.map