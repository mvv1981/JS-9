module.exports = {
    actions: [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.actions.push({
            event,
            subscriber,
            handler
        })
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        for (var i = this.actions.length -1; i > 0; i--) {
            if ((this.actions[i].event === event) && (this.actions[i].subscriber === subscriber)) {
                this.actions.splice(i, 1);
            }
        }
        return this
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i].event === event) {
                this.actions[i].handler.call(this.actions[i].subscriber)
            }
        }
        return this
    }
};
