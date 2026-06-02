import { graph } from "../shared/state.js";
import { renderGraphMatrixInput, renderGraphMatrixTable, resizeGraphMatrixTable, renderGraphMatrixTitle } from "../renderers/graph-matrix-create-renderer.js";

//根据输入数据建立邻接表
function readGraphMatrix():number[][]{
    const graphMatrixTable = document.getElementById("graph_table_matrix");
    const trs = graphMatrixTable!.querySelectorAll("tbody tr");
    const matrix :number[][] = [];
    for(let i=0;i<trs.length;i++){
        const tds = trs[i]!.querySelectorAll("td");
        const row :number[] = [];
        for(let j=0;j<tds.length;j++){
            row[j] = Number(tds[j]!.querySelector("input")!.value);
        }
        matrix.push(row);
    }
    return matrix;
}
//加载节点数输入框事件监听器
function bindGraphMatrixInput(){
    const input = document.getElementById("graph_input_count") as HTMLInputElement;
    input?.addEventListener("change",()=>{
        resizeGraphMatrixTable(Number(input.value));
    });
}
//创建确定按钮并增加事件监听器
function renderEnsureButton(container:HTMLElement){
    const btn = document.createElement("button");
    btn.textContent = "确定";
    container.appendChild(btn);
    btn.addEventListener("click",()=>{
        graph.matrix = readGraphMatrix();
        location.hash = "#/list";
    })
}
export function mount(container:HTMLElement){
    renderGraphMatrixTitle(container);
    renderGraphMatrixInput(container);
    renderGraphMatrixTable(container);
    bindGraphMatrixInput();
    renderEnsureButton(container);
}