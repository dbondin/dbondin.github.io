var MYAPP = {

    onPageLoad : function() {
	var md = $(".nav-item.active").attr("md");
	MYAPP.loadContent(md);
    }
    ,
    loadContent : function(md) {
	jQuery.ajax({
	    type: "GET",
	    url: md,
	    dataType: "text"
	}).then(
	    function(data, status, xhr) {
		$("#myapp-content").html(MYAPP.converter.makeHtml(data));
	    },
	    function(xhr, status, error) {
		$("#myapp-content").html("Error loading page ...");
		console.error(error);
	    }
	);
    }	
    ,
    onNavItemClick : function(item) {
	$(".nav-item").removeClass("active");
	$(item).addClass("active");
	var md = $(item).attr("md");
	MYAPP.loadContent(md);
    }
    ,
    converter : new showdown.Converter()
};
