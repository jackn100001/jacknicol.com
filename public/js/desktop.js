$(document).ready(function() {
	// var dt = new Date();
	// var ampm = (dt.getHours() >= 12) ? "PM" : "AM";
	// var time = dt.getHours().toString().padStart(2, '0') + ":" + dt.getMinutes().toString().padStart(2, '0') + " " + ampm;
	
	// $(".datetime").text(time);
	startTime();


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

function startTime() {
  	var today = new Date();

	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0');
	var yyyy = today.getFullYear();
	var currentDate = dd + '/' + mm + '/' + yyyy;

	var h = today.getHours();
  	var m = today.getMinutes();
  	m = checkTime(m);

  	$(".datetime").text(currentDate + " " + h + ":" + m);

  	var t = setTimeout(startTime, 1000);
}


function checkTime(i) {
	if (i < 10) {i = "0" + i};
 	return i;
}