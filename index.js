module.exports = {

sub_ev: {}, // объект, хранящий событие

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) { 
        if (subscriber == undefined){
            return this;
        }
        if (!this.sub_ev.hasOwnProperty(event)){
            this.sub_ev[event] = [];
        }
        this.sub_ev[event].push({
            subscriber: subscriber,
            handler: handler.bind(subscriber)
        });
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {          
        if (!this.sub_ev.hasOwnProperty(event)){
            return this;
        } 
        if (subscriber == undefined){ // почему ===
            delete this.sub_ev[event];
        }
        else if (this.sub_ev.hasOwnProperty(event)){
            for (var i = this.sub_ev[event].length - 1; i >= 0; --i){
                if (this.sub_ev[event][i].subscriber === subscriber){
                    this.sub_ev[event].splice(i, 1);
                }
            }
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.sub_ev.hasOwnProperty(event) && this.sub_ev[event].length > 0){
            for (var i = 0; i < this.sub_ev[event].length; i++){
                this.sub_ev[event][i].handler();
            }
        }
        return this;
    }
};
