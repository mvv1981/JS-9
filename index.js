/**
 * Барабаш Максим Сергеевич
 */
module.exports = {
    eventList: [],
    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        this.eventList.push({
            event,
            subscriber,
            handler
        });
        return this
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        for (let i = this.eventList.length - 1; i > 0; i--) {
            if ((this.eventList[i].event === event)&&(this.eventList[i].subscriber === subscriber)) {
                this.eventList.splice(i, 1);
            }
        }
        return this
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        for (let i = 0; i < this.eventList.length; i++) {
            if(this.eventList[i].event === event) {
                this.eventList[i].handler.call(this.eventList[i].subscriber)
            }
        }
        return this
    }
};
