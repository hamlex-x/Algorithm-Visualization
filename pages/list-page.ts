import { renderAlgoListRect, renderAlgoListText, renderCategoryTreeLine, renderCategoryTreeRect, renderCategoryTreeText } from "../renderers/list-renderer.js";
import { initSVG } from "../shared/svg-utils.js";


export function mount(container:HTMLElement){
    initSVG(container);
    renderCategoryTreeRect();
    renderCategoryTreeText();
    renderCategoryTreeLine();
    renderAlgoListRect();
    renderAlgoListText();
}
