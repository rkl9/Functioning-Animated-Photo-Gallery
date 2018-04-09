// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
	
	
	
	$("#photo").attr("src", mImages[mCurrentIndex].img);
	
	
	$(".location").text("Location: " + mImages[mCurrentIndex].theLocation);
	$(".description").text("Description: " + mImages[mCurrentIndex].description);
	$(".date").text("Date: " + mImages[mCurrentIndex].date);
	
	if (mCurrentIndex < mImages.length - 1){
		
		mCurrentIndex++;
		
	}
	else {

		mCurrentIndex = 0;
		
	}
	console.log('swap photo');
	
}


$(document).ready( function() 
{
	// This initially hides the photos' metadata information
	$('.details').eq(0).hide();
	
	$('img.moreIndicator').click(function() 
	{
		
		if ( $(this).hasClass("rot90") ) 
		{
			$(this).removeClass("rot90");
			$(this).addClass("rot270");
			$( "div.details" ).fadeToggle( "slow", "linear" );
			
		}
		else
		{
			$(this).removeClass("rot270")
			$(this).addClass("rot90");
			$( "div.details" ).fadeToggle( "slow", "linear" );
		}
		
	});
	
	$('#prevPhoto').click(function() 
	{
		
		mLastFrameTime = 0;
		
		if (mCurrentIndex > 0)
		{
			mCurrentIndex = mCurrentIndex - 1;
		}
		else
		{
			
			mCurrentIndex = mImages.length - 1;

			
		}
		
	$("#photo").attr("src", mImages[mCurrentIndex].img);	
	$(".location").text("Location: " + mImages[mCurrentIndex].theLocation);
	$(".description").text("Description: " + mImages[mCurrentIndex].description);
	$(".date").text("Date: " + mImages[mCurrentIndex].date);
			
	});
	
	$('#nextPhoto').click(function() 
	{
		mLastFrameTime = 0;
		swapPhoto();
	});
	
});	
	


// Counter for the mImages array
var mCurrentIndex = 0;



// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json'


//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();
mRequest.open("GET", mUrl);
mRequest.send();

mRequest.onreadystatechange = function() 
{
	
		
        if (mRequest.readyState == 4 && mRequest.status == 200) 
		{
            try 
			{
                mJson = JSON.parse(mRequest.responseText);
                for (var i = 0; i < mJson.images.length; i++) 
				{
		        	var myLine = mJson.images[i];
		        	mImages.push(new GalleryImage(myLine.imgLocation, myLine.description, myLine.date, myLine.imgPath));
		        	
		    	}
            } 
			catch(err) 
			{
                console.log(err.message + " in " + mRequest.responseText);
                return;
            }
        }
    };




window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);

function GalleryImage(theLocation, description, date, img) {
	
	
	this.theLocation = theLocation;
    this.description = description;
    this.date = date;
    this.img = img;
	//implement me as an object to hold the following data about an image:
	//1. location where photo was taken
	//2. description of photo
	//3. the date when the photo was taken
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
}