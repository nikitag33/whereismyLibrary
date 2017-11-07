$(document).ready(function () {
    
    $('.bottone3').hide();
    var offset = 0;
    var limit = 12;
    var str;
    var source = $("#entry-template").html();
    var template = Handlebars.compile(source);
    
    
    /*    
    _______________________
     ESPLORA
     */
    
        //Call
    var Call = function () {
        var root = "http://dati.lazio.it/catalog/api/action/datastore_search?resource_id=eb98bb58-3d7e-46b4-a6d2-305054ed8cc5&offset=" + offset + "&limit=" + limit;
        $.getJSON(root, function (data) {
            $.each(data.result.records, function (key, value) {
                var context = data.result.records[key];
                var html = template(context);
                $('#data-list').append(html)
            });
        });
        offset += 12;
        limit += 12;
    };
    
        //Bottoni
    $(".bottone1").on("click", function () {
        $('.nascosto').show();
        $('.bottone2').show();
        $('.bottone1').hide();
    });
    
    $(".show-data").on("click", Call);
    
    
    /* 
    _______________________
    RICERCA 
    */
        
        //Input
    var input = function () {
        $("#data-list").empty();
        var word = document.getElementById("sbar");
        str = word.value;
        var clearBox = function () {
            document.getElementById("data-list").innerHTML = "";
        };
        $('.bottone2').hide();
        $('.bottone1').hide();
        $('.nascosto').show();
            //$('.bottone3').show();
            //$('.bottone3').append("Load More Library in " + ricerc(str));
    };

        //Call & Filter
    var Filter = function () {
        var root = "http://dati.lazio.it/catalog/api/action/datastore_search?resource_id=eb98bb58-3d7e-46b4-a6d2-305054ed8cc5&q=" + str;
        $.getJSON(root, function (data) {
            $.each(data.result.records, function (key, value) {
                var context = data.result.records[key];
                var html = template(context);
                $('#data-list').append(html)
            });
        });
    };
    
        //Bottoni
    $('.go').on('click', input);
    $(".show-search").on("click", Filter);
    $('.form-control').keypress(function (e) {
        console.log(e.keyCode)
        if (e.keyCode == 13){
            input();
            Filter();
        };     
    });
    
    
    
});