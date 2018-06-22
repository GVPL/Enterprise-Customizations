var novelistUrl = "https://imageserver.ebscohost.com/novelistselect/ns2init.js";//The location of the NoveList js
var novelistProfile = "XXXXXXXXXXXXXXXXXXXXXX.main.novselent"; //This is your profile as provided by Novelist
var novelistPassword = "XXXXXXXXXXXXXXXXXXXXXX"; //This is your password as provided by Novelist
var currentNovSelectAttempt = 1;

function goNovelist(detail)
{
$J('#detail_accordion'+detail).css('visibility','hidden');
    window.globalDetail=detail;
    var detailIndex="";
    if(detail!=undefined)
    {
        detailIndex = "detail"+detail;
    }
    else
    {
        detail="";
    }
    if (typeof(novSelect) == 'undefined')
    {
        novelistScript = new Element('script', {
        type: 'text/javascript',
        id: 'EIT',
        src: ''+novelistUrl+''});
        jQuery('body').append(novelistScript);
    }
    if(document.getElementById(detailIndex+'_ISBN').hasChildNodes())
    {
              jQuery('#detail_accordion'+detail).append('<h3><a href="#">Novelist Recommendations</a></h3><div id="novelistContent" data-novelist-novelistselect="'+document.getElementById(detailIndex+'_ISBN').childNodes[0].innerHTML+'"><div id="NoveListSelect" class="NovelistSelect"></div></div>');
        NoveListSelectEnrichment(document.getElementById(detailIndex+'_ISBN').childNodes[0].innerHTML);
        
    }
else{
jQuery(document).ready(function(){
setTimeout("accToTabs()",500);
});
}
}

function NoveListSelectEnrichment(isbn) {
    if (typeof(novSelect) == 'undefined') {
        currentNovSelectAttempt++;
        if(currentNovSelectAttempt<= 10) {
            setTimeout("NoveListSelectEnrichment("+isbn+")", 250);
        }
    }
    else {
        novSelect.loadContentForQuery({ClientIdentifier:isbn, ISBN:isbn, version: '2.1'} , novelistProfile, novelistPassword, sdCallback);
        
    }
}

function sdCallback(jsonResult){
if(jsonResult.length=='0'){
jQuery('#novelistContent').prev().remove();
jQuery('#novelistContent').remove();
}
accToTabs();
}

function accToTabs(){
console.log(globalDetail);
var outerTabHtml='<div id="detail_tabs'+globalDetail + '"><ul></ul></div>';
$J('#detail_accordion'+globalDetail).before(outerTabHtml);
var liHtml='';
var divHtml='';
var tabText='';
var fullDivHtml='';
var myIndex=0;
var ltflIndex=0;
$J('#detail_accordion'+globalDetail+' h3.ui-accordion-header').each(function(index){
/*some accordions seem to render empty content, like those Syndetics or On Order accordions that show a header, but no info.  This attempts to prevent those from rendering at all during the switch-over to tabs*/
if ($J(this).next().text().length > 0){
myIndex++;
tabText=$J(this).text();
console.log(tabText);
var divContent = $J(this).next().text();
var divLength=divContent.length;
liHtml='<li><a href="#tabs-'+(index+1)+'">' + tabText + '</a></li>';
divHtml=$J(this).next().html();
fullDivHtml='<div id="tabs-' + (index+1) + '">' + divHtml + '</div>';
var idString = 'tabs-'+ (index+1);
$J('#detail_tabs'+globalDetail + ' ul').append(liHtml);
$J('#detail_tabs'+globalDetail).append(fullDivHtml);
}//end if
});//end each
if(jQuery('#detail_tabs'+globalDetail).text().length >0){
$J('#detail_tabs' + globalDetail).tabs();
$J('#detail_accordion'+globalDetail).remove();
/*the process of copying the item table to the tabs kills the sorting capabilities of the table.  The next 3 commands re-invoke the sorttable.js plug-in on the table, and prevent redundant sorting arrows from appearing*/

$J('.sorttable_sortAnyInd').remove();
var itemTable = document.getElementById('detailItemTable'+globalDetail);
sorttable.makeSortable(itemTable);

}
else
$J('#detail_tabs'+globalDetail).remove();
}
