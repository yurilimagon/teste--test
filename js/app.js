$(document).ready(function(){
    $('.sidenav').sidenav();
    $('#top').load('src/navbar.html');
    $('#foot').load('src/footer.html');
    $('.collapsible').collapsible();
    
    infoExt();
    infoInt();

    $('#sw-sala').click(function(){
        $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/update/V6?value=1', function(data){});
        $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/update/V6?value=0', function(data){});
    });

    $('#sw-cozi').click(function(){
        $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/update/V4?value=1', function(data){});
        $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/update/V4?value=0', function(data){});
    });

    window.setInterval(function(){ // Set interval for checking
        infoExt();
        infoInt();
    }, 1000);
});

function infoExt(){
    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/get/V16', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(0);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(3)').html(parseInt(value) + ' %'); // Temperatura Externa
        });
    });

    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/get/V17', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(0);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(1)').html(parseFloat(value).toFixed(1)+' ºC'); // Umidade Externa
        });
    });

    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/get/V0', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(2);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(1)').html(parseInt(value)+' %'); // Sensor de Chuva
        });
    });
    
    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/get/V18', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(2);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(2)').html(value); // Estado Chuva
        });
    });

    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/get/V1', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(3);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(1)').html(parseFloat(value).toFixed(1)+' ºC'); // Ponto de Orvalho
        });
    });

    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/get/V3', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(3);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(2)').html(value); // Estado Ponto de Orvalho
        });
    });
    
    

    // VERIFICA SE EXTERNO ESTÁ ONLINE
    $.getJSON('http://blynk-cloud.com/db7076d4e52445f992a87fb5f83cf357/isHardwareConnected', function(data){
        if (data) {
            $('#stat-ext').removeClass('offline');
            $('#stat-ext').addClass('online');
            $('#status-externo').text('signal_wifi_4_bar');
            $('#stat-ext').text("Online");
        } else {
            $('#stat-ext').removeClass('online');
            $('#stat-ext').addClass('offline');
            $('#status-externo').text('signal_wifi_off');
            $('#stat-ext').text("Offline");
        }
    });
}

function infoInt(){
    // VERIFICA SE INTERNO ESTÁ ONLINE
    $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/isHardwareConnected', function(data){
        if (data) {
            $('#stat-int').removeClass('offline');
            $('#stat-int').addClass('online');
            $('#status-interno').text('signal_wifi_4_bar');
            $('#stat-int').text("Online");
        } else {
            $('#stat-int').removeClass('online');
            $('#stat-int').addClass('offline');
            $('#status-interno').text('signal_wifi_off');
            $('#stat-int').text("Offline");
        }
    });

    $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/get/V5', function(data){
        $.each(data, function(key, value){
            var linhaAtual = $('#tb-main').find('tbody').eq(1);
            $(this).closest('tr'); //Chega no pai "tr"
            linhaAtual.find('td:eq(1)').html(parseFloat(value).toFixed(1)+' ºC'); // Temperatura Interna
        });
    });

    $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/get/V1', function(data){
        $.each(data, function(key, value){
            if(data == 0){
                $('#sw-sala').removeClass('btnLigado');
                $('#sw-sala').text('Desligado');
                $('#ico-sala').text('lightbulb_outline');
                $('#sw-sala').addClass('btnDesligado');
            } else{
                $('#sw-sala').removeClass('btnDesligado');
                $('#sw-sala').text('Ligado');
                $('#ico-sala').text('lightbulb');
                $('#sw-sala').addClass('btnLigado');
            }
        });
    });

    $.getJSON('http://blynk-cloud.com/846e45503c264f9692c79ebcd37bf7b2/get/V2', function(data){
        $.each(data, function(key, value){
            if(data == 0){
                $('#sw-cozi').removeClass('btnLigado');
                $('#ico-cozi').text('lightbulb_outline');
                $('#sw-cozi').text('Desligado');
                $('#sw-cozi').addClass('btnDesligado');
            } else{
                $('#sw-cozi').removeClass('btnDesligado');
                $('#sw-cozi').text('Ligado');
                $('#ico-cozi').text('lightbulb');
                $('#sw-cozi').addClass('btnLigado');
            }
        });
    });
}