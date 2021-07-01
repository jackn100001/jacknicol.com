$(document).ready(function() {
	// var dt = new Date();
	// var ampm = (dt.getHours() >= 12) ? "PM" : "AM";
	// var time = dt.getHours().toString().padStart(2, '0') + ":" + dt.getMinutes().toString().padStart(2, '0') + " " + ampm;
	
	// $(".datetime").text(time);
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
						$windowElem.find(".window-content .icon-row").append(res)
					}
					
				}
			})

			$("body").append($windowElem);
		}
	});
});

$(document).on("click", ".close-window", function() {
	$(this).closest(".window").remove();
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