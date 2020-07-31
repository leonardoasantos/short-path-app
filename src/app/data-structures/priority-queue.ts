class QueueElement {
    element: any;
    priority: number;

    constructor(element: any, priority: number) { 
        this.element = element; 
        this.priority = priority; 
    }
}

export class PriorityQueue { 
  
    private items: QueueElement[];

    constructor() { 
        this.items = []; 
    } 
  
    public enqueue(element, priority): void { 
        var qElement = new QueueElement(element, priority); 
        var contain = false; 
    
        for (var i = 0; i < this.items.length; i++) { 
            if (this.items[i].priority > qElement.priority) { 
                this.items.splice(i, 0, qElement); 
                contain = true; 
                break; 
            } 
        } 
    
        if (!contain) { 
            this.items.push(qElement); 
        } 
    }
    
    public dequeue(): any { 
        if (this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift().element; 
    }

    public isEmpty(): boolean { 
        return this.items.length == 0; 
    } 
} 