//simply the function that gets the pngs etc.
//todo: enter dir you want the files to download into. only prompt upon descrepency


async function dlAndDelPicTabs()
{
	var tabs = await chrome.tabs.query({});
	var i = 0;

	tabs.forEach(function (tab)
	{
		if(tab.url.slice(-3) === 'png' || tab.url.slice(-3) === 'jpg')
		{
			//pngTabFName.push(tab.url.slice(tab.url.lastIndexOf('/')+1));
			chrome.downloads.download({
				url: tab.url
			})
			chrome.tabs.remove(tab.id);
		}

	});
}

function getCurDateFormatted()
{
	var curDate = new Date();
	
	var year = curDate.getFullYear();
	var month = String(curDate.getMonth() + 1).padStart(2, '0');
	var day = String(curDate.getDate()).padStart(2, '0');
		
	return `${year}-${month}-${day}`;
}

async function dlTabsToTXT()
{
	var tabs = await chrome.tabs.query({});
	var i = 0;
	var tabURLs = [];
	var fileContent = "";

	tabs.forEach(function (tab)
	{
		tabURLs.push(tab.url);
	});
	
	//ship them to a txt file, then dl them
	tabURLs.forEach(function (txt)
	{
		console.log(txt);
		fileContent += txt + '\n';
	});

	console.log(fileContent);

	var blob = new Blob([fileContent], { type: "text/plain" });
	
	var filename = getCurDateFormatted() + "_Tabs" + ".txt";

	chrome.downloads.download({
    url: URL.createObjectURL(blob),
    filename: filename,
  	});
	
}

async function dlTabsToCSV()
{
	var tabs = await chrome.tabs.query({});
	var i = 0;
	var tabURLs = [];
	var tabTitles = Array(1024);
	var fileContent = "Title,URL\n";

	tabs.forEach(function (tab)
	{
		tabURLs.push(tab.url);
		tabTitles[i] = tab.title;
		i++;
	});
	
	i = 0;
	
	//ship them to a txt file, then dl them
	tabURLs.forEach(function (txt)
	{
		console.log(txt);
		fileContent += tabTitles[i] + ',' + txt + '\n';
		i++;
	});

	console.log(fileContent);

	var blob = new Blob([fileContent], { type: "text/plain" });

	var filename = getCurDateFormatted() + "_Tabs" + ".csv";

	chrome.downloads.download({
    url: URL.createObjectURL(blob),
    filename: filename,
  	});
}

async function ulTabsFromTXT()
{
	var fileInput = document.getElementById("fileInput");
	var urlsIn = [];
	
	console.log("fileInput = ", fileInput);
	
	if(fileInput.files.length <= 0)
	{
		console.log("no input file selected");
		return;
	}
	
	var file = fileInput.files[0];
	
	var reader = new FileReader();
	reader.onload = function (event)
	{
		var fileContent = event.target.result;
		
		var urlArr = fileContent.split('\n');
		
		urlArr.forEach(function (urlIn)
		{
			chrome.tabs.create({
				url: urlIn
			});
		});
		
	};
	
	reader.readAsText(file);
	/*
	fileIn.forEach(function (urlIn)
	{
		chrome.tabs.create({
			url: 
		});
	});*/
}


document.getElementById("dlPics").addEventListener("click", dlAndDelPicTabs);
document.getElementById("dlTabUrls").addEventListener("click", dlTabsToTXT);
document.getElementById("dlTabsCSV").addEventListener("click", dlTabsToCSV);
document.getElementById("ulTabTxt").addEventListener("click", ulTabsFromTXT);

