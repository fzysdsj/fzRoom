$(function(){
     var s = parseInt($(".level").html().trim());
                if (s >= 0 && s <= 100) {
                    $(".level").html("方丈平民");
                    $(".level").css('background', '#056');
                } else if (s > 100 && s <= 300) {
                    $(".level").html("方丈县男");
                    $(".level").css('background', '#0B7');
                } else if (s > 300 && s <= 600) {
                    $(".level").html("方丈县子");
                    $(".level").css('background', '#6A3');
                } else if (s > 600 && s <= 1000) {
                    $(".level").html("方丈郡伯");
                    $(".level").css('background', '#820');
                } else if (s > 1000 && s <= 1500) {
                    $(".level").html("方丈郡侯");
                    $(".level").css('background', '#FAD');
                } else if (s > 1500 && s <= 2100) {
                    $(".level").html("方丈郡公");
                    $(".level").css('background', '#60f');
                } else if (s > 2100 && s <= 2800) {
                    $(".level").html("方丈阁伯");
                    $(".level").css('background', '#900');
                } else if (s > 2800 && s <= 3600) {
                    $(".level").html("方丈阁侯");
                    $(".level").css('background', '#2AA');
                } else if (s > 3600 && s <= 4500) {
                    $(".level").html("方丈阁公");
                    $(".level").css('background', '#AAA');
                } else if (s > 4500 && s <= 6000) {
                    $(".level").html("方丈阁王");
                    $(".level").css('background', '#655');
                } else if (s > 6000 && s <= 8500) {
                    $(".level").html("方丈阁帝");
                    $(".level").css('background', '#AA0');
                } else if (s > 8500 && s <= 12000) {
                    $(".level").html("方丈半仙");
                    $(".level").css('background', '#A3A');
                } else if (s > 12000 && s <= 18000) {
                    $(".level").html("方丈散仙");
                    $(".level").css('background', '#3AA');
                } else if (s > 18000 && s <= 25000) {
                    $(".level").html("方丈正仙");
                    $(".level").css('background', '#935A46');
                } else if (s > 25000 && s <= 35000) {
                    $(".level").html("方丈上仙");
                    $(".level").css('background', '#F66');
                } else if (s > 35000) {
                    $(".level").html("方丈阁尊");
                    $(".level").css('background', '#803DE2');
                }

});