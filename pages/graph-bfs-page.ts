import type { MatrixGraph,BfsStep, Runtime, AListGraph } from "../shared/types.js"
import { generateBfsStepsAL, generateBfsStepsMatrix } from "../algos/graph-matrix-bfs-algo.js";
import { executeAllBfsSteps, executeBfsStep, undoBfsStep,  renderBfsTitle, initSVG, renderArrowMarker, renderBfsButton, renderInfoText, renderMatrixGraph, renderQueue, renderAdLGraph } from "../renderers/graph-bfs-renderer.js";
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
      bfsRuntime.stepIndex = await  executeBfsStep(svg,bfsRuntime.stepQueue, bfsRuntime.stepIndex,graph.representation === "matrix"?graph.matrixGraph:graph.adLGraph);
    }finally{
      bfsRuntime.isAnimating = false;
    }
    
  })
  btnAll?.addEventListener("click",async ()=>{bfsRuntime.stepIndex = await executeAllBfsSteps(svg,bfsRuntime.stepQueue, bfsRuntime.stepIndex,graph.representation === "matrix"?graph.matrixGraph:graph.adLGraph,bfsRuntime.ms)})
  btnLast?.addEventListener("click",()=>{bfsRuntime.stepIndex = undoBfsStep(svg,bfsRuntime.stepQueue, bfsRuntime.stepIndex,graph.representation === "matrix"?graph.matrixGraph:graph.adLGraph)})
}
  
export function mount(container:HTMLElement){
  const bfsRuntime : Runtime = {stepQueue: [], stepIndex: 0, ms: 1000, isAnimating: false};
  const matrixGraph : MatrixGraph = graph.matrixGraph;
  const adLGraph : AListGraph<string> = graph.adLGraph;
  renderBfsTitle(container);
  const svg = initSVG(container);      
  renderArrowMarker(svg);          
  if(graph.representation === "matrix"){
    renderMatrixGraph(svg, matrixGraph);  
    generateBfsStepsMatrix(matrixGraph, bfsRuntime.stepQueue);
  }   
  else if(graph.representation === "adlist"){
    renderAdLGraph(svg,adLGraph); 
    generateBfsStepsAL(adLGraph,bfsRuntime.stepQueue);
  }
  renderQueue(svg);                    
  renderInfoText(svg);                 
  renderBfsButton(container);
  
  bindBfsButtons(svg,bfsRuntime); 
}
