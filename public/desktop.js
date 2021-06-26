$(document).ready(function() {
	var dt = new Date();
	var ampm = (dt.getHours() >= 12) ? "PM" : "AM";
	var time = dt.getHours().toString().padStart(2, '0') + ":" + dt.getMinutes().toString().padStart(2, '0') + " " + ampm;
	
	$(".datetime").text(time);

	$(".icon").on("click", function() {
		var windowName = $(this).data('window');

		if ($("#" + windowName).length == 0 && windowName != "none") {
			var $windowElem = $("#window-template").clone();
			$windowElem.attr("id", windowName);
			$windowElem.removeClass("hidden");
			$windowElem.draggable();
			$windowElem.find(".window-title").append(windowName + ".txt");

			$.ajax({
				url: "/text-file?filename=" + windowName,
				type: "GET",
				success: function(res) {
					$windowElem.find(".window-content textarea").val(res)
				}
			})

			$("body").append($windowElem);
		}
	});
});

$(document).on("click", ".close-window", function() {
	$(this).closest(".window").remove();
});