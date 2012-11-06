var base_search_url = "http://book2.dglib.cn/advsearch?{{data}}#searchinfo";
var base_detail_url = "";

function getLibraryButton(keyword) {
    var search_url = base_search_url.replace("{{data}}", keyword);
    var borrowButton = $('<a href="'+search_url+'" style="float:left;display: inline-block;background: #33A057;border: 1px solid #2F7B4B;color: white;padding: 1px 10px;border-radius:3px;margin-right: 8px;" target="_blank">借阅</a>');
    return borrowButton;
}

var url = window.location.toString();

// Book Page
if ( url.indexOf('subject')!=-1 ){
    var keyword;
    if ($("#info span:last").html().indexOf("ISBN")!=-1) {
        keyword = $("#info").contents().slice(-3,-2)[0].nodeValue.trim();
        keyword = "ISBN=" + encodeURIComponent(keyword);
    }
    else {
        keyword = $("#mainpic img").attr("alt");
        keyword = "Book=" + encodeURIComponent(keyword);
    }
    $('div.a_stars').before(getLibraryButton(keyword));
}

// People's Book List Page
else if( (url.indexOf('mine')!=-1)||(url.indexOf('people')!=-1) ){
    $('div.item ul').each(function(){
        var keyword = $('li.title a em', this).html();
        $('div.opt-r', this).after(getLibraryButton(keyword).css("float","right"));      
    });
}

// System's Book List Page : doulist
else if( url.indexOf('doulist')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();
        $('td > span.rr', this).prepend(getLibraryButton(keyword));
    });
}

// System's Book List Page : tag
else if( url.indexOf('tag')!=-1 ){
    $('div.article table').each(function(){
        var keyword = $('div.pl2 a', this).html();        
        $('td p span.rr', this).prepend(getLibraryButton(keyword));
    });
}