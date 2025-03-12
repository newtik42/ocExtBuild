<?php
include_once DIR_SYSTEM . 'library/__lowerCOPYRIGTH__/autoloader.php';

#__uses__

class ControllerExtension__extension____nameClass__ extends AdminModuleController {
    
    #__traits__
    
    protected $code = '__nameFile__';
    protected $path = 'extension/__extension__/__nameFile__';
    protected $type = '__extension__';
    protected $version = '1.0.1';
    protected $setting;
    
    protected $mod_templeate_view_old = true;
    protected $sys_log_status = false;
    protected $eCron_status = false;    
    
    /**
     * 
     * @var ModelExtension__extension____nameClass__
     */
    protected $dbmodel;

	public function index() {
		parent::index();

        
        
        
    
        $this->viewOutputIndex($data ?? []);
	}
    
} 