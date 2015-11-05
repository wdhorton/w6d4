(function () {
  var Thumbnail = $.Thumbnail = function (el) {
    this.$el = $(el)
    this.$activeImg = this.$el.find("div.gutter-images img:first-child");
    this.activate(this.$activeImg);
    this.bindEvents();
    this.gutterIdx = 0;
    this.$images = this.$el.find(".gutter-images img");
    this.fillGutterImages();
  };

  Thumbnail.prototype.bindEvents = function () {
    this.$el.find(".gutter-images").on("click", "img", this.handleClick.bind(this));
    this.$el.find(".gutter-images").on("mouseenter", "img", this.handleMouseEnter.bind(this));
    this.$el.find(".gutter-images").on("mouseleave", "img", this.handleMouseLeave.bind(this));
    this.$el.find(".gutter a.nav.left").on("click", this.nav.bind(this, -1));
    this.$el.find(".gutter a.nav.right").on("click", this.nav.bind(this, 1));
  };

  Thumbnail.prototype.activate = function($img) {
    this.$el.find(".active").empty();
    var $cloneImg = $img.clone();
    this.$el.find(".active").append($cloneImg);
  };

  Thumbnail.prototype.handleClick = function(event) {
    var $newImg = $(event.currentTarget);
    this.$activeImg = $newImg;
    this.activate($newImg);
  }

  Thumbnail.prototype.handleMouseEnter = function (event) {
    var $newImg = $(event.currentTarget);
    this.activate($newImg);
  };

  Thumbnail.prototype.handleMouseLeave = function (event) {
    this.activate(this.$activeImg);
  };

  Thumbnail.prototype.fillGutterImages = function () {
    var $gutterImages = this.$el.find(".gutter-images");
    $gutterImages.empty();

    for (var i = this.gutterIdx; i < this.gutterIdx + 5; i++) {
      $gutterImages.append(this.$images[i]);
    }
  };

  Thumbnail.prototype.nav = function (dir) {
    this.gutterIdx += dir;
    this.fillGutterImages();
  };

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnail(this);
    });
  };

})();
