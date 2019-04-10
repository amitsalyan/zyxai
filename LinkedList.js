function LinkedList(){
	this.head=null
	this.tail=null
}

function Node(value, next, prev){
	this.value=value
	this.prev=prev
	this.next=next
}

LinkedList.prototype.addToHead = function(value){
	const newNode = new Node(value, this.head, null)
	if(this.head)
		this.head.prev=newNode
	else
		this.tail = newNode
	this.head=newNode;
}

const list = new LinkedList();
list.addToHead(100);
list.addToHead(200);
console.log(list);