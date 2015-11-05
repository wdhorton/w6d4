(function () {
  $.Carousel = function (el) {
    this.$el = $(el);
    this.activeIdx = 0;
    this.$el.find("ul.items li:first-child").addClass("active");
    this.$el.find("ul.items li:nth-child(2)").addClass("right");
    this.$el.find(".slide-left").on("click", this.slideLeft.bind(this));
    this.$el.find(".slide-right").on("click", this.slideRight.bind(this));
  };

  $.Carousel.prototype.slideLeft = function () {
    this.slide(1);
  };

  $.Carousel.prototype.slideRight = function () {
    this.slide(-1);
  };

  $.Carousel.prototype.activePic = function () {
    return this.$el.find("ul.items li:nth-child(" + (this.activeIdx + 1) + ")");
  }

  $.Carousel.prototype.slide = function (n) {
    if (this.transitioning || this.activeIdx + n > this.$el.find("li").length - 1 || this.activeIdx + n < 0) {
      return;
    }

    this.transitioning = true;

    var $oldPic = this.activePic();

    if (n === 1) {
      $oldPic.addClass("left");
    } else {
      $oldPic.addClass("right");
    }

    $oldPic.one("transitionend", function () {
      $oldPic.removeClass("right left active");
      console.log(this);
      this.transitioning = false;
    }.bind(this));

    this.activeIdx += n;

    var $newActive = this.activePic();
    $newActive.addClass("active")

    if (n === 1) {
      $newActive.addClass("right");
    } else {
      $newActive.addClass("left");
    }

    setTimeout(function() {
      $newActive.removeClass("right left");
    }.bind(this), 0)
  };

  $.fn.carousel = function () {
    return this.each(function () {
      new $.Carousel(this);
    });
  };

})();
