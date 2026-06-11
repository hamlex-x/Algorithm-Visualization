import { graph } from "../shared/state.js";
import { resizeGraphMatrixTable, renderCreateUI, renderMatrixMain, renderEdgeListMain } from "../renderers/graph-matrix-create-renderer.js";
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
//为确定按钮添加事件监听器
function bindMatrixEnsureButton (btn:HTMLButtonElement){
    btn.addEventListener("click",()=>{
        graph.representation = "matrix";
        graph.matrixGraph = buildGraphMatrix(readGraphMatrix());
        location.hash = "#/list";
    })
}
//为边列表创建时textarea添加事件监听器
function bindEdgeListTextarea(textarea:HTMLTextAreaElement){
    
}
function bindEdgeListEnsureButton(btn:HTMLButtonElement){
    
}
//为创建导航栏添加事件监听器
function bindCreateNav(nav:HTMLElement,main:HTMLElement){
    const navItems = nav.querySelectorAll(".create-graph-nav-item");
    navItems[0]!.addEventListener("click",()=>{
        main.innerHTML = "";
        const {
        graphMatrixTable,
        btn
    } = renderMatrixMain(main);
    bindGraphMatrixInput(graphMatrixTable);
    bindMatrixEnsureButton(btn);
    });
    navItems[1]!.addEventListener("click",()=>{
        main.innerHTML = "";
        const {
        textarea,
        btn
    } = renderEdgeListMain(main);
    bindEdgeListTextarea(textarea);
    bindEdgeListEnsureButton(btn);
    })

}
export function mount(container:HTMLElement){
    const {
        graphMatrixTable,
        btn,
        nav,
        main
    } = renderCreateUI(container);
    bindGraphMatrixInput(graphMatrixTable);
    bindMatrixEnsureButton(btn);
    bindCreateNav(nav,main);
}