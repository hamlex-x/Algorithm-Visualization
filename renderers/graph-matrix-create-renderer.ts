import { initSVG } from "../shared/svg-utils.js";

//创建图创建导航栏
function renderGraphCreateNav(container:HTMLElement):HTMLElement{
    const nav = document.createElement("nav");
    nav.setAttribute("class","create-graph-nav");

    const navItem1 = document.createElement("div");
    const navItem2 = document.createElement("div");
    const navItem3 = document.createElement("div");
    navItem1.setAttribute("class","create-graph-nav-item");
    navItem2.setAttribute("class","create-graph-nav-item");
    navItem3.setAttribute("class","create-graph-nav-item");
    navItem1.textContent = "邻接矩阵创建";
    navItem2.textContent = "边列表创建";
    navItem3.textContent = " 可视化创建";
    nav.appendChild(navItem1);
    nav.appendChild(navItem2);
    nav.appendChild(navItem3);
    container.appendChild(nav);
    return nav;
}
//创建main区域
function renderGraphCreateMain(container:HTMLElement):HTMLElement{
    const main = document.createElement("div");
    main.setAttribute("class","create-graph-main");
    container.appendChild(main);
    return main;
}
//渲染节点数输入框与提示字体
function renderGraphMatrixInput(container:HTMLElement){
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = "节点数:";
    
    const input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("id","graph_input_count");

    div.appendChild(label);
    div.appendChild(input);
    container.appendChild(div);
}
//渲染产生矩阵的表格
function renderGraphMatrixTable(container:HTMLElement):HTMLTableElement{
    const graphMatrixTable = document.createElement("table");
    graphMatrixTable.setAttribute("id","graph_table_matrix");
    graphMatrixTable.setAttribute("class","create-graph-table");
    container.appendChild(graphMatrixTable);
    return graphMatrixTable;
}
//重新渲染表格大小
function resizeGraphMatrixTable(graphMatrixTable:HTMLTableElement,cnt:number):HTMLTableElement{
    graphMatrixTable!.innerHTML = "";
    const header = document.createElement("tr")
    const thead  = document.createElement("thead");

    thead?.appendChild(header);
    graphMatrixTable?.appendChild(thead);

    const tbody = document.createElement("tbody");
    for(let i=0;i<cnt;i++){
        //thead内元素
        const headerContent = document.createElement("th");
        headerContent.textContent = String(i);
        header.appendChild(headerContent);
        //tbody内元素
        const tr = document.createElement("tr");
        for(let j=0;j<cnt;j++){
            const td = document.createElement("td");
            const input = document.createElement("input");
            input.setAttribute("type","number");
            input.setAttribute("id",`graph_input_${i}_${j}`);
            input.min = "0";
            input.max = "1";
            input.value = "0";
            td.appendChild(input);
            tr.appendChild(td);
        }
        tbody?.appendChild(tr);
    }
    graphMatrixTable?.appendChild(tbody);
    return graphMatrixTable;
}
function renderGraphMatrixTitle(container:HTMLElement){
    const title = document.createElement("h2");
    title.textContent = "创建邻接矩阵";
    title.setAttribute("class","create-graph-title");
    container.appendChild(title);
}
//创建邻接矩阵的确定按钮
function renderEnsureButtonMatrix(container:HTMLElement):HTMLButtonElement{
    const btn = document.createElement("button");
    btn.textContent = "确定";
    btn.style.width = "100px";
    container.appendChild(btn);
    return btn;
}

function renderMatrixMain(main:HTMLElement){
    renderGraphMatrixTitle(main);
    renderGraphMatrixInput(main);
    const graphMatrixTable = renderGraphMatrixTable(main);
    const btn = renderEnsureButtonMatrix(main);
    return {
        graphMatrixTable,
        btn,
    }
}

function renderGraphEdgeTitle(container:HTMLElement){
    const title = document.createElement("h2");
    title.textContent = "边列表创建图";
    title.setAttribute("class","create-graph-title");
    container.appendChild(title);
}
function renderGraphEdgeTextarea(container:HTMLElement){
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id","graph_textarea");
    textarea.setAttribute("class","create-graph-textarea");
    container.appendChild(textarea);
    return textarea;
}
function renderEnsureButtonEdgeList(container:HTMLElement){
    const btn = document.createElement("button");
    btn.textContent = "确定";
    btn.style.width = "100px";
    container.appendChild(btn);
    return btn;
}
function renderEdgeListMain(main:HTMLElement){
    renderGraphEdgeTitle(main);
    const textarea = renderGraphEdgeTextarea(main);
    const btn = renderEnsureButtonEdgeList(main);
    return {
        textarea,
        btn,
    }
}
function renderCreateUI(container:HTMLElement){
    const nav = renderGraphCreateNav(container);
    const main = renderGraphCreateMain(container);
    const { graphMatrixTable, btn } = renderMatrixMain(main);
    return {
        graphMatrixTable,
        btn,
        nav,
        main
    }
}
function renderEnsureButtonVisual(container:HTMLElement):HTMLButtonElement{
    const btn = document.createElement("button");
    btn.textContent = "使用此图";
    btn.style.width = "100px";
    btn.style.alignSelf = "center";
    btn.setAttribute("style","");
    container.appendChild(btn);
    return btn;
}
//渲染可视化建图main的全部
function renderVisualMain(main:HTMLElement){
    renderGraphVisualTitle(main);
    const svg = initSVG(main);
    const btn = renderEnsureButtonVisual(main);
    svg.setAttribute("class","create-graph-svg");
    return {svg,btn};
}
//渲染可视化建图标题
function renderGraphVisualTitle(container:HTMLElement){
    const title = document.createElement("h2");
    title.textContent = "可视化创建图";
    title.setAttribute("class","create-graph-title");
    container.appendChild(title);
}
export {renderCreateUI,resizeGraphMatrixTable,renderMatrixMain,renderEdgeListMain,renderVisualMain}