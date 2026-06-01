import type { MatrixGraph,BfsStep } from "../shared/types.js"
import { generateBfsSteps } from "../algos/graph-matrix-bfs-algo.js";
import { buildGraph,createGraph } from "../builders/graph-matrix-builder.js";
import { createArrowMarker, renderGraph, renderQueue, renderInfoText, executeAllBfsSteps, executeBfsStep, undoBfsStep, renderBfsButton } from "../renderers/graph-bfs-renderer.js";
import { createSVG } from "../shared/fn.js";

//为button加载监听器
export function bindBfsButtons(){
  const bntNext = document.getElementById("btn_next");
  const bntAll = document.getElementById("btn_all");
  const bntLast = document.getElementById("btn_last");
  bntNext?.addEventListener("click",()=>{stepIndex = executeBfsStep(stepQueue, stepIndex)})
  bntAll?.addEventListener("click",async ()=>{stepIndex = await executeAllBfsSteps(stepQueue, stepIndex,ms)})
  bntLast?.addEventListener("click",()=>{stepIndex = undoBfsStep(stepQueue, stepIndex)})
}
  let stepIndex = 0;
  let ms =1000;
  const stepQueue: BfsStep[] = [];
export function mount(container:HTMLElement){
  stepIndex = 0;
  stepQueue.length = 0;
  // const matrix1:number[][] = [
  //   [0,1,1,0,0],
  //   [1,0,1,1,0],
  //   [1,1,0,0,1],
  //   [0,1,0,0,1],
  //   [0,0,1,1,0]
  // ];
  // let matrixGraph : MatrixGraph = createGraph(5);
  const matrix1:number[][] = [
  [0,1,1,1,0,0,0,0],
  [1,0,1,0,1,0,0,1],
  [1,1,0,0,1,1,1,1],
  [1,0,0,0,1,0,0,1],
  [0,1,1,1,0,0,1,1],
  [0,0,1,0,0,0,0,0],
  [0,0,1,0,1,0,0,0],
  [0,1,1,1,1,0,0,0]
  ];
  let matrixGraph : MatrixGraph = createGraph(8);
  buildGraph(matrix1,matrixGraph);
  createSVG(container);
  createArrowMarker();
  renderGraph(matrixGraph);
  renderQueue();
  renderInfoText();
  generateBfsSteps(matrixGraph, stepQueue);
  renderBfsButton(container);
  bindBfsButtons(); 
}
