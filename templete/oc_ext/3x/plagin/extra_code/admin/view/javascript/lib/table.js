
/**
 * 
 * @param {this} e
 * @param {string} tableId
 * @param {bool} blackMark 
 * @returns {undefined}
 */
function ntDelTableRow(e, tableId, blackMark = false) {
    if(blackMark){
        let el = $(e).parents('tr')   
        ntTableRowToggleBlackMark(el, $(e), el.find('input[blackMark]'))
    }else{
        $(e).parents('tr').remove()
    }
}

function ntTableRowToggleBlackMark(row, buuton, inputBlackMark){
    row.toggleClass('blackMark')  
    inputBlackMark.prop('checked', !inputBlackMark.prop('checked'));    
    buuton.find('i.fa').toggleClass('fa-minus-circle').toggleClass('fa-plus-circle')
    buuton.toggleClass('btn-danger').toggleClass('btn-success')
}

function ntAddTableRow(e, tableId, data = {}, callbackAddTableRow = false) {

    if (tableId == undefined || tableId == '') {
        $table = $(e).parents('table');
        tableId = $table.attr('id')
    } else {
        $table = $('#' + tableId);
    }

    let TableId = '#' + tableId;
    
    
    if (window[tableId + '_rowI'] != undefined) {
        data.id = window[tableId + '_rowI']++;
    }else{
        data.id = crypto.randomUUID();
    }
    _html = $(TableId + '_row').html().replaceAll('__id__', data.id)
    $(TableId + ' > tbody').append(_html)
    //$.tmpl($(TableId + '_row'), data).appendTo(TableId + " tbody");
    
    if(callbackAddTableRow !== false){
        callbackAddTableRow(e, tableId, data)
    }

}

class ntTable{
    static add(){
        
    }
    
    static del(){
        
    }
}

//var NTTableRow = {
//    
//    'add':function (e, tableId, data = {}) {
//        let e = $(this)
//        if (tableId == undefined || tableId == '') {
//            $table = $(e).parents('table');
//            tableId = $table.attr('id')
//        } else {
//            $table = $('#' + tableId);
//        }
//
//        let TableId = '#' + tableId;
//
//        data.id = crypto.randomUUID();
//        if (window[tableId + '_rowI'] != undefined) {
//            data.id = window[tableId + '_rowI']++;
//        }
//        
//        $.tmpl($(TableId + '_row'), data).appendTo(TableId + " tbody");
//    },
//    
//    'del':function(e, tableId, blackMark = false) {
//        let e = $(this)
//        if(blackMark){
//            let el = $(e).parents('tr')   
//            this.blackMark(el, $(e), el.find('input[blackMark]'))
//        }else{
//            $(e).parents('tr').remove()
//        }
//    },
//    
//    'blackMark':function (row, buuton, inputBlackMark){
//        row.toggleClass('blackMark')  
//        inputBlackMark.prop('checked', !inputBlackMark.prop('checked'));    
//        buuton.find('i.fa').toggleClass('fa-minus-circle').toggleClass('fa-plus-circle')
//        buuton.toggleClass('btn-danger').toggleClass('btn-success')
//    }
//    
//}