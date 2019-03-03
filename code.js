 class nodeTree {
                constructor(value, parent=null, childRight=null, childLeft=null)
                {
                    this.value = value
                    this.childRight = childRight
                    this.childLeft = childLeft
                    this.parent = parent
                }
            }
            class BinarySearchTree {
                constructor() {
                    this.root = null
                }
                delete(value) {
                    //если у элемента нет детей удаляем(частный случай) 
                    //(сравниваем со значением в рут => left==null|| right==null)
                    var deletedNode = this.find(value)
                    this.deleteHelper(deletedNode)
                    
                }
                deleteHelper(deletedNode) {
                    if (!deletedNode.childLeft && !deletedNode.childRight) { //deleting leaf
                        if (deletedNode.value>deletedNode.parent.value) {
                            deletedNode.parent.childRight=null  
                        }
                        else {
                            deletedNode.parent.childLeft=null
                        }
                    }
                    else if ((deletedNode.childLeft && deletedNode.childRight) || deletedNode.value==this.root.value) {
                        if (this.root.childLeft && !this.root.childRight) {
                            var node = this.findMaxLeftTree(deletedNode.childLeft)
                            deletedNode.value=node.value
                            this.deleteHelper(node)
                        }
                        else if (!this.root.childLeft && this.root.childRight) {
                            var node = this.findMaxRightTree(deletedNode.childRight)
                            deletedNode.value=node.value
                            this.deleteHelper(node)
                        }
                    }
                    else if (!deletedNode.childLeft || !deletedNode.childRight) {
                        if (deletedNode.value>deletedNode.parent.value) {
                            deletedNode.parent.childRight=deletedNode.childRight 
                        }
                        else {
                            deletedNode.parent.childLeft=deletedNode.childLeft
                        }
                    }

                    else {
                        console.log(-1)
                    }
                }

                levelTraverse(func) {
                    let queue = [this.root]
                    
                    while (queue.length) {
                        let node = queue.shift()
                        func(node.value)

                        if (node.childLeft) {
                            queue.push(node.childLeft)
                            
                        }
                        if (node.childRight) {
                            queue.push(node.childRight)
                        }
                    }
                }

                findMaxLeftTree(root) {
                    if (root.childRight) {
                        return this.findMaxLeftTree(root.childRight)
                    }
                    else {
                        return root
                    }
                }
                findMaxRightTree(root) {
                    if (root.childLeft) {
                        return this.findMaxRightTree(root.childLeft)
                    }
                    else {
                        return root
                    }
                }
                find(value) {
                    var node=this.findHelper(this.root,value)
                    return node
                }

                findHelper(root, value) {
                    if(root === null) {
                        return null;
                    } else if(value == root.value) {
                        return root;
                    } else if(value < root.value) {
                        return this.findHelper(root.childLeft, value)
                    } else {
                        return this.findHelper(root.childRight, value)
                    }
                }

                pushHelper(root, value) {
                    if(value == root.value) {
                        return;
                    } else if (value < root.value) {
                        if (root.childLeft === null) {
                            root.childLeft = new nodeTree(value, root)
                        } else {
                            this.pushHelper(root.childLeft, value)
                        }
                    } else if (value >root.value) {
                        if (root.childRight === null) {
                            root.childRight = new nodeTree(value,root)
                        }
                        else {
                            this.pushHelper(root.childRight,value)
                        }
                    }
                }

                traverseDirect(func) {
                    this.traverseDirectHelper(this.root, func)
                }
                traverseDirectHelper(root,func) {
                    if (root.childLeft) {
                        this.traverseDirectHelper(root.childLeft,func)
                    }
                    func(root.value)
                    if (root.childRight) {
                        this.traverseDirectHelper(root.childRight,func)
                    }
                }
                traverseReverse(func) {
                    this.traverseReverseHelper(this.root,func)      
                }
                traverseReverseHelper(root,func) {
                    if (root.childRight) {
                        this.traverseReverseHelper(root.childRight,func)
                    }
                    func(root.value)
                    if (root.childLeft) {
                        this.traverseReverseHelper(root.childLeft,func)
                    }
                }
                push(value) {
                    if (this.root === null)
                    {
                        this.root = new nodeTree(value,null)
                    }
                    else {
                        this.pushHelper(this.root, value)
                    }
                }


            }
            class Context {
                init() {
                    this.tree = new BinarySearchTree()
                    let N = 10;
                    for(var i = 0; i < N; ++i) {
                        var value = Math.floor(Math.random() * 2 * N);
                        this.tree.push(value)
                    }

                    this.tree.traverseDirect(function(value) {
                        console.log(value)
                    })
                    console.log(' ')
                    this.tree.levelTraverse(function(value) {
                        console.log(value)
                    })

                    this.generateHtmlTree()
                }
                generateHtml(node) {
                    let result = `<p>  ${node.value}</p> <ul>`
                    if (node.childLeft || node.childRight) {
                        if (node.childLeft) {
                            result += "<li>"+this.generateHtml(node.childLeft)+"</li>"
                    
                        }
                        else {
                            result += "<li>null</li>"
                        }
                        if (node.childRight) {
                            result += "<li>"+this.generateHtml(node.childRight)+"</li>"
                        }
                        else {
                            result += "<li>null</li>"
                        }
                    }
                    
                    result += "</ul>"
                    return result
                }
                search(value) {
                    //var value = prompt()
                    var node = find(value)
                    if (node) {
                        alert("found")
                    }
                    else {
                        alert("not found")
                    }
                }
                showTraverseDirect() {
                    var string=''
                    this.tree.traverseDirect(function(val) {
                        string+=val+" "
                    })
                    alert(string)
                }
                showTraverseReverse() {
                    var string = ''
                    this.tree.traverseReverse(function(val) {
                        string+=val+" "
                    })
                    alert(string)
                }
                showLevelTraverse() {
                    var string =''
                    this.tree.levelTraverse(function(val) {
                        string+=val+" "
                    })
                    alert(string)
                }
                generateHtmlTree() {
                    var list = document.getElementById('tree')
                    list.innerHTML = this.generateHtml(this.tree.root)
                    
                }
                deleteItem(value) {
                    //var value = prompt()
                    this.tree.delete(value)
                    this.generateHtmlTree()
                }
                addItem(value) {
                    
                    //var value = prompt()
                    this.tree.push(value)
                    this.generateHtmlTree()
                }

            }
            
            let context = new Context()
            