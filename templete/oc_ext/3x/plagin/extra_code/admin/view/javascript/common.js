var sys_module_url = 'index.php?route=' + getURLVarA('route');
var sys_module_token = '&user_token=' + getURLVarA('user_token');

//var sys_module_code = '';
//var sys_module_href_validate = '';
//var sys_module_url = '';

var sys_module_html_loader = '<div NTloader class="spinner-border text-primary" style="text-align: center;font-size: 48px;" role="status"><i class="fa fa-spinner fa-spin"></i></div>';

$(document).ready(function () {
    
    //show/hide left menu
    $('#column-left').append('<div class="show-column-left"><i class="fa fa-chevron-left"></i><i class="fa fa-chevron-right"></i></div>')
    
    if (sys_module_code) {
        
        //show/hide left menu
        let menuLeftVal = window.localStorage.getItem('newtik_menuLeft_' + sys_module_code);
        
        if(menuLeftVal === null || menuLeftVal == 'false'){
            menuLeftVal = false
        }else{
            menuLeftVal = true
        }
        
        if(menuLeftVal){
            $('.show-column-left').addClass('active')
            $('#column-left').addClass('active')
        }else{
            $('.show-column-left').removeClass('active')
            $('#column-left').removeClass('active')
        }
        
        $('.show-column-left').click(function (e) {
            $('.show-column-left').toggleClass('active')
            $('#column-left').toggleClass('active')
            window.localStorage.setItem('newtik_menuLeft_' + sys_module_code, $('.show-column-left').hasClass('active'));            
        });
        //show/hide left menu
        
        
        //tabs action

        if (window.localStorage.getItem('newtik_tab_' + sys_module_code) != null) {
            $('a[href="' + window.localStorage.getItem('newtik_tab_' + sys_module_code) + '"]').tab('show');
        } else {
            $('#form-module > ul > li.active > a').tab('show');
        }

        $('[nttabs] li').click(function (e) {
            window.localStorage.setItem('newtik_tab_' + sys_module_code, $(e.target).attr('href'));
        });
    }
    $('[name="setting_status"]').click(function () {
        if ($(this).is(':checked')) {
            $('[name="setting[status]"]').val('1');
        } else {
            $('[name="setting[status]"]').val('0');
        }
    });

    // Auto table colspan

    $('[autocolspan]').each(function () {
        $(this).attr('colspan', $(this).parents('table').find('thead td').length - 1)
    })

    $('div[autocomplete]').each(function () {
        $box = $(this)

        $inputData = $box.find('input[type="hidden"]');
        $inputText = $box.find('input[type="text"]');

        id = $inputId.attr('id')

        let config = window['config_autocomplete_'+id] || false;

        if (config) {

            $inputText.autocomplete(
                    {
                        source: function (request, response) {
                            $.ajax({
                                url: config.source.url + encodeURIComponent(request) + sys_module_token,
                                dataType: 'json',
                                success: function (json) {

                                    json.unshift({category_id: 0, name: '{{ text_none }}', sort_order: "", image: ""});
                                    response(
                                            $.map(json, function (item) {
                                                return {
                                                    label: item['name'],
                                                    value: item['id'],
                                                    sort_order: item['sort_order'],
                                                    image: item['image']
                                                }
                                            }
                                            ));
                                }
                            });
                        }
                    }
            );
        }

        $inputText.autocomplete(
                {
                    'source': function (request, response) {
                        $.ajax({
                            url: 'index.php?route=catalog/bind_marca_model/getMarcaAjax&user_token={{ user_token }}&filter_name=' + encodeURIComponent(request),
                            dataType: 'json',
                            success: function (json) {

                                json.unshift({category_id: 0, name: '{{ text_none }}', sort_order: "", image: ""});
                                response(
                                        $.map(json, function (item) {
                                            return {
                                                label: item['name'],
                                                value: item['id'],
                                                sort_order: item['sort_order'],
                                                image: item['image']
                                            }
                                        }
                                        ));
                            }
                        });
                    },
                    'select': function (item) {
                        addItem('marca', item);
                    }
                }
        );

    })


});

function addTab(name, body) {
    $('[nttabs]').append(name);
}


function validateAjax(el, funCallback = null) {
    
    if (sys_module_href_validate == undefined) {
        url = sys_module_url + '/validate_ajax' + sys_module_token;
    } else {
        url = sys_module_href_validate;
    }

    let button = $(el);
    nt_buton_ajax_load(button, 'loader')
    
    if(funCallback === null){
        funCallback = saveAjax
    }
    

    $.ajax({
        url: url,
        type: 'POST',
        data: $('#form-module').serialize(),
        dataType: 'json',
        beforeSend: function () {
            formDisabled(true);
        },
        complete: function () {
            formDisabled(false);
        },
        success: function (json) {
            if (json.success) {
                formDisabled(false);
                funCallback(el);
                return true;
            } else {
                nt_buton_ajax_load(button, 'error')
                for (let name in json.errors) {

                    if (name == "warning") {
                    } else {
                        $('[name="' + name + '"]').parent().append('<div class="text-danger">' + json.errors[name] + '</div>');
                        $('[name="' + name + '"]').parent().parent().toggleClass('has-error');
                    }
                }
                return false;
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            nt_buton_ajax_load(button, 'error')
            sys_notification('Щось пішло не так!', 'error');
            console.log(xhr);
        }
    });
}

function saveAjax(el, ) {
    if (sys_module_href_action == undefined) {
        url = sys_module_url + '/save_ajax' + sys_module_token;
    } else {
        url = sys_module_href_action;
    }

    let button = $(el);
    nt_buton_ajax_load(button, 'loader')

    $.ajax({
        url: url,
        type: 'POST',
        data: $('#form-module').serialize(),
        dataType: 'json',
        beforeSend: function () {
            formDisabled(true);
        },
        complete: function () {
            formDisabled(false);
        },
        success: function (json) {
            if(json.redirect){
                location = json.redirect
            }
            if (json.success) {
                sys_notification(json.alert, 'success');
                nt_buton_ajax_load(button, 'success')
            } else {
                for (let name in json.errors) {

                    if (name == "warning") {
                    } else {
                        $('[name="' + name + '"]').parent().append('<div class="text-danger">' + json.errors[name] + '</div>');
                        $('[name="' + name + '"]').parent().parent().toggleClass('has-error');
                    }

                }
                sys_notification(json.alert, 'error');
                console.log(json.errors[name])
                nt_buton_ajax_load(button, 'error')
            }
            formDisabled(false);
            
            
        },
        error: function (xhr, ajaxOptions, thrownError) {
            nt_buton_ajax_load(button, 'error')
            sys_notification(json.alert, 'error');
            console.log(xhr);
        }
    });
    return false;
}

function cacheClearAjax(el, cache_nmae) {

    if (cache_nmae == undefined)
        cache_nmae = '';
    let button = $(el);
    nt_buton_ajax_load(button, 'loader')

    $.ajax({
        url: sys_module_url + '/cache_clear_ajax&cache_nmae=' + cache_nmae + sys_module_token,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            if (json.success) {

                sys_notification(json.alert, 'success');
            } else {
                for (let name in json.errors) {

                    if (name == "warning") {
                        nt_buton_ajax_load(button, 'success')
                        sys_notification(json.alert, 'error');
                    } else {
                        $('[name="' + name + '"]').parent().append('<div class="text-danger">' + json.errors[name] + '</div>');
                        $('[name="' + name + '"]').parent().parent().toggleClass('has-error');
                        nt_buton_ajax_load(button, 'success')
                    }

                    console.log(json.errors[name])
                }
                nt_buton_ajax_load(button, 'error')
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            nt_buton_ajax_load(button, 'error')
            sys_notification(json.alert, 'error');
            console.log(xhr);
        }
    });
    return false;
}

function settings(type) {
    if (!confirm('Ви впевнені?')) {
        return false;
    }

    if (type == 'basic') {
        $.ajax({
            url: sys_module_url + '/settings&type=' + type + sys_module_token,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                if (json['success']) {
                    $('.container-fluid:eq(1)').prepend('<div class="alert alert-success"><i class="fa fa-check-circle"></i> ' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }

                if (json['error']) {
                    $('.container-fluid:eq(1)').prepend('<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ' + json['error'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                }

                $('html, body').animate({scrollTop: 0}, 'slow');
            }
        });
    } else if (type == 'export') {
        location.href = sys_module_url + '/settings&type=' + type + sys_module_token;
    } else if (type == 'import') {
        $('#input-import-settings').trigger('click');
    }
}

function formDisabled(status) {

    if (status) {
        $('.has-error .text-danger').remove();
        $('.has-error').toggleClass('has-error');
        $('[but_save]').html('<i class="fa fa-spinner fa-spin"></i>');

        $('#form-module *').attr('disabled', '');
        $('#form-module *').toggleClass('disabled');
        $('#form-module a').toggleClass('disabled');
        $('[SelectStores]').toggleClass('disabled');
        $('[but_save]').toggleClass('disabled');
        $('[module_menu_setting_button]').attr('data-toggle', '');
    } else {
        $('[but_save]').html('<i class="fa fa-save"></i>');

        $('#form-module *').removeAttr('disabled');
        $('#form-module *').toggleClass('disabled');
        $('#form-module a').toggleClass('disabled');
        $('[SelectStores]').toggleClass('disabled');
        $('[but_save]').toggleClass('disabled');
        $('[module_menu_setting_button]').attr('data-toggle', 'dropdown');
    }

}

function getURLVarA(key) {
    var value = [];

    var query = String(document.location).split('?');

    if (query[1]) {
        var part = query[1].split('&');

        for (i = 0; i < part.length; i++) {
            var data = part[i].split('=');

            if (data[0] && data[1]) {
                value[data[0]] = data[1];
            }
        }

        if (value[key]) {
            return value[key];
        } else {
            return '';
        }
    }
}

function sys_notification(text, type) {
    if (text == '')
        return;
    if (type == "success" || type == "ok") {
        $('[sys_notification]').html(
                '<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> '
                + text + '<button type="button" class="close" data-dismiss="alert">×</button></div>');
    } else if (type == "info") {
        $('[sys_notification]').html(
                '<div class="alert alert-info"><i class="fa fa-info-circle"></i> ' + text +
                '<button type="button" class="close" data-dismiss="alert">×</button></div>');
    } else if (type == "error") {
        $('[sys_notification]').html(
                '<div class="alert alert-danger alert-dismissible"><i class="fa fa-exclamation-circle"></i> ' + text +
                '<button type="button" class="close" data-dismiss="alert">×</button></div>');
    }
}

//==================================================================================================
//log

function nt_log_clear(el, log_type) {

    if (log_type == undefined)
        log_type = 'error';

    let button = $(el);
    nt_buton_ajax_load(button, 'loader')

    $.ajax({
        url: sys_module_url + '/logClear_ajax&log_type=' + log_type + sys_module_token,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            if (json.success) {
                nt_buton_ajax_load(button, 'success')
                sys_notification(json.alert, 'success');
                $('#log-' + log_type).val('');
            } else {
                nt_buton_ajax_load(button, 'error')
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            nt_buton_ajax_load(button, 'error')
            sys_notification(json.alert, 'error');
            console.log(xhr);
        }
    });
    return false;

}

function nt_log_downloader(el, log_type) {

    if (log_type == undefined)
        log_type = 'error';
    let button = $(el);
    nt_buton_ajax_load(button, 'loader')

    $.ajax({
        url: sys_module_url + '/logDownload_ajax&log_type=' + log_type + sys_module_token,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            if (json.success && json.data) {
                nt_buton_ajax_load(button, 'success')
                $('#log-' + log_type).val('');
                nt_file_download(json.data.text, json.data.filename)
            } else {
                nt_buton_ajax_load(button, 'error')
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            nt_buton_ajax_load(button, 'error')
            console.log(xhr);
        }
    });
    return false;

}

function nt_log_reload(el, log_type) {

    if (log_type == undefined)
        log_type = 'error';

    let button = $(el);
    nt_buton_ajax_load(button, 'loader')

    $.ajax({
        url: sys_module_url + '/logReload_ajax&log_type=' + log_type + sys_module_token,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            if (json.success) {
                $('#log-' + log_type).html(json.data.text)
                nt_buton_ajax_load(button, 'success')
            } else {
                nt_buton_ajax_load(button, 'error')
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            nt_buton_ajax_load(button, 'error')
            sys_notification(json.alert, 'error');
            console.log(xhr);
        }
    });
    return false;

}

function nt_file_download(dataurl, filename) {
    if(filename !== ""){
        const link = document.createElement("a");
        link.href = dataurl;
        link.download = filename;
        link.click();
    }
}

function generateToken() {
    rand = ''
    string = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (i = 0; i < 8; i++) {
        rand += string[Math.floor(Math.random() * (string.length - 1))]
    }
    return rand
}

function nt_buton_ajax_load(button, type_ico = 'default') {

    let button_icon = $(button).find('i.fa');

    if (type_ico == 'loader') {
        button.attr('default', button.attr('class'))
        button_icon.attr('default', button_icon.attr('class'))
        button.attr('class', 'btn disabled')
        button_icon.attr('class', 'fa fa-spinner fa-spin')
    } else if (type_ico == 'success' || type_ico == 'ok') {
        button_icon.attr('class', 'fa fa-check')
        button.attr('class', 'btn btn-success disabled')
        setTimeout(function () {
            nt_buton_ajax_load(button, 'default')
        }, 2000)
    } else if (type_ico == 'error') {
        button_icon.attr('class', 'fa fa-times')
        button.attr('class', 'btn btn-danger disabled')
        setTimeout(function () {
            nt_buton_ajax_load(button, 'default')
        }, 2000)
    } else if (type_ico == 'default') {
        button.attr('class', button.attr('default'))
        button_icon.attr('class', button_icon.attr('default'))
    }
}

function NTcopyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).val()).select();
    document.execCommand("copy");
    $temp.remove();
    
}

function NTcopyToClipboardA1(element) {
        
    // Копіювання тексту
    var text = document.getElementById("myInput").value;
    navigator.clipboard.writeText(text);

    // Копіювання значення поля введення (input)
    var input = document.getElementById("myInput");
    input.select();
    document.execCommand("copy");

    alert("Текст та значення поля скопійовано!");
}


// info wells
$('body').on('click', '.infowell h4', function (e) {
    $(this).parent().find('div.slideBody').slideToggle();
    $(this).find('i').toggleClass('fa-caret-right').toggleClass('fa-caret-down');
});

class NTcomponentsProgressBar{

    id = 'progress-bar_' +crypto.randomUUID()

    valuemin = 0
    valuemax = 100
    valuenow = 0
    procent = 0

    stepNext(){
        this.valuenow++;
        this.procent = this.valuenow / this.valuemax * 100
        this.updata()
    }
    reStart(){
        this.valuenow = 0;
        this.procent = 0
        this.updata()
    }
    updata(){          
         $('#'+this.id + ' .progress')
            .attr('aria-valuenow', this.valuenow)
            .attr('style', 'width:'+this.procent+'%;')
    }
    Html(){
        return '<div id="'+this.id+'"><div class="progress progress-bar-info">' +
            '<div class="progress-bar" role="progressbar"' +
            'aria-valuenow="'+this.valuenow+'"' +
            'aria-valuemin="'+this.valuenow+'"' +
            'aria-valuemax="'+this.valuenow+'"' +
            'style="width: 0%;">'+'</div></div></div>';    
    }

}

class ModelTEC {
    
    ajax = false
    loader_status = false 
    
    select_box = '#ModalТЕ_'
    _backdrop = true
    _keyboard = true
    _show = true
    _remote = false
    
    constructor(config){
        this.select_box += config
        this.box = $(this.select_box);
    }
    
    show(){
        this.box.modal({'backdrop':this._backdrop, 'keyboard':this._keyboard, 'show':this._show})
    }
    
    hide(){
        this.box.modal('hide')
    }
    
    set Setting(setting){
        
    }
    
    set Title(title){
        $(this.select_box + ' .modal-title').html(name)
    }
    
    loader(loader_status){
        if(loader_status !== undefined){
            this.loader_status = loader_status
        }
        if(this.loader_status){
            $(this.select_box + ' .modal-body').hide()
            $(this.select_box + ' .loader').show()            
            $(this.select_box + ' .modal-footer').hide()
        }else{
            $(this.select_box + ' .modal-body').show()
            $(this.select_box + ' .loader').hide()            
            $(this.select_box + ' .modal-footer').show()
        }
        
        this.loader_status = !this.loader_status
        
    }
    
    
}

var ModelTE = {
        select_box:'#ModalТЕ_',     
    
        'start': function (config) {
            this.select_box += config
            box = $(this.select_box);
            Mtitle = $(this.select_box +' .modal-title');
        },
        'setTitle': function (name) {
            Mtitle.html(name)
        },
        'show': function () {
            box.modal('show')
        }
        ,
        'hide': function () {
            box.modal('hide')
        },

        'setSetting': function (type, el) {
            if (type == "marca" || type == "model") {
            box.find('#modalNamme').val(el.data('label'))
            box.find('#modalШmage').val(el.data('image'))
            box.find('#modalSort').val(el.data('sort_order'))
        }
        }
    };
    
    function modalShow(type, e) {
        let setting = $(e).parent().find('input');
        ModelTE.setSetting(type, setting)
        ModelTE.setTitle('tesdsfsdf');
        ModelTE.show();
    }
    
    class NTcomponents{
        
        
    }
  
