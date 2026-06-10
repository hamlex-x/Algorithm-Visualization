import type { MatrixGraph,BfsStep, Runtime } from "../shared/types.js"
import { generateBfsSteps } from "../algos/graph-matrix-bfs-algo.js";
import { executeAllBfsSteps, executeBfsStep, undoBfsStep, renderBfsUI } from "../renderers/graph-bfs-renderer.js";
import { graph } from "../shared/state.js";
//为button加载监听器
export function bindBfsButtons(svg:SVGSVGElement,bfsRuntime:Runtime){
  const btnNext = document.getElementById("btn_next");
  const btnAll = document.getElementById("btn_all");
  const btnLast = document.getElementById("btn_last");
  btnNext?.addEventListener("click",async ()=>{
    if(bfsRuntime.isAnimating) return;

    bfsRuntime.isAnimating = true;
    try{
      bfsRuntime.stepIndex = await  executeBfsStep(svg,bfsRuntime.stepQueue, bfsRuntime.stepIndex);
    }finally{
      bfsRuntime.isAnimating = false;
    }
    
  })
  btnAll?.addEventListener("click",async ()=>{bfsRuntime.stepIndex = await executeAllBfsSteps(svg,bfsRuntime.stepQueue, bfsRuntime.stepIndex,bfsRuntime.ms)})
  btnLast?.addEventListener("click",()=>{bfsRuntime.stepIndex = undoBfsStep(svg,bfsRuntime.stepQueue, bfsRuntime.stepIndex)})
}
  
export function mount(container:HTMLElement){
  const bfsRuntime : Runtime = {stepQueue: [], stepIndex: 0, ms: 1000, isAnimating: false};
  const matrixGraph : MatrixGraph = graph.matrixGraph;
  const svg = renderBfsUI(container,matrixGraph);
  generateBfsSteps(matrixGraph, bfsRuntime.stepQueue);
  bindBfsButtons(svg,bfsRuntime); 
}
