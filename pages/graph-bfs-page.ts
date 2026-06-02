import type { MatrixGraph,BfsStep } from "../shared/types.js"
import { generateBfsSteps } from "../algos/graph-matrix-bfs-algo.js";
import { buildGraph,createGraph } from "../builders/graph-matrix-builder.js";
import { renderArrowMarker, renderGraph, renderQueue, renderInfoText, executeAllBfsSteps, executeBfsStep, undoBfsStep, renderBfsButton, renderBfsTitle } from "../renderers/graph-bfs-renderer.js";
import { initSVG } from "../shared/svg-utils.js";
import { graph } from "../shared/state.js";
//为button加载监听器
export function bindBfsButtons(){
  const btnNext = document.getElementById("btn_next");
  const btnAll = document.getElementById("btn_all");
  const btnLast = document.getElementById("btn_last");
  btnNext?.addEventListener("click",()=>{stepIndex = executeBfsStep(stepQueue, stepIndex)})
  btnAll?.addEventListener("click",async ()=>{stepIndex = await executeAllBfsSteps(stepQueue, stepIndex,ms)})
  btnLast?.addEventListener("click",()=>{stepIndex = undoBfsStep(stepQueue, stepIndex)})
}
  let stepIndex = 0;
  let ms =1000;
  const stepQueue: BfsStep[] = [];

export function mount(container:HTMLElement){
  renderBfsTitle(container);
  stepIndex = 0;
  stepQueue.length = 0;
  const matrix1:number[][] = graph.matrix;
  const matrixGraph : MatrixGraph = createGraph(matrix1.length);
  console.log(matrix1);
  buildGraph(matrix1,matrixGraph);
  initSVG(container);
  renderArrowMarker();
  renderGraph(matrixGraph);
  renderQueue();
  renderInfoText();
  generateBfsSteps(matrixGraph, stepQueue);
  renderBfsButton(container);
  bindBfsButtons(); 
}
