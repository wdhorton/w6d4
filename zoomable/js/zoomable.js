(function () {
  var Zoomable = $.Zoomable = function ($el) {
    this.$el = $el;

    this.$el.on("mousemove", this.showFocusBox.bind(this));
    this.$el.on("mouseleave", this.removeFocusBox.bind(this));
    this.size = "100px";
  };

  Zoomable.prototype.showFocusBox = function (event) {
    console.log(event.clientX, event.clientY);
    $(".zoomed-image").remove();
    var $focusBox = this.$el.find("div.focus-box");

    if ($focusBox.length === 0) {
      $focusBox = $("<div class='focus-box'></div>");
      $focusBox.css({"height": this.size, "width": this.size});
      this.$el.append($focusBox);
    }

    $focusBox.css({"top": event.clientY, "left": event.clientX});
    this.showZoom(event.clientX, event.clientY);
  };

  Zoomable.prototype.removeFocusBox = function (event) {
    var $focusBox = this.$el.find("div.focus-box");
    $focusBox.remove();
    $(".zoomed-image").remove();
  };

  Zoomable.prototype.showZoom = function (xDiff, yDiff) {
    $zoomedImg = $("<div class='zoomed-image'></div>");
    $("body").append($zoomedImg);

    var height = $(window).height();
    var string = (-6 * xDiff) + "px " + (-4.5 * yDiff) + "px"

    $zoomedImg.css({
      "width": height + "px",
      "height": height + "px",
      "background-image": 'url(http://cdn.wonderfulengineering.com/wp-content/uploads/2013/12/high-definition-desktop-download-3.jpg)',
      "background-size": "300%",
      "background-position": string
    });

  }

  $.fn.zoomable = function () {
    return this.each(function () {
      new $.Zoomable($(this));
    });
  };
})();
