<?php

/*
    Template class

*/

class Template{
    private $data;
    private $alert_types = array('success', 'alert', 'error');

    function __contruct(){
        
    }

    /** Loads the template file and provides data to it
     * @access public
     * @param  string, string
     * @return null
     */

    public function load($url, $title = ''){
        if($title != ''){
            $this->set_data('page_title', $title);
        }
        include($url);
    }

    /** Redirects to url */

    public function redirect($url){
        header("Location: $url");
        exit;
    }


    /* Get set data */
    /**
     * Get data from template
     * @access public
     * @param  string, string, bool
     * @return null
     * */
    public function set_data($name, $value, $clean = FALSE){
        if($clean == TRUE){
            $this->data[$name] = htmlentities($value, ENT_QUOTES);
        }
        else{
            $this->data[$name] = $value;
        }
    }

    /**
     * Get data from template and provides it to the view
     * @access public
     * @param  string, bool
     * @return string
     * */

    public function get_data($name, $echo = TRUE){
        if(isset($this->data[$name])){
            if($echo){
                echo $this->data[$name];
            }
            else{
                return $this->data[$name];
            }
        }
        return '';
    }

    /**
     * Set alert message
     * @access public
     * @param  string, string (optional)
     * @return null
     */

    public function set_alert($value, $type = 'success'){
        $_SESSION[$type][] = $value;
    }

    /**
     * Returns string, containing multiple list of alerts
     * 
     * @access public
     * @param
     * @return string
     */

    public function get_alerts(){
        $data = '';

        foreach($this->alert_types as $alert){
            if(isset($_SESSION[$alert])){
                foreach($_SESSION[$alert] as $value){
                    $data .= '<li class="' . $alert . '">' . $value . '</li>';
                }
                unset($_SESSION[$alert]);
            }
        }
        echo $data;
    }
}