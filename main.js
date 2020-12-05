var MYAPP = {

    onPageLoad : function() {
	var anchor = $(location).attr("hash");
	var md = undefined;
	if(anchor !== undefined && anchor !== "") {
	    md = anchor.substring(1);
	}
	if(md === undefined || md === "") {
	    md = $(".nav-item.active").attr("href").substring(1);
	}
	MYAPP.switchNavItem(md);
	MYAPP.loadContent(md);
    }
    ,
    switchNavItem : function(md) {
	$(".nav-item").removeClass("active");
	$(".nav-item").each(function(index, element) {
	    if(md === $(element).attr("href").substring(1)) {
		$(element).addClass("active");
		return false; // stop the search
	    }
	});
    }
    ,
    loadContent : function(md) {
	jQuery.ajax({
	    type: "GET",
	    url: md + ".md",
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
	var md = $(item).attr("href").substring(1);
	MYAPP.switchNavItem(md);
	MYAPP.loadContent(md);
    }
    ,
    converter : new showdown.Converter()
};
