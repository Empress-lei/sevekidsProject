/*
	A simple class for displaying file information and progress
	Note: This is a yzmmnstration only and not part of SWFUpload.
	Note: Some have had problems adapting this class in IE7. It may not be suitable for your application.
*/

// Constructor
// file is a SWFUpload file object
// targetID is the HTML element id attribute that the FileProgress HTML structure will be added to.
// Instantiating a new FileProgress object with an existing file will reuse/update the existing DOM elements

function FileProgress(file, targetID) {
	
	this.fileProgressWrapper = $('#'+targetID);
	this.fileProgressWrapper.empty().show();
	$('<li><span class="page_gray">'+file.name+'-('+(file.size/1000000).toFixed(2)+'M)-已完成<span id="rate">0%</span></span></li>').appendTo(this.fileProgressWrapper);
	$('<li class="upload_app_block"><dt id="ProgressRate" style="background-color:#167dff; width:0%; height:4px;">&nbsp;</dt></li>').appendTo(this.fileProgressWrapper);
	this.fileProgressElement = $('#ProgressRate' , this.fileProgressWrapper );
	this.setTimer(null);
	/*this.fileProgressID = file.id;

	this.opacity = 100;
	this.height = 0;
	

	this.fileProgressWrapper = document.getElementById(this.fileProgressID);
	if (!this.fileProgressWrapper) {
		this.fileProgressWrapper = document.createElement("div");
		this.fileProgressWrapper.className = "progressWrapper";
		this.fileProgressWrapper.id = this.fileProgressID;

		this.fileProgressElement = document.createElement("div");
		this.fileProgressElement.className = "progressContainer";

		var progressCancel = document.createElement("a");
		progressCancel.className = "progressCancel";
		progressCancel.href = "#";
		progressCancel.style.visibility = "hidden";
		progressCancel.appendChild(document.createTextNode(" "));

		var progressText = document.createElement("div");
		progressText.className = "progressName";
//		progressText.appendChild(document.createTextNode(file.name));

		var progressBar = document.createElement("div");
		progressBar.className = "progressBarInProgress";

		var progressStatus = document.createElement("div");
		progressStatus.className = "progressBarStatus";
		progressStatus.innerHTML = "&nbsp;";

		this.fileProgressElement.appendChild(progressCancel);
		this.fileProgressElement.appendChild(progressText);
		this.fileProgressElement.appendChild(progressStatus);
		this.fileProgressElement.appendChild(progressBar);

		this.fileProgressWrapper.appendChild(this.fileProgressElement);

		document.getElementById(targetID).appendChild(this.fileProgressWrapper);
	} else {
		this.fileProgressElement = this.fileProgressWrapper.firstChild;
		this.reset();
	}

	this.height = this.fileProgressWrapper.offsetHeight;
	this.setTimer(null);*/


}

FileProgress.prototype.setTimer = function (timer) {
	this.fileProgressElement["FP_TIMER"] = timer;
};
FileProgress.prototype.getTimer = function (timer) {
	return this.fileProgressElement["FP_TIMER"] || null;
};

FileProgress.prototype.reset = function () {
	this.fileProgressElement.width('0%').html('&nbsp;');
	this.appear();	
};

FileProgress.prototype.setProgress = function (percentage) {
	this.fileProgressElement.width(percentage+'%');
	$('#rate' , this.fileProgressWrapper).text(percentage+'%');
	this.appear();	
};
FileProgress.prototype.setComplete = function () {
	this.disappear();
};
FileProgress.prototype.setError = function () {
	this.disappear();
};
FileProgress.prototype.setCancelled = function () {
	
};
FileProgress.prototype.setStatus = function (status) {
	//this.fileProgressElement.childNodes[2].innerHTML = status;
};

// Show/Hide the cancel button
FileProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
};

FileProgress.prototype.appear = function () {
	if (this.getTimer() !== null) {
		clearTimeout(this.getTimer());
		this.setTimer(null);
	}
	

		
//	this.fileProgressWrapper.show();
	
};

// Fades out and clips away the FileProgress box.
FileProgress.prototype.disappear = function () {
	this.fileProgressWrapper.hide();
};