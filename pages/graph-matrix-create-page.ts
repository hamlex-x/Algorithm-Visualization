import { graph } from "../shared/state.js";
import { resizeGraphMatrixTable, renderCreateUI, renderMatrixMain, renderEdgeListMain, renderVisualMain } from "../renderers/graph-matrix-create-renderer.js";
import { builderAListGraph, buildGraphMatrix } from "../builders/graph-matrix-builder.js";
import type { AListGraph, GraphNode, VNode } from "../shared/types.js";
import { getSVGPoint } from "../shared/svg-utils.js";
import { renderAdLGraph } from "../renderers/graph-bfs-renderer.js";


//根据输入数据建立邻接矩阵
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
//通过边列表创建邻接表
function readALGraphByEdgeList():VNode<string>[]{
    const adList:VNode<string>[] = [];
    const textarea  = document.getElementById("graph_textarea") as HTMLTextAreaElement;
    const text = textarea.value;
    const lines = text.split(/\r?\n/);
    const vertexMap = new Map<string, number>();//存所有Vnode的(Vdata,VId)
    function getOrCreateVertex(name:string):number{
        if(vertexMap.has(name))
            return vertexMap.get(name)!;
        adList.push({
            VId:adList.length,
            Vdata:name,
            firstArc:null
        })
        vertexMap.set(name,adList.length-1);
        return adList.length-1;
    }
    function addArc(from:number,to:number){
        const node = adList[from] as VNode<string>;
        let lastArc = node.firstArc;
        while(lastArc !== null &&
            lastArc.adjvex !== to &&
            lastArc?.next !== null 
            ) lastArc = lastArc.next;
        
        if(lastArc === null){
            node.firstArc = {
            info:1,
            adjvex:to,
            next:null
            }
        }else if(lastArc.adjvex === to){

        }
        else if(lastArc?.next === null ){
            lastArc!.next = {
            info:1,
            adjvex:to,
            next:null
            }
        }
    }
    lines.forEach((line)=>{
        const words = line.split('-');
        if(words[1] === undefined) return;
        let w1Index = getOrCreateVertex(words[1]);
        //找到words[0]对应的Vnode的最后一个弧结点并在不重复并且不是自环的前提下添加新弧，若words没有对应的Vnode则新建 
        if(words[0] === words[1]) return;
        addArc(getOrCreateVertex(words[0] as string),w1Index);
    })
    return adList;
}
//
//为边列表创建时textarea添加事件监听器
function bindEdgeListTextarea(textarea:HTMLTextAreaElement){
    
}
function bindEdgeListEnsureButton(btn:HTMLButtonElement){
    btn.addEventListener("click",()=>{
        graph.representation = "adlist";
        graph.adLGraph = builderAListGraph(readALGraphByEdgeList());
        location.hash = "#/list";
    })
}
function bindVisualSvg(svg:SVGSVGElement,adLGraph:AListGraph<string>){
    //找最小的缺失数字
    function findSmallestMissingLabel(nodes: GraphNode[]): number {
      const labels = new Set(nodes.map(n => Number(n.label)));
      let i = 0;
      while (labels.has(i)) i++;
      return i;
  }
    //点击空白处添加节点
    svg.addEventListener("dblclick",(e)=>{
        e.preventDefault()
        const pt = getSVGPoint(svg,e);
        if(e.target === svg){
            adLGraph.nodes.push({x:pt.x,y:pt.y,label: `${findSmallestMissingLabel(adLGraph.nodes)}`,status:"unvisited"});
            adLGraph.adList.push({VId:adLGraph.cnt,Vdata:`${adLGraph.cnt}`,firstArc:null});
            adLGraph.cnt++;
        }
        renderAdLGraph(svg,adLGraph); 
    })
    //右键删除节点
    svg.addEventListener("contextmenu",(e)=>{
        e.preventDefault()
        const circle = (e.target as Element).closest("circle");
        if (!circle) return;
        const vid = circle.dataset.vid;
        if(vid === undefined) return;
        for(let i=0;i<adLGraph.cnt;i++){
            if(adLGraph.adList[i]!.VId === Number(vid)){
                adLGraph.nodes.splice(i,1);
                adLGraph.adList.splice(i,1);
                adLGraph.cnt--;
            }
        }
        for (let i = 0; i < adLGraph.adList.length; i++) {
            adLGraph.adList[i]!.VId = i;
        }
        
        renderAdLGraph(svg,adLGraph); 
    })
}
function bindVisualEnsureButton(btn:HTMLButtonElement,adLgraph:AListGraph<string>){
    btn.addEventListener("click",()=>{
        graph.representation = "adlist";
        graph.adLGraph = adLgraph;
        location.hash = "#/list";
    })
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
    navItems[2]!.addEventListener("click",()=>{
        const adLgraph:AListGraph<string> ={
            nodes:[],
            adList:[],
            cnt:0
        }
        main.innerHTML = "";
        const {
            svg,
            btn
        } = renderVisualMain(main);
        bindVisualSvg(svg,adLgraph);    
        bindVisualEnsureButton(btn,adLgraph);
    });
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