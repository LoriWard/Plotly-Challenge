
// Use the D3 library to read in samples.json

function BuildStartUpPage() {
  d3.json("./data/samples.json").then(function(data) {
    var names = data.names;

    
    var select = d3.select("#selDataset");
    
    names.forEach(id => {
      var option = select.append("option");
      option.text(id);
    })

//Build bar chart
  buildBarChart(data, 940);

//Build bubble chart
  BuildBubbleChart(data, 940);

//Build data panel
  buildMDataPanel(data, 940);
    
  });
};

BuildStartUpPage();


//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

function buildBarChart(data, variableID){

//Create variables

  var samples = data.samples;  

  var dataId = samples.filter(sample =>sample.id == variableID);
  
  var Ids10 = dataId[0].otu_ids.slice(0,10);

  var IdsAsString = Ids10.map(Id => "OTU "+Id);

  var sample_value10 = dataId[0].sample_values.slice(0,10).reverse();
  
  var sample_labels10 = dataId[0].otu_labels.slice(0,10);

//Create the trace, layout and the plot

var trace1 = {
  x: sample_value10,
  y: IdsAsString,
  type: 'bar',
  orientation : "h",
  text: sample_labels10,
  marker: {
    color: 'orange'
  }
};

var data = [trace1];

var layout = {
  title: 'Top 10 OTUs found in sample',
  font:{
    family: 'Raleway, sans-serif'
  },
  showlegend: false,
  yaxis: {
    zeroline: false,
    gridwidth: 2
  },
  bargap: 0.1
};

Plotly.newPlot("bar", data, layout);

};

//Create a bubble chart that displays each sample.

function BuildBubbleChart(data, variableID){

//Create variables

  var samples = data.samples;    
  var dataId = samples.filter(sample =>sample.id == variableID);
  var Ids = dataId[0].otu_ids;
  var sample_value = dataId[0].sample_values;
  var sample_labels = dataId[0].otu_labels;
 
// Create the trace, layout and the plot

var trace1 = {
  x: Ids,
  y: sample_value,
  text: sample_labels,
  mode: 'markers',
  marker: {
    color: Ids,
    size: sample_value
  }
};

var data = [trace1];

var layout = {
  title: 'OTU ID for each sample',
  showlegend: false,
  height: 500,
  width: 1000,
  xaxis: {
    visible: true,
    title: {
      text: "OTU ID"}
  }
};

Plotly.newPlot("bubble", data, layout);

};


//Display the sample metadata, i.e., an individual's demographic information.

function buildMDataPanel (data, variableID){

  var mData = data.metadata.filter( d => d.id == variableID)[0];
  
  var div = d3.select("#sample-metadata");
    
    div.html("");
  Object.entries(mData).forEach(([key, value]) => {
    var p = div.append("p");
    p.text(`${key}: ${value}`);
  });
};



//Function to get the data

function getData(){

  var dropdownMenu = d3.select("#selDataset");
  
  var variableID = dropdownMenu.property("value");
  console.log(variableID);
  
  BuildWithFilter(variableID);
};


//Function to build the plots 

function BuildWithFilter(variableID) {
  d3.json("./data/samples.json").then(function(data) {
   
  buildBarChart(data, variableID);

  BuildBubbleChart(data, variableID);

  buildMDataPanel(data, variableID);


  });
};


 

  