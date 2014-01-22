/*
 *	check dependencies
 */

/**
 * A simple FIFO queue.	Items are added to the Queue with add(1..n items) and
 * removed using next().
 *
 * @class LCARSQueue
 * @param item* {MIXED} 0..n items to seed the queue
 */
function LCARSQueue() {
	this._init();
	this.add.apply(this, arguments);
}

LCARSQueue.prototype = {
	/**
	 * Initialize the queue
	 *
	 * @method _init
	 * @protected
	 */
	_init : function () {
		/**
		 * The collection of enqueued items
		 *
		 * @property _q
		 * @type {Array}
		 * @protected
		 */
		this._q = [];
	},

	/**
	 * Get the next item in the queue.
	 *
	 * @method next
	 * @return {MIXED} the next item in the queue
	 */
	next : function () {
		return this._q.shift();
	},

	/**
	 * Add 0..n items to the end of the queue
	 *
	 * @method add
	 * @param item* {MIXED} 0..n items
	 */
	add : function () {
		Y.Array.each(Y.Array(arguments,0,true),function (fn) {
			this._q.push(fn);
		},this);

		return this;
	},

	/**
	 * Returns the current number of queued items
	 *
	 * @method size
	 * @return {Number}
	 */
	size : function () {
		return this._q.length;
	}
};

LCARSAbstract.Queue = LCARSQueue;
