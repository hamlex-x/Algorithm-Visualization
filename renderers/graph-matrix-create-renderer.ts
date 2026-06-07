//渲染节点数输入框
function renderGraphMatrixInput(container:HTMLElement){
    const label = document.createElement("label");
    label.textContent = "节点数:";
    container.appendChild(label);
    const input = document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("id","graph_input_count");
    container.appendChild(input);
}
//渲染产生矩阵的表格
function renderGraphMatrixTable(container:HTMLElement):HTMLTableElement{
    const graphMatrixTable = document.createElement("table");
    graphMatrixTable.setAttribute("id","graph_table_matrix");
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
    container.appendChild(title);
}
function renderCreateUI(container:HTMLElement):HTMLTableElement{
    renderGraphMatrixTitle(container);
    renderGraphMatrixInput(container);
    const graphMatrixTable = renderGraphMatrixTable(container);
    return graphMatrixTable;
}
export {renderCreateUI,resizeGraphMatrixTable}