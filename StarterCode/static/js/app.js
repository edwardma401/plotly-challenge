
// d3.json("samples.json").then( function(data) {

//     // dropdown menus
//     var thosenames = data.names;
//     console.log(thosenames);
    
//     var select = document.getElementById("selDataset"); 
//     var options = thosenames; 

//     for(var i = 0; i < options.length; i++) {
//         var opt = options[i];
//         select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
//     }
//     //

//     // initial data
//     var dropdownMenu = d3.select("#selDataset");
    
//     var dataset = dropdownMenu.property("value");
    
 
//     var filteredData = data.samples.filter(d => d.id == dataset)
//     console.log(filteredData)

//     var theValues = filteredData[0].sample_values.slice(0,10);
//     console.log(theValues);
//     var theIds = filteredData[0].otu_ids.slice(0,10);
//     console.log(theIds);
//     var theLabels = filteredData[0].otu_labels.slice(0,10);
//     console.log(theLabels);

//     var trace1 = {
//         x: theIds,
//         y: theValues,
//         type:"bar"
//     };
//     var data1 = [trace1];

//     var layout ={
//         title:"top 10 OTUs found in individual"
//     };

//     Plotly.newPlot("bar", data1, layout)
//     //

//     // when clicked dropdown menu
//     d3.selectAll("#selDataset").on("change", optionChanged);
//     function optionChanged() {    // optionChanged
    
//     var dropdownMenu = d3.select("#selDataset");

//     var dataset = dropdownMenu.property("value");
    
 
//     var filteredData = data.samples.filter(d => d.id == dataset)
//     console.log(filteredData)

//     var theValues = filteredData[0].sample_values.slice(0,10);
//     console.log(theValues);
//     var theIds = filteredData[0].otu_ids.slice(0,10);
//     console.log(theIds);
//     var theLabels = filteredData[0].otu_labels.slice(0,10);
//     console.log(theLabels);

//     var trace2 = {
//         x: theIds,
//         y: theValues,
//         type:"bar"
//     };
//     var data2 = [trace2];

//     var layout ={
//         title:"top 10 OTUs found in individual"
//     };

//     Plotly.restyle("bar", data2, layout)

//     }  // optionChanged
// }

// )


// drop down menu
d3.json("samples.json").then( function(data) {

    // dropdown menus
    var thosenames = data.names;
    console.log(thosenames);
    
    var select = document.getElementById("selDataset"); 
    var options = thosenames; 

    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        select.innerHTML += "<option value=\"" + opt + "\">" + opt + "</option>";
    } // dropdown menus
    
    var defaultfilteredData = data.samples.filter(d => d.id == "940"); 
    var defaultmetadata = data.metadata.filter(d => d.id == "940");
    console.log(defaultmetadata)
    // default plot
    function init() {

        // var filteredData = data.samples.filter(d => d.id == "940"); 
        

        var theValues = defaultfilteredData[0].sample_values.slice(0,10);
        
        var theIds = defaultfilteredData[0].otu_ids.slice(0,10);
         
        var theLabels = defaultfilteredData[0].otu_labels.slice(0,10);
        
        var data1 = [{
            type: 'bar',
            x: theValues,
            y: theIds,
            orientation: 'h',
            marker: { width: 100},
            text: theLabels
          }];
          
          Plotly.newPlot('bar', data1);
        
        var defaultbubbleValues = defaultfilteredData[0].sample_values;
        var defaultbubbleIds = defaultfilteredData[0].otu_ids;
        var defaultbubbleLabels = defaultfilteredData[0].otu_labels;
        var defaulttracebubble = {
            x: defaultbubbleIds,
            y: defaultbubbleValues,
            text: defaultbubbleLabels,
            mode: "markers",
            marker: {
                size: defaultbubbleValues,
                color: defaultbubbleIds
            }
        };
        var defaultbubbledata = [defaulttracebubble];
        var defaultbubblelayout = {
            title: "Microbiome in the bellybutton of selected individual"
            ,showlegend: false
        };
        Plotly.newPlot("bubble", defaultbubbledata, defaultbubblelayout);

      
        var defaultentries = Object.entries(defaultmetadata[0]);
        console.log(defaultentries);
        for(var i=0; i < defaultentries.length; i++) {
            var elem = document.createElement('li');
            elem.innerHTML = defaultentries[i];
            document.getElementById('sample-metadata').append(elem);
          };

   }// default plot


   // on changing drop down menus, call optionChanged
   d3.selectAll("#selDataset").on("change", optionChanged );
   
   function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    var dataset = dropdownMenu.property("value");
    var data1 = [];
    var filteredData = data.samples.filter(d => d.id == dataset);
    var newValues = filteredData[0].sample_values.slice(0,10);
        
    var newIds = filteredData[0].otu_ids.slice(0,10);
     
    var newLabels = filteredData[0].otu_labels.slice(0,10);

    var data1 = [{
        type: 'bar',
        x: newValues,
        y: newIds,
        orientation: 'h',
        marker: { width: 100}
      }];
      
      Plotly.newPlot('bar', data1);
    
    var bubbleValues = filteredData[0].sample_values;
    var bubbleIds = filteredData[0].otu_ids;
    var bubbleLabels = filteredData[0].otu_labels;

    var traceBubble = {
        x: bubbleIds,
        y: bubbleValues,
        text: bubbleLabels,
        mode: "markers",
        marker: {
            size:bubbleValues,
            color:bubbleIds

        }
    };
    var data2 = [traceBubble];
    var layout2 ={
        title: "Bubble Chart",
        showlegend: false,
    }
    Plotly.newPlot("bubble", data2, layout2)

    d3.selectAll("li").remove()
    var newmetadata = data.metadata.filter(d => d.id == dataset);

    var newentries = Object.entries(newmetadata[0]);
        console.log(newentries);
        for(var i=0; i < newentries.length; i++) {
            var elem = document.createElement('li');
            elem.innerHTML = newentries[i];
            document.getElementById('sample-metadata').append(elem);
          };

   } // optionChanged



    //default
    init()
    // default
}



)
