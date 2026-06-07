export class Queue<T>{
  data:T[] = [];
  
  enqueue(x:T){
    this.data.push(x);
  }
  dequeue():T|undefined{
    return this.data.shift();
  }
  empty():boolean{
    if(this.data.length===0) return true;
    return false;
  }
}
export class LinkNode<T>{
  data:T| null = null;
  next:LinkNode<T>| null = null;
  constructor(data:T|null){
    this.data = data;
  }
}