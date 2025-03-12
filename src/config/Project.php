<?php
/**
 * Description of project
 *
 * @author newtik
 */

namespace NewTik\ExtBuild\config;

class Project {
    
    
    public string $extBuilV = '2';
    
    /**
     * 
     * @var string
     */
    public $name;
    
    /**
     * 
     * @var string
     */
    public $code;
        
    /**
     * 
     * @var string
     */
    public $dir;
    
    /**
     * 
     * @var string[]
     */
    public $languages = [];
    
    /**
     * 
     * @var string[]
     */
    public $runBefore = [];
    
    /**
     * 
     * @var string[]
     */
    public $runAfter = [];
    
    /**
     * 
     * @var string[]
     */
    public $deploys = [];
    
    /**
     * 
     * @var string
     */
    public $pacsDir;
    
    /**
     * 
     * @var string
     */
    public $pacsFileDetect;
    
    public function __construct(string $file_config) {
        
        if(file_exists($file_config)){
            
            $config = parse_ini_file($file_config, true);
            
            echo '<pre>';
            var_dump($config);
            echo '</pre>';
            
            
            
        }else{
            
        }
        
    }
    
    
}
