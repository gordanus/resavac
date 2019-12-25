$(document).ready(function () {
    var getWordsNew = function (masterword) {
        var result = {}
        var a, i, l;
        function nextLetter(a, l, key, used) {
            var i;
            var j;
            if (key.length == l) {
                return;
            }
            for (i = 0; i < l; i++) {
                if (used.indexOf("" + i) < 0) {
                    result[key + a[i]] = "";
                    nextLetter(a, l, key + a[i], used + i);
                }
            }
        }
        a = masterword.split("");
        l = a.length;
        for (i = 0; i < a.length; i++) {
            result[a[i]] = "";
            nextLetter(a, l, a[i], "" + i)
        }
        return Object.keys(result);
    }

    var output = document.getElementById('output');
    var info = document.getElementById('info');
    var spinner = document.getElementById('spinner');
    var btn = document.getElementById('btn');
    var dictArr = [];

    function compare(array1, array2) {
        var finalArr = [];

        array1.forEach((e1) => array2.forEach((e2) => {
            if (e1 === e2) {
                finalArr.push(e1);
            }
        }
        ));
        return finalArr;
    }

    $('#btn').click(function () {
        info.innerHTML = '';
        output.innerHTML = '';
        btn.value = "Sačekajte..."
        spinner.style.display = 'block';


        setTimeout(function () {
            var input = document.getElementById('text').value.toLowerCase().trim();
            var number = document.getElementById('number').value;
            var arr = getWordsNew(input);
            var arr2 = [];
            var len = arr.length;

            for (i = 0; i < len; i++) {
                if (arr[i].length == number) {
                    arr2.push(arr[i]);
                    // arr2 = arr.splice(i, 1);
                }
            }

            var filtered = compare(dictArr, arr2);
            console.log(filtered);

            info.innerHTML = 'Pronađeno je ukupno ' + filtered.length + ' reči.';


            filtered.sort();
            var len2 = filtered.length;

            for (i = 0; i < len2; i++) {
                output.innerHTML = output.innerHTML + '<input type="button" value="' + filtered[i] + '" class="btn btn-success" onclick="disable(this)" style="margin:2px;">';
            }
            spinner.style.display = 'none';
            btn.value = "Pronađi kombinacije";


        }, 500);


    });

    $('#resetBtn').click(function () {
        output.innerHTML = '';
        info.innerHTML = '';
    });


    $.ajax({
        url: "serbian_latin.txt",
        async: false,
        success: function (result) {
            // console.log(result);
            dictArr = result.split(", ");
        }
    });

    /* Preloader
        * -------------------------------------------------- */
    var clPreloader = function () {

        $("html").addClass('cl-preload');

        $(window).on('load', function () {

            //force page scroll position to top at page refresh
            $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function () {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            });

            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');

        });
    };
    clPreloader();

    setTimeout(function () {
        $("body").overhang({
            type: "success",
            message: "Kombinovanje reči od 7 i više slova može da potraje nekoliko minuta.",
            closeConfirm: true,
            duration: 6
        })
    }, 3000);
    
    var ding = new Audio('ding.mp3');
    var audio = new Audio('elevator.mp3');

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.elevator-button').fadeIn();
        } else {
            $('.elevator-button').fadeOut();
        }

        if ($('.door-left').hasClass('door-move') && $(this).scrollTop() === 0) {
            ding.pause();
            ding.currentTime = 0;
            ding.play();
            // audio.pause();
            $('.door-left').addClass('door-move-back');
            $('.door-left').removeClass('door-move');
        }
    });

    $('.elevator-button').click(function () {
        ding.pause();
        ding.currentTime = 0;
        ding.play();
        // audio.play();
        $('.door-left').addClass('door-move');
        $('.door-left').removeClass('door-move-back');
    });

});
