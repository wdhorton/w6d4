(function () {
  $.Tabs = function (el) {
    this.$el = $(el);
    this.$contentTabs = $(this.$el.attr("data-content-tabs"));
    this.$activeTab = this.$contentTabs.find(".active");
    this.$el.on("click", "a", this.clickTab.bind(this));
  };

  $.Tabs.prototype.clickTab = function (event) {
    event.preventDefault();
    var oldLink = this.$el.find("a.active");
    oldLink.removeClass("active");
    this.$activeTab.removeClass("active").addClass("transitioning");
    var $link = $(event.currentTarget);
    $link.addClass("active");
    var id = $link.attr("href");

    this.$activeTab.one("transitionend", function () {
      this.$activeTab.removeClass("transitioning")

      this.$activeTab = $(id);

      this.$activeTab.addClass("active transitioning");
      setTimeout(function() {
        this.$activeTab.removeClass("transitioning");
      }.bind(this), 0)
    }.bind(this));

  };



  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };

})();
