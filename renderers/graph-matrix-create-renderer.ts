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
function renderGraphMatrixTable(container:HTMLElement){
    const graphMatrixTable = document.createElement("table");
    graphMatrixTable.setAttribute("id","graph_table_matrix");
    container.appendChild(graphMatrixTable);
}
//重新渲染表格大小
function resizeGraphMatrixTable(cnt:number){
    const graphMatrixTable = document.getElementById("graph_table_matrix");
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
            input.min = "0";
            input.max = "1";
            input.value = "0";
            input.addEventListener("change",()=>{
                const value = Number(input.value);
                if(i === j) {
                    input.value = "0";
                    return;
                }
                if(value >1) input.value = "1";
                if(value <0) input.value = "0";
            })
            td.appendChild(input);
            tr.appendChild(td);
        }
        tbody?.appendChild(tr);
    }
    graphMatrixTable?.appendChild(tbody);
    
}
function renderGraphMatrixTitle(container:HTMLElement){
    const title = document.createElement("h2");
    title.textContent = "创建邻接矩阵";
    container.appendChild(title);
}
export {renderGraphMatrixInput,renderGraphMatrixTable,resizeGraphMatrixTable,renderGraphMatrixTitle}