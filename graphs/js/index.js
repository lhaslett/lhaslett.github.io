//fetch('data/out.csv')
FileReader.readAsDataURL('data/out.csv')
   .then(function (response) {
      return response.text();
   })
   .then(function (text) {
     let series = csvToSeries(text);
   	 //renderChart(series);
   })
   .catch(function (error) {
      //Something went wrong
      console.log(error);
   });

   function csvToSeries(text) {
   	const lifeExp = 'average_life_expectancy';
   	let dataAsJson = JSC.csv2Json(text);
   	let male = [], female = [];
   	dataAsJson.forEach(function (row) {
   		 //add either to male, female, or discard.
       if (row.race === 'All Races') {
       	if (row.sex === 'Male') {
       		//add data to male array
       		male.push({x: row.year, y: row[lifeExp]});
       	} else if (row.sex === 'Female') {
       		//add data to female array
       		female.push({x: row.year, y: row[lifeExp]}); } } });
       		console.log([male, female]);
          return [
   {name: 'Hive temperature', points: male},
   {name: 'Outside temperature', points: female}
];
   }

function renderChart(series){
	JSC.Chart('chartDiv', {
		title_label_text: 'Life Expectancy in the United States',
		annotations: [{
			label_text: 'Source: National Center for Health Statistics',
			position: 'bottom left'
		}],
		series: series
	});
}
