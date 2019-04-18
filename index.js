let eventCollection = {};

module.exports = {
  /**
   * @param {String} event
   * @param {Object} subscriber
   * @param {Function} handler
   */
  on: function (event, subscriber, handler) {
    if (!eventCollection[event]) {
      eventCollection[event] = [[subscriber, handler]];
    } else {
      eventCollection[event].push([subscriber, handler]);
    }

    return this;
  },

  /**
   * @param {String} event
   * @param {Object} subscriber
   */
  off: function (event, subscriber) {
    if (eventCollection[event]) {
      for (let key in eventCollection[event]) {
        if (eventCollection[event][key][0] === subscriber) {
          delete eventCollection[event][key];
        }
      }

      if (Object.keys(eventCollection[event]).length == 0) {
        delete eventCollection[event];
      }
    }

    return this;
  },

  /**
   * @param {String} event
   */
  emit: function (event) {
    for (let key in eventCollection[event]) {
      eventCollection[event][key][1].call(eventCollection[event][key][0]);
    }

    return this;
  }
};
