import { graph } from "../shared/state.js";
import { resizeGraphMatrixTable, renderCreateUI } from "../renderers/graph-matrix-create-renderer.js";
import { buildGraphMatrix } from "../builders/graph-matrix-builder.js";


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
function bindGraphMatrixInput(graphMatrixTable:HTMLTableElement){
    const input = document.getElementById("graph_input_count") as HTMLInputElement;
    input?.addEventListener("change",()=>{
        resizeGraphMatrixTable(graphMatrixTable,Number(input.value));
        bindMatrixTableValidation(graphMatrixTable);
    });
}
//为输入表格的每个结点添加事件监听器
function bindMatrixTableValidation(graphMatrixTable: HTMLTableElement) {
      const trs = graphMatrixTable.querySelectorAll("tbody tr");
      for (let i = 0; i < trs.length; i++) {
          const tds = trs[i]!.querySelectorAll("td");
          for (let j = 0; j < tds.length; j++) {
              const input = tds[j]!.querySelector("input")!;
              input.addEventListener("change", () => {
                  const value = Number(input.value);
                  if (i === j) {
                      input.value = "0";
                      return;
                  }
                  if (value > 1) input.value = "1";
                  if (value < 0) input.value = "0";
              });
          }
      }
  }

//创建确定按钮并增加事件监听器
function renderEnsureButton(container:HTMLElement):HTMLButtonElement{
    const btn = document.createElement("button");
    btn.textContent = "确定";
    container.appendChild(btn);
    return btn;
}
function bindEnsureButton (btn:HTMLButtonElement){
    btn.addEventListener("click",()=>{
        graph.representation = "matrix";
        graph.matrixGraph = buildGraphMatrix(readGraphMatrix());
        location.hash = "#/list";
    })
}
export function mount(container:HTMLElement){
    const graphMatrixTable = renderCreateUI(container);
    bindGraphMatrixInput(graphMatrixTable);
    const btn = renderEnsureButton(container);
    bindEnsureButton(btn);
}