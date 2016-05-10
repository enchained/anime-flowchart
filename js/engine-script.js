$(document).ready(function() {

    var source = $("#results-template").html();
    var template = Handlebars.compile(source);

    window.onhashchange = function() {
        var fragment = document.location.hash;
        //call page filling based on path fragment
        //console.log("hash change event " + fragment);
        load_category(fragment.replace('#', ''));
    };
    // window.onpopstate = function() {
    //     var fragment = document.location.hash;
    //     console.log("pop state event " + fragment);
    // };
    Handlebars.registerHelper('concat', function(filename) {
        return "img/" + filename + ".png";
    });

    $('.btn').click(function(event) {
        event.preventDefault();
    });

    //$('#start').click(function() {
    if (document.location.hash === '') {
        document.location.hash = 'first';
    } else {
        $(window).trigger('hashchange');
    }

    function load_category(cat, anime_view) {
        if (cat === '') {
            return;
        }
        anime_view = typeof anime_view !== 'undefined' ? anime_view : true;
        var choices_obj = SHORT[cat].choices;
        var next = SHORT[cat].next;
        var prev = SHORT[cat].prev;
        var results = {};

        $.each(choices_obj, function(kind, val) {
            //parse markdown to html
            var converter = new showdown.Converter();
            text = val.desc;
            html = converter.makeHtml(text).slice(3, -4);
            results[kind] = {
                descr: html,
                title: val.name,
                id: val.id
            };
        });

        var html = template(results);

        //erase all choices
        $('#results').empty();
        $('#results').append(html);

        $('#question').text(SHORT[cat].text);

        //set next
        $('#next').text(next.text);
        if (next.category === 'extended') {
            $('#next').addClass("disabled");
            //$('#next').unbind().click(function() {
                //event.preventDefault();
                // console.log("next clicked " + 'extended' );
                //document.location.hash = 'first';
            //});
        } else {
            // console.log(next.category);
            $('#next').removeClass("disabled");
            $('#next').unbind().click(function(event) {
                event.preventDefault();
                // console.log("next clicked " + next.category );
                document.location.hash = next.category;
            });
        }
    };

    // $('.panel').click(function() {
    //     document.location.hash = "page_name";
    // });

});
