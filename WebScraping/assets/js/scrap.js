$(document).ready(function(){
	$("#btn-scraping-search").click(function(){
		var searchValue = $("#inp-scraping-search").val();
		$("#pagination-scrap").find('li').remove();
		$('#table-scrap-result tbody').find('tr').remove();
		$.ajax({
			url : base_url + "ControllerScraping/searchForScrap",
			cache:false,
			type:'POST',
			data:{data:searchValue},
			success:function(response){
				$.each(response[0]['data'] , function(index, value){
					var element = '<tr>'
									+'<td>'+$(value.title).text()+'</td>'
									+'<td>'+value.meta+'</td>'
									+'<td> <a href="'+value.link+'">'+value.link+'</a></td>'
								+'</tr>';
					$('#table-scrap-result tbody').append(element);
				});
				var lastIndex = response[0]['pagination'].length;
				var element = '<li class="page-item scrap-item">'
									+'<button class="btn btn-link page-link"><i class="fa fa-angle-left"></i></button>'
								+'</li>'
								+'<li class="page-item scrap-item">'
									+'<button class="btn btn-link page-link" link="https://www.google.co.id/search?q='+searchValue.replace(/ /g, '+')+'">1</button>'
								+'</li>';
				$("#pagination-scrap").append(element);
				$.each(response[0]['pagination'], function(index, value){
					if(index !== lastIndex-1 && index !== 0 && index !== 1){
						var text = $(value).text();
						var link = $(value).find('a').attr('href');
						console.log(link);
						var element = '<li class="page-item scrap-item">'
										+'<button class="btn btn-link page-link" link="https://www.google.co.id'+link+'">'+text+'</button>'
									+'</li>';
						$("#pagination-scrap").append(element);
					}
				});
				var element = '<li class="page-item scrap-item">'
									+'<button class="btn btn-link page-link"><i class="fa fa-angle-right"></i></button>'
								+'</li>';
				$("#pagination-scrap").append(element);
			}
		});
	});

	$('#pagination-scrap').on('click','.page-link',function(){
  		console.log($(this).attr('link'));
  		var link = $(this).attr('link');
  		$('#table-scrap-result tbody').find('tr').remove();
  		$.ajax({
  			url : base_url + "ControllerScraping/searchForScrapPaging",
  			type : 'POST',
  			cache : false,
  			data : {data:link},
  			success:function(response){
  				console.log(response);
  				$.each(response[0]['data'] , function(index, value){
					var element = '<tr>'
									+'<td>'+$(value.title).text()+'</td>'
									+'<td>'+value.meta+'</td>'
									+'<td> <a href="'+value.link+'">'+value.link+'</a></td>'
								+'</tr>';
					$('#table-scrap-result tbody').append(element);
				});
				var lastIndex = response[0]['pagination'].length;
				var element = '<li class="page-item scrap-item">'
									+'<button class="btn btn-link page-link"><i class="fa fa-angle-left"></i></button>'
								+'</li>'
								+'<li class="page-item scrap-item">'
									+'<button class="btn btn-link page-link" link="https://www.google.co.id/search?q='+searchValue.replace(/ /g, '+')+'">1</button>'
								+'</li>';
				$("#pagination-scrap").append(element);
				$.each(response[0]['pagination'], function(index, value){
					if(index !== lastIndex-1 && index !== 0 && index !== 1){
						var text = $(value).text();
						var link = $(value).find('a').attr('href');
						console.log(link);
						var element = '<li class="page-item scrap-item">'
										+'<button class="btn btn-link page-link" link="https://www.google.co.id'+link+'">'+text+'</button>'
									+'</li>';
						$("#pagination-scrap").append(element);
					}
				});

  			}
  		});
	});

});
