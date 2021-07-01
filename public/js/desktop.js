$(document).ready(function() {
	startTime();

	$(".icon").on("click", function() {
		var windowName = $(this).data("window");
		var windowType = $(this).data("type");

		if ($("#" + windowName).length == 0 && windowName != "none") {
			var $windowElem = $("#window-template").clone();
			$windowElem.attr("id", windowName);
			$windowElem.removeClass("hidden");
			$windowElem.draggable();

			var url = "/window?type=" + windowType + "&filename=" + windowName;

			$.ajax({
				url: url,
				type: "GET",
				success: function(res) {
					if (windowType == "text-file") {
						$windowElem.find(".window-title").html("<i class=\"fa fa-file-text\"></i> " + "<span>" + windowName + "</span>" + ".txt")
						$windowElem.find(".window-content").html("<textarea></textarea>")
						$windowElem.find(".window-content textarea").val(res)
					} else {
						$windowElem.find(".window-title").append(windowName);
						$windowElem.find(".window-title").html("<img src=\"images/folder-open-full.png\"> " + "<span>" + windowName + "</span>")
						$windowElem.find(".window-content").html("<div class=\"icon-row\"></div>")
						$windowElem.find(".window-content .icon-row").append(res);

						if (res != "") {
							$("div[data-window=\"" + windowName + "\"] > a").children("img:first").remove();
							$("div[data-window=\"" + windowName + "\"] > a").append("<img src=\"images/folder-open-full.png\" width=\"80px\" height=\"60px\">")
						}
					}
					
				}
			})

			$("body").append($windowElem);
		}
	});
});

$(document).on("click", ".close-window", function() {
	var windowName = $(this).closest(".window").attr("id");
	$(this).closest(".window").remove();
	// var windowName = $(this).parent().siblings(".window-title").find("span").text();
	$("div[data-window=\"" + windowName + "\"][data-type=\"folder\"] > a").children("img:first").remove();
	$("div[data-window=\"" + windowName + "\"][data-type=\"folder\"] > a").append("<img src=\"images/folder-closed-full.png\" width=\"80px\" height=\"60px\">")
});

function startTime() {
  	let today = new Date();

	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();
	let currentDate = dd + '/' + mm + '/' + yyyy;

	let h = today.getHours();
  	let m = today.getMinutes();
  	m = checkTime(m);

  	$(".datetime").text(currentDate + " " + h + ":" + m);

  	let t = setTimeout(startTime, 1000);
}

function checkTime(i) {
	if (i < 10) {i = "0" + i};
 	return i;
}