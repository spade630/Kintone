(function () {
    "use strict";

    function loadJS(src) {
        document.write('<script type="text/javascript" src="' + src + '"></script>');
    }

    loadJS('https://cdn.jsdelivr.net/foundation/5.5.1/js/vendor/jquery.js');
    loadJS('https://cdn.jsdelivr.net/foundation/5.5.1/js/foundation.min.js');
    loadJS('https://cdn.jsdelivr.net/foundation/5.5.1/js/vendor/modernizr.js');
    loadJS('https://js.cybozu.com/jquery/2.1.4/jquery.min.js');
    loadJS('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.8.2/moment.min.js');

    kintone.events.on('app.record.index.show', function(event) {
        moment.locale('ja');
        var check = document.getElementById('kintone-custom-view');
        if (check.length == 0) {
            return;
        }
        var records = event.records;
        if (!records || !records.length) {
            document.getElementById('kintone-custom-view').innerHTML = '記事がありません。';
            return;
        }
        $('#contents').empty();
        var recUrl = location.protocol+'//'+location.hostname+'/k/'+kintone.app.getId()+'/show#record=';
        for(var i = 0; i < records.length; ++i) {
            if(i != 0) {
                $('#contents').append('<hr />');
            }
            $('#contents').append('<content id="content' + i + '"' + 'class="contents"></content>');
            $('#content'+i).append('<h6><small>' + moment(records[i]['date']['value']).format('YYYY-MM-DD HH:mm') + '</small></h6>')
            $('#content'+i).append('<h3><a href="' + recUrl + records[i]['recordNum']['value'] + '">' + records[i]['title']['value'] + '</a></h3>');
            $('#content'+i).append('<div class="row" id="contentRaw' + i + '">' + '</div>');
            $('#contentRaw'+i).append('<p>' + records[i]['text']['value'].replace(/\r?\n/g, "<br />") + '</p>');
        }
    });
}) ();