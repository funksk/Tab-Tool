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

	var filename = Date.now() + ".txt";

	chrome.downloads.download({
    url: URL.createObjectURL(blob),
    filename: filename,
  	});
	
}


document.getElementById("dlPics").addEventListener("click", dlAndDelPicTabs);
document.getElementById("dlTabUrls").addEventListener("click", dlTabsToTXT);
