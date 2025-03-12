<?php
//Global

$_['text_url_site']    = '__SITELINK__';
$_['text_COPYRIGTHSHOW'] = "__COPYRIGTHSHOW__";
$_['text_COPYRIGTH'] = '__COPYRIGTH__';
$_['text_COPYRIGTHSHOWLINK'] = '<a href="'.$_['text_url_site'] .'" target="_blank">'.$_['text_COPYRIGTHSHOW'].'</a>';

//Global Module
$_['text_heading_name']    = '__nameModule__';
$_['text_url_module']    = $_['text_url_site'] . '';

$utm = '?utm_medium=MyModule&utm_source='.urlencode($_['text_heading_name']);
$_['text_url_site'] .= $utm;
$_['text_url_module'] .= $utm;

$_['text_heading_title']    = $_['text_COPYRIGTHSHOW'] . ' <b>'.$_['text_heading_name'].'</b>';
$_['text_heading_form_title'] = $_['text_heading_name'] . ' ' . $_['text_COPYRIGTH'];
$_['heading_title'] = $_['text_heading_title'] ;


//type_extension == payment
$_['text_newtik_wayforpay'] = '<img src="view/image/payment/" alt="WayForPay" title="WayForPay" style="border: 1px solid #EEEEEE;" />';

//support
$_['text_support_email'] = '';
$_['text_support_telegram'] = '';
$_['text_support_phone'] = '';

$_['text_button_apply']     = 'Застосувати';

// Text
$_['text_extension']   = 'Розширення';
$_['text_success_save']     = 'Налаштування збережено!';
$_['text_success_cache_clear']     = 'Кеш очищено';
$_['text_store']        = 'Налаштування для магазину:';

$_['text_button_cache_clear']     = 'Очищення кеша';

$_['text_setting_basic']        = 'Завантажте основні налаштування';
$_['text_setting_export']        = 'Експортувати налаштування';
$_['text_setting_import']        = 'Налаштування імпорту';


$_['text_zamanuha']        = 'Ще більше модулів для Opencart на нашому сайті';

//Tab General
$_['text_tab_general']      = 'Загальні';



// Error
$_['text_error_permission'] = 'У вас не має дозволу на зміну!';

__language_fields__;