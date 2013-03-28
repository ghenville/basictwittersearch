// function to query Twitter for Tweets
function queryTwitter() {
  // clear display for new search results
	$('#error').empty();
	$("#result").empty();
	
	var searchterm = encodeURIComponent($("#searchterm").val().toString());
	
	// make call to Twitter API using AJAX
	$.ajax({
		url: "http://search.twitter.com/search.json",
		type: "post",
		data: { q: searchterm }, // get search term from user input
		dataType: "jsonp",
		success: function(data){	
			
			// go through results (Twitter returns first page with firt 15 records, paging to be added)
			$.each(data.results, function(key, val) {
				var listitem = document.createElement('li'); // create a new li item
				var itemtext = $("#result").append(listitem); // add li to ul tag
				itemtext.append(document.createTextNode(data.results[key].text + " - " + data.results[key].from_user_name)); // add Tweet and user name to current li
			});
			
			if (parseInt(data.results.length) < 1) $('#error').html("Your search did not return any results!"); // no results returned
		},
		error: function(xhr, textStatus, error){
			$('#error').html("Sorry, an error occcurred during your search!"); // error occurred
		}				
	});
}
