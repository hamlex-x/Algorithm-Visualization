import { CANVAS, GRAPH, SVG } from "../shared/config.js";
import { wait } from "../shared/fn.js";
import type { BfsStep, MatrixGraph } from "../shared/types.js";

//在document中生成一个svg，画布大小由svgWidth和决定
function createSVG(){
  const svg = document.createElementNS(SVG.NAMESPACE,"svg");
  svg.setAttribute("width",`${CANVAS.WIDTH}`);
  svg.setAttribute("height",`${CANVAS.HEIGHT}`);
  document.body.appendChild(svg);
}
//在svg中创建一个marker，并在其中写入箭头id=arrow
function createArrowMarker(){
  const svg = document.querySelector("svg");
  if (!svg) return;
  const def = document.createElementNS(SVG.NAMESPACE,"defs");
  const marker = document.createElementNS(SVG.NAMESPACE,"marker");
  marker.setAttribute("id", "arrow");
  marker.setAttribute("viewBox", "0 0 10 10");
  marker.setAttribute("refX", "8");
  marker.setAttribute("refY", "5");
  marker.setAttribute("markerWidth", "3");
  marker.setAttribute("markerHeight", "3");
  marker.setAttribute("orient", "auto");
  const path = document.createElementNS(SVG.NAMESPACE, "path");
  path.setAttribute("d", "M 0 0 L 10 5 L 0 10 Z");
  path.setAttribute("fill", "black");
  marker.appendChild(path);
  svg.appendChild(def);
  def.appendChild(marker);
}
//在svg中创建一个组id=queueGroup其中有队列的lineUp与lineDown
function renderQueue(){
  const svg = document.querySelector("svg");
  const queueGroup = document.createElementNS(SVG.NAMESPACE,"g");
  const lineUp = document.createElementNS(SVG.NAMESPACE,"line");
  const lineDown = document.createElementNS(SVG.NAMESPACE,"line");
  //lineUp属性初始化
  lineUp.setAttribute("x1",`${GRAPH.QUEUE_X}`);
  lineUp.setAttribute("y1",`${GRAPH.QUEUE_Y}`);
  lineUp.setAttribute("x2",`${GRAPH.QUEUE_X+GRAPH.QUEUE_WIDTH}`);
  lineUp.setAttribute("y2",`${GRAPH.QUEUE_Y}`);
  lineUp.setAttribute("stroke","black")
  lineUp.setAttribute("stroke-width","4");
  //lineDown属性初始化
  lineDown.setAttribute("x1",`${GRAPH.QUEUE_X}`);
  lineDown.setAttribute("y1",`${GRAPH.QUEUE_Y+GRAPH.QUEUE_HEIGHT}`);
  lineDown.setAttribute("x2",`${GRAPH.QUEUE_X+GRAPH.QUEUE_WIDTH}`);
  lineDown.setAttribute("y2",`${GRAPH.QUEUE_Y+GRAPH.QUEUE_HEIGHT}`);
  lineDown.setAttribute("stroke","black")
  lineDown.setAttribute("stroke-width","4");
  //queueGroup属性初始化
  queueGroup.setAttribute("id","queueGroup")
  queueGroup.appendChild(lineUp);
  queueGroup.appendChild(lineDown);
  svg?.appendChild(queueGroup);
}
//在svg中创建一个说明文本
function renderInfoText(){
  const svg = document.querySelector("svg");
  const introduce = document.createElementNS(SVG.NAMESPACE,"text");
  introduce.setAttribute("x",`${GRAPH.INTRODUCE_X}`);
  introduce.setAttribute("y",`${GRAPH.INTRODUCE_Y}`);
  introduce.setAttribute("font-size","30");
  introduce.setAttribute("font-family","Arial");
  introduce.setAttribute("text-anchor","middle");
  introduce.setAttribute("id","introduce");
  introduce.textContent = ``;
  svg?.appendChild(introduce);
}
//将MatrixGraph渲染到svg中节点id为对应节点下标，线段号为发出节点号-指向节点号
function renderGraph(graph:MatrixGraph){
  const svg = document.querySelector("svg");
  if (!svg) return;
  //画线
  for(let i=0;i<graph.cnt;i++){
    for(let j=0;j<graph.cnt;j++){
      if(graph.matrix[i]![j]===1){
        const line = document.createElementNS(SVG.NAMESPACE,"line");
        let x1 = graph.nodes[i]!.x;
        let y1 = graph.nodes[i]!.y;
        let x2 = graph.nodes[j]!.x;
        let y2 = graph.nodes[j]!.y;
        let hypotenuse = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
        
        let x3 = x2 + GRAPH.NODE_RADIUS*(x1-x2)/hypotenuse;
        let y3 = y2 + GRAPH.NODE_RADIUS*(y1-y2)/hypotenuse;
        line.setAttribute("x1",`${x1}`);
        line.setAttribute("y1",`${y1}`);
        line.setAttribute("x2",`${x3}`);
        line.setAttribute("y2",`${y3}`);
        line.setAttribute("stroke","black");
        line.setAttribute("stroke-width","4"); 
        line.setAttribute("marker-end","url(#arrow)")
        line.setAttribute("id",`${i}-${j}`);
        svg.appendChild(line);
      }
    }
  }
  for(let i=0;i<graph.cnt;i++){
    //节点
    const node = document.createElementNS(SVG.NAMESPACE,"circle");
    node.setAttribute("cx",`${graph.nodes[i]?.x}`);
    node.setAttribute("cy",`${graph.nodes[i]?.y}`);
    node.setAttribute("r",`${GRAPH.NODE_RADIUS}`);
    node.setAttribute("id",`${i}`);
    node.classList.add("node");
    //文本
    const label = document.createElementNS(SVG.NAMESPACE,"text");
    label.setAttribute("x",`${graph.nodes[i]?.x}`);
    label.setAttribute("y",`${graph.nodes[i]?.y}`);
    label.setAttribute("font-size","20");
    label.setAttribute("font-family","Arial");
    label.setAttribute("text-anchor","middle");
    label.textContent = `${i}`
   //绘制
    svg.appendChild(node);
    svg.appendChild(label);
  }
}
//执行stepQueue的下一步
function executeBfsStep(stepQueue:BfsStep[],stepIndex:number):number{
  
  const svg = document.querySelector("svg");
  const node = svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}`);
  const nodes = svg?.getElementById("queueGroup")?.querySelectorAll("rect"); 
  const texts = svg?.getElementById("queueGroup")?.querySelectorAll("text");
  const introduce = svg?.getElementById("introduce");
  if(stepIndex >= stepQueue.length) {
    introduce!.textContent = "算法结束";
    return stepQueue.length;
  }
  switch (stepQueue[stepIndex]?.action){
    case "enqueue":
      introduce!.textContent = `节点${stepQueue[stepIndex]?.nodeId}入队`;
      let x = GRAPH.QUEUE_X+nodes!.length*GRAPH.QUEUE_CELL_WIDTH;
      let y = GRAPH.QUEUE_Y;
      const rect = document.createElementNS(SVG.NAMESPACE,"rect");
      rect.setAttribute("x",`${x}`);
      rect.setAttribute("y",`${y}`);
      rect.setAttribute("width",`${GRAPH.QUEUE_CELL_WIDTH}`);
      rect.setAttribute("height",`${GRAPH.QUEUE_CELL_HEIGHT}`);
      rect.setAttribute("stroke","black");
      rect.setAttribute("fill","none");
      rect.setAttribute("stroke-width","4");
      rect.setAttribute("id",`${stepQueue[stepIndex]?.nodeId}_rect`);
      
      const text = document.createElementNS(SVG.NAMESPACE,"text");
      text.setAttribute("x",`${x+GRAPH.QUEUE_CELL_WIDTH/2}`);
      text.setAttribute("y",`${y+GRAPH.QUEUE_CELL_HEIGHT/2}`);
      text.setAttribute("font-size","20");
      text.setAttribute("font-family","Arial");
      text.setAttribute("text-anchor","middle");
      text.setAttribute("id",`${stepQueue[stepIndex]?.nodeId}_id`)
      text.textContent = `${stepQueue[stepIndex]?.nodeId}`;

      document.getElementById("queueGroup")!.appendChild(rect);
      document.getElementById("queueGroup")!.appendChild(text);
      break;
    case "dequeue":
      introduce!.textContent = `节点${stepQueue[stepIndex]?.nodeId}出队`;
      node?.classList.remove("current");
      node?.classList.add("visited");
      nodes?.forEach((el)=>{
        if(Number(el.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH >= GRAPH.QUEUE_X)
          el.setAttribute("x",`${Number(el.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH}`)
        else el.remove();
      });
      texts?.forEach((el)=>{
        if(Number(el.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH >= GRAPH.QUEUE_X)
          el.setAttribute("x",`${Number(el.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH}`)
        else el.remove();
        });
      break;
    case "check":
      introduce!.textContent = `检查节点${stepQueue[stepIndex]?.nodeId}的相邻并且未被访问的节点`;
      break;
    case "visit":
      introduce!.textContent = `访问节点${stepQueue[stepIndex]?.nodeId}`;
      node?.classList.remove("unvisited");
      node?.classList.add("current");
      break;
    default:
      break;
  }
  return stepIndex+1;
}
//撤回stepQueue中的上一步
function undoBfsStep(stepQueue:BfsStep[],stepIndex:number):number{
  if(stepIndex <= 0) return 0 ;
  stepIndex -= 1;
  const svg = document.querySelector("svg");
  const node = svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}`);
  const nodes = svg?.getElementById("queueGroup")?.querySelectorAll("rect"); 
  const texts = svg?.getElementById("queueGroup")?.querySelectorAll("text");
  const introduce = svg?.getElementById("introduce");
  switch (stepQueue[stepIndex]?.action){
    case "enqueue":
      //队列回退
      svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}_rect`)?.remove();
      svg?.getElementById(`${stepQueue[stepIndex]?.nodeId}_id`)?.remove();
      break;
    case "dequeue":
      //队列回退
      nodes?.forEach((el)=>{el.setAttribute("x",`${Number(el.getAttribute("x")) + GRAPH.QUEUE_CELL_WIDTH}`)})
      texts?.forEach((el)=>{el.setAttribute("x",`${Number(el.getAttribute("x")) + GRAPH.QUEUE_CELL_WIDTH}`)})
      const rect = document.createElementNS(SVG.NAMESPACE,"rect");
      rect.setAttribute("x",`${GRAPH.QUEUE_X}`);
      rect.setAttribute("y",`${GRAPH.QUEUE_Y}`);
      rect.setAttribute("width",`${GRAPH.QUEUE_CELL_WIDTH}`);
      rect.setAttribute("height",`${GRAPH.QUEUE_CELL_HEIGHT}`);
      rect.setAttribute("stroke","black");
      rect.setAttribute("fill","none");
      rect.setAttribute("stroke-width","4");
      rect.setAttribute("id",`${stepQueue[stepIndex]?.nodeId}_rect`);
      
      const text = document.createElementNS(SVG.NAMESPACE,"text");
      text.setAttribute("x",`${GRAPH.QUEUE_X+GRAPH.QUEUE_CELL_WIDTH/2}`);
      text.setAttribute("y",`${GRAPH.QUEUE_Y+GRAPH.QUEUE_CELL_HEIGHT/2}`);
      text.setAttribute("font-size","20");
      text.setAttribute("font-family","Arial");
      text.setAttribute("text-anchor","middle");
      text.setAttribute("id",`${stepQueue[stepIndex]?.nodeId}_id`)
      text.textContent = `${stepQueue[stepIndex]?.nodeId}`;

      document.getElementById("queueGroup")!.appendChild(rect);
      document.getElementById("queueGroup")!.appendChild(text);

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
  if(stepIndex - 1 < 0) introduce!.textContent = "";
  else
  switch(stepQueue[stepIndex-1]?.action){
    case "enqueue":
      introduce!.textContent = `节点${stepQueue[stepIndex-1]?.nodeId}入队`;
      break;
    case "dequeue":
      introduce!.textContent = `节点${stepQueue[stepIndex-1]?.nodeId}出队`;
      break;
    case "check":
      introduce!.textContent = `检查节点${stepQueue[stepIndex-1]?.nodeId}的相邻并且未被访问的节点`;
      break;
    case "visit":
      introduce!.textContent = `访问节点${stepQueue[stepIndex-1]?.nodeId}`;
      break;
    default:
      break;
  }
  return stepIndex;
}
async function executeAllBfsSteps(stepQueue:BfsStep[],stepIndex:number,ms:number):Promise<number>{
  const svg = document.querySelector("svg");
  const introduce = svg?.getElementById("introduce");
  while(stepIndex<stepQueue.length){
    stepIndex = executeBfsStep(stepQueue,stepIndex);
    await wait(ms);
  }
  if(stepIndex >= stepQueue.length) {
    introduce!.textContent = "算法结束";
  }
  return stepQueue.length;
}
export{createSVG,createArrowMarker,renderQueue,renderInfoText,renderGraph,executeBfsStep,undoBfsStep,executeAllBfsSteps}