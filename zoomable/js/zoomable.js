(function () {
  var Zoomable = $.Zoomable = function ($el) {
    this.$el = $el;

    this.$el.on("mousemove", this.showFocusBox.bind(this));
    this.$el.on("mouseleave", this.removeFocusBox.bind(this));
    this.size = "100px";

  };

  Zoomable.prototype.showFocusBox = function (event) {
    var $focusBox = this.$el.find("div.focus-box");

    if ($focusBox.length === 0) {
      $focusBox = $("<div class='focus-box'></div>");
      $focusBox.css({"height": this.size, "width": this.size});
      this.$el.append($focusBox);
    }

    $focusBox.css({"top": event.offsetY, "left": event.offsetX});
    this.showZoom(event.offsetX, event.offsetY);
  };

  Zoomable.prototype.removeFocusBox = function (event) {
    var $focusBox = this.$el.find("div.focus-box");
    $focusBox.remove();
    this.$el.find("div.zoomed-image").remove();
  };

  Zoomable.prototype.showZoom = function (xDiff, yDiff) {
    $zoomedImg = $("<div class='zoomed-image'></div>");
    $("body").append($zoomedImg);
    $zoomedImg.css({
      "width": $(window).height,
      "height": $(window).height,
      "background-image": 'http://cdn.wonderfulengineering.com/wp-content/uploads/2013/12/high-definition-desktop-download-3.jpg',
      "background-size": "300%",
      "background-position": (xDiff * -3) + " " + (yDiff * -3)
    });

  }

  $.fn.zoomable = function () {
    return this.each(function () {
      new $.Zoomable($(this));
    });
  };
})();
