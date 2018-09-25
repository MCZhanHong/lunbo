console.log('图片无缝轮播');
// simulated images data
var imgSrc = [
    './images/Australia.png',
    './images/Brazil.png',
    './images/Colombia.png',
    './images/Egypt.png',
    './images/England.png',
    './images/France.png'
];

var domImgLunBo = $('img-lunbo');
var domImgNum = $('img-num');
var toggleTimer;
var animateTimer;

/**
 * circular list
 */
function CircularList(length) {
    this.length = length || 0; // total length of nodes
    this.current = null;
    this.head = null;
    this.init();
    this.initImages(domImgLunBo, this.length);
    this.initDots(domImgNum, this.length);
    this.current.setFocus(domImgLunBo, domImgNum);
    this.autoMove();
}

/**
 * init data
 */
CircularList.prototype.init = function () {
    if (this.length == 0) {
        console.log('length of CircularList:' + this.length);
        this.head = null;
        this.current = null;
    } else {
        console.log('length of CircularList:' + this.length);
        for (var i = 0; i < this.length; i++) {
            var node = new Node(i, imgSrc[i]);
            this.insertNode(i, node);
            if (i == 0) {
                this.head = node;
            }
            if (i == this.length - 1) {
                node.next = this.head;
                this.head.prev = node;
            }
        }
        // this.current = new Node(0,imgSrc[0]); // you can't use this.current =this.head
        this.setCurrentNode(0);
    }
}

/**
 * insert node
 * @param {Number} index
 * @param {Object} node
 */
CircularList.prototype.insertNode = function (index, node) {
    if (this.head == null) {
        console.log('insert node at:' + index);
        node.prev = null;
        node.next = null;
        this.head = node;
    } else {
        console.log('insert node at:' + index);
        this.getNodeByindex(index - 1).next = node;
        node.prev = this.getNodeByindex(index - 1);
    }
}

/**
 * removeNode
 * @param {Number} index
 * @param {Object} node
 */
CircularList.prototype.removeNode = function (index, node) {
    this.length--;
}

/**
 * set current Node
 * @param {Number} index
 */
CircularList.prototype.setCurrentNode = function (index) {
    var _current, _lastCurrent;
    _lastCurrent = this.current;
    if (_lastCurrent) {
        if (index >= 0 && index < this.length) {
            _current = new Node(index, imgSrc[index]);
            _current.prev = _lastCurrent;
            _current.next = this.getNodeByindex(index).next;
            this.current = _current;
        } else {
            console.log('set current node error:' + index + '!');
        }
    } else {
        this.current = new Node(0, imgSrc[0]);
        this.current.prev = this.head.prev;
        this.current.next = this.head.next;
    }
}

/**
 * set head Node
 */
CircularList.prototype.setHeadNode = function () {
    var _head;
    if (this.length == 0) {
        this.head = null;
        this.head.prev = null;
        this.head.next = null;
    } else {
        _head = this.getNodeByindex(0);
        this.head = new Node(0, imgSrc[0]);
        this.head.prev = _head.prev;
        this.head.next = _head.next;
    }
}

/**
 * get object node by index
 * @param {Number} index
 */
CircularList.prototype.getNodeByindex = function (index) {
    var p = this.head;
    for (var i = 0; i < this.length; i++) {
        if (i == index) {
            return p;
        } else {
            p = p.next;
        }
    }
}

/**
 * print all nodes information
 */
CircularList.prototype.printAllNodes = function () {
    for (var i = 0; i < this.length; i++) {
        console.log('node' + i + ':' + this.getNodeByindex(i).toString());
    }
}

/**
 * setIntervalTimer
 */
CircularList.prototype.autoMove = function () {
    var that = this;
    if (toggleTimer) {
        clearInterval(toggleTimer);
        toggleTimer = null;
    }
    toggleTimer = setInterval(function () {
        console.log(that.current);
        that.current.animate(animateTime, domImgLunBo, domImgNum, 1);
        that.current = that.current.next;
    }, toggleTime * 1e3);
}

/**
 * create dom
 * @param {Object} domParent
 */
CircularList.prototype.initImages = function (domParent /* , length */ ) {
    domParent.innerHTML = '';
    domParent.innerHTML += '<li><a><img id="previous-img" src=""></a></li>';
    domParent.innerHTML += '<li><a><img id="current-img" src=""></a></li>';
    domParent.innerHTML += '<li><a><img id="next-img" src=""></a></li>';
    domParent.style.width = picWidth * 3 + 'px';
    domParent.style.left = -picWidth + 'px';
}

/**
 * init dots
 * @param {Object} domParent
 * @param {Number} length
 */
CircularList.prototype.initDots = function (domParent, length) {
    domParent.innerHTML = '';
    for (var i = 0; i < length; i++) {
        domParent.innerHTML += '<li><a></a></li>';
    }
    domParent.getElementsByTagName('a')[this.current.prev.index].className = '';
    domParent.getElementsByTagName('a')[this.current.index].className = 'current';
}


/**
 * picture node
 * @param {Number} index
 * @param {String} img
 */
function Node(index, img) {
    this.img = img;
    this.index = index;
    this.prev = null; //point to previous node and next node
    this.next = null;
    this.init();
}

/**
 * init Node
 */
Node.prototype.init = function () {}

/**
 *
 * @param {Object} domImg
 * @param {Object} domNum
 */
Node.prototype.setFocus = function (domImg, domNum) {
    $('current-img').src = this.img;
    $('previous-img').src = this.prev.img;
    $('next-img').src = this.next.img;
    domImg.style.left = -picWidth + 'px';
}

/**
 *
 * @param {Number} direction if direction>0,right;if direction<0,left;
 * @param {Number} time
 * @param {Object} dom
 */
Node.prototype.animate = function (time, domImg, domNum, direction) {
    var that = this;
    var speed = picWidth / (time * 40);
    domNum.getElementsByTagName('a')[this.index].className = '';
    domNum.getElementsByTagName('a')[this.next.index].className = 'current';
    if (animateTimer) {
        clearInterval(animateTimer);
        animateTimer = null;
    }
    animateTimer = setInterval(function () {
        if (direction > 0) {
            if (parseInt(domImg.style.left) <= -400 && parseInt(domImg.style.left) > -800) {
                domImg.style.left = parseInt(domImg.style.left) - speed + 'px';
            } else {
                clearInterval(animateTimer);
                animateTimer = null;
                that.next.setFocus(domImg, domNum);
            }
        } else if (direction < 0) {
            if (parseInt(domImg.style.left) <= -400 && parseInt(domImg.style.left) > 0) {
                domImg.style.left = parseInt(domImg.style.left) + speed + 'px';
            } else {
                clearInterval(animateTimer);
                animateTimer = null;
                that.next.setFocus(domImg, domNum);
            }
        } else {
            console.log('wzh--->direction error');
        }
    }, 1000 / 40);
}

// main
var circularList1 = new CircularList(imgSrc.length);
console.log('circularList1.head:');
console.log(circularList1.head);
console.log('circularList1.current:');
console.log(circularList1.current);