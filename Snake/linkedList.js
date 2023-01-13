class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  head = null;
  tail = null;
  size = 0;

  pushFront(val) {
    const newNode = new Node(val);
    this.size++;
    if (this.head == null) {
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    newNode.next = this.head;
    this.head.prev = newNode;
    this.head = newNode;
  }

  popBack() {
    if (this.tail == null) return;
    this.size--;
    if (this.tail.prev == null) {
      this.head = null;
      this.tail = null;
      return;
    }
    this.tail = this.tail.prev;
    this.tail.next = null;
  }

  // a generator function to loop over the linkedlist
  *values() {
    let curr = this.head;
    while (curr != null) {
      yield curr.value;
      curr = curr.next;
    }
  }
}
