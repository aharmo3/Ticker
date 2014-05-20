function getRecipes() {
	var searchCritera = "http://api.yummly.com/v1/api/recipes?_app_id=46ac308e&_app_key=16cf1340c02c27af105b7618247c5e16&q=chicken";
	$.ajax({
		url: searchCritera,
		dataType: 'jsonp',
		success: function (data) {
			var len = data.matches.length;
			for (var i = 0; i < len; i++) {
				var name = data.matches[i].recipeName;
				var imageurl = data.matches[i].smallImageUrls;
				   var username = data.matches[i].sourceDisplayName;
				   var rating = data.matches[i].rating;
				$('#recipeContainer').append("<div class='item'><div class='flleft'><img src='"+imageurl+"'/><br>Rating:"+rating+"</div><div class='flleft'><h3>"+name+"</h3>By:"+username+"</div>")
			}
		}
	});
}

