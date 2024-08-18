//to make it hide the nav tag

var element = document.getElementById("contact");

var bounding = element.getBoundingClientRect();

var navTag = document.getElementById("navTag");

var headDoc = document.getElementById("head-doc");

function isInViewport(element) {
    // Get the bounding client rectangle position in the viewport
    var bounding = element.getBoundingClientRect();
    
    // Checking part. Here the code checks if it's *fully* visible
    // Edit this part if you just want a partial visibility
    if (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        console.log('In the viewport! :)');
        return true;
    } else {
        console.log('Not in the viewport. :(');
        return false;
    }
}

window.addEventListener('scroll', function (event){
    if (isInViewport(element)){
        navTag.style.display = 'none';
    }

    else {
        navTag.style.display = 'block';
    }
}, false)

