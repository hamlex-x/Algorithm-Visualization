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