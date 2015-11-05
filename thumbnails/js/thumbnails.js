(function () {
  var Thumbnail = $.Thumbnail = function (el) {
    this.$el = $(el)
    this.$activeImg = this.$el.find("div.gutter-images img:first-child");
    this.activate(this.$activeImg);
  };

  Thumbnail.prototype.activate = function($img) {
    var $cloneImg = $img.clone();
    this.$el.find(".active").append($cloneImg);
  };

  Thumbnail.prototype.handleClick = function(event) {

  }

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnail(this);
    });
  };

})();
