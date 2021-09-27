window.addEventListener('load', function() {

    var colorSelection = document.getElementsByClassName('color');

    for (var i = 0; i < colorSelection.length; i++) {
        (function(index) {
            colorSelection[index].addEventListener("click", function() {
                for (var x = 0; x < colorSelection.length; x++) {
                    (function(index2) {
                        colorSelection[index2].classList.remove("active");
                    })(x);
                }
                colorSelection[index].classList.add("active");
            });
        })(i);
    }

    document.getElementById("closeMobileMenu").addEventListener("click", closeMobileMenu);

    function closeMobileMenu() {
        document.getElementById("mobileMenuContent").style.display = "none";

        document.getElementById("bodyPage").style.height = "auto";
        document.getElementById("bodyPage").style.overflow = "auto";
    }


    document.getElementById("showMobileMenu").addEventListener("click", showMobileMenu);

    function showMobileMenu() {
        document.getElementById("mobileMenuContent").style.display = "block";

        document.getElementById("bodyPage").style.height = "100vh";
        document.getElementById("bodyPage").style.overflow = "hidden";

    }


    //carusel
    var controlCarusel = document.getElementsByClassName('controlCarusel');

    for (var i = 0; i < controlCarusel.length; i++) {
        (function(index) {
            controlCarusel[index].addEventListener("click", function() {
                var photoName = controlCarusel[index].getAttribute('main');
                document.getElementById("mainPhotoCarusel").setAttribute('src', 'assets/images/' + photoName);
            });
        })(i);
    }
});