module.exports = {
    
    events: {},

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if(!this.events.hasOwnProperty(event)) {
           this.events[event] = []; 
        }
        
        this.events[event].push([subscriber, handler.bind(subscriber)]);
        
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        
      for (var i = this.events[event].length - 1; i > 0; i--) {
        if (this.events[event][i][0] === subscriber) {
          this.events[event].splice(i, 1);
        }
      }
        
        return this;

    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.events[event].length > 0){
            for (var i = 0; i < this.events[event].length; i++){
                var funcHandler = this.events[event][i][1];
                funcHandler();
            }
        }
        return this;

    }
};
