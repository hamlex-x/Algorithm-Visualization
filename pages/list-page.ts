import { renderAlgoListRect, renderAlgoListText, renderCategoryTreeLine, renderCategoryTreeRect, renderCategoryTreeText } from "../renderers/list-renderer.js";
import { createSVG } from "../shared/svg-utils.js";


export function mount(container:HTMLElement){
    createSVG(container);
    renderCategoryTreeRect();
    renderCategoryTreeText();
    renderCategoryTreeLine();
    renderAlgoListRect();
    renderAlgoListText();
}
