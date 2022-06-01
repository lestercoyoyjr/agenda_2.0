<?php
    class HomeModel extends Query{
        public function __construct()
        {
            parent::__construct();
        }
        public function registrar($evento, $fecha, $color){
            $sql = "INSERT INTO eventos (title, start, color) VALUES (?,?,?)";
            $array = array($evento,$fecha,$color);

            // We verify if date has been registered
            $data = $this->save($sql, $array);

            if ($data == 1) {
                $msg = 1;
            } else {
                $msg = 0;
            }

            return $msg;
        }
    }

?>