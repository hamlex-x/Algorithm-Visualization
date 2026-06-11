import { CANVAS, GRAPH, SVG } from "../shared/config.js";
import { initSVG, wait } from "../shared/svg-utils.js";
import type { AListGraph, ArcNode, BfsStep, MatrixGraph } from "../shared/types.js";
import { animateCheckNode, animateVisitNode, dequeueBfsAnimation, enqueueBfsAnimation } from "../animations/graph-animations.js";


//在svg中创建一个marker，并在其中写入箭头id=arrow
function renderArrowMarker(svg:SVGSVGElement){
  if (!svg) return;
  const def = document.createElementNS(SVG.NAMESPACE,"defs");
  const marker = document.createElementNS(SVG.NAMESPACE,"marker");
  marker.setAttribute("id", "svg_arrow_marker");
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
function renderQueue(svg:SVGSVGElement){
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
  queueGroup.setAttribute("id","queue_g")
  queueGroup.appendChild(lineUp);
  queueGroup.appendChild(lineDown);
  svg?.appendChild(queueGroup);
}
//在svg中创建一个说明文本
function renderInfoText(svg:SVGSVGElement){
  const introduce = document.createElementNS(SVG.NAMESPACE,"text");
  introduce.setAttribute("x",`${GRAPH.INTRODUCE_X}`);
  introduce.setAttribute("y",`${GRAPH.INTRODUCE_Y}`);
  introduce.setAttribute("font-size","30");
  introduce.setAttribute("font-family","Arial");
  introduce.setAttribute("text-anchor","middle");
  introduce.setAttribute("id","info_text");
  introduce.textContent = ``;
  svg?.appendChild(introduce);
}
function renderAdLGraph(svg:SVGSVGElement,graph:AListGraph<string>){
  if (!svg) return;
  //画线
  graph.adList.forEach((node)=>{
    if(node.firstArc === null) return;
    let arc: ArcNode | null = node.firstArc;
    let i = node.VId;
    while(arc !== null){
      const line = document.createElementNS(SVG.NAMESPACE,"line");
      let j = arc.adjvex;
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
      line.setAttribute("marker-end","url(#svg_arrow_marker)")
      line.setAttribute("id",`edge_line_${i}_${j}`);
      svg.appendChild(line);
      arc = arc.next;
    }
  })
  for(let i=0;i<graph.cnt;i++){
    //节点
    const node = document.createElementNS(SVG.NAMESPACE,"circle");
    node.setAttribute("cx",`${graph.nodes[i]?.x}`);
    node.setAttribute("cy",`${graph.nodes[i]?.y}`);
    node.setAttribute("r",`${GRAPH.NODE_RADIUS}`);
    node.setAttribute("id",`node_circle_${i}`);
    node.classList.add("node");
    //文本
    const label = document.createElementNS(SVG.NAMESPACE,"text");
    label.setAttribute("x",`${graph.nodes[i]?.x}`);
    label.setAttribute("y",`${graph.nodes[i]?.y}`);
    label.setAttribute("font-size","20");
    label.setAttribute("font-family","Arial");
    label.setAttribute("text-anchor","middle");
    label.textContent = `${graph.nodes[i]!.label}`;
  //绘制
    svg.appendChild(node);
    svg.appendChild(label);
  }
}
//将MatrixGraph渲染到svg中节点id为对应节点下标，线段号为发出节点号-指向节点号
function renderMatrixGraph(svg:SVGSVGElement,graph:MatrixGraph){
  if (!svg) return;
  //画线
  for(let i=0;i<graph.cnt;i++){
    for(let j=0;j<graph.cnt;j++){
      if(graph.matrix[i]![j]===1 && i!==j){
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
        line.setAttribute("marker-end","url(#svg_arrow_marker)")
        line.setAttribute("id",`edge_line_${i}_${j}`);
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
    node.setAttribute("id",`node_circle_${i}`);
    node.classList.add("node");
    //文本
    const label = document.createElementNS(SVG.NAMESPACE,"text");
    label.setAttribute("x",`${graph.nodes[i]?.x}`);
    label.setAttribute("y",`${graph.nodes[i]?.y}`);
    label.setAttribute("font-size","20");
    label.setAttribute("font-family","Arial");
    label.setAttribute("text-anchor","middle");
    label.textContent = `${graph.nodes[i]!.label}`;
   //绘制
    svg.appendChild(node);
    svg.appendChild(label);
  }
}
//执行stepQueue的下一步
async function executeBfsStep(svg:SVGSVGElement,stepQueue:BfsStep[],stepIndex:number,graph:MatrixGraph|AListGraph<string>):Promise<number>{
  const node = svg?.getElementById(`node_circle_${stepQueue[stepIndex]?.nodeId}`);
  const nodes = svg?.getElementById("queue_g")?.querySelectorAll("rect"); 
  const texts = svg?.getElementById("queue_g")?.querySelectorAll("text");
  const introduce = svg?.getElementById("info_text");
  if(stepIndex >= stepQueue.length) {
    introduce!.textContent = "算法结束";
    return stepQueue.length;
  }
  switch (stepQueue[stepIndex]?.action){
    case "enqueue":
      introduce!.textContent = `节点${graph.nodes[stepQueue[stepIndex]!.nodeId]!.label}入队`;
      let x = GRAPH.QUEUE_X+nodes!.length*GRAPH.QUEUE_CELL_WIDTH;
      let y = GRAPH.QUEUE_Y;
      const rect = document.createElementNS(SVG.NAMESPACE,"rect");
      const text = document.createElementNS(SVG.NAMESPACE,"text");

      rect.setAttribute("width",`${GRAPH.QUEUE_CELL_WIDTH}`);
      rect.setAttribute("height",`${GRAPH.QUEUE_CELL_HEIGHT}`);
      rect.setAttribute("stroke","black");
      rect.setAttribute("fill","none");
      rect.setAttribute("stroke-width","4");
      rect.setAttribute("id",`queue_cell_rect_${stepQueue[stepIndex]?.nodeId}`);
      text.setAttribute("font-size","20");
      text.setAttribute("font-family","Arial");
      text.setAttribute("text-anchor","middle");
      text.setAttribute("id",`queue_cell_text_${stepQueue[stepIndex]?.nodeId}`)
      text.textContent = graph.nodes[stepQueue[stepIndex]!.nodeId]!.label;
      svg.getElementById("queue_g")!.appendChild(rect);
      svg.getElementById("queue_g")!.appendChild(text);
      //初状态
      let fromX = x+GRAPH.QUEUE_WIDTH;
      let fromY = y;
      rect.setAttribute("x", `0`);
      rect.setAttribute("y", `0`);
      text.setAttribute("x", `0`);
      text.setAttribute("y", `0`);
      //动画
      await enqueueBfsAnimation(rect,text,fromX,fromY,x,y);

      //末状态
      rect.setAttribute("x",`${x}`);
      rect.setAttribute("y",`${y}`);
      text.setAttribute("x",`${x+GRAPH.QUEUE_CELL_WIDTH/2}`);
      text.setAttribute("y",`${y+GRAPH.QUEUE_CELL_HEIGHT/2}`);
      
      break;
    case "dequeue":
      introduce!.textContent = `节点${graph.nodes[stepQueue[stepIndex]!.nodeId]!.label}出队`;
      node?.classList.remove("current");
      node?.classList.add("visited");
      nodes?.forEach(async (el,i)=>{ 
        const text = texts![i];
        if(!text) return;
        await dequeueBfsAnimation(el,text,Number(el.getAttribute("x")),Number(el.getAttribute("y")));
        if(Number(el.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH >= GRAPH.QUEUE_X){
          el.setAttribute("x",`${Number(el.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH}`)
          text!.setAttribute("x",`${Number(text!.getAttribute("x")) - GRAPH.QUEUE_CELL_WIDTH}`)
        }
        else {
          el.remove();
          text?.remove();
        }
      });
      break;
    case "check":
      introduce!.textContent = `检查节点${graph.nodes[stepQueue[stepIndex]!.nodeId]!.label}的相邻并且未被访问的节点`;
      animateCheckNode(node as SVGElement);
      break;
    case "visit":
      introduce!.textContent = `访问节点${graph.nodes[stepQueue[stepIndex]!.nodeId]!.label}`;
      node?.classList.remove("unvisited");
      node?.classList.add("current");
      await animateVisitNode(node as SVGElement);
      break;
    default:
      break;
  }
  return stepIndex+1;
}
//撤回stepQueue中的上一步
function undoBfsStep(svg:SVGSVGElement,stepQueue:BfsStep[],stepIndex:number,graph:MatrixGraph|AListGraph<string>):number{
  if(stepIndex <= 0) return 0 ;
  stepIndex -= 1;
  const node = svg?.getElementById(`node_circle_${stepQueue[stepIndex]?.nodeId}`);
  const nodes = svg?.getElementById("queue_g")?.querySelectorAll("rect"); 
  const texts = svg?.getElementById("queue_g")?.querySelectorAll("text");
  const introduce = svg?.getElementById("info_text");
  switch (stepQueue[stepIndex]?.action){
    case "enqueue":
      //队列回退
      svg?.getElementById(`queue_cell_rect_${stepQueue[stepIndex]?.nodeId}`)?.remove();
      svg?.getElementById(`queue_cell_text_${stepQueue[stepIndex]?.nodeId}`)?.remove();
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
      rect.setAttribute("id",`queue_cell_rect_${stepQueue[stepIndex]?.nodeId}`);
      
      const text = document.createElementNS(SVG.NAMESPACE,"text");
      text.setAttribute("x",`${GRAPH.QUEUE_X+GRAPH.QUEUE_CELL_WIDTH/2}`);
      text.setAttribute("y",`${GRAPH.QUEUE_Y+GRAPH.QUEUE_CELL_HEIGHT/2}`);
      text.setAttribute("font-size","20");
      text.setAttribute("font-family","Arial");
      text.setAttribute("text-anchor","middle");
      text.setAttribute("id",`queue_cell_text_${stepQueue[stepIndex]?.nodeId}`)
      text.textContent = graph.nodes[stepQueue[stepIndex]!.nodeId]!.label;

      svg.getElementById("queue_g")!.appendChild(rect);
      svg.getElementById("queue_g")!.appendChild(text);

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
      introduce!.textContent = `节点${graph.nodes[stepQueue[stepIndex-1]!.nodeId]!.label}入队`;
      break;
    case "dequeue":
      introduce!.textContent = `节点${graph.nodes[stepQueue[stepIndex-1]!.nodeId]!.label}出队`;
      break;
    case "check":
      introduce!.textContent = `检查节点${graph.nodes[stepQueue[stepIndex-1]!.nodeId]!.label}的相邻并且未被访问的节点`;
      break;
    case "visit":
      introduce!.textContent = `访问节点${graph.nodes[stepQueue[stepIndex-1]!.nodeId]!.label}`;
      break;
    default:
      break;
  }
  return stepIndex;
}
//执行stepQueue中的所有步骤
async function executeAllBfsSteps(svg:SVGSVGElement,stepQueue:BfsStep[],stepIndex:number,graph:MatrixGraph|AListGraph<string>,ms:number):Promise<number>{
  const introduce = svg?.getElementById("info_text");
  while(stepIndex<stepQueue.length){
    stepIndex = await executeBfsStep(svg,stepQueue,stepIndex,graph);
    await wait(ms);
  }
  if(stepIndex >= stepQueue.length) {
    introduce!.textContent = "算法结束";
  }
  return stepQueue.length;
}
function renderBfsButton(container:HTMLElement){
  const btnNext = document.createElement("button");
  const btnLast = document.createElement("button");
  const btnAll = document.createElement("button");
  btnNext.setAttribute("id","btn_next")
  btnLast.setAttribute("id","btn_last")
  btnAll.setAttribute("id","btn_all")
  btnNext.textContent = "下一步";
  btnLast.textContent = "上一步";
  btnAll.textContent = "执行全部";

  const wrapper = document.createElement("div");
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";  // 水平居中
  wrapper.style.gap = "8px";               // 按钮之间的间距
  wrapper.style.width = `${CANVAS.WIDTH}px`;
  
  wrapper.appendChild(btnNext);
  wrapper.appendChild(btnLast);
  wrapper.appendChild(btnAll);
  container.appendChild(wrapper);
}
//创建bfs标题
function renderBfsTitle(container:HTMLElement){
  const title = document.createElement("h2");
  title.textContent = "广度优先搜索";
  container.appendChild(title);
}
function renderBfsUI(container:HTMLElement,graph:MatrixGraph):SVGSVGElement{
  renderBfsTitle(container);
  const svg = initSVG(container);      
  renderArrowMarker(svg);             
  renderMatrixGraph(svg, graph);             
  renderQueue(svg);                    
  renderInfoText(svg);                 
  renderBfsButton(container);
  return svg;                          
}
export{executeBfsStep,undoBfsStep,executeAllBfsSteps,renderBfsTitle,initSVG,renderArrowMarker,renderMatrixGraph,renderQueue,renderInfoText,renderBfsButton,renderAdLGraph}